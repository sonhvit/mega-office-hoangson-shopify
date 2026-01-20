(() => {
	const initSlider = (section) => {
		let collectionsSlider;

		if (document.currentScript) {
			collectionsSlider = document.currentScript.parentElement.querySelectorAll(
				".js-slider-collections-slider"
			);
		} else {
			collectionsSlider = section.querySelectorAll(
				".js-slider-collections-slider"
			);
		}

		if (collectionsSlider && collectionsSlider.length > 0) {
			collectionsSlider.forEach((el) => {
				const speed1 = el.getAttribute("data-duration");
				const columnCount = el.getAttribute("data-column-count");
				const prevBtn = section.querySelector(".swiper-button-prev");
				const nextBtn = section.querySelector(".swiper-button-next");

				const logosSwiper1 = new Swiper(el, {
					slidesPerView:2,
					spaceBetween: 16,
					autoplay: false,
					direction: "horizontal",
					loop: false,
					speed: speed1,
					shortSwipes: true,
					longSwipes: true,
					allowTouchMove: true,
					navigation:
						prevBtn && nextBtn ? { nextEl: nextBtn, prevEl: prevBtn } : false,
					breakpoints: {
						576: {
							slidesPerView: Number(columnCount) - 4 + 0.66,
							spaceBetween: 16,
						},
						990: {
							slidesPerView: Number(columnCount) - 2 + 0.66,
							spaceBetween: 20,
						},
						1150: {
							slidesPerView: Number(columnCount) <= 6  ? Number(columnCount) + 0.56 : 6 + 0.56,
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
		let sectionCollections;

		if (document.currentScript) {
			sectionCollections = document.currentScript.parentElement;
		} else {
			sectionCollections = section;
		}

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			const sliders = entry.target.querySelectorAll(
				".js-slider-collections-slider"
			);
			const slidersSlow = entry.target.querySelectorAll(
				".js-slider-collections-slider-slow"
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

			initSlider(sectionCollections);
		});

		initSlider(sectionCollections);

		sectionResizeObserver.observe(sectionCollections);
	};

	initSection();

	document.addEventListener("shopify:section:load", function (section) {
		initSection(section.target);
	});
})();
