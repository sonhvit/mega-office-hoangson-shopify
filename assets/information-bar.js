(() => {
	/* If number of slides is less than slidesPerView * 2, duplicate slides */
	const setSlides = (sliders) => {
		if (sliders && sliders.length > 0) {
			sliders.forEach((swiper) => {
				let SLIDES_REQUIRED;
				const wrapper = swiper.querySelector(".swiper-wrapper");
				const srcElems = wrapper.querySelectorAll(".information-bar__content--item");
				const isHorizontal = swiper.classList.contains(
					"information-bar__content--carousel"
				);

				srcElems.forEach((el) => {
					wrapper.appendChild(el);
				});
			});
		}
	};

	const recalculateSlidesLength = () => {
		setSlides(document.querySelectorAll(".js-slider-information-bar"));
		setSlides(document.querySelectorAll(".js-slider-information-bar-slow"));
	};

	const initSlider = (section) => {
		let infosSlider;
		let infosSliderSlow;

		if (document.currentScript) {
			infosSlider =
				document.currentScript.parentElement.querySelectorAll(
					".js-slider-information-bar"
				);
			infosSliderSlow = document.currentScript.parentElement.querySelectorAll(
				".js-slider-information-bar-slow"
			);
		} else {
			infosSlider = section.querySelectorAll(".js-slider-information-bar");
			infosSliderSlow = section.querySelectorAll(".js-slider-information-bar-slow");
		}

		if (infosSlider && infosSlider.length > 0) {
			infosSlider.forEach((el) => {
				const speed1 = el.getAttribute("data-duration");

				const infosSwiper1 = new Swiper(el, {
					slidesPerView: el.classList.contains(
						"information-bar__content--carousel"
					)
						? 1
						: 1,
					spaceBetween: 16,
					autoplay: false,
					direction: "horizontal",
					loop: true,
					speed: speed1,
					shortSwipes: true,
					longSwipes: false,
					allowTouchMove: true,
					navigation: {
						nextEl: section.querySelector(".swiper-button-next"),
						prevEl: section.querySelector(".swiper-button-prev"),
					},
					breakpoints: {
						576: {
							slidesPerView: 2,
							spaceBetween: 16,
						},
						750: {
							slidesPerView: 3,
							spaceBetween: 16,
						},
						990: {
							slidesPerView: el.classList.contains(
								"information-bar__content--carousel"
							)
								? 4
								: 4,
							spaceBetween: 20,
						}
					},
					mousewheel: {
						forceToAxis: true,
					},
				});
			});
		}
	};

	const initSection = (section) => {
		let sectionInfos;

		if (document.currentScript) {
			sectionInfos = document.currentScript.parentElement;
		} else {
			sectionInfos = section;
		}

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			const sliders = entry.target.querySelectorAll(".js-slider-information-bar");
			const slidersSlow = entry.target.querySelectorAll(
				".js-slider-information-bar-slow"
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
			initSlider(sectionInfos);
		});

		recalculateSlidesLength();
		initSlider(sectionInfos);

		sectionResizeObserver.observe(sectionInfos);
	};

	initSection();

	document.addEventListener("shopify:section:load", function (section) {
		initSection(section.target);
	});
})();
