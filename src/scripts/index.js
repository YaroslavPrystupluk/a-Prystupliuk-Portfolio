import Typed from "typed.js";

import "../index";
import "../style/style";

new Typed ("#typewriter", {
		typeSpeed: 150,
		backSpeed: 50,
		startDelay: 100,
		loop: true,
		stringsElement: "#typing"
});

document.querySelector(".theme-mode").addEventListener("click", () => {
		if(localStorage.getItem("theme") === "dark"){
				localStorage.removeItem("theme");
		}else{
				localStorage.setItem("theme", "dark");
		}
		addThemeDark();
});
const addThemeDark = () => {
		try {
				if(localStorage.getItem("theme") === "dark"){
						document.body.classList.add("dark");
						document.querySelector(".toggleIcon").textContent = "sunny";
				} else {
						document.body.classList.remove("dark");
						document.querySelector(".toggleIcon").textContent = "nightlight";
				}
		}catch ( error ){
				console.warn(error);
		}
};
addThemeDark();

const clock = () => {
		const hoursArrow = document.querySelector(".hours");
		const minutesArrow = document.querySelector(".minutes");
		const secondsArrow = document.querySelector(".seconds");
		const degris = 6;
		setInterval(() => {
				const day = new Date();
				const hours = day.getHours() * 30;
				const minutes = day.getMinutes() * degris;
				const seconds = day.getSeconds() * degris;
				hoursArrow.style.transform = `rotateZ(${hours + (minutes / 12)}deg)`;
				minutesArrow.style.transform = `rotate(${minutes}deg)`;
				secondsArrow.style.transform = `rotate(${seconds}deg)`;
				
		}, 0);
};
clock();