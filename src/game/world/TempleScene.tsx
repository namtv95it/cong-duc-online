import { RigidBody } from '@react-three/rapier';
import MainHall from './MainHall';
import TempleGate from './TempleGate';
import Courtyard from './Courtyard';
import AquariumArea from '../aquarium/AquariumArea';
import LotusGarden from './LotusGarden';
import BellTower from './BellTower';

export default function TempleScene() {
  return (
    <group>
      {/* Nền đất cỏ */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[100, 0.2, 100]} />
          <meshStandardMaterial color="#557A3A" roughness={1} />
        </mesh>
      </RigidBody>

      {/* Sân lát đá chính */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.001, 5]} receiveShadow>
          <boxGeometry args={[22, 0.05, 34]} />
          <meshStandardMaterial color="#B0A898" roughness={0.95} />
        </mesh>
      </RigidBody>

      {/* Đường đá từ cổng vào chính điện */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.02, 10]} receiveShadow>
          <boxGeometry args={[5.5, 0.04, 30]} />
          <meshStandardMaterial color="#9E9E8E" roughness={0.9} />
        </mesh>
      </RigidBody>

      <TempleGate />
      <Courtyard />
      <MainHall />
      <BellTower />
      <LotusGarden />
      <AquariumArea />
    </group>
  );
}

