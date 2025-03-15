import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/medias/sphere1.glb");
  const { viewport, size } = useThree();
  const sphere = useRef(null);

  useFrame(() => {
    if (sphere.current) {
      sphere.current.rotation.y += 0.005; // Slower speed
      sphere.current.rotation.x += 0.002; // Slower speed
    }
  });

  // Convert 300px to world units
  const pixelToWorldRatio = viewport.width / size.width; 
  const desiredWorldSize = 190 * pixelToWorldRatio; // Keeps sphere ~300px

  // Set text size relative to the sphere size
  const textSize = 100 * pixelToWorldRatio; // Make text larger (~50px equivalent)

  return (
    <group scale={[desiredWorldSize, desiredWorldSize, desiredWorldSize]}>
      <Text
        font="/fonts/PPNeueMontreal-Bold.otf"
        position={[0, 0.0, -1]} // Adjust position if needed
        fontSize={textSize} // Increased font size
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        IMPACTION
      </Text>
      <mesh ref={sphere} geometry={nodes.Icosphere?.geometry}>
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
