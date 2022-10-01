// Global EventListener
function addGlobalEventListener(type, selector, callback) {
	document.body.addEventListener(type, (e) => {
		if (e.target.matches(selector)) callback(e);
	});
}
//Throttle
function throttle(cb, delay = 1000) {
	let shouldWait = false;
	let waitingArgs;
	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shouldWait = false;
		} else {
			cb(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}

		cb(...args);
		shouldWait = true;

		setTimeout(timeoutFunc, delay);
	};
}

function headerSlider(slider) {
	// Selector
	const sliderGallery = slider.querySelector(".slider-gallery");
	const sliderGalleryList = [...slider.querySelectorAll(".slider-gallery li")];
	const sliderGalleryImages = [
		...slider.querySelectorAll(".slider-gallery li img"),
	];
	const dots = slider.querySelectorAll(".dot");

	let isDragging = false,
		startPos = 0,
		currentTranslate = 0,
		prevTranslate = 0,
		dragAnimationId = 0,
		currentIndex = 0;
	let oldActiveImg = document.querySelector(".slider-gallery li img.active");
	let sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
	let sliderOffsetHeight = slider.offsetHeight;

	const updateSliderSize = throttle(() => {
		sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
		sliderGallery.style.transform = `translateX(-${
			currentIndex * sliderWidth
		}px)`;
		sliderOffsetHeight = slider.offsetHeight;
	}, 250);
	window.addEventListener("resize", updateSliderSize);

	// AddEventListener
	const updateSliderPosition = throttle(touchMove, 50);
	sliderGalleryList.forEach((li, index) => {
		const liImage = li.querySelector("img");
		liImage.addEventListener("dragstart", (e) => {
			e.preventDefault();
			return false;
		});

		// Touch events
		li.addEventListener("touchstart", touchStart(index));
		li.addEventListener("touchend", touchEnd);
		li.addEventListener("touchcancel", touchEnd);
		li.addEventListener("touchmove", updateSliderPosition);
		// Mouse events
		li.addEventListener("mousedown", touchStart(index));
		li.addEventListener("mouseup", touchEnd);
		li.addEventListener("mouseleave", touchEnd);
		li.addEventListener("mousemove", updateSliderPosition);
	});

	const btns = slider.querySelectorAll(".slider-container button");
	btns.forEach((btn, index) =>
		btn.addEventListener("click", () => (!index ? slide("prev") : slide()))
	);

	dots.forEach((dot, index) => {
		dot.addEventListener("click", function () {
			if (index !== currentIndex) {
				currentIndex = index;
				setPositionByIndex();
			}
		});
	});
	slider.addEventListener("mouseenter", (e) => {
		cancelAnimationFrame(slideanimationId);
	});
	slider.addEventListener("mouseleave", () => {
		slideanimationId = requestAnimationFrame(SlideRepeater);
	});

	// Slide Function
	function touchStart(index) {
		return function (event) {
			currentIndex = index;
			startPos = getPositionX(event);
			isDragging = true;

			dragAnimationId = requestAnimationFrame(dragAnimation);
			sliderGallery.classList.add("grabbing");
		};
	}
	function touchEnd() {
		isDragging = false;
		cancelAnimationFrame(dragAnimationId);
		const moveBy = currentTranslate - prevTranslate;
		if (moveBy > 0) {
			if (currentIndex == 0 || moveBy < 100) {
				currentTranslate = currentIndex * -sliderWidth;
				prevTranslate = currentTranslate;
				setSliderPosition();
			}
			if (currentIndex !== 0 && moveBy > 100) {
				currentIndex -= 1;
				setPositionByIndex();
			}
		} else if (moveBy < 0) {
			if (currentIndex == sliderGalleryList.length - 1 || moveBy > -100) {
				currentTranslate = currentIndex * -sliderWidth;
				prevTranslate = currentTranslate;
				setSliderPosition();
			}
			if (currentIndex !== sliderGalleryList.length - 1 && moveBy < -100) {
				currentIndex += 1;
				setPositionByIndex();
			}
		}
		sliderGallery.classList.remove("grabbing");
	}
	function touchMove(event) {
		if (isDragging) {
			const currentPosition = getPositionX(event);
			currentTranslate = prevTranslate + currentPosition - startPos;
		}
	}
	function getPositionX(event) {
		return event.type.includes("mouse")
			? event.pageX
			: event.touches[0].clientX;
	}
	function dragAnimation() {
		setSliderPosition();
		if (isDragging) dragAnimationId = requestAnimationFrame(dragAnimation);
	}
	function setSliderPosition() {
		let moveBy = currentTranslate - prevTranslate;
		if (currentIndex == 0 && moveBy > 0) {
			sliderGallery.style.transform = `translateX(${currentTranslate / 10}px)`;
			return;
		}
		if (currentIndex == sliderGalleryList.length - 1 && moveBy < 0) {
			sliderGallery.style.transform = `translateX(${
				currentTranslate - moveBy * 0.9
			}px)`;
			return;
		}
		sliderGallery.style.transform = `translateX(${currentTranslate}px)`;
	}
	function setPositionByIndex() {
		resetCounter();
		currentTranslate = currentIndex * -sliderWidth;
		prevTranslate = currentTranslate;
		setSliderPosition();
		setTimeout(() => slowlyShrinkAnimation(currentIndex), 550);
		SetDotActive(currentIndex);
	}
	function slide(derection = "next") {
		if (derection === "next") {
			currentIndex = (currentIndex + 1) % sliderGalleryList.length;
		} else {
			currentIndex =
				currentIndex === 0 ? sliderGalleryList.length : currentIndex;
			currentIndex = (currentIndex - 1) % sliderGalleryList.length;
		}
		setPositionByIndex();
	}
	function SetDotActive(index) {
		slider.querySelector(".dot.active").classList.remove("active");
		dots[index].classList.add("active");
	}

	// slowly_shrink Animation
	const slowlyShrinkAnimation = function (activeIndex) {
		oldActiveImg = slider.querySelector(".slider-gallery li img.active");
		oldActiveImg?.classList.remove("active");
		sliderGalleryImages[activeIndex]?.classList.add("active");
	};

	// Loop
	let slideCounter = 0;
	let slideanimationId;
	function SlideRepeater() {
		if (window.scrollY <= sliderOffsetHeight) {
			slideCounter++;
			// console.log(slideCounter);
			if (slideCounter % 300 === 0) slide();
		}
		slideanimationId = requestAnimationFrame(SlideRepeater);
	}
	SlideRepeater();
	// Loop control Function
	function resetCounter() {
		slideCounter = 0;
	}
}

function softwareSliderFunction(slider) {
	// Selector
	const sliderGallery = slider.querySelector(".slider-gallery");
	const sliderGalleryList = [
		...slider.querySelectorAll(".slider-gallery .slider-list"),
	];
	const dots = slider.querySelectorAll(".dot");

	let isDragging = false,
		startPos = 0,
		currentTranslate = 0,
		prevTranslate = 0,
		dragAnimationId = 0,
		currentIndex = 0;
	let sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
	let sliderOffsetHeight = slider.getBoundingClientRect().top;

	const updateSliderSize = throttle(() => {
		sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
		sliderGallery.style.transform = `translateX(-${
			currentIndex * sliderWidth
		}px)`;
		sliderOffsetHeight = slider.getBoundingClientRect().top;
	}, 250);
	window.addEventListener("resize", updateSliderSize);

	// AddEventListener
	const updateSliderPosition = throttle(touchMove, 50);
	sliderGalleryList.forEach((li, index) => {
		const liImage = li.querySelector("img");
		liImage.addEventListener("dragstart", (e) => {
			e.preventDefault();
			return false;
		});

		// Touch events
		li.addEventListener("touchstart", touchStart(index), { passive: true });
		li.addEventListener("touchend", touchEnd, { passive: true });
		li.addEventListener("touchcancel", touchEnd, { passive: true });
		li.addEventListener("touchmove", updateSliderPosition, { passive: true });
		// Mouse events
		li.addEventListener("mousedown", touchStart(index));
		li.addEventListener("mouseup", touchEnd);
		li.addEventListener("mouseleave", touchEnd);
		li.addEventListener("mousemove", updateSliderPosition);
	});

	const btns = slider.querySelectorAll(".slider-container button");
	btns.forEach((btn, index) =>
		btn.addEventListener("click", () => (!index ? slide("prev") : slide()))
	);

	dots.forEach((dot, index) => {
		dot.addEventListener("click", function () {
			if (index !== currentIndex) {
				currentIndex = index;
				setPositionByIndex();
			}
		});
	});
	slider.addEventListener("mouseenter", (e) => {
		cancelAnimationFrame(slideanimationId);
	});
	slider.addEventListener("mouseleave", () => {
		slideanimationId = requestAnimationFrame(SlideRepeater);
	});

	// Slide Function
	function touchStart(index) {
		return function (event) {
			currentIndex = index;
			startPos = getPositionX(event);
			isDragging = true;

			dragAnimationId = requestAnimationFrame(dragAnimation);
			sliderGallery.classList.add("grabbing");
		};
	}
	function touchEnd() {
		isDragging = false;
		cancelAnimationFrame(dragAnimationId);
		const moveBy = currentTranslate - prevTranslate;
		if (moveBy > 0) {
			if (currentIndex == 0 || moveBy < 100) {
				currentTranslate = currentIndex * -sliderWidth;
				prevTranslate = currentTranslate;
				setSliderPosition();
			}
			if (currentIndex !== 0 && moveBy > 100) {
				currentIndex -= 1;
				setPositionByIndex();
			}
		} else if (moveBy < 0) {
			if (currentIndex == sliderGalleryList.length - 1 || moveBy > -100) {
				currentTranslate = currentIndex * -sliderWidth;
				prevTranslate = currentTranslate;
				setSliderPosition();
			}
			if (currentIndex !== sliderGalleryList.length - 1 && moveBy < -100) {
				currentIndex += 1;
				setPositionByIndex();
			}
		}
		sliderGallery.classList.remove("grabbing");
	}
	function touchMove(event) {
		if (isDragging) {
			const currentPosition = getPositionX(event);
			currentTranslate = prevTranslate + currentPosition - startPos;
		}
	}
	function getPositionX(event) {
		return event.type.includes("mouse")
			? event.pageX
			: event.touches[0].clientX;
	}
	function dragAnimation() {
		setSliderPosition();
		if (isDragging) dragAnimationId = requestAnimationFrame(dragAnimation);
	}
	function setSliderPosition() {
		let moveBy = currentTranslate - prevTranslate;
		if (currentIndex == 0 && moveBy > 0) {
			sliderGallery.style.transform = `translateX(${currentTranslate / 10}px)`;
			return;
		}
		if (currentIndex == sliderGalleryList.length - 1 && moveBy < 0) {
			sliderGallery.style.transform = `translateX(${
				currentTranslate - moveBy * 0.9
			}px)`;
			return;
		}
		sliderGallery.style.transform = `translateX(${currentTranslate}px)`;
	}
	function setPositionByIndex() {
		resetCounter();
		currentTranslate = currentIndex * -sliderWidth;
		prevTranslate = currentTranslate;
		setSliderPosition();
		SetDotActive(currentIndex);
	}
	function slide(derection = "next") {
		if (derection === "next") {
			currentIndex = (currentIndex + 1) % sliderGalleryList.length;
		} else {
			currentIndex =
				currentIndex === 0 ? sliderGalleryList.length : currentIndex;
			currentIndex = (currentIndex - 1) % sliderGalleryList.length;
		}
		setPositionByIndex();
	}
	function SetDotActive(index) {
		slider.querySelector(".dot.active").classList.remove("active");
		dots[index].classList.add("active");
	}

	// Loop
	let slideCounter = 0;
	let slideanimationId;
	function SlideRepeater() {
		if (window.scrollY >= sliderOffsetHeight) {
			slideCounter++;
			// console.log(slideCounter);
			if (slideCounter % 300 === 0) slide();
		}
		slideanimationId = requestAnimationFrame(SlideRepeater);
	}
	SlideRepeater();
	// Loop control Function
	function resetCounter() {
		slideCounter = 0;
	}
}

export {
	addGlobalEventListener,
	throttle,
	headerSlider,
	softwareSliderFunction,
};
