"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function SceneCamera() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3(0, 1, 8))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  useFrame(() => {
    const mx = (mouse.current.x / window.innerWidth - 0.5) * 2
    const my = (mouse.current.y / window.innerHeight - 0.5) * 2

    target.current.x = THREE.MathUtils.lerp(target.current.x, mx * 1.5, 0.02)
    target.current.y = THREE.MathUtils.lerp(target.current.y, 1 + my * -0.8, 0.02)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}
