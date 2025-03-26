console.clear();

$(document).ready(function () {
   gsap
      .timeline({
         scrollTrigger: {
            trigger: "#texto1 span",
            scrub: 0.3,
            start: "top 40%",
            end: "top 20%"
            //markers:true
         }
      })
      .to("#texto1 span", {
         opacity: "1",
         duration: 1,
         ease: "none",
         stagger: 1
      });

   const myspans = gsap.utils.toArray(".changeopacity");

   myspans.forEach((changeOpacity) => {
      const spans = changeOpacity.querySelectorAll("span");
      gsap
         .timeline({
            scrollTrigger: {
               trigger: spans,
               scrub: 0.3,
               start: "top 40%",
               end: "top 20%",
               markers: true
            }
         })
         .to(spans, {
            opacity: 1,
            duration: 1,
            ease: "none",
            stagger: 1
         });
   });
});
function sendHeight() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ type: "setIframeHeight", height }, "*");
  }

  window.addEventListener("load", sendHeight);
  window.addEventListener("resize", sendHeight);

  // In case your GSAP animation affects height after scroll
  setInterval(sendHeight, 1000); // Optional, if height changes frequently

  // Enable ScrollTrigger to use parent scroll
if (window.parent !== window) {
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          window.parent.scrollTo(0, value);
        }
        return window.parent.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.parent.innerWidth,
          height: window.parent.innerHeight
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed"
    });
  
    // Update on parent scroll
    window.parent.addEventListener("scroll", () => ScrollTrigger.update());
  
    // Update on resize
    window.parent.addEventListener("resize", () => ScrollTrigger.update());
  }
  // ScrollTrigger-specific test
ScrollTrigger.create({
    trigger: "#texto1",
    start: "top center",
    end: "bottom center",
    markers: true,
    onEnter: () => console.log("Entered section #texto1")
  });
  