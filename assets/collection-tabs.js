(function () {
	const collectionSlider = () => {
		const productSliders = Array.from(
			document.querySelectorAll(".collection-tabs")
		);
		if (productSliders.length === 0) return;
		productSliders.forEach((slider) => {
			if (slider.classList.contains("slider_started")) {
				return "";
			}
			slider.classList.add("slider_started");
			//const tabs = slider.querySelectorAll("[data-tab-target]");
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
			$(`#${sectionId} [id^="collection-tab-slider-"]`).each(function () {
				if (showArrows) {
					arrowsParm = {
						navigation: {
							//nextEl: `#${sectionId} .swiper-button-next`,
							//prevEl: `#${sectionId} .swiper-button-prev`,

							nextEl: $(this).find(".swiper-button-next")[0],
							prevEl: $(this).find(".swiper-button-prev")[0],
						},
						pagination: {
							//el: `#${sectionId} .products-slider-pagination`,
							el: $(this).find(".swiper-pagination")[0],
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
						769: {
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

				const swiper = new Swiper($(this).find(".swiper")[0], swiperParms);
			});
		});
	};

	function toBoolean(string) {
		return string === "true" ? true : false;
	}

	const animationCard = () => {
		document.querySelectorAll(".js-animation-card").forEach((card) => {
			const buttons = card.querySelector(".card-buttons");
			if (!buttons) return;

			const heightCard = card.getBoundingClientRect().height;
			const heightButtons = buttons.scrollHeight;
			//console.log(heightButtons)
			card.style.setProperty("--base-height", `${heightCard}px`);
			card.style.setProperty(
				"--open-height",
				`${heightCard + heightButtons + 34}px`
			);

			card.addEventListener("mouseover", () => {
				card.classList.add("hover");
			});

			card.addEventListener("mouseleave", () => {
				setTimeout(() => {
					card.classList.remove("hover");
				}, 300);
			});
		});
	};

	window.addEventListener("load", animationCard);

	const collectionTabs = () => {
		const tabsSections = document.querySelectorAll(".collection-tabs");

		tabsSections.forEach((tabSection) => {
			const tabs = tabSection.querySelectorAll("[data-tab-target]");
			const tabContents = tabSection.querySelectorAll("[data-tab-content]");

			const activateTab = (tab) => {
				const target = tabSection.querySelector(tab.dataset.tabTarget);

				tabContents.forEach((tabContent) => {
					tabContent.classList.remove("active");
					animationCard();
				});

				tabs.forEach((t) => {
					t.classList.remove("active");
					animationCard();
				});

				tab.classList.add("active");
				target.classList.add("active");
				animationCard();
			};

			tabs.forEach((tab) => {
				tab.addEventListener("click", () => {
					activateTab(tab);
				});

				tab.addEventListener("keydown", (e) => {
					if (e.key === "Enter") {
						activateTab(tab);
					}
				});
			});
		});
	};

	document.addEventListener("DOMContentLoaded", function () {
		collectionSlider();
		collectionTabs();
		document.addEventListener("shopify:section:load", function () {
			collectionSlider();
			collectionTabs();
		});
	});
})();
