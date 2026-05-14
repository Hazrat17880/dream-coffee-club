"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/menupage/burger/burger.glb");
  return <primitive object={scene} scale={2} />;
}

export default function BurgerModel() {
  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />

      <Model />

      <OrbitControls />
    </Canvas>
  );
}