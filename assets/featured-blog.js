(() => {
	const initSlider = (section) => {
		let blogSlider;

		if (document.currentScript) {
			blogSlider = document.currentScript.parentElement.querySelectorAll(
				".js-slider-blog-slider"
			);
		} else {
			blogSlider = section.querySelectorAll(".js-slider-blog-slider");
		}

		if (blogSlider && blogSlider.length > 0) {
			blogSlider.forEach((el) => {
				const speed1 = el.getAttribute("data-duration");
				const columnCount = el.getAttribute("data-column-count");
				const prevBtn = section.querySelector(".swiper-button-prev");
				const nextBtn = section.querySelector(".swiper-button-next");

				const logosSwiper1 = new Swiper(el, {
					slidesPerView: 1,
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
						750: {
							slidesPerView: 1,
							spaceBetween: 16,
						},
						990: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1150: {
							slidesPerView: Number(columnCount),
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
		let sectionBlog;

		if (document.currentScript) {
			sectionBlog = document.currentScript.parentElement;
		} else {
			sectionBlog = section;
		}

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			const sliders = entry.target.querySelectorAll(".js-slider-blog-slider");
			const slidersSlow = entry.target.querySelectorAll(
				".js-slider-blog-slider-slow"
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

			initSlider(sectionBlog);
		});

		initSlider(sectionBlog);

		sectionResizeObserver.observe(sectionBlog);
	};

	initSection();

	document.addEventListener("shopify:section:load", function (section) {
		initSection(section.target);
	});
})();
