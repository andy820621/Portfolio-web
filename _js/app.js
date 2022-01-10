document.addEventListener('DOMContentLoaded', function() {
    // Test webp work or not
    function testWebP() {
        return new Promise(res => {
            const webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = webP.onerror = () => {
                res(webP.height === 2);
            };        
        });
    }
    testWebP().then(hasWebP => {
        if(hasWebP == false) {
            // Change to use .Jpg
            // document.body.classList.add('no-webp');
            const dataJpgs = document.querySelectorAll('img[data-jpg]');
            dataJpgs.forEach(dataJpg => {
                dataJpg.setAttribute('src', dataJpg.dataset.jpg);
            });
        }
    });
    

    // Slider Animation
    // Selector
    const slider = document.querySelector('.slider-container');
    const sliderGallery = document.querySelector('.slider-gallery');
    const sliderGalleryList = document.querySelectorAll('.slider-gallery li');
    const sliderGalleryImage = document.querySelectorAll('.slider-gallery li img');
    const sliderPrevBtn = document.querySelector(".prev");
    const sliderNextBtn = document.querySelector(".next");
    const dots = document.querySelectorAll('.dot');
    
    function slideFunction() {
        // If no slider gallery section, Return.
        if(!slider) { return; }

        let activeImg = 1;
        let sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
        
        window.addEventListener("resize", function() {
            sliderWidth = sliderGalleryList[0].getBoundingClientRect().width;
            sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
        });
        
        // Function
        const Slideprev = function() {
            if(activeImg > 1) {
                activeImg = activeImg - 2;
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
                slowlyShrinkAnimation(sliderGalleryImage[activeImg - 1]);
                EndslowlyShrinkAnimation(sliderGalleryImage[activeImg]);
            } else if (activeImg == 1) { // click to last img
                activeImg = sliderGalleryList.length - 1;
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
                slowlyShrinkAnimation(sliderGalleryImage[sliderGalleryList.length - 1]);
                EndslowlyShrinkAnimation(sliderGalleryImage[0]);
            }
            SetDotActive();
        };
        const Slidenext = function() {
            if(activeImg < sliderGalleryList.length) { 
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
                slowlyShrinkAnimation(sliderGalleryImage[activeImg - 1]);
                EndslowlyShrinkAnimation(sliderGalleryImage[activeImg - 2]);
            } else if (activeImg == sliderGalleryList.length) { // click to first img
                sliderGallery.style.left = "0px";
                activeImg = 1;
                slowlyShrinkAnimation(sliderGalleryImage[0]);
                EndslowlyShrinkAnimation(sliderGalleryImage[sliderGalleryList.length - 1]);
            }
            SetDotActive();
        };
        const SetDotActive = function() {
            dots.forEach(dot => {
                dot.classList.remove('active');
                dots[activeImg - 1].classList.add('active');
            });
        };

        // slowly_shrink Animation
        const slowlyShrinkAnimation = function(image) {
            image.style.animation = `slowly_shrink 5.751s linear 0s infinite alternate`;
        };
        const EndslowlyShrinkAnimation = function(image) {
            setTimeout( () => {image.style.animation = '';}, 750);
        };
        // Loop
        let autoSlide;
        const autoSlideRepeater = function() {
            slowlyShrinkAnimation(sliderGalleryImage[activeImg - 1]);
            autoSlide = setInterval(function() {
                Slidenext();
            }, 5000);
        };
        const resetAutoSlide = function() {
            clearInterval(autoSlide);
            autoSlideRepeater();
        };


        // Loop Start
        autoSlideRepeater();

        
        // AddEventListener
        sliderPrevBtn.addEventListener('click', function() { 
            resetAutoSlide();
            Slideprev();
        });
        sliderNextBtn.addEventListener('click', function() { 
            resetAutoSlide();
            Slidenext();
        });
        dots.forEach(function dot(e, index) {
            e.addEventListener('click', function() {
                if (index == activeImg - 1) {
                    return;
                }else {
                    EndslowlyShrinkAnimation(sliderGalleryImage[activeImg - 1]);
                    resetAutoSlide();
                    sliderGallery.style.left = "-" + index * sliderWidth + "px";
                    slowlyShrinkAnimation(sliderGalleryImage[index]);
                    activeImg = index + 1;
                    SetDotActive();
                }
            });
        });
        slider.addEventListener("mouseover", () => {
            clearInterval(autoSlide);
        });
        slider.addEventListener("mouseout", () => {
            resetAutoSlide();
        });
    };
    slideFunction();

    // Burger
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.hamburger');
    const navLink = document.querySelector('.navlink');
    const navLinks = navLink.querySelector('ul').querySelectorAll('li');    
    // ClickBurger function
    const clickburger = function(e) {
        tabindexChange();

        // Toogle Nav
        navLink.classList.toggle('nav-active');
    
        // Burger Animation
        nav.classList.toggle('cross');
    
        // Animate Links
        navLinks.forEach((e, index) => {
            if(e.style.animation) {
                e.style.animation = '';
            }else {
                e.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }  
        });

        ArilExpanded();


        if(nav.classList.contains('cross') && navLink.classList.contains('nav-active')) {

            nav.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            document.querySelector("body>div").addEventListener('click', function() {
                ArilExpandedFalse();
                tabindexChange();

                // Close burger menu 
                navLink.classList.remove('nav-active');
                nav.classList.remove('cross');
                // Reset Navlink animate style
                navLinks.forEach((e) => {
                    if(e.style.animation) {
                        e.style.animation = null;
                    }
                });
            });
        }
    };

    // Tabindex
    const tabindexs = document.querySelectorAll("[tabindex]:not([tabindex='0'])");
    const tabindexChange = function() {
        tabindexs.forEach(tabindex => {
            let tabindexValue = tabindex.getAttribute("tabindex");
            if(tabindexValue == "") {
                tabindex.setAttribute("tabindex", "-1");
            }else {
                tabindex.setAttribute("tabindex", "");
            }
        });
    };
    const tabindexToMinus = function() {
        tabindexs.forEach(tabindex => {
            let tabindexValue = tabindex.getAttribute("tabindex");
            tabindex.setAttribute("tabindex", "-1");
        });
    };
    const tabindexToPlus = function() {
        tabindexs.forEach(tabindex => {
            let tabindexValue = tabindex.getAttribute("tabindex");
            tabindex.setAttribute("tabindex", "");

        });
    };

    // Aria-expanded function
    const ArilExpanded = function() {
        let x = burger.getAttribute("aria-expanded");
        if (x == "true") {
            x = "false";
        } else {
            x = "true";
        }
        burger.setAttribute("aria-expanded", x);
    };
    const ArilExpandedFalse = function() {
        burger.setAttribute("aria-expanded", false);
    };

    // EventListener
    burger.addEventListener('click', function(){ clickburger(); });
    // burger.addEventListener('focus', function() {
    //     console.log('burger focus now');       
    // });
    window.addEventListener('keydown', (e) => {        
        if(lightboxContainer.classList.contains('active')) return;
        if(e.key.includes('v') || e.key.includes('x')) {
            e.sliderPntDefault();
            clickburger();
            
        }
    });

    
        
    //  Btn Hover animattion.
    const btns = document.querySelectorAll('.btn_primary');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            
            const x = e.pageX - (parseInt(btn.getBoundingClientRect().left) + Math.round(window.scrollX));
            const y = e.pageY - (parseInt(btn.getBoundingClientRect().top) + Math.round(window.scrollY));
    
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
        });
    });
    
    // Menu Onclick to Scroll
    const menulinks = document.querySelectorAll('.navlink ul li a');
    // const alinks = document.querySelectorAll('a[data-link]');
    const aboutA = document.querySelector('header>div a');
    let tarGet;
    let About;
    
    const smoothScroll = function(tarGet, duration) {
        // const targetPosition = tarGet.getBoundingClientRect().top;
        const targetPosition = tarGet.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        const animation = function(currentTime) {
            if(startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if(timeElapsed < duration) requestAnimationFrame(animation);
        };
    
        function ease(t, b, c ,d){
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }
    
        requestAnimationFrame(animation);
    };
    
    aboutA.addEventListener('click', function(e){
        e.sliderPntDefault();
        let About = document.querySelector("#about");
        // let About = document.querySelector(e.target.hash);
        smoothScroll(About, 500);
    });
    menulinks.forEach(menulink => {
        menulink.addEventListener('click', function(e) {
            ArilExpandedFalse();
            tabindexToPlus();

            // if css scroll-behavior can working return
            if (getComputedStyle(document.body).scrollBehavior === 'smooth') {
                // Close burger menu 
                if(nav.classList.contains('cross') && navLink.classList.contains('nav-active')) {
                    navLink.classList.remove('nav-active');
                    nav.classList.remove('cross');
                    // Reset Navlink animate style
                    navLinks.forEach((e) => {
                        if(e.style.animation) {
                            e.style.animation = null;
                        }
                    });
                }
                return;
            }else {
                // Close burger menu 
                if(nav.classList.contains('cross') && navLink.classList.contains('nav-active')) {
                    navLink.classList.remove('nav-active');
                    nav.classList.remove('cross');
                }
                // Reset Navlink animate style
                navLinks.forEach((e) => {
                    if(e.style.animation) {
                        e.style.animation = null;
                    }
                });
            }

            // Add smoothScroll function
            e.preventDefault();
            let tarGet = document.getElementById(e.target.dataset.link);
            // console.log(tarGet);
            smoothScroll(tarGet, 500);
        });
    });    
    
    //Window scroll events
    const sections = document.querySelectorAll("div[id]");
    window.addEventListener('scroll', function() {

        // Navbar color change when scroll
        if ((window.scrollY) > 0) {
            nav.classList.add('scrolled');
        }else {
            nav.classList.remove('scrolled');
        }
    
        // Menu Active when scroll to the section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
    
        navLinks.forEach(li => {
            li.classList.remove('active');
            if(li.classList.contains(current)) {
                li.classList.add('active');
            }
        });

        
        const contact = document.querySelector("#contact");
        
        if((window.innerHeight + window.pageYOffset - contact.offsetTop) >= (contact.clientHeight / 2)) {
            navLinks.forEach(li => {
                li.classList.remove('active'); 
                navLinks[4].classList.add('active');
            });
        }
    });
    
    // Fade and Scroll
    const fadeIns = document.querySelectorAll('.fade-in');
    const fromLefts = document.querySelectorAll('.from-left');
    const fromRefts =document.querySelectorAll('.from-right');
    
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeIns.forEach(fadeIn => {
        appearOnScroll.observe(fadeIn);
    });
    fromLefts.forEach(fromLeft => {
        appearOnScroll.observe(fromLeft);
    });
    fromRefts.forEach(fromReft => {
        appearOnScroll.observe(fromReft);
    });
    
    // Workmenu
    const WorksSort = document.querySelector('.works-sort').children;
    const WorksFigure = document.querySelector('.works').querySelectorAll("figure");
    
    for(let i=0;i<WorksSort.length; i++) {
        WorksSort[i].addEventListener('click',function() {
            for(let j=0;j<WorksSort.length; j++) {
                WorksSort[j].classList.remove('current');
            }
            this.classList.add('current');
            let currentData = this.getAttribute('data-current');
            
            for(let k=0;k<WorksFigure.length; k++) {
                WorksFigure[k].classList.remove('active');
                WorksFigure[k].classList.add('delete');
    
                if(WorksFigure[k].classList.contains(currentData) || currentData =="all"){
                    WorksFigure[k].classList.remove('delete');
                    WorksFigure[k].classList.add('active');
                }
            }
        });
    }
    
    // LightBox query selectors
    const work = document.querySelector('#work');
    const lightboxEnabled = document.querySelectorAll(".lightbox-enabled");
    const lightboxContainer = document.querySelector(".lightbox-container");
    const lightboxImgWrapper = document.querySelector(".lightbox-image-wrapper");
    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxTextRight = document.querySelector(".lightbox-text-right");
    
    const lightboxBtns = document.querySelectorAll('.lightbox-btn');
    const lightboxBtnLeft = document.querySelector('.lightbox-btn.left');
    const lightboxBtnRight = document.querySelector('.lightbox-btn.right');
    
    const scrollbarWidth = lightboxContainer.clientWidth - document.body.offsetWidth;
    
    // LightBox function
    const showLightBox = function() { 
        lightboxContainer.classList.add('active');
        document.body.style.overflow = "clip";
        work.style.paddingRight = scrollbarWidth + "px";
        nav.style.paddingRight = scrollbarWidth + "px";
        sections[2].style.paddingRight = scrollbarWidth + "px";
        sections[4].style.paddingRight = scrollbarWidth + "px";
    };
    const hideLightBox = function() { 
        lightboxContainer.classList.remove('active');
        document.body.style.overflow = "auto";
        work.style.paddingRight = "0";
        nav.style.paddingRight = "0";
        sections[2].style.paddingRight = "0";
        sections[4].style.paddingRight = "0";
    };
    
    const setActiveImage = function(x) { 
        // Ensure that there is no residual image
        if(lightboxImg.src) {
            lightboxImg.src ="";
        }
        // Set gallery images & text
        lightboxImg.src = galleryImg[x].dataset.imagesrc;
        lightboxTextRight.innerHTML = `${x + 1} / ${galleryImg.length}`;
        // Make sure both Btn is working
        removeBtnInavtiveClass();
        // Through hidden buttons, make users know now in first or end image of the gallery
        switch(x) {
            case 0:
                lightboxBtnLeft.classList.add('inactive');
                break;
            case (galleryImg.length-1):
                lightboxBtnRight.classList.add('inactive');
                break;
            default:
                removeBtnInavtiveClass();
        }
    };
    const getGalleryImg = function(i) { 
        galleryImg = lightboxEnabled[i].getElementsByTagName("span");
    };
    const removeBtnInavtiveClass = function() {
        lightboxBtns.forEach(btn => {
            btn.classList.remove('inactive'); 
        });
    };
    const removeBtnAnimation = function() {
        lightboxBtns.forEach(btn => {
            setTimeout(() => {
                btn.blur();
            }, 200);
        });
    };
    
    
    const transitionSlidesLeft = function() {
        lightboxBtnLeft.focus();
        if( x === 0) {
            setActiveImage(x = galleryImg.length - 1);
        }else {
            setActiveImage(x = x -1);
        }
        removeBtnAnimation();
    };
    const transitionSlidesRight = function() {
        lightboxBtnRight.focus();
        if( x === galleryImg.length - 1) {
            setActiveImage(x = 0);
        }else {
            setActiveImage(x = x + 1);
        }
        removeBtnAnimation();
    };
    const transitionSlideHandler = function(moveItem) {
        if(moveItem.includes('left')) {
            transitionSlidesLeft();
        } else if(moveItem.includes('right')) {
            transitionSlidesRight();
        } else if(moveItem.includes('x')) {
            hideLightBox();
        }
    };
    
    // event listeners
    lightboxEnabled.forEach((e, index) => {
        e.addEventListener('click', function(el) {
            el.preventDefault();
            getGalleryImg(index);
            showLightBox();
            setActiveImage(x=0);
        });
    });
    
    let half = document.body.offsetWidth / 2;
    lightboxContainer.addEventListener('click', function() {hideLightBox();});
    lightboxImgWrapper.addEventListener('click', function(e) { 
        e.stopPropagation();
        if(e.clientX >= half) {
            transitionSlidesRight();
        } else {
            transitionSlidesLeft();
        }
    });
    lightboxImgWrapper.addEventListener('mousemove', function(e) {
        if(e.clientX >= half) {
            lightboxImgWrapper.style.cursor = "url('../_svg/right.svg'), auto";
        }else {
            lightboxImgWrapper.style.cursor = "url('../_svg/left.svg'), auto";
        }
    });
    
    lightboxBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            transitionSlideHandler(e.currentTarget.id);
        });
    });
    
    window.addEventListener('keydown', (e) => {
        if(!lightboxContainer.classList.contains('active')) return;
        // if(lightboxContainer.classList.contains('active')) {console.log("contains!!!")};
        if(e.key.includes('Left') || e.key.includes('Right')) {
            e.preventDefault();
            transitionSlideHandler(e.key.toLowerCase());
        }
    });

    
    // Keep input background if it have value || hover event
    const inputBoxs = document.querySelectorAll('input, textarea');

    inputBoxs.forEach(inputBox => {
        inputBox.addEventListener('blur', function(e) {         
            if(e.target.value ==""){
                inputBox.style =`border: 1.5px solid var(--clr-lightblack);
                                background-color: var(--clr-primary-transparent);`;

                
            } else {
                inputBox.style =`background-color: var(--clr-bgGrey);
                                border: 1.5px solid var(--clr-bgGrey);`;
            }
            
        });
        inputBox.addEventListener("focus", function(){
            inputBox.style = `background-color: var(--clr-bgGrey);
                            border: 1.5px solid var(--clr-bgGrey);`;
        });
    });
});