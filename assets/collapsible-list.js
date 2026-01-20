(function () {
  const initCollapsibleContent = () => {
    $(".collapsible-list__toggle")
      .unbind("click")
      .on("click", function () {
        const parent = $(this).parent();
        const superParent = $(this).parent().parent();

        if (!parent.hasClass("active")) {
          superParent
            .siblings(".collapsible-list__item")
            .children(".collapsible-list__item--main.active")
            .removeClass("active");
          parent.addClass("active");
          $(this)
            .closest(".collapsible-list__items")
            .find(".collapsible-list__answer")
            .stop()
            .slideUp(300);
          $(this).next().stop().slideDown(300);
        } else {
          superParent
            .siblings(".collapsible-list__item")
            .children(".collapsible-list__item--main.active")
            .removeClass("active");
          superParent
            .closest(".collapsible-list__items")
            .find(".collapsible-list__answer")
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
