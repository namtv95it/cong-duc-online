import { RigidBody } from '@react-three/rapier';

interface TreeProps {
  x: number;
  z: number;
  scale?: number;
}

function Tree({ x, z, scale = 1 }: TreeProps) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 2.8, 6]} />
          <meshStandardMaterial color="#5C3D1E" roughness={1} />
        </mesh>
      </RigidBody>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[1.7, 3.2, 7]} />
        <meshStandardMaterial color="#2D6A2E" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.8, 0]}>
        <coneGeometry args={[1.2, 2.4, 7]} />
        <meshStandardMaterial color="#3A8A3B" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Lantern({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.065, 0.07, 2.2, 5]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.38, 0.52, 0.38]} />
        <meshStandardMaterial
          color="#CC2200"
          emissive="#FF3300"
          emissiveIntensity={0.18}
          roughness={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>
      <pointLight position={[0, 2.1, 0]} intensity={0.4} color="#FF8844" distance={5} />
    </group>
  );
}

function BenchStone({ x, z, rotY = 0 }: { x: number; z: number; rotY?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.9, 0.2, 0.72]} />
        <meshStandardMaterial color="#888880" roughness={0.95} />
      </mesh>
      <mesh position={[-0.75, 0.15, 0]}>
        <boxGeometry args={[0.26, 0.3, 0.58]} />
        <meshStandardMaterial color="#7A7A72" roughness={0.95} />
      </mesh>
      <mesh position={[0.75, 0.15, 0]}>
        <boxGeometry args={[0.26, 0.3, 0.58]} />
        <meshStandardMaterial color="#7A7A72" roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function Courtyard() {
  return (
    <group>
      {/* Cây bên trái sân */}
      <Tree x={-10.5} z={8} />
      <Tree x={-12} z={-1} scale={0.88} />
      <Tree x={-10} z={17.5} scale={0.72} />

      {/* Cây bên phải sân */}
      <Tree x={10.5} z={8} />
      <Tree x={12} z={-1} scale={0.88} />
      <Tree x={10} z={17.5} scale={0.72} />

      {/* Đèn lồng */}
      <Lantern x={-3.2} z={19} />
      <Lantern x={3.2} z={19} />
      <Lantern x={-3.2} z={10} />
      <Lantern x={3.2} z={10} />
      <Lantern x={-3.2} z={1} />
      <Lantern x={3.2} z={1} />

      {/* Ghế đá */}
      <BenchStone x={-7} z={6} />
      <BenchStone x={7} z={6} />

      {/* Biển nhiệm vụ gỗ */}
      <mesh position={[-5.5, 0.75, 14]}>
        <cylinderGeometry args={[0.07, 0.08, 1.5, 5]} />
        <meshStandardMaterial color="#6B4226" roughness={0.9} />
      </mesh>
      <mesh position={[-5.5, 1.5, 14]}>
        <boxGeometry args={[1.7, 0.95, 0.12]} />
        <meshStandardMaterial color="#8B5C33" roughness={0.82} />
      </mesh>

      {/* Ranh giới tường vô hình để nhân vật không rơi khỏi bản đồ */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1.5, -28]} visible={false}>
          <boxGeometry args={[70, 3, 1]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1.5, 32]} visible={false}>
          <boxGeometry args={[70, 3, 1]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[32, 1.5, 0]} visible={false}>
          <boxGeometry args={[1, 3, 70]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-32, 1.5, 0]} visible={false}>
          <boxGeometry args={[1, 3, 70]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
}

