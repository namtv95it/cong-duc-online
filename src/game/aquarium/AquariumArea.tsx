import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { type Group } from 'three';

interface FishProps {
  baseX: number;
  baseY: number;
  baseZ: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  color: string;
  scale?: number;
}

function Fish({
  baseX,
  baseY,
  baseZ,
  orbitRadius,
  orbitSpeed,
  phase,
  color,
  scale = 1,
}: FishProps) {
  const groupRef = useRef<Group>(null);
  const tRef = useRef(phase);

  useFrame((_, delta) => {
    tRef.current += delta * orbitSpeed;
    const t = tRef.current;
    if (!groupRef.current) return;

    // Quỹ đạo bơi elip mượt mà bên trong thành kính
    groupRef.current.position.x = baseX + Math.cos(t) * orbitRadius;
    groupRef.current.position.y = baseY + Math.sin(t * 0.7) * 0.12;
    groupRef.current.position.z = baseZ + Math.sin(t) * orbitRadius * 0.45;

    // Hướng đầu cá theo vận tốc
    groupRef.current.rotation.y =
      Math.atan2(-Math.sin(t) * orbitRadius, Math.cos(t) * orbitRadius * 0.45) + Math.PI;

    // Vẫy đuôi
    groupRef.current.rotation.z = Math.sin(t * 5.0) * 0.16;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.12, 7, 5]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      <mesh position={[0.1, 0.01, 0]}>
        <sphereGeometry args={[0.08, 6, 4]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.28]}>
        <coneGeometry args={[0.08, 0.14, 4]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
      <mesh position={[0.02, 0.09, 0]} rotation={[0, 0, 0.18]}>
        <coneGeometry args={[0.03, 0.08, 3]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
    </group>
  );
}

function AquaticPlant({ x, z, phase = 0 }: { x: number; z: number; phase?: number }) {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.9 + phase) * 0.07;
    }
  });

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[i * 0.07 - 0.07, 0.18 + i * 0.08, 0]}
          rotation={[0, i * 0.85, Math.sin(i * 1.1) * 0.2]}
        >
          <coneGeometry args={[0.045, 0.35 + i * 0.05, 4]} />
          <meshStandardMaterial color="#427F51" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function GlassPanel({ position, args }: { position: [number, number, number]; args: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color="#A8D4DC"
        transparent
        opacity={0.2}
        roughness={0.0}
        metalness={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AquariumArea() {
  const bx = 23;
  const bz = -12;
  const W = 3.6;
  const H = 1.35;
  const D = 1.65;
  const floorY = 0.83;

  const fishList: FishProps[] = [
    { baseX: bx, baseY: floorY + H * 0.35, baseZ: bz, orbitRadius: 0.88, orbitSpeed: 0.85, phase: 0, color: '#E6A65C' },
    { baseX: bx, baseY: floorY + H * 0.55, baseZ: bz, orbitRadius: 0.68, orbitSpeed: 1.15, phase: 2.1, color: '#5DB7D5' },
    { baseX: bx, baseY: floorY + H * 0.28, baseZ: bz, orbitRadius: 1.0, orbitSpeed: 0.65, phase: 4.2, color: '#E6A65C', scale: 0.85 },
    { baseX: bx, baseY: floorY + H * 0.65, baseZ: bz, orbitRadius: 0.58, orbitSpeed: 1.3, phase: 1.0, color: '#F0C27A', scale: 0.9 },
    { baseX: bx, baseY: floorY + H * 0.45, baseZ: bz, orbitRadius: 0.8, orbitSpeed: 0.95, phase: 3.5, color: '#5DB7D5', scale: 0.8 },
  ];

  return (
    <group>
      {/* Bệ gỗ kê bể */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[bx, 0.42, bz]}>
          <boxGeometry args={[W + 0.5, 0.84, D + 0.5]} />
          <meshStandardMaterial color="#5C3D1E" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Đáy bể */}
      <mesh position={[bx, floorY, bz]}>
        <boxGeometry args={[W, 0.07, D]} />
        <meshStandardMaterial color="#6B5742" roughness={0.92} />
      </mesh>

      {/* Lớp sỏi nền */}
      <mesh position={[bx, floorY + 0.06, bz]}>
        <boxGeometry args={[W - 0.06, 0.08, D - 0.06]} />
        <meshStandardMaterial color="#8B7355" roughness={1} />
      </mesh>

      {/* Khối nước trong bể */}
      <mesh position={[bx, floorY + H / 2, bz]}>
        <boxGeometry args={[W - 0.09, H, D - 0.09]} />
        <meshStandardMaterial
          color="#68B5B9"
          transparent
          opacity={0.25}
          roughness={0.0}
          metalness={0.0}
          depthWrite={false}
        />
      </mesh>

      {/* Mặt nước */}
      <mesh position={[bx, floorY + H, bz]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, D - 0.1]} />
        <meshStandardMaterial
          color="#68B5B9"
          transparent
          opacity={0.45}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* 4 vách kính */}
      <GlassPanel position={[bx, floorY + H / 2, bz + D / 2]} args={[W, H, 0.045]} />
      <GlassPanel position={[bx, floorY + H / 2, bz - D / 2]} args={[W, H, 0.045]} />
      <GlassPanel position={[bx - W / 2, floorY + H / 2, bz]} args={[0.045, H, D]} />
      <GlassPanel position={[bx + W / 2, floorY + H / 2, bz]} args={[0.045, H, D]} />

      {/* Collider chắn nhân vật xuyên qua bể */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[bx, floorY + H / 2, bz]} visible={false}>
          <boxGeometry args={[W + 0.1, H + 0.3, D + 0.1]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>

      {/* Cây thủy sinh */}
      <AquaticPlant x={bx - 1.2} z={bz - 0.4} phase={0} />
      <AquaticPlant x={bx} z={bz - 0.5} phase={1.5} />
      <AquaticPlant x={bx + 1.1} z={bz + 0.3} phase={3.0} />

      {/* Đàn cá bơi lội */}
      {fishList.map((f, i) => (
        <Fish key={i} {...f} />
      ))}

      {/* Ánh sáng ấm dịu cho bể */}
      <pointLight position={[bx, floorY + H + 1.2, bz]} intensity={0.6} color="#88DDEE" distance={6} />

      {/* Mái che tiểu cảnh bể cá */}
      <mesh position={[bx, floorY + H + 1.8, bz]}>
        <boxGeometry args={[W + 1.0, 0.15, D + 1.0]} />
        <meshStandardMaterial color="#5C3D1E" roughness={0.9} />
      </mesh>
    </group>
  );
}

