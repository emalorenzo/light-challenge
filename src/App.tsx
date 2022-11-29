import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Box,
  Stats,
  OrbitControls,
  SpotLight,
  useDepthBuffer
} from "@react-three/drei";

function MovingSpot(props: any) {
  const vec = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const light = useRef<THREE.SpotLight>(null);
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    if (light.current) {
      light.current.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          (state.mouse.y * viewport.height) / 2,
          0
        ),
        0.1
      );
      // light.current.position.l

      light.current.target.updateMatrixWorld();
    }
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  );
}

function Scene() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  return (
    <>
      <color attach="background" args={["#202020"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Stats />
      <OrbitControls />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#0c8cbf"
        position={[0, 0, 2]}
      />
    </>
  );
}

export default function App() {
  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ position: [0, 2, 50], fov: 12 }}
    >
      <Scene />
    </Canvas>
  );
}
