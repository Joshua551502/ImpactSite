import React, { useRef, useState, useEffect } from "react";
import {
  MeshTransmissionMaterial,
  useGLTF,
  Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model({ scrollY }) {
  const { nodes } = useGLTF("/medias/sphere3.glb");
  const { viewport, size } = useThree();
  const sphere = useRef(null);
  const textGroup = useRef(null);
  const lettersRef = useRef([]);

  const TEXT = "IMPACTION";
  const spacing = 1;

  // RESPONSIVE VALUES
  const [scaleFactor, setScaleFactor] = useState(1); // default 100%

  useEffect(() => {
    function updateScale() {
      const width = window.innerWidth;
      if (width <= 400) {
        setScaleFactor(0.55); // very small screen (e.g. portrait mobile)
      }
       else if (width <= 600) {
        setScaleFactor(0.65); // very small screen (e.g. portrait mobile)
      } else if (width <= 900) {
        setScaleFactor(0.8); // small tablet or large mobile
      } else if (width <= 1200) {
        setScaleFactor(0.8); // small desktop or tablet
      } else {
        setScaleFactor(1); // full size for larger screens
      }
    }
  
    updateScale(); // initial check
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);
  

  const pixelToWorldRatio = viewport.width / size.width;

  const desiredWorldSize = 165 * pixelToWorldRatio * scaleFactor;
  const textSize = 60 * pixelToWorldRatio * scaleFactor;

  // Parallax State
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate text scrolling
  useFrame(() => {
    lettersRef.current.forEach((ref, i) => {
      if (ref) {
        const speed = 0.0015;
        const baseY = 0;
        const scrollFactor = scrollY * speed;
        const targetY = baseY + scrollFactor;
        ref.position.y += (targetY - ref.position.y) * 0.1;
      }
    });
  });

  // Animate sphere rotation + parallax
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sphere.current) {
      sphere.current.rotation.y = time * 0.6 + parallax.x * 0.3;
      sphere.current.rotation.x = time * 0.05 + parallax.y * 0.3;
    }
    if (textGroup.current) {
      textGroup.current.position.x = parallax.x * 0.3;
      textGroup.current.position.y = parallax.y * 0.3;
    }
  });

  return (
    <group
      scale={[desiredWorldSize, desiredWorldSize, desiredWorldSize]}
      position={[0, 0.35, 0]}
    >
      {/* Text */}
      <group ref={textGroup} position={[0, 0.2, 0]}>
        {TEXT.split("").map((char, i) => {
          let offset = (i - (TEXT.length - 1) / 2) * textSize * spacing;

          // Manual tweaking for better centering
          if (char === "I") offset += textSize * 0.05;
          if (char === "P") offset -= textSize * -0.1;
          if (char === "T") offset -= textSize * -0.1;
          if (char === "I" && i === 6) offset += textSize * -0.1;
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
