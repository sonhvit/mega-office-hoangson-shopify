(() => {
	const initSlider = (section) => {
		if (!section) return;

		const slideshow = section.querySelector(".slideshow__swiper");
		if (!slideshow) return;

		const prevBtn = section.querySelector(".swiper-button-prev");
		const nextBtn = section.querySelector(".swiper-button-next");
		const thumbs = section.querySelector(".slideshow__thumbs");
		const autoplay = slideshow.getAttribute("data-autoplay") === "true";
		const loop = slideshow.getAttribute("data-loop") === "true";
		const speed = parseInt(slideshow.getAttribute("data-speed"), 10) || 700;
		const autoplayButton = section.querySelector(".slideshow-autoplay__button");

		let swiperParams = {
			speed: speed,
			loop: loop,
			autoplay: autoplay
				? { disableOnInteraction: false, pauseOnMouseEnter: false }
				: false,
			navigation:
				prevBtn && nextBtn ? { nextEl: nextBtn, prevEl: prevBtn } : false,
			pagination: {
				el: section.querySelector(".swiper-pagination"),
				clickable: true,
			},
			mousewheel: {
				forceToAxis: true,
			},
		};

		if (thumbs) {
			swiperParams.thumbs = {
				swiper: new Swiper(thumbs, { slidesPerView: 3, spaceBetween: 10 }),
			};
		}

		const swiperInstance = new Swiper(slideshow, swiperParams);
		section.dataset.swiperId = swiperInstance.el.classList[0];

		if (autoplayButton) {
			autoplayButton.addEventListener("click", () =>
				toggleAutoplay(swiperInstance, autoplayButton, section)
			);
		}
	};

	const toggleAutoplay = (swiper, button, section) => {
		if (!swiper || !button) return;

		const iconPlay = button.querySelector(".icon-play");
		const iconPause = button.querySelector(".icon-pause");

		if (swiper.autoplay.running) {
			swiper.autoplay.stop();
			button.classList.add("paused");
			updatePaginationAnimation(section, "paused");
			swiper.pagination.bullets.map((bullet) => {
				bullet.classList.add("paused");
			});
			if (iconPlay && iconPause) {
				iconPlay.classList.remove("hidden");
				iconPause.classList.add("hidden");
			}
      button.setAttribute("aria-label", "Play slideshow");
    	button.setAttribute("aria-pressed", "false");
		} else {
			swiper.autoplay.start();
			button.classList.remove("paused");
			swiper.pagination.bullets.map((bullet) => {
				bullet.classList.remove("paused");
			});
			updatePaginationAnimation(section, "running");

			if (iconPlay && iconPause) {
				iconPlay.classList.add("hidden");
				iconPause.classList.remove("hidden");
			}
      button.setAttribute("aria-label", "Pause slideshow");
      button.setAttribute("aria-pressed", "true");
		}
	};

	const updatePaginationAnimation = (section, state) => {
		const paginationCircles = section.querySelector(
			".swiper-pagination-bullet-active"
		);

		if (state === "paused") {
			paginationCircles.classList.add("paused");
		} else {
			paginationCircles.classList.remove("paused");
		}
	};

	const initSections = () => {
		document.querySelectorAll(".section-slideshow").forEach((section) => {
			if (!section.dataset.initialized) {
				initSlider(section);
				section.dataset.initialized = "true";
			}
		});
	};

	document.addEventListener("DOMContentLoaded", initSections);
	document.addEventListener("shopify:section:load", (e) =>
		initSlider(e.target)
	);
})();
