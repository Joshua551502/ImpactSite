var slideshow_container = document.getElementById("slideshow-container"),
  slides_container = document.getElementById("slides-container"),
  previous_arrow = document.getElementById("previous-arrow"),
  next_arrow = document.getElementById("next-arrow");

$(document).ready(function () {
  slideshow_container.classList.add("animation-reveal");
  $(".text").css("opacity", "0");
  $(".image").css("opacity", "0");
  $(".image1").css("opacity", "0");
  $(".image2").css("opacity", "0");
  $(".previous-arrow").css("opacity", "0");
  $(".next-arrow").css("opacity", "0");
  $(".slideshow-container").css("visibility", "visible");
  setTimeout(() => {
    slideshow_container.classList.remove("animation-reveal");
    $(".text").css("opacity", "1");
    $(".image").css("opacity", "1");
    $(".image1").css("opacity", "1");
    $(".image2").css("opacity", "1");
    $(".previous-arrow").css("opacity", "0.8");
    $(".next-arrow").css("opacity", "0.8");
  }, 1000);
});

const bg_color_options = ["#88D3CE", "#FF85A1", "#88D3CE", "#FF85A1"];
//const text_color_options = ["#000", "#fff", "#000", "#fff"];
const arrow_color_options = [
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23fff'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23fff'%3E%3C/polygon%3E%3C/svg%3E",
];
var k = 0;

function slide(
  slideshow_container,
  slides_container,
  previous_arrow,
  next_arrow
) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = slides_container.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = slides_container.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  slides_container.appendChild(cloneFirst);
  slides_container.insertBefore(cloneLast, firstSlide);
  slideshow_container.classList.add("loaded");

  slides_container.onmousedown = dragStart;

  slides_container.addEventListener("touchstart", dragStart);
  slides_container.addEventListener("touchend", dragEnd);
  slides_container.addEventListener("touchmove", dragAction);

  slideshow_container.style.background = bg_color_options[k];
  $(".previous-arrow").css(
    "background-image",
    'url("' + arrow_color_options[k] + '")'
  );
  $(".next-arrow").css(
    "background-image",
    'url("' + arrow_color_options[k] + '")'
  );
  //$(".text").css("color", text_color_options[k]);

  previous_arrow.addEventListener("click", function () {
    shiftSlide(-1);
    mouse.moved = false;

    slideshow_container.classList.add("animation-next");
    setTimeout(() => {
      slideshow_container.classList.remove("animation-next");
    }, 650);

    if (k === 0) {
      k = bg_color_options.length;
    }
    k = k - 1;
    slideshow_container.style.background = bg_color_options[k];
    $(".previous-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".next-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    //$(".text").css("color", text_color_options[k]);
  });

  next_arrow.addEventListener("click", function () {
    shiftSlide(1);
    mouse.moved = false;

    slideshow_container.classList.add("animation-previous");
    setTimeout(() => {
      slideshow_container.classList.remove("animation-previous");
    }, 650);

    k = k + 1;
    k = k % bg_color_options.length;
    slideshow_container.style.background = bg_color_options[k];
    $(".previous-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    $(".next-arrow").css(
      "background-image",
      'url("' + arrow_color_options[k] + '")'
    );
    //$(".text").css("color", text_color_options[k]);
  });

  function autoAdvanceSlide() {
    next_arrow.click(); // Simulate a click on the Next button
  }

  setTimeout(() => {
    autoAdvanceSlide();
  }, 100);

  let autoScroll = setInterval(() => {
    autoAdvanceSlide();
  }, 5000);
  
  // Pause auto-scroll when hovering over the slideshow
  slideshow_container.addEventListener("mouseenter", () => {
    clearInterval(autoScroll);
  });
  
  slideshow_container.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => {
      autoAdvanceSlide();
    }, 5000);
  });
  

  slides_container.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = slides_container.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    slides_container.style.left = slides_container.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = slides_container.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
      slideshow_container.classList.add("animation-previous");
      setTimeout(() => {
        slideshow_container.classList.remove("animation-previous");
      }, 650);
      k = k + 1;
      k = k % bg_color_options.length;
      slideshow_container.style.background = bg_color_options[k];
      $(".previous-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".next-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      //$(".text").css("color", text_color_options[k]);
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
      slideshow_container.classList.add("animation-next");
      setTimeout(() => {
        slideshow_container.classList.remove("animation-next");
      }, 650);
      if (k === 0) {
        k = bg_color_options.length;
      }
      k = k - 1;
      slideshow_container.style.background = bg_color_options[k];
      $(".previous-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      $(".next-arrow").css(
        "background-image",
        'url("' + arrow_color_options[k] + '")'
      );
      //$(".text").css("color", text_color_options[k]);
    } else {
      slides_container.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(direction, action) {
    slides_container.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = slides_container.offsetLeft;
      }

      if (direction == 1) {
        slides_container.style.left = posInitial - slideSize + "px";
        index++;
      } else if (direction == -1) {
        slides_container.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    slides_container.classList.remove("shifting");

    if (index == -1) {
      slides_container.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      slides_container.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}
slide(slideshow_container, slides_container, previous_arrow, next_arrow);

//---___---___---___---___---___---___---___---___---//
var slideshow_parameters = $(".slideshow-container")[0].getBoundingClientRect();
var mouse = { x: 0, y: 0, moved: false };

$(".slideshow-container").mousemove(function (e) {
  mouse.moved = true;
  mouse.x = e.clientX - slideshow_parameters.left;
  mouse.y = e.clientY - slideshow_parameters.top;
});

$(".slideshow-container").mouseleave(function (e) {
  mouse.moved = false;
  mouse.x = e.clientX - slideshow_parameters.left;
  mouse.y = e.clientY - slideshow_parameters.top;
});

gsap.ticker.add(() => {
  if (mouse.moved) {
    parallaxIt(".image-container", 25);
    parallaxIt(".text", -65);
  } else {
    parallaxIt(".image-container", 0);
    parallaxIt(".text", 0);
  }
});

function parallaxIt(target, movement) {
  gsap.to(target, {
    x:
      ((mouse.x - slideshow_parameters.width / 2) /
        slideshow_parameters.width /
        2) *
      movement,
    y:
      ((mouse.y - slideshow_parameters.height / 2) /
        slideshow_parameters.height /
        2) *
      movement,
    duration: 0.7,
    ease: "power2.out",
  });
}
