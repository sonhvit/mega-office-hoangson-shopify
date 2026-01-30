(function () {
	let initializedSwipers = [];

	const collectionSlider = () => {
		const collectionSliders = Array.from(document.querySelectorAll(".collection-slider"));
		if (collectionSliders.length === 0) return;

		collectionSliders.forEach((slider) => {
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
						slidesPerView: perRow >= 2 ? 2 : perRow,
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

	const adjustButtonPosition = (height) => {
		document.querySelectorAll(`.collection-slider .swiper-button`).forEach((button) => {
			button.style.top = height / 2 + 20 + "px";
		});
	};

	const changePosition = () => {
		if (window.innerWidth < 1150) return;

		const image = document.querySelector(`.collection-slider .collections__card`);
		if (image) {
			if (image.complete) {
				adjustButtonPosition(image.offsetHeight);
			} else {
				image.addEventListener("load", function () {
					adjustButtonPosition(this.offsetHeight);
				});
			}
		}
	};

	const toBoolean = (string) => {
		return string === "true";
	};

	const updateMobileGridClass = () => {
		const collectionSliders = document.querySelectorAll(".collection-slider");
		collectionSliders.forEach((slider) => {
			if (window.innerWidth < 768) {
				slider.classList.add("collection-list--2-mobile-grid");
			} else {
				slider.classList.remove("collection-list--2-mobile-grid");
			}
		});
	};

	// DOM ready
	document.addEventListener("DOMContentLoaded", function () {
		collectionSlider();
		updateMobileGridClass();
		changePosition();

		document.addEventListener("shopify:section:load", function () {
			collectionSlider();
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
			collectionSlider();
		}, 200);
	});
})();
