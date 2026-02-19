"use client"

import { Grid } from "@react-three/drei"

export function GridFloor() {
  return (
    <Grid
      position={[0, -3, 0]}
      args={[50, 50]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#0a3d5c"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#00f0ff"
      fadeDistance={30}
      fadeStrength={1}
      followCamera={false}
      infiniteGrid
    />
  )
}
