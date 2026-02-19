"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

interface FloatingGeometryProps {
  position?: [number, number, number]
  scale?: number
  speed?: number
  color?: string
  geometry?: "sphere" | "torus" | "octahedron" | "icosahedron"
}

export function FloatingGeometry({
  position = [0, 0, 0],
  scale = 1,
  speed = 1,
  color = "#00f0ff",
  geometry = "icosahedron",
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    meshRef.current.rotation.y += 0.003 * speed
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
  })

  const GeometryComponent = {
    sphere: <sphereGeometry args={[1, 32, 32]} />,
    torus: <torusGeometry args={[1, 0.4, 16, 100]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    icosahedron: <icosahedronGeometry args={[1, 1]} />,
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {GeometryComponent[geometry]}
      <MeshDistortMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        distort={0.2}
        speed={2}
      />
    </mesh>
  )
}
