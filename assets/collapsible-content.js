(function () {
	const initCollapsibleContent = () => {
		$(".collapsible-content__toggle").unbind("click").on("click", function () {
			const parent = $(this).parent();
			const superParent = $(this).parent().parent();

			if (!parent.hasClass("active")) {
				superParent.siblings(".collapsible-content__item").children(".collapsible-content__item--main.active").removeClass("active")
				parent.addClass("active");
				$(this)
					.closest(".collapsible-content__items")
					.find(".collapsible-content__answer")
					.stop()
					.slideUp(300);
				$(this).next().stop().slideDown(300);
			} else {
				superParent.siblings(".collapsible-content__item").children(".collapsible-content__item--main.active").removeClass("active")
					superParent
					.closest(".collapsible-content__items")
					.find(".collapsible-content__answer")
					.stop()
					.slideUp(300);
				parent.removeClass("active");
				$(this).next().stop().slideUp(300);
			}
		});
	};

	document.addEventListener("shopify:section:load", function () {
		initCollapsibleContent();
	});

	initCollapsibleContent();
})();
