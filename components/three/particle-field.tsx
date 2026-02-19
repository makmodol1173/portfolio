"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleFieldProps {
  count?: number
  spread?: number
  size?: number
  color?: string
}

export function ParticleField({
  count = 2000,
  spread = 25,
  size = 0.015,
  color = "#00f0ff",
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null!)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * spread
      pos[i3 + 1] = (Math.random() - 0.5) * spread
      pos[i3 + 2] = (Math.random() - 0.5) * spread
      vel[i3] = (Math.random() - 0.5) * 0.002
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return { positions: pos, velocities: vel }
  }, [count, spread])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const halfSpread = spread / 2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      arr[i3] += velocities[i3] * delta * 60
      arr[i3 + 1] += velocities[i3 + 1] * delta * 60
      arr[i3 + 2] += velocities[i3 + 2] * delta * 60

      // wrap around
      if (Math.abs(arr[i3]) > halfSpread) arr[i3] *= -0.95
      if (Math.abs(arr[i3 + 1]) > halfSpread) arr[i3 + 1] *= -0.95
      if (Math.abs(arr[i3 + 2]) > halfSpread) arr[i3 + 2] *= -0.95
    }
    posAttr.needsUpdate = true
    meshRef.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
