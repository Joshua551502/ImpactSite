// app/utils/fluidSetup.js

export function setupFluidSimulation(targetCanvas) {
    // Prevent duplicate injection
    if (document.getElementById("fluid-script")) return;
  
    const script = document.createElement("script");
    script.id = "fluid-script";
    script.src = "https://cdn.jsdelivr.net/gh/PavelDoGreat/WebGL-Fluid-Simulation@master/script.js";
    script.async = true;
  
    script.onload = () => {
      if (!targetCanvas) {
        console.warn("No canvas provided for fluid simulation.");
        return;
      }
  
      targetCanvas.id = "fluid-canvas";
      targetCanvas.style.position = "absolute";
      targetCanvas.style.top = 0;
      targetCanvas.style.left = 0;
      targetCanvas.style.width = "100%";
      targetCanvas.style.height = "100%";
      targetCanvas.style.pointerEvents = "none";
  
      if (!document.body.contains(targetCanvas)) {
        document.body.appendChild(targetCanvas);
      }
  
      window.canvas = targetCanvas;
  
      // Wait for `splat()` to exist, then splash
      function waitForSplatReady(callback, retries = 50) {
        if (typeof splat === "function") {
          callback();
        } else if (retries > 0) {
          setTimeout(() => waitForSplatReady(callback, retries - 1), 100);
        } else {
          console.warn("⚠️ Fluid engine didn't initialize 'splat' in time.");
        }
      }
  
      waitForSplatReady(() => {
        console.log("✅ Fluid ready. Splashing now...");
  
        for (let i = 0; i < 5; i++) {
          const x = Math.random();
          const y = Math.random();
          const dx = (Math.random() - 0.5) * 500;
          const dy = (Math.random() - 0.5) * 500;
          const color = [Math.random(), Math.random(), Math.random()];
          splat(x, y, dx, dy, color);
        }
  
        window.addEventListener("mousemove", (e) => {
          const bounds = targetCanvas.getBoundingClientRect();
          const x = (e.clientX - bounds.left) / bounds.width;
          const y = (e.clientY - bounds.top) / bounds.height;
          splat(x, y, 0, 0, [0.2, 1.0, 0.4]); // green trail
        });
      });
    };
  
    script.onerror = () => {
      console.error("❌ Failed to load fluid simulation script");
    };
  
    document.body.appendChild(script);
  }
  