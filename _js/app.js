document.addEventListener("DOMContentLoaded", function () {
	const dataJpgs = document.querySelectorAll("img[data-jpg]");
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
	testWebP().then((hasWebP) => {
		if (hasWebP == false) {
			// Change to use .Jpg
			dataJpgs.forEach((dataJpg) => {
				dataJpg.setAttribute(dataJpg.dataset.webp, dataJpg.dataset.jpg);

				let imageLarges = new Image();
				imageLarges.src = dataJpg.dataset.webp;
			});
		}
	});
	// Change image src from placeholder to original img
	dataJpgs.forEach((dataJpg) => {
		let imageLarges = new Image();
		imageLarges.src = dataJpg.dataset.webp;
		imageLarges.onload = function () {
			dataJpg.setAttribute("src", dataJpg.dataset.webp);
		};
	});

	// Slider Animation
	// Selector
	const slider = document.querySelector(".slider-container");
	const sliderGallery = document.querySelector(".slider-gallery");
	const sliderGalleryList = document.querySelectorAll(".slider-gallery li");
	const sliderGalleryImages = document.querySelectorAll(
		".slider-gallery li img"
	);
	const sliderPrevBtn = document.querySelector(".prev");
	const sliderNextBtn = document.querySelector(".next");
	const dots = document.querySelectorAll(".dot");

	function slideFunction() {
		// If no slider gallery section, Return.
		if (!slider) {
			return;
		}

		let currentIndex = 0;
		let sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
		let sliderOffsetHeight = slider.offsetHeight;

		window.addEventListener("resize", function () {
			sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
			sliderGallery.style.marginLeft = -currentIndex * sliderWidth + "px";

			sliderOffsetHeight = slider.offsetHeight;
		});

		// Slide Function
		function slide(derection = "next") {
			if (derection === "next") {
				currentIndex = (currentIndex + 1) % sliderGalleryList.length;
			} else {
				currentIndex =
					currentIndex === 0 ? sliderGalleryList.length : currentIndex;
				currentIndex = (currentIndex - 1) % sliderGalleryList.length;
			}
			sliderGallery.style.marginLeft = -currentIndex * sliderWidth + "px";
			slowlyShrinkAnimation(currentIndex);
			SetDotActive(currentIndex);
		}
		function SetDotActive(index) {
			document.querySelector(".dot.active").classList.remove("active");
			dots[index].classList.add("active");
		}

		// slowly_shrink Animation
		const slowlyShrinkAnimation = function (activeIndex) {
			let oldActive = document.querySelector(".slider-gallery li img.active");
			setTimeout(() => oldActive.classList.remove("active"), 750);
			sliderGalleryImages[activeIndex].classList.add("active");
		};

		// Loop
		let slideCounter = 0;
		function SlideRepeater() {
			if (window.scrollY <= sliderOffsetHeight) {
				slideCounter++;
			}
			if (slideCounter % 300 === 0) {
				// Slidenext();
				slide();
			}

			slideanimationId = requestAnimationFrame(SlideRepeater);
		}
		SlideRepeater();
		// Loop control Function
		function resetCounter() {
			slideCounter = 0;
		}

		// Adapt requestAnimationFrame to each browser
		(function () {
			let lastTime = 0;
			let vendors = ["ms", "moz", "webkit", "o"];
			for (
				let x = 0;
				x < vendors.length && !window.requestAnimationFrame;
				++x
			) {
				window.requestAnimationFrame =
					window[vendors[x] + "RequestAnimationFrame"];
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

		// AddEventListener
		sliderPrevBtn.addEventListener("click", function () {
			resetCounter();
			slide("prev");
		});
		sliderNextBtn.addEventListener("click", function () {
			resetCounter();
			slide();
		});
		dots.forEach(function dot(e, index) {
			e.addEventListener("click", function () {
				if (index !== currentIndex) {
					currentIndex = index;
					resetCounter();
					sliderGallery.style.marginLeft = -currentIndex * sliderWidth + "px";
					slowlyShrinkAnimation(currentIndex);
					SetDotActive(currentIndex);
				}
			});
		});
		slider.addEventListener("mouseover", (e) => {
			cancelAnimationFrame(slideanimationId);
		});
		slider.addEventListener("mouseout", () => {
			slideanimationId = requestAnimationFrame(SlideRepeater);
		});
	}
	slideFunction();

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
			document.querySelector("body>div").addEventListener("click", function () {
				ArilExpandedFalse(navMenu);
				tabindexChange();

				// Close burger menu
				navMenu.classList.remove("active");
				nav.classList.remove("cross");
				// Reset navMenu animate style
				navLists.forEach((li) => {
					li.style.animation = null;
				});
			});
		}
	};

	// Tabindex
	const tabindexs = document.querySelectorAll("[tabindex]:not([tabindex='0'])");
	const tabindexChange = function () {
		tabindexs.forEach((tabindex) => {
			let tabindexValue = tabindex.getAttribute("tabindex");
			if (tabindexValue == "") {
				tabindex.setAttribute("tabindex", "-1");
			} else {
				tabindex.setAttribute("tabindex", "");
			}
		});
	};
	const tabindexToPlus = function () {
		tabindexs.forEach((tabindex) => {
			tabindex.setAttribute("tabindex", "");
		});
	};

	// Aria-expanded function
	const ArilExpanded = function (e) {
		e.setAttribute(
			"aria-expanded",
			e.getAttribute("aria-expanded") == "true" ? "false" : "true"
		);
	};
	const ArilExpandedFalse = function (e) {
		e.setAttribute("aria-expanded", false);
	};

	// EventListener
	burger.addEventListener("click", function () {
		clickburger();
	});
	window.addEventListener("keydown", (e) => {
		if (lightboxContainer.classList.contains("active")) return;
		if (e.key.includes("v") || e.key.includes("x")) {
			e.preventDefault();
			clickburger();
		}
	});

	//  Btn Hover animattion.
	const btns = document.querySelectorAll(".btn_primary");
	btns.forEach((btn) => {
		btn.addEventListener("mousemove", function (e) {
			const x =
				e.pageX -
				(parseInt(btn.getBoundingClientRect().left) +
					Math.round(window.scrollX));
			const y =
				e.pageY -
				(parseInt(btn.getBoundingClientRect().top) +
					Math.round(window.scrollY));

			btn.style.setProperty("--x", x + "px");
			btn.style.setProperty("--y", y + "px");
		});
	});

	// Menu Onclick to Scroll
	const menulinks = document.querySelectorAll(".navMenu ul li a");
	const aboutA = document.querySelector("header>div a.btn");

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

	aboutA.addEventListener("click", function (e) {
		e.preventDefault();
		const about = document.querySelector("#about");
		smoothScroll(about, 500);
	});
	menulinks.forEach((menulink) => {
		menulink.addEventListener("click", function (e) {
			ArilExpandedFalse(navMenu);
			tabindexToPlus();

			if (nav.classList.contains("cross")) {
				navMenu.classList.remove("active");
				nav.classList.remove("cross");
			}
			// Reset navMenu animate style
			navLists.forEach((li) => {
				li.style.animation = null;
			});

			if (getComputedStyle(document.body).scrollBehavior === "smooth") return;
			e.preventDefault();
			// Add smoothScroll function
			let tarGet = document.getElementById(e.target.dataset.link);
			// console.log(tarGet);
			smoothScroll(tarGet, 500);
		});
	});

	//Window scroll events
	const sections = [...document.querySelectorAll("div[id]:not(.navMenu)")];

	window.addEventListener("scroll", function () {
		// Navbar color change when scroll
		if (window.scrollY > 0) {
			nav.classList.add("scrolled");
		} else {
			nav.classList.remove("scrolled");
		}
	});
	// Menu Active when scroll to the section
	const sectionsOptions = {
		rootMargin: "-45% 0px -55%",
	};

	const sectionsObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			document
				.querySelector(`.navMenu a[data-link ="${entry.target.id}"]`)
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
	const WorksFigure = document
		.querySelector(".works")
		.querySelectorAll("figure");

	for (let i = 0; i < WorksSort.length; i++) {
		WorksSort[i].addEventListener("click", function () {
			for (let j = 0; j < WorksSort.length; j++) {
				WorksSort[j].classList.remove("current");
			}
			this.classList.add("current");
			let currentData = this.getAttribute("data-current");

			for (let k = 0; k < WorksFigure.length; k++) {
				WorksFigure[k].classList.remove("active");
				WorksFigure[k].classList.add("delete");

				if (
					WorksFigure[k].classList.contains(currentData) ||
					currentData == "all"
				) {
					WorksFigure[k].classList.remove("delete");
					WorksFigure[k].classList.add("active");
				}
			}
		});
	}

	// LightBox query selectors
	const work = document.querySelector("#work");
	const lightboxEnabled = document.querySelectorAll(".lightbox-enabled");
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
	lightboxEnabled.forEach((e, index) => {
		e.addEventListener("click", function (el) {
			el.preventDefault();
			getGalleryImg(index);
			showLightBox();
			setActiveImage((x = 0));
		});
	});

	let half = document.body.offsetWidth / 2;
	window.addEventListener("resize", function () {
		if (!lightboxContainer.classList.contains("active")) return;
		half = document.body.offsetWidth / 2;
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
		if (e.clientX >= half) {
			lightboxImgWrapper.style.cursor = "url('_svg/right.svg'), auto";
		} else {
			lightboxImgWrapper.style.cursor = "url('_svg/left.svg'), auto";
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

	// Keep input background if it have value || hover event
	const form_elements = [...document.querySelectorAll(".form-data")];
	const form = document.querySelector("form");
	const formBtn = document.querySelector("form button");
	const name = document.querySelector("input#name");
	const email = document.querySelector("input#email");
	const message = document.querySelector("textarea#message");

	name.addEventListener("blur", (e) => {
		if (e.target.value.trim() === "") {
			setErrorFor(e.target, "Name is Required");
			e.target.style = `background-color: var(--clr-primary-transparent);`;
		} else {
			setSuccessFor(e.target);
			e.target.style = `background-color: var(--clr-bgGrey);`;
		}
	});
	email.addEventListener("blur", (e) => {
		if (e.target.value.trim() === "") {
			setErrorFor(e.target, "Email cannot be blank");
			e.target.style = `background-color: var(--clr-primary-transparent);`;
		} else if (!isEmail(e.target.value.trim())) {
			setErrorFor(e.target, "Email is not valid");
			e.target.style = `background-color: var(--clr-bgGrey);`;
		} else {
			setSuccessFor(e.target);
			e.target.style = `background-color: var(--clr-bgGrey);`;
		}
	});
	message.addEventListener("blur", (e) => {
		if (e.target.value.trim() === "") {
			setErrorFor(e.target, "Name is Required");
			e.target.style = `background-color: var(--clr-primary-transparent);`;
		} else {
			setSuccessFor(e.target);
			e.target.style = `background-color: var(--clr-bgGrey);`;
		}
	});
	form_elements.forEach((form_element) => {
		form_element.addEventListener("focus", function () {
			form_element.style = `background-color: var(--clr-bgGrey);`;
		});
	});

	//Prevent refresh after clicl submit button
	let checkErrorIfOk = false;

	formBtn.addEventListener("click", (e) => {
		checkInputs();
		if (!checkErrorIfOk) return;
		save_data();
		return false;
	});
	function save_data() {
		let data = new FormData();
		for (let i = 0; i < form_elements.length; i++) {
			data.append(form_elements[i].name, form_elements[i].value);
		}
		formBtn.disabled = true;

		let xhttp = new XMLHttpRequest();
		xhttp.open("POST", "contact.php", true);
		xhttp.send(data);
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				formBtn.disabled = false;
				form.reset();

				document.querySelector(".alert").classList.add("active");

				setTimeout(
					() => document.querySelector(".alert").classList.remove("active"),
					2000
				);
			}
		};
	}

	function checkInputs() {
		// get the values from the inputs
		if (name.value.trim() === "") {
			// show error & add error class
			setErrorFor(name, "Name is Required");
		} else {
			// add success class
			setSuccessFor(name);
		}

		if (email.value.trim() === "") {
			setErrorFor(email, "Email cannot be blank");
		} else if (!isEmail(email.value.trim())) {
			setErrorFor(email, "Email is not valid");
		} else {
			setSuccessFor(email);
		}

		if (message.value.trim() === "") {
			setErrorFor(message, "Message cannot be blank");
		} else {
			setSuccessFor(message);
		}
		return false;
	}
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
	function isEmail(email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	}
});
