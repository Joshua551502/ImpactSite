import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const useSlideshow = () => {
  const slideshowRef = useRef(null);
  const slidesRef = useRef(null);
  const prevArrowRef = useRef(null);
  const nextArrowRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const slideshowContainer = slideshowRef.current;
    if (!slideshowContainer) return;

    slideshowContainer.style.background = bgColorOptions[bgIndex];
    const slidesContainer = slidesRef.current;
    const prevArrow = prevArrowRef.current;
    const nextArrow = nextArrowRef.current;

    if (!slideshowContainer || !slidesContainer || !prevArrow || !nextArrow)
      return;

    let index = 0;
    let allowShift = true;
    const threshold = 100;
    let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal;

    const slides = slidesContainer.getElementsByClassName("slide");
    const slidesLength = slides.length;
    const slideSize = slides[0].offsetWidth;

    // Clone first and last slide for seamless transition
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slidesLength - 1].cloneNode(true);
    slidesContainer.appendChild(firstSlide);
    slidesContainer.insertBefore(lastSlide, slides[0]);

    // Set initial background
    slideshowContainer.style.background = bgColorOptions[bgIndex];

    // Arrow click events
    prevArrow.addEventListener("click", () => shiftSlide(-1));
    nextArrow.addEventListener("click", () => shiftSlide(1));

    // Drag functionality
    slidesContainer.onmousedown = dragStart;
    slidesContainer.addEventListener("touchstart", dragStart);
    slidesContainer.addEventListener("touchend", dragEnd);
    slidesContainer.addEventListener("touchmove", dragAction);
    slidesContainer.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
      e.preventDefault();
      posInitial = slidesContainer.offsetLeft;
      posX1 = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }

    function dragAction(e) {
      posX2 =
        posX1 - (e.type === "touchmove" ? e.touches[0].clientX : e.clientX);
      posX1 = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      slidesContainer.style.left = `${slidesContainer.offsetLeft - posX2}px`;
    }

    function dragEnd() {
      posFinal = slidesContainer.offsetLeft;
      if (posFinal - posInitial < -threshold) shiftSlide(1, "drag");
      else if (posFinal - posInitial > threshold) shiftSlide(-1, "drag");
      else slidesContainer.style.left = `${posInitial}px`;
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(direction, action) {
      if (allowShift) {
        posInitial = slidesContainer.offsetLeft;
        slidesContainer.classList.add("shifting");

        slidesContainer.style.left = `${posInitial - direction * slideSize}px`;
        index += direction;

        setBgIndex((prev) =>
          direction === 1
            ? (prev + 1) % bgColorOptions.length
            : prev === 0
            ? bgColorOptions.length - 1
            : prev - 1
        );
        slideshowContainer.style.background = bgColorOptions[bgIndex];

        allowShift = false;
      }
    }

    function checkIndex() {
      slidesContainer.classList.remove("shifting");

      if (index === -1) {
        slidesContainer.style.left = `-${slidesLength * slideSize}px`;
        index = slidesLength - 1;
      }

      if (index === slidesLength) {
        slidesContainer.style.left = `-${1 * slideSize}px`;
        index = 0;
      }

      allowShift = true;
    }

    return () => {
      prevArrow.removeEventListener("click", () => shiftSlide(-1));
      nextArrow.removeEventListener("click", () => shiftSlide(1));
      slidesContainer.removeEventListener("mousedown", dragStart);
      slidesContainer.removeEventListener("touchstart", dragStart);
      slidesContainer.removeEventListener("touchend", dragEnd);
      slidesContainer.removeEventListener("touchmove", dragAction);
      slidesContainer.removeEventListener("transitionend", checkIndex);
    };
  }, [bgIndex]);

  return { slideshowRef, slidesRef, prevArrowRef, nextArrowRef };
};

export default useSlideshow;
