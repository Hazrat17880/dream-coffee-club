"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, -0.5, 0]}
    />
  );
}

export default function Model3D({ modelPath }) {
  return (
    <Canvas
      className="w-[52px] h-[52px]"
      camera={{ position: [0, 0, 3], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 2]} intensity={2} />

      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>

      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}