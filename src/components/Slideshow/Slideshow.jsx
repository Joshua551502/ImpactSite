import React, { useEffect, useRef, useState } from "react";
import styles from "./Slideshow.scss";
import { gsap } from "gsap";

const bgColorOptions = ["#88D3CE", "#FF85A1", "#88D3CE", "#FF85A1"];
const arrowColorOptions = [
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23000'%3E%3C/polygon%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256'%3E%3Cpolygon points='225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093' fill='%23fff'%3E%3C/polygon%3E%3C/svg%3E",
];

const Slideshow = () => {
    const slideshowRef = useRef(null);
    const slidesRef = useRef(null);
    const prevArrowRef = useRef(null);
    const nextArrowRef = useRef(null);
    const [bgIndex, setBgIndex] = useState(0);
  
    useEffect(() => {
      if (!slideshowRef.current || !slidesRef.current || !prevArrowRef.current || !nextArrowRef.current) return;
  
      const slideshowContainer = slideshowRef.current;
      const slidesContainer = slidesRef.current;
      const prevArrow = prevArrowRef.current;
      const nextArrow = nextArrowRef.current;
  
      let index = 0;
      let allowShift = true;
      const threshold = 100;
      let posX1 = 0, posX2 = 0, posInitial, posFinal;
  
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
      const prevArrowClick = () => shiftSlide(-1);
      const nextArrowClick = () => shiftSlide(1);
  
      prevArrow.addEventListener("click", prevArrowClick);
      nextArrow.addEventListener("click", nextArrowClick);
  
      function shiftSlide(direction) {
        if (allowShift) {
          posInitial = slidesContainer.offsetLeft;
          slidesContainer.classList.add("shifting");
  
          slidesContainer.style.left = `${posInitial - direction * slideSize}px`;
          index += direction;
  
          setBgIndex((prev) => (prev + direction + bgColorOptions.length) % bgColorOptions.length);
        }
      }
  
      function dragStart(e) {
        e.preventDefault();
        posInitial = slidesContainer.offsetLeft;
        posX1 = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
  
      function dragAction(e) {
        posX2 = posX1 - (e.type === "touchmove" ? e.touches[0].clientX : e.clientX);
        posX1 = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        slidesContainer.style.left = `${slidesContainer.offsetLeft - posX2}px`;
      }
  
      function dragEnd() {
        posFinal = slidesContainer.offsetLeft;
        if (posFinal - posInitial < -threshold) shiftSlide(1);
        else if (posFinal - posInitial > threshold) shiftSlide(-1);
        else slidesContainer.style.left = `${posInitial}px`;
        document.onmouseup = null;
        document.onmousemove = null;
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
  
      slidesContainer.onmousedown = dragStart;
      slidesContainer.addEventListener("touchstart", dragStart);
      slidesContainer.addEventListener("touchend", dragEnd);
      slidesContainer.addEventListener("touchmove", dragAction);
      slidesContainer.addEventListener("transitionend", checkIndex);
  
      return () => {
        prevArrow.removeEventListener("click", prevArrowClick);
        nextArrow.removeEventListener("click", nextArrowClick);
        slidesContainer.removeEventListener("mousedown", dragStart);
        slidesContainer.removeEventListener("touchstart", dragStart);
        slidesContainer.removeEventListener("touchend", dragEnd);
        slidesContainer.removeEventListener("touchmove", dragAction);
        slidesContainer.removeEventListener("transitionend", checkIndex);
      };
    }, [bgIndex]);
  
    useEffect(() => {
      if (slideshowRef.current) {
        slideshowRef.current.style.visibility = "visible";
      }
    }, []);
  
    return (
  
    <div
      id="slideshow-container"
      ref={slideshowRef}
      className="slideshow-container"
    >
      <div className="slides-styler-wrapper">
        <div id="slides-container" ref={slidesRef} className="slides-container">
          <div class="slide">
            <div class="image-container layer1">
              <div
                class="image image1"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/CUUB%20PNK.png)",
                }}
              ></div>
            </div>
            <span class="text layer2 color1">CUBE X2</span>
            <div class="image-container layer3">
              <div
                class="image image2"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/CUUB%20PNK.png)",
                }}
              ></div>
            </div>
          </div>

          <div class="slide">
            <span class="text layer1 color2">CUBE</span>
            <div class="image-container layer2">
              <div
                class="image"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/CUUB%20PNK.png)",
                }}
              ></div>
            </div>
          </div>

          <div class="slide">
            <div class="image-container layer1">
              <div
                class="image image1"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/SPHEER%20PNK.png)",
                }}
              ></div>
            </div>
            <span class="text layer2 color1">SPHERE X2</span>
            <div class="image-container layer3">
              <div
                class="image image2"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/SPHEER%20PNK.png)",
                }}
              ></div>
            </div>
          </div>

          <div class="slide">
            <span class="text layer1 color2">SPHERE</span>
            <div class="image-container layer2">
              <div
                class="image"
                style={{
                  backgroundImage:
                    "url(https://raw.githubusercontent.com/RaduBratan/CodePen-TweenMax-slider-assets/master/SPHEER%20PNK.png)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="previous-arrow"
        ref={prevArrowRef}
        className="previous-arrow"
      ></div>
      <div id="next-arrow" ref={nextArrowRef} className="next-arrow"></div>
    </div>
  );
};

export default Slideshow;
