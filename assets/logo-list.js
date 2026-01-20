(() => {
	/* If number of slides is less than slidesPerView * 2, duplicate slides */
	const setSlides = (sliders) => {
		if (sliders && sliders.length > 0) {
			sliders.forEach((swiper) => {
				let SLIDES_REQUIRED;
				const wrapper = swiper.querySelector(".swiper-wrapper");
				const srcElems = wrapper.querySelectorAll(".logo-list__item");
				const isHorizontal = swiper.classList.contains(
					"logo-list__content--horizontal-carousel"
				);

				//if (window.matchMedia("(min-width: 1150px)").matches) {
				//	if (srcElems.length > 5) {
				//		SLIDES_REQUIRED = isHorizontal ? 12 : 6;
				//	} else {
				//		SLIDES_REQUIRED = srcElems.length;
				//	}
				//} else if (window.matchMedia("(min-width: 990px)").matches) {
				//	if (srcElems.length > 4) {
				//		SLIDES_REQUIRED = isHorizontal ? 8 : 6;
				//	} else {
				//		SLIDES_REQUIRED = srcElems.length;
				//	}
				//} else if (window.matchMedia("(min-width: 750px)").matches) {
				//	if (srcElems.length > 3) {
				//		SLIDES_REQUIRED = isHorizontal ? 6 : 6;
				//	} else {
				//		SLIDES_REQUIRED = srcElems.length;
				//	}
				//} else {
				//	if (srcElems.length > 2) {
				//		SLIDES_REQUIRED = isHorizontal ? 4 : 6;
				//	} else {
				//		SLIDES_REQUIRED = srcElems.length;
				//	}
				//}

				srcElems.forEach((el) => {
					wrapper.appendChild(el);
				});
			});
		}
	};

	const recalculateSlidesLength = () => {
		setSlides(document.querySelectorAll(".js-slider-logos"));
		setSlides(document.querySelectorAll(".js-slider-logos-slow"));
	};

	const initSlider = (section) => {
		let logosSlider;
		let logosSliderSlow;

		if (document.currentScript) {
			logosSlider =
				document.currentScript.parentElement.querySelectorAll(
					".js-slider-logos"
				);
			logosSliderSlow = document.currentScript.parentElement.querySelectorAll(
				".js-slider-logos-slow"
			);
		} else {
			logosSlider = section.querySelectorAll(".js-slider-logos");
			logosSliderSlow = section.querySelectorAll(".js-slider-logos-slow");
		}

		if (logosSlider && logosSlider.length > 0) {
			logosSlider.forEach((el) => {
				const speed1 = el.getAttribute("data-duration");

				const logosSwiper1 = new Swiper(el, {
					slidesPerView: el.classList.contains(
						"logo-list__content--horizontal-carousel"
					)
						? 2
						: 3,
					spaceBetween: 16,
					autoplay: false,
					direction: "horizontal",
					loop: false,
					speed: speed1,
					shortSwipes: true,
					longSwipes: false,
					allowTouchMove: true,
					navigation: {
						nextEl: section.querySelector(".swiper-button-next"),
						prevEl: section.querySelector(".swiper-button-prev"),
					},
					breakpoints: {
						750: {
							slidesPerView: 3,
							spaceBetween: 16,
						},
						990: {
							slidesPerView: el.classList.contains(
								"logo-list__content--horizontal-carousel"
							)
								? 4
								: 3,
							spaceBetween: 20,
						},
						1150: {
							slidesPerView: el.classList.contains(
								"logo-list__content--horizontal-carousel"
							)
								? 6
								: 3,
							spaceBetween: 20,
						},
					},
					mousewheel: {
						forceToAxis: true,
					},
				});
			});
		}

		//if (logosSliderSlow && logosSliderSlow.length > 0) {
		//  logosSliderSlow.forEach(el => {
		//    const speed2 = el.getAttribute('data-duration');

		//    const logosSwiper2 = new Swiper(el, {
		//      slidesPerView: 3,
		//      spaceBetween: 16,
		//      autoplay: false,
		//      direction: 'horizontal',
		//      loop: false,
		//      speed: speed2,
		//      shortSwipes: false,
		//      longSwipes: false,
		//      allowTouchMove: false,
		//      navigation: {
		//        nextEl: document.querySelector(".swiper-button-next"),
		//        prevEl: document.querySelector(".swiper-button-prev"),
		//      },
		//      breakpoints: {
		//        750: {
		//          slidesPerView: 3,
		//          spaceBetween: 20
		//        },
		//        990: {
		//          slidesPerView: 3,
		//          spaceBetween: 24
		//        }
		//      }
		//    });
		//  });
		//}
	};

	const initSection = (section) => {
		let sectionLogos;

		if (document.currentScript) {
			sectionLogos = document.currentScript.parentElement;
		} else {
			sectionLogos = section;
		}

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			const sliders = entry.target.querySelectorAll(".js-slider-logos");
			const slidersSlow = entry.target.querySelectorAll(
				".js-slider-logos-slow"
			);

			if (sliders.length != 0) {
				sliders.forEach((slider) => {
					if (slider.swiper) slider.swiper.destroy();
				});
			}

			if (slidersSlow.length != 0) {
				slidersSlow.forEach((slider) => {
					if (slider.swiper) slider.swiper.destroy();
				});
			}

			recalculateSlidesLength();
			initSlider(sectionLogos);
		});

		recalculateSlidesLength();
		initSlider(sectionLogos);

		sectionResizeObserver.observe(sectionLogos);
	};

	initSection();

	document.addEventListener("shopify:section:load", function (section) {
		initSection(section.target);
	});
})();
