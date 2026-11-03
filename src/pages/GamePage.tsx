import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import TempleScene from '../game/world/TempleScene';
import ChibiCharacter from '../game/characters/ChibiCharacter';
import ThirdPersonCamera from '../game/camera/ThirdPersonCamera';
import KeyboardControls from '../game/controls/KeyboardControls';
import PlayerHud from '../components/PlayerHud';
import LoadingOverlay from '../components/LoadingOverlay';
import { useAppStore } from '../state/appStore';
import { isFirebaseConfigured } from '../firebase/client';

export default function GamePage() {
  const setStatus = useAppStore((s) => s.setStatus);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setStatus('CONFIG_REQUIRED');
    } else {
      setStatus('READY');
    }
  }, [setStatus]);

  return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#87CEEB',
          position: 'relative',
        }}
      >
        <Canvas
          shadows={false}
          camera={{ fov: 60, near: 0.1, far: 500, position: [0, 5, 30] }}
          gl={{ antialias: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} color="#FFF8E1" />
            <directionalLight
              position={[10, 20, 10]}
              intensity={1.1}
              color="#FFE0A0"
              castShadow={false}
            />
            <hemisphereLight args={['#87CEEB', '#8B6914', 0.45]} />
            <fog attach="fog" args={['#B8D4E8', 50, 180]} />
            <Physics gravity={[0, -9.81, 0]}>
              <KeyboardControls>
                <TempleScene />
                <ChibiCharacter />
                <ThirdPersonCamera />
              </KeyboardControls>
            </Physics>
          </Suspense>
        </Canvas>
        <PlayerHud />
        <LoadingOverlay />
      </div>
      );
}
