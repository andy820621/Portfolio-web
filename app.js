import {
	addGlobalEventListener,
	throttle,
	headerSlider,
	softwareSliderFunction,
} from "./slider.js";

const dataJpgs = [...document.querySelectorAll("img[data-jpg]")];
// Test webp work or not
function testWebP() {
	return new Promise((res) => {
		const webP = new Image();
		webP.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		webP.onload = webP.onerror = () => {
			res(webP.height === 2);
		};
	});
}
testWebP()
	.then((hasWebP) => {
		dataJpgs.forEach((dataJpg) => {
			// Change to use .Jpg
			if (!hasWebP) dataJpg.setAttribute("data-webp", dataJpg.dataset.jpg);
		});
	})
	.then(() => {
		// Change image src from placeholder to original img
		dataJpgs.forEach((dataJpg) => {
			let imageLarges = new Image();
			imageLarges.src = dataJpg.dataset.webp;
			imageLarges.onload = function () {
				dataJpg.setAttribute("src", dataJpg.dataset.webp);
			};
		});
	});

// Typewritter Design
function textAnimation() {
	gsap.defaults({
		duration: 1,
		ease: "none",
		repeat: 1,
		repeatDelay: 1,
		delay: 0.24,
	});
	gsap
		.timeline({ repeat: -1 })
		.to(".typewriter", {
			text: "Hsieh Yao-tsu ",
			yoyo: true,
		})
		.to(".typewriter", {
			text: "Web Designer ",
			yoyo: true,
		})
		.to(".typewriter", {
			text: "Frontend Developer ",
			yoyo: true,
		})
		.to(".typewriter", {
			text: "SutterBug ",
			yoyo: true,
		});
}
textAnimation();
document
	.querySelector(".typewriter")
	.addEventListener("animationend", textAnimation);

// Disable content menu
window.oncontextmenu = function (event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
};
// Header Slider Animation
const slider = document.querySelector("header .slider-container");
headerSlider(slider);
// Software Slider Animation
const softwareSlider = document.querySelector(".software .slider-container");
softwareSliderFunction(softwareSlider);

// Adapt requestAnimationFrame to each browser
(function () {
	let lastTime = 0;
	let vendors = ["ms", "moz", "webkit", "o"];
	for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
		window.cancelAnimationFrame =
			window[vendors[x] + "CancelAnimationFrame"] ||
			window[vendors[x] + "CancelRequestAnimationFrame"];
	}
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			let currTime = new Date().getTime();
			let timeToCall = Math.max(0, 16 - (currTime - lastTime));
			let id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
})();

// Burger
const nav = document.querySelector("nav");
const burger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");
const navLists = document.querySelectorAll(".navMenu li");
// ClickBurger function
const clickburger = function () {
	tabindexChange();

	// Toogle Nav
	navMenu.classList.toggle("active");

	// Burger Animation
	nav.classList.toggle("cross");

	// Animate Links
	navLists.forEach((li, index) => {
		li.style.animation = li.style.animation
			? ""
			: `navMenuFade 0.5s ease forwards ${index / 7 + 0.3}s`;
	});

	ArilExpanded(navMenu);

	if (nav.classList.contains("cross")) {
		nav.addEventListener("click", function (e) {
			e.stopPropagation();
		});
		document.querySelector("body>div").addEventListener("click", clickMenuLink);
	}
};
function clickMenuLink() {
	ArilExpandedFalse(navMenu);
	tabindexChange();

	// Close burger menu
	navMenu.classList.remove("active");
	nav.classList.remove("cross");
	// Reset navMenu animate style
	navLists.forEach((li) => {
		li.style.animation = null;
	});
}

// Tabindex
const tabindexs = document.querySelectorAll("[tabindex='0']");
function tabindexChange() {
	tabindexs.forEach((tabindex) => {
		let tabindexValue = tabindex.getAttribute("tabindex");
		if (tabindexValue == "0") {
			tabindex.setAttribute("tabindex", "-1");
		} else {
			tabindex.setAttribute("tabindex", "0");
		}
	});
}

// Aria-expanded function
function ArilExpanded(e) {
	e.setAttribute(
		"aria-expanded",
		e.getAttribute("aria-expanded") == "true" ? "false" : "true"
	);
}
function ArilExpandedFalse(e) {
	e.setAttribute("aria-expanded", false);
}

// EventListener
burger.addEventListener("click", function () {
	clickburger();
});
window.addEventListener("keydown", (e) => {
	if (lightboxContainer.classList.contains("active")) return;
	if (e.key?.includes("v") || e.key?.includes("x")) {
		e.preventDefault();
		clickburger();
	}
});
const menulinks = document.querySelectorAll(".navMenu ul li a");
menulinks.forEach((li) => {
	li.addEventListener("click", (e) => {
		clickMenuLink();
	});
});

//  Btn Hover animattion.
const btns = document.querySelectorAll(".btn_primary");
btns.forEach((btn) => {
	btn.addEventListener("mousemove", function (e) {
		const x =
			e.pageX -
			(parseInt(btn.getBoundingClientRect().left) + Math.round(window.scrollX));
		const y =
			e.pageY -
			(parseInt(btn.getBoundingClientRect().top) + Math.round(window.scrollY));

		btn.style.setProperty("--x", x + "px");
		btn.style.setProperty("--y", y + "px");
	});
});

// Menu Onclick to Scroll
const smoothScroll = function (tarGet, duration) {
	// const targetPosition = tarGet.getBoundingClientRect().top;
	const targetPosition = tarGet.offsetTop;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	let startTime = null;

	const animation = function (currentTime) {
		if (startTime === null) startTime = currentTime;
		let timeElapsed = currentTime - startTime;
		let run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	};

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t + b;
		t--;
		return (-c / 2) * (t * (t - 2) - 1) + b;
	}

	requestAnimationFrame(animation);
};
addGlobalEventListener("click", "[data-scroll]", (e) => {
	if (getComputedStyle(document.body).scrollBehavior === "smooth") return;

	e.preventDefault();
	let tarGet = document.getElementById(e.target.dataset.scroll);
	smoothScroll(tarGet, 500);
});

//Window scroll events
const sections = [...document.querySelectorAll("div[id]:not(.navMenu)")];

const updateNavClass = throttle(() => {
	// Navbar color change when scroll
	if (window.scrollY <= 24) {
		nav.classList.remove("scrolled");
	} else {
		nav.classList.add("scrolled");
	}
}, 240);
window.addEventListener("scroll", updateNavClass);

// Menu Active when scroll to the section
const sectionsOptions = {
	rootMargin: "-45% 0px -55%",
};

const sectionsObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		document
			.querySelector(`.navMenu a[data-scroll ="${entry.target.id}"]`)
			.parentElement.classList.toggle("active", entry.isIntersecting);
	});
}, sectionsOptions);

sections.forEach((section) => {
	sectionsObserver.observe(section);
});

// Fade and Scroll
const fadeIns = document.querySelectorAll(".fade-in");
const fromLefts = document.querySelectorAll(".from-left");
const fromRights = document.querySelectorAll(".from-right");

const appearOptions = {
	threshold: 0,
	rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
	entries,
	appearOnScroll
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		} else {
			entry.target.classList.add("appear");
			appearOnScroll.unobserve(entry.target);
		}
	});
},
appearOptions);

fadeIns.forEach((fadeIn) => {
	appearOnScroll.observe(fadeIn);
});
fromLefts.forEach((fromLeft) => {
	appearOnScroll.observe(fromLeft);
});
fromRights.forEach((fromRight) => {
	appearOnScroll.observe(fromRight);
});

// Workmenu
const WorksSort = document.querySelector(".works-sort").children;
const WorkContent = document.querySelector(".work-content");
const WorksFigures = document
	.querySelector(".work-content")
	.querySelectorAll("figure");
// const activeFigures = () => WorkContent.querySelectorAll(".active");

for (let i = 0; i < WorksSort.length; i++) {
	WorksSort[i].addEventListener("click", (e) => {
		document.querySelector(".works-sort .current").classList.remove("current");
		e.target.classList.add("current");
		let currentData = e.target.getAttribute("data-current");
		// Set Active Figures
		if (currentData === "all") {
			WorksFigures.forEach((figure) => {
				figure.classList.add("active");
				figure.classList.remove("delete");
			});
		} else {
			WorksFigures.forEach((figure) => {
				figure.classList.toggle(
					"active",
					figure.classList.contains(currentData)
				);
				figure.classList.toggle(
					"delete",
					!figure.classList.contains(currentData)
				);
			});
		}

		// ser Position
		const grid_number = getGridNumber();
		serFigurePosition(grid_number);
	});
}

// page first load
const gameFigures = document.querySelectorAll("figure.game");
// hide game figures when in mobile
setGameActiveOrNot();
function setGameActiveOrNot() {
	const nowGridNumber = getGridNumber();
	if (nowGridNumber !== 3 || nowGridNumber !== 2) return;
	gameFigures.forEach((gameFigure) => {
		gameFigure.classList.toggle("active", nowGridNumber === 3);
		gameFigure.classList.toggle("delete", nowGridNumber === 2);
	});
}
// get grid number
let now_grid_number = getGridNumber();
serFigurePosition(now_grid_number);

// Function
const updateThrottleserFigurePosition = throttle(serFigurePosition, 240);
function serFigurePosition(grid_number) {
	const activeFigures = WorkContent.querySelectorAll(".active");

	const grid_row_number = Math.ceil(activeFigures.length / grid_number);
	WorkContent.style.setProperty("--grid-rows", grid_row_number);

	for (let i = 0; i < activeFigures.length; i++) {
		const x = i % grid_number;
		const y = Math.floor(i / grid_number);
		activeFigures[i].style.setProperty("--x", x);
		activeFigures[i].style.setProperty("--y", y);
	}
}
function getGridNumber() {
	const vw = window.innerWidth;

	if (vw >= 1380) {
		return 5;
	} else if (vw >= 1023) {
		return 4;
	} else if (vw >= 800) {
		return 3;
	} else if (vw >= 591) {
		return 2;
	} else {
		return 1;
	}
}
// Judge how much window width change and if revoke function
window.addEventListener("resize", () => {
	const new_grid_number = getGridNumber();
	if (new_grid_number === now_grid_number) return;
	// set now_grid_number
	now_grid_number = new_grid_number;
	// hide game figures when in mobile
	setGameActiveOrNot();
	// reset Position
	updateThrottleserFigurePosition(new_grid_number);
});

// LightBox query selectors
const work = document.querySelector("#work");
const lightboxEnabled = document.querySelectorAll(".lightbox-enabled");
const lightboxEnabledLinks = document.querySelectorAll(".lightbox-enabled a");
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxImgWrapper = document.querySelector(".lightbox-image-wrapper");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxTextRight = document.querySelector(".lightbox-text-right");

const lightboxBtns = document.querySelectorAll(".lightbox-btn");
const lightboxBtnLeft = document.querySelector(".lightbox-btn.left");
const lightboxBtnRight = document.querySelector(".lightbox-btn.right");

const scrollbarWidth =
	lightboxContainer.clientWidth - document.body.offsetWidth;

// LightBox function
const showLightBox = function () {
	lightboxContainer.classList.add("active");
	document.body.style.overflow = "clip";
	work.style.paddingRight = scrollbarWidth + "px";
	nav.style.paddingRight = scrollbarWidth + "px";
	sections[2].style.paddingRight = scrollbarWidth + "px";
	sections[4].style.paddingRight = scrollbarWidth + "px";
};
const hideLightBox = function () {
	lightboxContainer.classList.remove("active");
	document.body.style.overflow = "auto";
	work.style.paddingRight = "0";
	nav.style.paddingRight = "0";
	sections[2].style.paddingRight = "0";
	sections[4].style.paddingRight = "0";
};
let x;
let galleryImg;
const setActiveImage = function (x) {
	// Ensure that there is no residual image
	if (lightboxImg.src) {
		lightboxImg.src = "";
	}
	// Set gallery images & text
	lightboxImg.src = galleryImg[x].dataset.imagesrc;
	lightboxTextRight.innerHTML = `${x + 1} / ${galleryImg.length}`;
	// Make sure both Btn is working
	removeBtnInavtiveClass();
	// Through hidden buttons, make users know now in first or end image of the gallery
	if (galleryImg.length === 1) {
		lightboxBtnLeft.classList.add("inactive");
		lightboxBtnRight.classList.add("inactive");
		return;
	}
	switch (x) {
		case 0:
			lightboxBtnLeft.classList.add("inactive");
			break;
		case galleryImg.length - 1:
			lightboxBtnRight.classList.add("inactive");
			break;
		default:
			removeBtnInavtiveClass();
	}
};
const getGalleryImg = function (i) {
	galleryImg = lightboxEnabled[i].getElementsByTagName("span");
};
const removeBtnInavtiveClass = function () {
	lightboxBtns.forEach((btn) => {
		btn.classList.remove("inactive");
	});
};
const removeBtnAnimation = function () {
	lightboxBtns.forEach((btn) => {
		setTimeout(() => {
			btn.blur();
		}, 200);
	});
};

const transitionSlidesLeft = function () {
	lightboxBtnLeft.focus();
	if (x === 0) {
		setActiveImage((x = galleryImg.length - 1));
	} else {
		setActiveImage((x = x - 1));
	}
	removeBtnAnimation();
};
const transitionSlidesRight = function () {
	lightboxBtnRight.focus();
	if (x === galleryImg.length - 1) {
		setActiveImage((x = 0));
	} else {
		setActiveImage((x = x + 1));
	}
	removeBtnAnimation();
};
const transitionSlideHandler = function (moveItem) {
	if (moveItem.includes("left")) {
		transitionSlidesLeft();
	} else if (moveItem.includes("right")) {
		transitionSlidesRight();
	} else if (moveItem.includes("x")) {
		hideLightBox();
	}
};

// event listeners
lightboxEnabled.forEach((item, index) => {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		getGalleryImg(index);
		showLightBox();
		setActiveImage((x = 0));
	});
});
lightboxEnabledLinks.forEach((item) =>
	item.addEventListener("click", (e) => {
		e.stopPropagation();
	})
);

let half = document.body.offsetWidth / 2;
const updateHalfValue = throttle(
	() => (half = document.body.offsetWidth / 2),
	500
);
window.addEventListener("resize", function () {
	if (!lightboxContainer.classList.contains("active")) return;
	updateHalfValue();
});
lightboxContainer.addEventListener("click", function () {
	hideLightBox();
});
lightboxImgWrapper.addEventListener("click", function (e) {
	e.stopPropagation();
	if (e.clientX >= half) {
		transitionSlidesRight();
	} else {
		transitionSlidesLeft();
	}
});
lightboxImgWrapper.addEventListener("mousemove", function (e) {
	if (galleryImg.length === 1)
		return (lightboxImgWrapper.style.cursor = "default");
	if (e.clientX >= half) {
		lightboxImgWrapper.style.cursor = "url('svg/right.svg'), auto";
	} else {
		lightboxImgWrapper.style.cursor = "url('svg/left.svg'), auto";
	}
});

lightboxBtns.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		e.stopPropagation();
		transitionSlideHandler(e.currentTarget.id);
	});
});

window.addEventListener("keydown", (e) => {
	if (!lightboxContainer.classList.contains("active")) return;
	if (e.key.includes("Left") || e.key.includes("Right")) {
		e.preventDefault();
		transitionSlideHandler(e.key.toLowerCase());
	}
});

// Form & subItems selectors
const form_elements = [...document.querySelectorAll(".form-data")];
const form = document.querySelector("form");
const formBtn = document.querySelector("form button");
const name = document.querySelector("input#name");
const email = document.querySelector("input#email");
const message = document.querySelector("textarea#message");

// Style input background-color when it have value or not && hover
form_elements.forEach((form_element) => {
	form_element.addEventListener("blur", (e) => {
		if (e.target.value.trim() === "") {
			e.target.style = `background-color: var(--clr-primary-transparent);`;
		} else {
			e.target.style = `background-color: var(--clr-bgGrey);`;
		}
	});
	form_element.addEventListener("focus", function () {
		form_element.style = `background-color: var(--clr-bgGrey);`;
	});
});

// Check input
name.addEventListener("input", (e) =>
	checkIfEmpty(e.target, "Name is Required")
);
email.addEventListener("input", (e) =>
	checkEmailIfEmpty(e.target, "Email cannot be blank", "Email is not valid")
);
message.addEventListener("input", (e) =>
	checkIfEmpty(e.target, "Message is Required")
);

//Prevent refresh page after click submit button
let checkErrorIfOk = false;
formBtn.addEventListener("click", (e) => {
	checkInputs();
	if (!checkErrorIfOk) return;
	save_data();
	return false;
});
// save data from input items and prepare to send to server
function save_data() {
	let data = new FormData();
	for (let i = 0; i < form_elements.length; i++) {
		data.append(form_elements[i].name, form_elements[i].value);
	}
	formBtn.disabled = true;

	let xhttp = new XMLHttpRequest();
	xhttp.open("POST", "contact.php", true);
	xhttp.onload = function () {
		if (this.status == 200) {
			formBtn.disabled = false;
			form.reset();

			document.querySelector(".alert").classList.add("active");

			setTimeout(
				() => document.querySelector(".alert").classList.remove("active"),
				2000
			);
		} else if (this.status == 405) {
			console.log(`Method Not Allowed`);
		}
	};
	xhttp.send(data);
}

// Functions to Check inputs
function checkInputs() {
	// get the values from the inputs
	checkIfEmpty(name, "Name is Required");
	checkEmailIfEmpty(email, "Email cannot be blank", "Email is not valid");
	checkIfEmpty(message, "Message is Required");
	return false;
}
function checkIfEmpty(target, alertText) {
	if (target.value.trim() === "") {
		setErrorFor(target, alertText);
	} else {
		setSuccessFor(target);
	}
}
function checkEmailIfEmpty(target, alertEmpty, alertValid) {
	if (target.value.trim() === "") {
		setErrorFor(target, alertEmpty);
	} else if (!isEmail(target.value.trim())) {
		setErrorFor(target, alertValid);
	} else {
		setSuccessFor(target);
	}
}

// Function sto set Alert Error text || show OK style
function setErrorFor(input, text) {
	const errorContiner = input.nextElementSibling;
	// add error text inside errorContiner
	errorContiner.innerText = text;
	// add error class
	input.parentElement.classList.remove("success");
	input.parentElement.classList.add("error");
	checkErrorIfOk = false;
}
function setSuccessFor(input) {
	const errorContiner = input.nextElementSibling;
	// Clear error text inside errorContiner
	errorContiner.innerText = "";
	// add success class
	input.parentElement.classList.remove("error");
	input.parentElement.classList.add("success");
	checkErrorIfOk = true;
}
// Check email's Format
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
}
