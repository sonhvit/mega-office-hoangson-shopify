(function () {
	function swiperInit() {
		subSliderInit(true, 8);
		sliderInit(true);
		popupSliderInit(true);
	}

	document.addEventListener('shopify:section:load', function (e) {
		swiperInit();
	});

	swiperInit();
	//setTimeout(function () {
	//		swiperInit();
	//}, 1);
})();
