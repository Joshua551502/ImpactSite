import { useEffect, useState } from "react";

export default function PacmanEmbed() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "hidden" }}>
      <iframe
        src="/pacman/index.htm"
        title="Pacman Game"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
