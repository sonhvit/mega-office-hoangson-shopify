(() => {
	const initSlider = (section) => {
		let bannerSlider;

		if (document.currentScript) {
			bannerSlider = document.currentScript.parentElement.querySelectorAll(
				".js-slider-banner-slider-mos"
			);
		} else {
			bannerSlider = section.querySelectorAll(".js-slider-banner-slider-mos");
		}

		if (bannerSlider && bannerSlider.length > 0) {
			bannerSlider.forEach((el) => {
				const speed1 = el.getAttribute("data-duration");
				const columnCount = el.getAttribute("data-column-count");
				const prevBtn = section.querySelector(".swiper-button-prev");
				const nextBtn = section.querySelector(".swiper-button-next");

				const logosSwiper1 = new Swiper(el, {
					slidesPerView: 2,
					spaceBetween: 16,
					autoplay: false,
					direction: "horizontal",
					loop: false,
					speed: speed1,
					shortSwipes: true,
					longSwipes: false,
					allowTouchMove: true,
					navigation:
						prevBtn && nextBtn ? { nextEl: nextBtn, prevEl: prevBtn } : false,
					breakpoints: {
						576: {
							slidesPerView: Number(columnCount) - 4 + 0.56,
							spaceBetween: 16,
						},
						990: {
							slidesPerView: Number(columnCount) - 2 + 0.56,
							spaceBetween: 20,
						},
						1150: {
							slidesPerView: 6 + 0.56,
							spaceBetween: 20,
						},
						1250: {
							slidesPerView: Number(columnCount) + 0.56,
							spaceBetween: 20,
						},
					},
					mousewheel: {
						forceToAxis: true,
					},
				});
			});
		}
	};

	const initSection = (section) => {
		let sectionBanner;

		if (document.currentScript) {
			sectionBanner = document.currentScript.parentElement;
		} else {
			sectionBanner = section;
		}

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			const sliders = entry.target.querySelectorAll(".js-slider-banner-slider-mos");
			const slidersSlow = entry.target.querySelectorAll(
				".js-slider-banner-slider-mos-slow"
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

			initSlider(sectionBanner);
		});

		initSlider(sectionBanner);

		sectionResizeObserver.observe(sectionBanner);
	};

	initSection();

	document.addEventListener("shopify:section:load", function (section) {
		initSection(section.target);
	});
})();
