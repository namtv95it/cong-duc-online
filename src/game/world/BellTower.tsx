import { RigidBody } from '@react-three/rapier';

export default function BellTower() {
  const columnPositions: [number, number][] = [
    [-1.3, -1.3],
    [1.3, -1.3],
    [-1.3, 1.3],
    [1.3, 1.3],
  ];

  return (
    <group position={[-18, 0, -3]}>
      {/* Bệ tháp chuông */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[4.5, 1.1, 4.5]} />
          <meshStandardMaterial color="#9E9E8E" roughness={0.92} />
        </mesh>
      </RigidBody>

      {/* 4 cột đỡ */}
      {columnPositions.map(([x, z], i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid" position={[x, 0, z]}>
          <mesh position={[0, 3.2, 0]}>
            <cylinderGeometry args={[0.2, 0.22, 4.2, 7]} />
            <meshStandardMaterial color="#4B2E22" roughness={0.9} />
          </mesh>
        </RigidBody>
      ))}

      {/* Mái tháp chuông */}
      <mesh position={[0, 6.1, 0]}>
        <coneGeometry args={[3.0, 2.0, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.72} />
      </mesh>
      <mesh position={[0, 7.3, 0]}>
        <coneGeometry args={[1.6, 1.2, 4]} />
        <meshStandardMaterial color="#7A3B10" roughness={0.72} />
      </mesh>

      {/* Chuông đồng đại hồng chung */}
      <mesh position={[0, 4.85, 0]}>
        <cylinderGeometry args={[0.42, 0.58, 0.75, 14, 1, true]} />
        <meshStandardMaterial
          color="#B8860B"
          metalness={0.45}
          roughness={0.28}
          side={2}
        />
      </mesh>
      <mesh position={[0, 5.28, 0]}>
        <sphereGeometry args={[0.42, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8860B" metalness={0.45} roughness={0.28} />
      </mesh>

      <pointLight position={[0, 4.0, 0]} intensity={0.4} color="#FFD070" distance={8} />
    </group>
  );
}

