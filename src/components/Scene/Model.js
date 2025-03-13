import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/medias/sphere1.glb");
  const { viewport } = useThree();
  const sphere = useRef(null);

  useFrame(() => {
    if (sphere.current) {
      sphere.current.rotation.y += 0.005; // Slower speed (was 0.02)
      sphere.current.rotation.x += 0.002; // Slower speed (was 0.02)
    }
  });

  // Hardcoded material properties instead of using Leva sliders
  const materialProps = {
    thickness: 0.85,
    roughness: 0.2,
    transmission: 1,
    ior: 0.9,
    chromaticAberration: 0.25,
    backside: true,
  };

  return (
    <group scale={viewport.width / 3.75}>
      <Text
        font="/fonts/PPNeueMontreal-Bold.otf"
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        IMPACTION
      </Text>
      <mesh ref={sphere} geometry={nodes.Icosphere?.geometry} scale={0.3}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
