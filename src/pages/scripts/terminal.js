import "../terminal";
import "../style/terminal";

const terminal = document.querySelector( "#terminal" );
const wrapTerminal = document.createElement( "div" );
wrapTerminal.classList.add( "container" );
terminal.append( wrapTerminal );

const date = new Date();
const headerTerminal = document.createElement( "div" );
headerTerminal.classList.add( "header-terminal" );
headerTerminal.insertAdjacentHTML( "beforeend",
	`<p>==> Your session started at ${ date.toDateString() } ${ date.toLocaleTimeString() }</p>
<p>==> Welcome to the terminal of Yaroslav Prystupliuk! :)</p>
<p>==> This terminal will give all info about me.</p>
<p>==> Hope You like it :)</p>
<p>-----------------------------------------------------</p>
<p>Enter 'help' to list the available commands &#47;</p>
` );
wrapTerminal.append( headerTerminal );

const contextTerminal = document.createElement( "div" );
contextTerminal.classList.add( "context-terminal" );
terminal.append( contextTerminal );


const inputWrap = document.createElement( "div" );
inputWrap.classList.add( "input-wrapper" );
terminal.append( inputWrap );

const inputSquare = document.createElement( "div" );
inputSquare.classList.add( "input-square", "active" );
inputWrap.append( inputSquare );

const inputTerminal = document.createElement( "input" );
inputTerminal.classList.add( "input-terminal" );
inputWrap.append( inputTerminal );

const cursorFocus = () => {
		document.querySelector( ".input-terminal" ).focus();
		const square = document.querySelector( ".input-square" );
		setInterval( () => {
				square.classList.toggle( "active" );
		}, 500 );
};
cursorFocus();

document.addEventListener( "mousedown", function ( event ) {
		event.preventDefault();
} );


document.addEventListener( "contextmenu", function ( event ) {
		event.preventDefault();
} );


const elClock = () => {
		setInterval( () => {
				const elClock = document.querySelector( "#el-clock" );
				const day = new Date();
				const hours = day.getHours() < 10 ? "0" + day.getHours() : day.getHours();
				const minutes = day.getMinutes() < 10 ? "0" + day.getMinutes() : day.getMinutes();
				const seconds = day.getSeconds() < 10 ? "0" + day.getSeconds() : day.getSeconds();
				elClock.innerHTML = `${ hours }:${ minutes }:${ seconds }`;
		}, 0 );
		
};
elClock();


function moveCursor() {
		const input = document.querySelector( ".input-terminal" );
		const square = document.querySelector( ".input-square" );
		const inputRect = input.getBoundingClientRect();
		const cursorPosition = input.selectionStart;
		const inputStyle = getComputedStyle( input );
		const cursorWidth = parseFloat( inputStyle.fontSize ) / 1.659;
		square.style.left = `${ inputRect.left + cursorPosition * cursorWidth - 10 }px`;
}

const scrollDown = () => {
		document.querySelector( ".input-terminal" ).value = "";
		document.querySelector( "input:last-child" ).scrollIntoView( { behavior: "smooth" } );
		document.querySelector( ".input-square" ).style.left = "0px";
};

const handlerInput = ( event ) => {
		let terminalValue = document.querySelector( ".input-terminal" ).value.toLowerCase().trim();
		
		if ( terminalValue.length > 0 ) {
				if ( event.key === "Enter" ) {
						event.preventDefault();
						contextTerminal.insertAdjacentHTML( "beforeend", `<p> ${ terminalValue }</p>` );
						if ( terminalValue === "help" ) {
								showHelp();
						} else if ( terminalValue === "about" ) {
								showAbout();
						} else if ( terminalValue === "skills" ) {
								showSkills();
						} else if ( terminalValue === "work" ) {
								showWork();
						} else if ( terminalValue === "education" ) {
								showEducation();
						} else if ( terminalValue === "projects" ) {
								showProjects();
						} else if ( terminalValue === "contact" ) {
								showContact();
						} else if ( terminalValue === "cv" ) {
								showCV();
						} else if ( terminalValue === "git" ) {
								showGit();
						} else if ( terminalValue === "clear" ) {
								clearTerminal();
						} else if ( terminalValue === "exit" ) {
								showExit();
						} else {
								showError( terminalValue );
						}
						
						scrollDown();
						myProjectShow( terminalValue );
						
				}
				
		}
		
};

const showHelp = () => {
		const commands = [
				{ name: "about" },
				{ name: "skills" },
				{ name: "work" },
				{ name: "education" },
				{ name: "projects" },
				{ name: "contact" },
				{ name: "CV" },
				{ name: "git" },
				{ name: "clear" },
				{ name: "help" },
				{ name: "exit" }
		];
		
		const commandList = commands.map( item => `<p> > ${ item.name }</p>` ).join( "" );
		
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> ==> Hey, Thanks for using Terminal :)</p>
<p> ==> The available command in my terminal are :</p>
${ commandList }
` );
};

const showAbout = () => {
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> ==> I am Yaroslav Prystupliuk FrontEnd Developer</p>
<p> ==> According to me, The only source of knowledge is experience</p>
<p> ==> I am FrontEnd Developer working with HTML, CSS, SCSS, JS, React, Redux, Styled-components, Jest, Testing Library, Eslint, Node ect  </p>
<p> ==> I also know version control system like Git and also experienced in both Github and Gitlab.</p>
<p> ==> I strive to understand the needs and goals of the project and offer the best possible solution.</p>
<p> ==> My soft skils is a teamwork, a self-study, a polite, a loyal to critics, a responsible, a confident</p>
<p> ==> Let's work together to create something unique!</p>
` );
};

const showSkills = () => {
		const skills = [
				{ name: "Java Script" },
				{ name: "React" },
				{ name: "Redux" },
				{ name: "React Testing Library" },
				{ name: "Jest" },
				{ name: "Eslint" },
				{ name: "BEM" },
				{ name: "Gulp" },
				{ name: "Bootstrap" },
				{ name: "MUI" },
				{ name: "Styled-components" },
				{ name: "CSS" },
				{ name: "SCSS" },
				{ name: "Nodejs" },
				{ name: "Mongodb" },
				{ name: "GitHub" },
				{ name: "GitLab" }
		];
		
		const skillsList = skills.map( item => `<p> > ${ item.name }</p>` ).join( "" );
		
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> > Skills learned in practice</p>
<p> > Practice is the best teacher</p>
<p>--------------------------------------------------------</p>
<p>******************** MY SKILLS **********************</p>
<p>--------------------------------------------------------</p>
${ skillsList }
` );
};

const showWork = () => {
		const workExp = [
				{
						name: "DAN.IT education",
						time: "July 2023 - August 2023",
						post: "Frontend mentor, Intern",
						work: "I provide consultations to students on front-end development"
				},
				{
						name: "DAN.IT education",
						time: "September 2020 - ...",
						post: "Frontend mentor",
						work: "I provide consultations to students on front-end development"
				}
		];
		
		const workList = workExp.map( item =>
			
			`<p>===============================================================</p>
<p> > ${ item.name }</p>
<p> > ${ item.time }</p>
<p> > ${ item.post }</p>
<p> > ${ item.work }</p>
<p>===============================================================</p>` ).join( "" );
		
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> > Not everyone knows, but it turns out</p>
<p> > that you can have the job of your dreams</p>
<p>===============================================================</p>
<p>******************** MY WORK **********************</p>
<p>===============================================================</p>
${ workList }
` );

};
const showEducation = () => {
		const educationExp = [
				{
						time: "2000 - 2005",
						name: "Rivne State Humanities University",
						specialty: "Teacher of informatics and labor training"
				},
				{
						time: "2009 - 2012",
						name: "Lviv National University of Nature Management",
						specialty: "Land manager engineer"
				},
				{
						time: "2022",
						name: "Training GoIT English HTML GO IT",
						specialty: "FrontEnd Developer"
				},
				{
						time: "2022 - 2023",
						name: "DAN.IT education",
						specialty: "FrontEnd Developer"
				}
		];
		
		const educationList = educationExp.map( item =>
			
			`<p>-------------------------------------------------------------</p>
<p> > ${ item.time }</p>
<p> > ${ item.name }</p>
<p> > ${ item.specialty }</p>
<p>-------------------------------------------------------------</p>` ).join( "" );
		
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> > Education is not learning of facts,</p>
<p> > but the training of the mind to thing</p>
<p>--------------------------------------------------------</p>
<p>******************** MY EDUCATION **********************</p>
<p>--------------------------------------------------------</p>
${ educationList }
` );
};

const showProjects = () => {
		const projects = [
				{ name: "TheHam" },
				{ name: "Home" },
				{ name: "Forkio" },
				{ name: "Cards" },
				{ name: "Kanban" },
				{ name: "Green-Lady" },
				{ name: "Mobile-Galaxy" }
		];
		
		const projectsList = projects.map( item => `<p> ${ item.name }</p>` ).join( "" );
		
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p>--------------------------------------------------------</p>
<p>******************** MY PROJECTS **********************</p>
<p>--------------------------------------------------------</p>
<div class="project">
 ${ projectsList }
</div>
<p>Enter 'name project' to jump to the project &#47;</p>
<p>or another command from the terminal &#47;</p>
` );
};

const myProjectShow = ( value ) => {
		setTimeout(() => {
				scrollDown();
		}, 100);
		if ( value === "theham" ) {
				return window.open( "https://yaroslavprystupluk.github.io/theHam-/" );
		} else if ( value === "home" ) {
				return window.open( "https://yaroslavprystupluk.github.io/Home/" );
		} else if ( value === "forkio" ) {
				return window.open( "https://yaroslavprystupluk.github.io/forkio/" );
		} else if ( value === "cards" ) {
				return window.open( "https://yaroslavprystupluk.github.io/Cards/" );
		} else if ( value === "kanban" ) {
				return window.open( "https://yaroslavprystupluk.github.io/kanban/" );
		} else if ( value === "green-lady" ) {
				return window.open( "https://github.com/YaroslavPrystupluk/Green-Lady" );
		} else if ( value === "mobile-galaxy" ) {
				return window.open( "https://mobile-galaxy.onrender.com/" );
		}
};

const showContact = () => {
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> > Wanna contact me :)</p>
<p> > tel: +380 (96) 166-64-16</p>
<p>prystupliuk_y@ukr.net</p>
<p>https://github.com/YaroslavPrystupluk</p>
<p>https://gitlab.com/Iaroslav05</p>
<p>https://www.linkedin.com/in/yaroslav-prystupliuk-7b5154247/</p>
` );
};

const showCV = () => {
		window.open( "https://drive.google.com/file/d/14eIUBYnuZUenOCUqLh4BBoyqkp-7nVtR/view?usp=sharing" );
		
};

const showGit = () => {
		window.open( "https://github.com/YaroslavPrystupluk?tab=repositories" );
};

const clearTerminal = () => {
		document.querySelector( ".context-terminal" ).innerHTML = "";
};


const showExit = () => {
		contextTerminal.insertAdjacentHTML( "beforeend",
			`<p> > Thank You for visiting my website thanks:)</p>
` );
		document.querySelector( ".input-terminal" ).style.opacity = "0";
		document.querySelector( ".input-square" ).style.display = "none";
};

const showError = ( command ) => {
		if ( !myProjectShow( command ) ) {
				contextTerminal.insertAdjacentHTML( "beforeend",
					`<p> '${ command }' is not recognised as a valid command)</p>
<p> use 'help' to know more about commands :</p>
` );
		}
		
};


inputTerminal.addEventListener( "keydown", handlerInput );
document.addEventListener( "input", moveCursor );