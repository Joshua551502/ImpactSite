import { useEffect, useState } from "react";

export default function CandyCrushEmbed() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
