import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props: any) {
  const group = React.useRef(null)
  const { nodes, materials, animations } = useGLTF('/models/mini.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // アニメーションが存在する場合は再生
    if (animations.length > 0 && actions) {
      // 最初のアニメーションを取得
      const actionNames = Object.keys(actions)
      if (actionNames.length > 0) {
        const actionName = actionNames[0]
        console.log('Playing animation:', actionName)
        if (actions[actionName]) {
          actions[actionName].reset().fadeIn(0.5).play()
        }
      }
    }
  }, [actions, animations])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Scene || nodes.Armature || Object.values(nodes)[0]} />
    </group>
  )
}

useGLTF.preload('/models/mini.glb')
