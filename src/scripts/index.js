import Typed from "typed.js";
import AOS from "aos";
import RepoCard from "./RepoCard";

import "../index";
import "../style/style";

AOS.init();

new Typed( "#typewriter", {
		strings: [ "FrontEnd Developer", "Competitive Programmer", "Web Designer" ],
		typeSpeed: 150,
		backSpeed: 50,
		startDelay: 100,
		loop: true,
		stringsElement: "#typing"
} );

document.querySelector( ".theme-mode" ).addEventListener( "click", () => {
		if ( localStorage.getItem( "theme" ) === "dark" ) {
				localStorage.removeItem( "theme" );
		} else {
				localStorage.setItem( "theme", "dark" );
		}
		addThemeDark();
} );
const addThemeDark = () => {
		try {
				if ( localStorage.getItem( "theme" ) === "dark" ) {
						document.body.classList.add( "dark" );
						document.querySelector( ".clock" ).classList.add( "dark" );
						document.querySelector( ".fa-moon" ).style.display = "none";
						document.querySelector( ".fa-sun" ).style.display = "block";
				} else {
						document.body.classList.remove( "dark" );
						document.querySelector( ".clock" ).classList.remove( "dark" );
						document.querySelector( ".fa-moon" ).style.display = "block";
						document.querySelector( ".fa-sun" ).style.display = "none";
				}
		} catch ( error ) {
				console.warn( error );
		}
};
addThemeDark();

const clock = () => {
		const hoursArrow = document.querySelector( ".hours" );
		const minutesArrow = document.querySelector( ".minutes" );
		const secondsArrow = document.querySelector( ".seconds" );
		const degris = 6;
		setInterval( () => {
				const day = new Date();
				const hours = day.getHours() * 30;
				const minutes = day.getMinutes() * degris;
				const seconds = day.getSeconds() * degris;
				hoursArrow.style.transform = `rotateZ(${ hours + ( minutes / 12 ) }deg)`;
				minutesArrow.style.transform = `rotate(${ minutes }deg)`;
				secondsArrow.style.transform = `rotate(${ seconds }deg)`;
				
		}, 0 );
};
clock();

const getCalendarDate = ( block, year, month ) => {
		let arrow = document.querySelector( block );
		arrow.addEventListener( "click", () => {
				if ( arrow.classList.contains( "month__arrow--left" ) ) {
						month--;
						if ( month < 1 ) {
								month = 12;
								year -= 1;
						}
				} else if ( arrow.classList.contains( "month__arrow--right" ) ) {
						month++;
						if ( month > 12 ) {
								month = 1;
								year += 1;
						}
				} else if ( arrow.classList.contains( "year__arrow--left" ) ) {
						if ( year > 1900 ) {
								year--;
						}
				} else if ( arrow.classList.contains( "year__arrow--right" ) ) {
						if ( year < 2100 ) {
								year++;
						}
				}
				createCalendar( ".calendar", year, month );
		} );
};

const activeDate = ( year, month ) => {
		const days = document.querySelectorAll( "td" );
		const date = new Date();
		const nowYear = date.getFullYear();
		const nowMonth = date.getMonth() + 1;
		const today = date.getDate();
		days.forEach( day => {
				let num = day.textContent;
				if ( +num === today && month === nowMonth && year === nowYear ) {
						day.classList.add( "active-day" );
				}
		} );
};


const createCalendar = ( elem, year, month ) => {
		const monthNames = [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
		];
		elem = document.querySelector( elem );
		const mon = month - 1;
		const date = new Date( year, mon );
		
		let table = `
		<table>
				<caption class="title-calendar">
					<div class="month">
					<button class="squared-left month__arrow--left"></button>
					<p class="month__name">${ monthNames[mon] }</p>
					<button class="squared-right month__arrow--right"></button>
					</div>
					<div class="year">
						<button class="squared-left year__arrow--left"></button>
					<p class="year__this">${ year }</p>
						<button class="squared-right year__arrow--right"></button>
					</div>
				</caption>
				<tr>
						<th>Mo.</th>
						<th>Tu.</th>
						<th>We.</th>
						<th>Th.</th>
						<th>Fr.</th>
						<th>Sa.</th>
						<th>Su.</th>
				</tr>
				<tr>
	`;
		
		for ( let i = 0; i < getDay( date ); i++ ) {
				table += "<td></td>";
		}
		
		while ( date.getMonth() === mon ) {
				table += `<td>${ date.getDate() }</td>`;
				if ( getDay( date ) % 7 === 6 ) {
						table += "</tr><tr>";
				}
				date.setDate( date.getDate() + 1 );
		}
		
		if ( getDay( date ) !== 0 ) {
				for ( let i = getDay( date ); i < 7; i++ ) {
						table += "<td></td>";
				}
		}
		
		table += "</tr></table>";
		elem.innerHTML = table;
		
		getCalendarDate( ".year__arrow--right", year, month );
		getCalendarDate( ".year__arrow--left", year, month );
		getCalendarDate( ".month__arrow--right", year, month );
		getCalendarDate( ".month__arrow--left", year, month );
		activeDate( year, month );
};

const getDay = ( date ) => {
		let day = date.getDay();
		if ( day === 0 ) day = 7;
		return day - 1;
};

createCalendar( ".calendar", new Date().getFullYear(), new Date().getMonth() + 1 );

const repoCard = new RepoCard("YaroslavPrystupluk");

repoCard.displayRepos();
