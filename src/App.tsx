import * as THREE from "three";
import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Reflector, Text, useTexture, useGLTF } from "@react-three/drei";

export default function App() {
  return (
    <Canvas gl={{ alpha: false }} camera={{ position: [0, 3, 100], fov: 15 }}>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <Carla
            rotation={[0, Math.PI - 0.4, 0]}
            position={[-1.2, 0, 0.6]}
            scale={[0.26, 0.26, 0.26]}
          />
          <VideoText position={[0, 2.0, -2]} />
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Intro />
      </Suspense>
    </Canvas>
  );
}

function Carla(props: any) {
  const { scene } = useGLTF("/carla-draco.glb");
  return <primitive object={scene} {...props} />;
}

function VideoText(props: any) {
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Make the color flash but stay in white-ish range longer
    const colorValue = Math.min(1, Math.abs(Math.sin(elapsedTime * 0.5)));

    const color = new THREE.Color(colorValue, colorValue, colorValue);
    if (materialRef.current) {
      materialRef.current.color = color;
    }
  });

  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      pysr
      <meshBasicMaterial
        ref={materialRef}
        attach="material"
        color="white"
        transparent
        opacity={0.9}
      />
    </Text>
  );
}

function Ground() {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}
