(function () {
	const initSlider = () => {
		const sliders = document.querySelectorAll(".carousel__slider");

		sliders.forEach((slider, index) => {
			let columns1360 = Number(slider.dataset.columns);
			let columns1150 = 3;
			if (columns1360 == 5) columns1150 = 4;
			else if (columns1360 < 3) columns1150 = columns1360;
			let columns990 = 3;
			if (columns1360 < 3) columns990 = columns1150;
			let columns990PerView = Number(columns990 + 0.05);
			let columns576 = 2;
			if (columns1360 < 2) columns576 = columns990;
			let columns576PerView = Number(columns576 + 0.05);

			const carouselSlider = new Swiper(slider, {
				slidesPerView: 1,
				spaceBetween: 8,
				navigation: {
					nextEl: ".carousel__slider-nav .swiper-button-next",
					prevEl: ".carousel__slider-nav .swiper-button-prev",
				},
				breakpoints: {
					576: {
						slidesPerView: columns576PerView,
						slidesPerGroup: columns576,
					},
					990: {
						slidesPerView: columns990PerView,
						slidesPerGroup: columns990,
					},
					1150: {
						slidesPerView: columns1150,
						slidesPerGroup: columns1150,
					},
					1360: {
						slidesPerView: columns1360,
						slidesPerGroup: columns1360,
					},
				},
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	};

	initSlider();

	document.addEventListener("shopify:section:load", function () {
		initSlider();
	});
})();
