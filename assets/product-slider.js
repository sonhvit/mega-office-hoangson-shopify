(function () {
	let initializedSwipers = [];

	const productSlider = () => {
		const productSliders = Array.from(document.querySelectorAll(".products-slider"));
		if (productSliders.length === 0) return;

		if (window.innerWidth < 768) return;

		productSliders.forEach((slider) => {
			if (slider.classList.contains("slider_started")) return;

			slider.classList.add("slider_started");

			const sectionId = slider.dataset.id;
			const perRow = slider.dataset.perRow;
			const mobile = slider.dataset.mobile;
			const speed = slider.dataset.speed * 1000;
			const delay = slider.dataset.delay * 1000;
			const autoplay = toBoolean(slider.dataset.autoplay);
			const stopAutoplay = toBoolean(slider.dataset.stopAutoplay);
			const showArrows = toBoolean(slider.dataset.showArrows);

			let autoplayParm = {};
			let arrowsParm = {};

			if (autoplay) {
				autoplayParm = {
					autoplay: {
						delay: delay,
						pauseOnMouseEnter: stopAutoplay,
						disableOnInteraction: false,
					},
				};
			}

			if (showArrows) {
				arrowsParm = {
					navigation: {
						nextEl: `#${sectionId} .swiper-button-next`,
						prevEl: `#${sectionId} .swiper-button-prev`,
					},
					pagination: {
						el: `#${sectionId} .swiper-pagination`,
						clickable: true,
					},
				};
			}

			let swiperParms = {
				speed: speed,
				keyboard: true,
				slidesPerView: mobile,
				breakpoints: {
					576: {
						slidesPerView: perRow >= 2 ? 2 : 1,
					},
					750: {
						slidesPerView: perRow >= 3 ? 3 : perRow,
					},
					990: {
						slidesPerView: perRow >= 4 ? 4 : perRow,
					},
					1150: {
						slidesPerView: perRow,
					},
				},
				mousewheel: {
					forceToAxis: true,
				},
				...arrowsParm,
				...autoplayParm,
			};

			const swiper = new Swiper(`#${sectionId} .swiper`, swiperParms);
			initializedSwipers.push(swiper);
		});
	};

	const destroyAllSwipers = () => {
		initializedSwipers.forEach((swiper) => {
			if (swiper && swiper.destroy) {
				swiper.destroy(true, true);
			}
		});
		initializedSwipers = [];

		document.querySelectorAll(".products-slider.slider_started").forEach((slider) => {
			slider.classList.remove("slider_started");
		});
	};

	const adjustButtonPosition = (height) => {
		document.querySelectorAll(`.products-slider .swiper-button`).forEach((button) => {
			button.style.top = height / 2 + 20 + "px";
		});
	};

	const changePosition = () => {
		if (window.innerWidth < 1150) return;

		const image = document.querySelector(`.products-slider .media img`);
		if (image) {
			if (image.tagName === "IMG") {
				if (image.complete) {
					adjustButtonPosition(image.offsetHeight);
				} else {
					image.addEventListener("load", function () {
						adjustButtonPosition(this.offsetHeight);
					});
				}
			} else if (image.tagName === "svg") {
				const height = image.getBoundingClientRect().height;
				adjustButtonPosition(height);
			}
		}
	};

	const toBoolean = (string) => {
		return string === "true";
	};

	const updateMobileGridClass = () => {
		const productSliders = document.querySelectorAll(".products-slider");
		productSliders.forEach((slider) => {
			if (window.innerWidth < 768) {
				slider.classList.add("product-list--2-mobile-grid");
			} else {
				slider.classList.remove("product-list--2-mobile-grid");
			}
		});
	};

	// Init product recommendations
	if (document.querySelector("product-recommendations") !== null) {
		const initslider = setInterval(() => {
			const swiperContainer = document
				.querySelector("product-recommendations")
				.querySelector(".swiper");

			if (swiperContainer !== null) {
				if (swiperContainer.classList.contains("swiper-initialized")) {
					clearInterval(initslider);
				}
				productSlider();
			}
		}, 100);
	}

	// DOM ready
	document.addEventListener("DOMContentLoaded", function () {
		productSlider();
		updateMobileGridClass();
		changePosition();

		document.addEventListener("shopify:section:load", function () {
			productSlider();
			updateMobileGridClass();
			changePosition();
		});
	});

	// Resize
	let resizeTimeout;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			updateMobileGridClass();
			changePosition();
			if (window.innerWidth < 768) {
				destroyAllSwipers();
			} else {
				productSlider();
			}
		}, 200);
	});
})();
