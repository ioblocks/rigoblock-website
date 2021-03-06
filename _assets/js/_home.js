$(function() {
  "use strict";
  var $home = $("body.home");
  if ($home.length === 0) {
    return;
  }

  var $window = $(window);
  var $nav = $("header");
  var windowHeight;
  var sticky = false;
  var $root = $("html, body");
  // var $subnav = $("#grg-token-menu")
  //   .find("ul li ul")
  //   .addBack("#grg-token-menu");

  var $subnav = $nav.find("ul li ul");

  var $discover = $(".discover-more");

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return (
      // elemBottom >= docViewTop &&
      // elemTop <= docViewBottom &&
      // elemBottom <= docViewBottom &&
      // elemTop >= docViewTop
      docViewTop + 5 >= elemTop
    );
  }

  var setSizes = function() {
    windowHeight = $window.height();
  };

  var scrollCB = function() {
    var currentScroll = $window.scrollTop();
    var newSticky = currentScroll >= windowHeight;
    if (newSticky != sticky) {
      if (newSticky) {
        $nav.addClass("sticky");
        // $subnav.eq(0).slideDown();
      } else {
        $nav.removeClass("sticky");
        // $subnav.slideUp();
      }
      sticky = newSticky;
    }

    if (
      isScrolledIntoView($("#project-01-concept")) &&
      !isScrolledIntoView($("#grgtoken-07-grgtoken"))
    ) {
      // alert("visible");
      $subnav.eq(1).slideUp();
      $subnav.eq(0).slideDown();
    }

    if (
      isScrolledIntoView($("#grgtoken-07-grgtoken")) &&
      !isScrolledIntoView($("#grgtoken-08-utility"))
    ) {
      // alert("visible");
      $subnav.eq(0).slideUp();
      $subnav.eq(1).slideDown();
    }

    if (isScrolledIntoView($("#grgtoken-08-utility"))) {
      let bottomPosition =
        $("#grgtoken-08-utility").offset().top +
        $("#grgtoken-08-utility").outerHeight();
      var docViewTop = $(window).scrollTop();
      if (bottomPosition > docViewTop) {
        $subnav.eq(1).slideUp();
      }
    }
  };

  var discoverMore = function(e) {
    e.preventDefault();
    var scrollTop = $("#project-01-concept").offset().top;
    $root.animate(
      {
        scrollTop: scrollTop
      },
      500
    );
  };

  $window.on("assets-loaded", function() {
    setSizes();
    $window.on("scroll", scrollCB);
    $window.on("resize", setSizes);
    $discover.on("click", discoverMore);
    scrollCB();
  });
});
