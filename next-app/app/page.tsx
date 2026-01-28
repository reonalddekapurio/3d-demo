"use client"

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

function MiniModel(props: any) {
  const group = useRef(null)
  const gltf = useGLTF('/models/mini.glb')
  const { nodes, materials, animations, scene } = gltf
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    console.log("=== Model Loaded ===")
    console.log("Nodes:", nodes)
    console.log("Animations:", animations)
    console.log("Animation names:", names)
    console.log("Actions:", actions)
    console.log("Scene:", scene)
  }, [nodes, animations, names, actions, scene])

  useEffect(() => {
    if (actions && names && names.length > 0) {
      console.log("Attempting to play animation:", names[0])
      
      const action = actions[names[0]]
      if (action) {
        console.log("Action found, playing:", names[0])
        action.reset()
        action.play()
        console.log("Animation playing")
      } else {
        console.error("Action not found for:", names[0])
      }
    }
  }, [actions, names])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#242424' }}>
      <Canvas>
        <Stage environment="city" intensity={0.6}>
          <Suspense fallback={null}>
            <MiniModel />
          </Suspense>
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  )
}