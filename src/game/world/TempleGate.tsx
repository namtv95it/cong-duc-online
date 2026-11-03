import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';

export default function TempleGate() {
  return (
    <group position={[0, 0, 22]}>
      {/* Cột chính lớn */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-4.5, 2.5, 0]}>
          <boxGeometry args={[0.85, 5, 0.85]} />
          <meshStandardMaterial color="#4B2E22" roughness={0.9} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[4.5, 2.5, 0]}>
          <boxGeometry args={[0.85, 5, 0.85]} />
          <meshStandardMaterial color="#4B2E22" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Cột nhỏ hai bên */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-8, 1.5, 0]}>
          <boxGeometry args={[0.65, 3, 0.65]} />
          <meshStandardMaterial color="#4B2E22" roughness={0.9} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[8, 1.5, 0]}>
          <boxGeometry args={[0.65, 3, 0.65]} />
          <meshStandardMaterial color="#4B2E22" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Xà ngang chính */}
      <mesh position={[0, 5.25, 0]}>
        <boxGeometry args={[10.5, 0.55, 0.75]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.9} />
      </mesh>

      {/* Xà ngang cổng phụ */}
      <mesh position={[-6.25, 3.3, 0]}>
        <boxGeometry args={[3.5, 0.4, 0.65]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.9} />
      </mesh>
      <mesh position={[6.25, 3.3, 0]}>
        <boxGeometry args={[3.5, 0.4, 0.65]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.9} />
      </mesh>

      {/* Mái chính */}
      <mesh position={[0, 6.3, 0]}>
        <boxGeometry args={[12, 0.32, 2.4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.72} />
      </mesh>
      <mesh position={[0, 6.62, 0]}>
        <boxGeometry args={[12.2, 0.18, 0.45]} />
        <meshStandardMaterial color="#4A2500" roughness={0.65} />
      </mesh>

      {/* Mái phụ hai bên */}
      <mesh position={[-6.25, 3.9, 0]}>
        <boxGeometry args={[4, 0.25, 2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.72} />
      </mesh>
      <mesh position={[6.25, 3.9, 0]}>
        <boxGeometry args={[4, 0.25, 2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.72} />
      </mesh>

      {/* Biển hiệu tên chùa */}
      <mesh position={[0, 4.3, 0.45]}>
        <boxGeometry args={[4.2, 0.75, 0.12]} />
        <meshStandardMaterial color="#6B4226" roughness={0.82} />
      </mesh>
      <Text
        position={[0, 4.3, 0.55]}
        fontSize={0.33}
        color="#E7BF6C"
        anchorX="center"
        anchorY="middle"
      >
        Chùa An Nhiên
      </Text>

      {/* Tường tam quan */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-11, 1, 0]}>
          <boxGeometry args={[5, 2, 0.5]} />
          <meshStandardMaterial color="#D1C6AD" roughness={0.82} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[11, 1, 0]}>
          <boxGeometry args={[5, 2, 0.5]} />
          <meshStandardMaterial color="#D1C6AD" roughness={0.82} />
        </mesh>
      </RigidBody>
    </group>
  );
}

