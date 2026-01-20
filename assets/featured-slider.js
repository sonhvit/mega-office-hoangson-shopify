(function () {
	const featuredSlider = () => {
		const productSliders = Array.from(
			document.querySelectorAll(".featured-slider")
		);
		if (productSliders.length === 0) return;
		productSliders.forEach((slider) => {
			if (slider.classList.contains("slider_started")) {
				return "";
			}
			slider.classList.add("slider_started");

			const sectionId = slider.dataset.id;

			const perRow = 3;
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
				loop: false,
				keyboard: true,
				slidesPerView: mobile,
				spaceBetween: 5,
				breakpoints: {
					576: {
						slidesPerView: perRow >= 2 ? 2 : 1,
					},
					750: {
						slidesPerView: perRow >= 2 ? 1 : perRow,
					},
					990: {
						slidesPerView: perRow >= 2 ? 1 : perRow,
					},
					1150: {
						spaceBetween: 10,
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

			const infoCard = () => {
				let maxHeight = 0;

				document
					.querySelectorAll(`#${sectionId} .js-animation-card`)
					.forEach((card) => {
						const info = card.querySelector(".card-information__wrapper");
						if (info) {
							const height = info.getBoundingClientRect().height;
							if (height > maxHeight) {
								maxHeight = height;
							}
						}
					});
				document
					.querySelectorAll(`#${sectionId} .card-information__wrapper`)
					.forEach((el) => {
						el.style.height = `${maxHeight + 35}px`;
					});
			};
			infoCard();
		});
		(function () {
			function adjustButtonPosition(height) {
				document
					.querySelectorAll(`.featured-slider .swiper-button`)
					.forEach((button) => {
						button.style.top = height / 2 + "px";
					});
			}
			function changePosition() {
				if (window.innerWidth < 1150) return;
				const image = document.querySelector(`.featured-slider .media img`);
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
			}
			changePosition();
			document.addEventListener("shopify:section:load", changePosition);
			let resizeTimeout;
			window.addEventListener("resize", function () {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(changePosition, 100);
			});
		})();
	};

	//window.addEventListener("load", infoCard);

	function toBoolean(string) {
		return string === "true" ? true : false;
	}

	document.addEventListener("DOMContentLoaded", function () {
		featuredSlider();

		document.addEventListener("shopify:section:load", function () {
			featuredSlider();
		});
	});
})();
