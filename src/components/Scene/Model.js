import React, { useRef, useState, useEffect } from "react";
import {
  MeshTransmissionMaterial,
  useGLTF,
  Text,
  Line,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model({ scrollY }) {
  const { nodes } = useGLTF("/medias/sphere3.glb");
  const { viewport, size, mouse } = useThree();
  const sphere = useRef(null);
  const text = useRef(null);
  const lettersRef = useRef([]);
  const spacing = 1;
  const textGroup = useRef();

  const TEXT = "IMPACTION";
  const speedMap = [0.15, 0.25, 0.3, 0.4, 0.5, 0.6, 0.3, 0.2, 0.1]; // y1–y6 style

  const LETTERS = [
    { char: "I", offsetX: 0.2, speed: 1 },
    { char: "M", offsetX: -2.9, speed: 0.8 },
    { char: "P", offsetX: 0.2, speed: 1.5},
    { char: "A", offsetX: -1.5, speed: 0.6 },
    { char: "C", offsetX: 0.2, speed: 1.5 },
    { char: "T", offsetX: 0.2, speed: 0.6 },
    { char: "I", offsetX: 0.2, speed: 1.5 },
    { char: "O", offsetX: 1.6, speed: 1 },
    { char: "N", offsetX: 2.3, speed: 0.5 },
  ];
  

  useFrame(() => {
    lettersRef.current.forEach((ref, i) => {
      if (ref) {
        const { speed } = LETTERS[i];
        const baseY = 0; // anchor point
        const scrollFactor = scrollY * speed * 0.0015; // positive moves text up
        const targetY = baseY + scrollFactor;
        ref.position.y += (targetY - ref.position.y) * 0.1; // smooth interpolation
      }
    });
  });

  // State for parallax effect
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Convert 300px to world units
  const pixelToWorldRatio = viewport.width / size.width;
  const desiredWorldSize = 165 * pixelToWorldRatio; // Keeps sphere ~300px
  const textSize = 60 * pixelToWorldRatio; // Make text larger (~50px equivalent)
  const bgSize = 300 * pixelToWorldRatio; // Circle size (~300px)
  const letterSpacing = 15 * pixelToWorldRatio;

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setParallax({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (sphere.current) {
      const time = clock.getElapsedTime(); // Get the elapsed time for smooth animation

      // Automatic slow rotation
      sphere.current.rotation.y = time * 0.6; // Adjust speed as needed
      sphere.current.rotation.x = time * 0.05;

      // Apply parallax effect on top of the automatic rotation
      sphere.current.rotation.y += parallax.x * 0.3; // Adjust sensitivity
      sphere.current.rotation.x += parallax.y * 0.3;
    }

    if (text.current) {
      // Apply parallax effect ONLY to text position (circle remains fixed)
      text.current.position.x = parallax.x * 0.3;
      text.current.position.y = parallax.y * 0.3;
    }
  });

  useFrame(({ clock }) => {
    if (sphere.current) {
      const time = clock.getElapsedTime();
  
      sphere.current.rotation.y = time * 0.6;
      sphere.current.rotation.x = time * 0.05;
  
      sphere.current.rotation.y += parallax.x * 0.3;
      sphere.current.rotation.x += parallax.y * 0.3;
    }
  
    if (textGroup.current) {
      textGroup.current.position.x = parallax.x * 0.3;
      textGroup.current.position.y = parallax.y * 0.3;
    }
  });

  // Generate circular points for the border (static)
  const circlePoints = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    circlePoints.push([
      Math.cos(angle) * (bgSize * 0.67),
      Math.sin(angle) * (bgSize * 0.67),
      0,
    ]);
  }

  return (
    <group
      scale={[desiredWorldSize, desiredWorldSize, desiredWorldSize]}
      position={[0, 0.35, 0]}
    >
      {/* Circular Border (STATIC - never moves) */}
      {/* <Line
        points={circlePoints}
        color="#0DA388"
        lineWidth={3} // Controls border thickness
        position={[0, 0.1, -1.1]} // Always centered, never moves
      /> */}

      {/* Text (MOVES with parallax) */}
      <group ref={textGroup} position={[0, 0.2, 0]}>
      {TEXT.split("").map((char, i) => {
  let offset = (i - (TEXT.length - 1) / 2) * textSize * spacing;

  // Individual visual tweaks
  if (char === "I") offset += textSize * 0.05;
  if (char === "M") offset -= textSize * 0;
  if (char === "P") offset -= textSize * -0.1;
  if (char === "A") offset += textSize * 0;
  if (char === "T") offset -= textSize * -0.1;
  if (char === "I" && i === 6) offset += textSize * -0.1; // Second "I"
  if (char === "O") offset -= textSize * 0.15;
  if (char === "N") offset -= textSize * 0.15;

  return (
    <Text
      key={i}
      ref={(el) => (lettersRef.current[i] = el)}
      font="/fonts/PlayfairDisplay-VariableFont_wght.ttf"
      fontSize={textSize}
      position={[offset, 0, -1]}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {char}
    </Text>
  );
})}


      </group>

      {/* Sphere */}
      <mesh
        ref={sphere}
        geometry={nodes.Icosphere?.geometry}
        position={[0, -0.0, 0]}
      >
        <MeshTransmissionMaterial
          thickness={0.85}
          roughness={0.2}
          transmission={1}
          ior={0.95}
          chromaticAberration={0.2}
          backside={true}
        />
      </mesh>
    </group>
  );
}
