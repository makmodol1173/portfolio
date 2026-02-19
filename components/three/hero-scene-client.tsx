"use client"

import dynamic from "next/dynamic"

const HeroScene = dynamic(
  () =>
    import("@/components/three/hero-scene").then((mod) => ({
      default: mod.HeroScene,
    })),
  { ssr: false }
)

export function HeroSceneClient() {
  return <HeroScene />
}
