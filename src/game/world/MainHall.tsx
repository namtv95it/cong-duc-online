import { RigidBody } from '@react-three/rapier';

function BuddhaStatue() {
  return (
    <group position={[0, 0, -14]}>
      {/* Tòa sen bát giác */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.8, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
      {/* Bệ trên */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[1.1, 1.3, 0.1, 8]} />
        <meshStandardMaterial color="#CBA45B" roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Thân tượng */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 1.0, 8]} />
        <meshStandardMaterial color="#CBA45B" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Cổ */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.24, 8]} />
        <meshStandardMaterial color="#CBA45B" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Đầu tượng */}
      <mesh position={[0, 2.55, 0]}>
        <sphereGeometry args={[0.36, 14, 14]} />
        <meshStandardMaterial color="#CBA45B" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Búi tóc */}
      <mesh position={[0, 2.88, 0]}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial color="#B8942A" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Vầng hào quang */}
      <mesh position={[0, 2.55, -0.08]} rotation={[0.08, 0, 0]}>
        <torusGeometry args={[0.65, 0.045, 8, 36]} />
        <meshStandardMaterial
          color="#E7BF6C"
          emissive="#E7BF6C"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Điểm sáng nhấn tượng */}
      <pointLight
        position={[0, 3.2, 0.8]}
        intensity={1.0}
        color="#FFE0A0"
        distance={6}
      />
    </group>
  );
}

function Pillar({ x, z }: { x: number; z: number }) {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={[x, 0, z]}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.6]} />
        <meshStandardMaterial color="#352A25" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.24, 0.28, 3.8, 8]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[0.55, 0.28, 0.55]} />
        <meshStandardMaterial color="#352A25" roughness={0.95} />
      </mesh>
    </RigidBody>
  );
}

function ZazenPad({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.42, 0.44, 0.14, 10]} />
        <meshStandardMaterial color="#777B70" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.08, 8]} />
        <meshStandardMaterial color="#6A6E65" roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function MainHall() {
  const padPositions: [number, number][] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = -2; col <= 2; col++) {
      padPositions.push([col * 1.9, -7 + row * 1.9]);
    }
  }

  const pillarPositions: [number, number][] = [
    [-7.5, -16.5],
    [7.5, -16.5],
    [-7.5, -10],
    [7.5, -10],
    [-7.5, -3.5],
    [7.5, -3.5],
  ];

  return (
    <group>
      {/* Bậc thềm vào chính điện */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.08, -1.5]}>
          <boxGeometry args={[10, 0.16, 1.5]} />
          <meshStandardMaterial color="#9E9E8E" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Sàn chính điện */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.025, -10]} receiveShadow>
          <boxGeometry args={[17, 0.05, 17]} />
          <meshStandardMaterial color="#352A25" roughness={0.92} />
        </mesh>
      </RigidBody>

      {/* Tường hậu */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2.5, -18.5]}>
          <boxGeometry args={[17, 5, 0.4]} />
          <meshStandardMaterial color="#D1C6AD" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Tường trái */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-8.5, 2.5, -10]}>
          <boxGeometry args={[0.4, 5, 17]} />
          <meshStandardMaterial color="#D1C6AD" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Tường phải */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[8.5, 2.5, -10]}>
          <boxGeometry args={[0.4, 5, 17]} />
          <meshStandardMaterial color="#D1C6AD" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Mái chính điện */}
      <mesh position={[0, 5.05, -10]}>
        <boxGeometry args={[20, 0.38, 20]} />
        <meshStandardMaterial color="#8B4513" roughness={0.72} />
      </mesh>
      <mesh position={[0, 6.4, -10]}>
        <boxGeometry args={[14, 0.32, 14]} />
        <meshStandardMaterial color="#7A3B10" roughness={0.70} />
      </mesh>
      <mesh position={[0, 7.1, -10]}>
        <boxGeometry args={[14.5, 0.22, 0.55]} />
        <meshStandardMaterial color="#4A2500" roughness={0.65} />
      </mesh>

      {/* Cột */}
      {pillarPositions.map(([x, z], i) => (
        <Pillar key={i} x={x} z={z} />
      ))}

      {/* Bàn thờ */}
      <mesh position={[0, 0.55, -13.5]}>
        <boxGeometry args={[3.5, 1.1, 1.3]} />
        <meshStandardMaterial color="#4B2E22" roughness={0.82} />
      </mesh>

      {/* Lư hương */}
      <mesh position={[0, 1.22, -13]}>
        <cylinderGeometry args={[0.2, 0.14, 0.45, 8]} />
        <meshStandardMaterial color="#8B7536" metalness={0.35} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.48, -13]}>
        <cylinderGeometry args={[0.22, 0.2, 0.06, 8]} />
        <meshStandardMaterial color="#9C8640" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Nến */}
      <mesh position={[-1.3, 1.25, -13.5]}>
        <cylinderGeometry args={[0.055, 0.055, 0.4, 6]} />
        <meshStandardMaterial color="#EEE8AA" />
      </mesh>
      <pointLight position={[-1.3, 1.6, -13.5]} intensity={0.35} color="#FF9944" distance={3} />

      <mesh position={[1.3, 1.25, -13.5]}>
        <cylinderGeometry args={[0.055, 0.055, 0.4, 6]} />
        <meshStandardMaterial color="#EEE8AA" />
      </mesh>
      <pointLight position={[1.3, 1.6, -13.5]} intensity={0.35} color="#FF9944" distance={3} />

      {/* Tượng Phật */}
      <BuddhaStatue />

      {/* Đệm ngồi thiền */}
      {padPositions.map(([x, z], i) => (
        <ZazenPad key={i} x={x} z={z} />
      ))}

      {/* Ánh sáng ấm trong chính điện */}
      <pointLight
        position={[0, 4.5, -10]}
        intensity={0.7}
        color="#FFD070"
        distance={18}
      />
    </group>
  );
}

