"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas>
      <ambientLight />
      {/* point light that points to the center of the scene from bottom left */}
      <pointLight position={[-2, -2, 1]} intensity={50} />
      {/* point light that points to the center of the scene from bottom right */}
      <pointLight position={[2, 2, 1]} intensity={50} />
    </Canvas>
  );
}
