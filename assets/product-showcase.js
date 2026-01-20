(() => {
	const initSlider = (section) => {
		if (!section) return;

		const showcase = section.querySelector(".product-showcase");
		if (!showcase) return;

		const swiperEl = showcase.querySelector(".swiper");
		const autoplay = showcase.dataset.autoplay === "true";
		const navigation = showcase.dataset.navigation === "true";
		const perRow = parseInt(showcase.dataset.perRow, 10) || 1;
		const speed = showcase.dataset.speed * 1000;
		const delay = showcase.dataset.delay * 1000;

		const prevBtn = section.querySelector(".swiper-button-prev");
		const nextBtn = section.querySelector(".swiper-button-next");
		const paginationEl = section.querySelector(".swiper-pagination");

		let swiperParams = {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: speed,
			loop: false,
			autoplay: autoplay
				? {
						delay: delay,
						disableOnInteraction: false,
				  }
				: false,
			mousewheel: { forceToAxis: true },
			breakpoints: {
				576: {
					slidesPerView: perRow >= 2 ? 2 : 1,
				},
				750: {
					slidesPerView: perRow >= 2 ? 2 : perRow,
				},
				990: {
					slidesPerView: perRow >= 3 ? 3 : perRow,
				},
				1150: {
					slidesPerView: perRow,
				},
			},
		};

		if (navigation && prevBtn && nextBtn) {
			swiperParams.navigation = { nextEl: nextBtn, prevEl: prevBtn };
		}

		if (paginationEl) {
			swiperParams.pagination = { el: paginationEl, clickable: true };
		}

		new Swiper(swiperEl, swiperParams);
	};

	const initSections = () => {
		document.querySelectorAll(".product-showcase").forEach((section) => {
			initSlider(section.closest(".shopify-section") || section);
		});
	};

	document.addEventListener("DOMContentLoaded", initSections);
	document.addEventListener("shopify:section:load", (e) => {
		initSlider(e.target);
	});
})();
