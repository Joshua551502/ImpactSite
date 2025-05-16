import { useEffect, useState } from "react";

export default function CandyCrushEmbed() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true); // Only render game after DOM is available
  }, []);

  if (!canRender) return null;

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "hidden" }}>
      <iframe
        src="/candy-crush/index.html"
        title="Candy Crush Game"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
