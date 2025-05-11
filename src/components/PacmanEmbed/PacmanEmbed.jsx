// components/PacmanEmbed.jsx
export default function PacmanEmbed() {
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
  