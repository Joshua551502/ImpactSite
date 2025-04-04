import React, { useRef, useState, useEffect } from "react";
import {
  MeshTransmissionMaterial,
  useGLTF,
  Text,
  Line,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/medias/sphere1.glb");
  const { viewport, size, mouse } = useThree();
  const sphere = useRef(null);
  const text = useRef(null);

  // State for parallax effect
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Convert 300px to world units
  const pixelToWorldRatio = viewport.width / size.width;
  const desiredWorldSize = 170 * pixelToWorldRatio; // Keeps sphere ~300px
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
      <Text
        ref={text}
        font="/fonts/PlayfairDisplay-VariableFont_wght.ttf" // ✅ correct path
        position={[3, 1.0, -1]}
        fontSize={textSize} // ≈ 100px equivalent
        color="white"
        anchorX="center"
        anchorY="middle"
        letterSpacing={letterSpacing} // see below
      >
        IMPACTION
      </Text>

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
          ior={0.9}
          chromaticAberration={0.25}
          backside={true}
        />
      </mesh>
    </group>
  );
}
