"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { ParticleField } from "./particle-field"
import { FloatingGeometry } from "./floating-geometry"
import { GridFloor } from "./grid-floor"
import { SceneCamera } from "./scene-camera"

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneCamera />
          <fog attach="fog" args={["#0a0a14", 8, 30]} />
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#3b82f6" />

          <ParticleField count={1500} spread={20} size={0.012} />

          <FloatingGeometry
            position={[-3, 1, -2]}
            scale={0.8}
            speed={0.7}
            color="#00f0ff"
            geometry="icosahedron"
          />
          <FloatingGeometry
            position={[3.5, 0.5, -3]}
            scale={0.6}
            speed={0.5}
            color="#3b82f6"
            geometry="octahedron"
          />
          <FloatingGeometry
            position={[0, 2.5, -5]}
            scale={1.2}
            speed={0.3}
            color="#00f0ff"
            geometry="torus"
          />

          <GridFloor />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
