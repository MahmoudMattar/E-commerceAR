$(document).ready(function () {
  $(".slider-head").owlCarousel({
    autoplay: true,
    rtl: true,
    loop: true,
    nav: true,
    items: 1,
    navText: [
      "<i class='fa fa-angle-right' aria-hidden='true'></i>",
      "<i class='fa fa-angle-left' aria-hidden='true'></i>",
    ],
  });

  $(".side-sell").owlCarousel({
    autoplay: false,
    rtl: true,
    margin: 5,
    loop: true,
    nav: false,
    dots: true,
    // navText: ["<i class='fas fa-long-arrow-alt-right' aria-hidden='true'></i>","<i class='fas fa-long-arrow-alt-left' aria-hidden='true'></i>"],
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1199: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    },
  });

  $(".button-mob").click(function () {
    $(".mob-nav").addClass("open");
    $(".moboverlay").fadeIn("fast");
    $("body").addClass("ovh");
  });

  $(".mob-nav i").click(function () {
    $(".mob-nav").removeClass("open");
    $(".moboverlay").fadeOut("fast");
    $("body").removeClass("ovh");
  });
  $(".moboverlay").click(function () {
    $(".mob-nav i").trigger("click");
    $("body").removeClass("ovh");
  });
});
$(document).ready(function () {
  $(".slider-head").owlCarousel({
    autoplay: true,
    rtl: true,
    loop: true,
    nav: true,
    items: 1,
    navText: [
      "<i class='fa fa-angle-right' aria-hidden='true'></i>",
      "<i class='fa fa-angle-left' aria-hidden='true'></i>",
    ],
  });

  $(".side-sell").owlCarousel({
    autoplay: false,
    rtl: true,
    margin: 5,
    loop: true,
    nav: false,
    dots: true,
    // navText: ["<i class='fas fa-long-arrow-alt-right' aria-hidden='true'></i>","<i class='fas fa-long-arrow-alt-left' aria-hidden='true'></i>"],
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1199: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    },
  });

  $(".button-mob").click(function () {
    $(".mob-nav").addClass("open");
    $(".moboverlay").fadeIn("fast");
    $("body").addClass("ovh");
  });

  $(".mob-nav i").click(function () {
    $(".mob-nav").removeClass("open");
    $(".moboverlay").fadeOut("fast");
    $("body").removeClass("ovh");
  });
  $(".moboverlay").click(function () {
    $(".mob-nav i").trigger("click");
    $("body").removeClass("ovh");
  });
});
