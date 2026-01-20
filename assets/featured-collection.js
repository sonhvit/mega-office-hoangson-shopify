(function () {
	const featuredCollection = () => {
		$(".section-featured-collection").each(function () {
			const section = $(this);
			const id = section.attr("id");
			const box = section.find(".featured_collection");

			const autoplay = box.data("autoplay");
			const mobile = box.data("mobile");
			const stopAutoplay = box.data("stop-autoplay");
			const speed = box.data("speed") * 1000;
			const delay = box.data("delay") * 1000;
			const disableSlider = box.data("disable-slider");
			const perRow = 4;

			let swiperInstance = box.data("swiperInstance");

		
			const initSwiper = () => {
				if (swiperInstance) return; 

				let autoplayParm = autoplay
					? {
						autoplay: {
							delay: delay,
							pauseOnMouseEnter: stopAutoplay,
							disableOnInteraction: false,
						},
					}
					: {};

				let swiperParms = {
					speed: speed,
					slidesPerView: mobile,
					keyboard: true,
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
					navigation: {
						nextEl: `#${id} .swiper-button-next`,
						prevEl: `#${id} .swiper-button-prev`,
					},
					pagination: {
						el: `#${id} .swiper-pagination`,
						clickable: true,
					},
					mousewheel: { forceToAxis: true },
					...autoplayParm,
				};

				swiperInstance = new Swiper(`#${id} .swiper`, swiperParms);
				box.data("swiperInstance", swiperInstance);
			};
		(function () {
			function adjustButtonPosition(height) {
				document
					.querySelectorAll(`.featured_collection .swiper-button`)
					.forEach((button) => {
						button.style.top = height / 2 + "px";
					});
			}
			function changePosition() {
				if (window.innerWidth < 1150) return;
				const image = document.querySelector(`.featured_collection .media img`);
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
			const destroySwiper = () => {
				if (!swiperInstance) return;

				swiperInstance.destroy(true, true);
				swiperInstance = null;
				box.removeData("swiperInstance");
			};

			if (disableSlider && window.innerWidth <= 576) {
				destroySwiper();

				const wrapper = box.find(".swiper-wrapper");
				wrapper.removeClass("swiper-wrapper").addClass("featured_collection--products-grid");
				wrapper.children().removeClass("swiper-slide");

				box.find(".swiper-button-next, .swiper-button-prev, .swiper-pagination")
					.css("display", "none");
			} else {
				const wrapper = box.find(".featured_collection--products-grid");
				if (wrapper.length) {
					wrapper.removeClass("featured_collection--products-grid").addClass("swiper-wrapper");
					wrapper.children().addClass("swiper-slide");
				}

				box.find(".swiper-button-next, .swiper-button-prev, .swiper-pagination")
					.css("display", "");

				initSwiper();
			}
		});
	};

	document.addEventListener("DOMContentLoaded", function () {
		featuredCollection();
		document.addEventListener("shopify:section:load", function () {
			featuredCollection();
		});

		let resizeTimeout;
		window.addEventListener("resize", function () {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(featuredCollection, 200);
		});
	});
})();
