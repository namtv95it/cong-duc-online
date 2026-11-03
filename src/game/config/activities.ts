import type { ActionId } from '../../types';

export interface InteractionDefinition {
  id: ActionId;
  label: string;
  position: [number, number, number];
  radius: number;
  durationSeconds: number;
  cooldownSeconds: number;
  xpReward: number;
  dailyRewardLimit: number;
  animation: string;
}

export const ACTIVITIES: InteractionDefinition[] = [
  {
    id: 'pray',
    label: 'Lễ Phật',
    position: [0, 0, -6],
    radius: 3,
    durationSeconds: 5,
    cooldownSeconds: 60,
    xpReward: 10,
    dailyRewardLimit: 10,
    animation: 'pray',
  },
  {
    id: 'incense',
    label: 'Thắp hương',
    position: [4, 0, -6],
    radius: 2.5,
    durationSeconds: 4,
    cooldownSeconds: 120,
    xpReward: 5,
    dailyRewardLimit: 5,
    animation: 'incense',
  },
  {
    id: 'meditate',
    label: 'Ngồi thiền',
    position: [-4, 0, -6],
    radius: 2.5,
    durationSeconds: 30,
    cooldownSeconds: 60,
    xpReward: 15,
    dailyRewardLimit: 8,
    animation: 'meditate',
  },
  {
    id: 'fish_feed',
    label: 'Cho cá ăn',
    position: [21.5, 0, -9],
    radius: 3,
    durationSeconds: 6,
    cooldownSeconds: 180,
    xpReward: 10,
    dailyRewardLimit: 5,
    animation: 'fish_feed',
  },
  {
    id: 'aquarium_clean',
    label: 'Vệ sinh bể',
    position: [24.5, 0, -9],
    radius: 3,
    durationSeconds: 12,
    cooldownSeconds: 600,
    xpReward: 20,
    dailyRewardLimit: 3,
    animation: 'aquarium_clean',
  },
  {
    id: 'plant_care',
    label: 'Chăm cây thủy sinh',
    position: [26, 0, -11],
    radius: 3,
    durationSeconds: 10,
    cooldownSeconds: 300,
    xpReward: 15,
    dailyRewardLimit: 4,
    animation: 'plant_care',
  },
  {
    id: 'aquarium_view',
    label: 'Ngắm bể cá',
    position: [23, 0, -9],
    radius: 4,
    durationSeconds: 0,
    cooldownSeconds: 0,
    xpReward: 0,
    dailyRewardLimit: 0,
    animation: 'aquarium_view',
  },
];

export const WORLD_LOCATIONS = {
  spawn:        [0, 0, 26] as [number, number, number],
  courtyard:    [0, 0, 12] as [number, number, number],
  mainHall:     [0, 0, -10] as [number, number, number],
  prayerSpot:   [0, 0, -6] as [number, number, number],
  incenseSpot:  [4, 0, -6] as [number, number, number],
  meditateSpot: [-4, 0, -6] as [number, number, number],
  bellSpot:     [-21, 0, -3] as [number, number, number],
  lotusSpot:    [21, 0, 3] as [number, number, number],
  aquariumSpot: [23, 0, -12] as [number, number, number],
  aquariumViewSpot:  [23, 0, -9] as [number, number, number],
  aquariumFeedSpot:  [21.5, 0, -9] as [number, number, number],
  aquariumCleanSpot: [24.5, 0, -9] as [number, number, number],
  aquariumPlantSpot: [26, 0, -11] as [number, number, number],
  sweepSpot:    [-7, 0, 13] as [number, number, number],
} as const;
