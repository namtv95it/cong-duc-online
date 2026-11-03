export type RobeColor = 'saffron' | 'cream' | 'brown';

export type RewardActionId =
  | 'pray' | 'incense' | 'meditate'
  | 'fish_feed' | 'aquarium_clean' | 'plant_care';

export type ActionId = RewardActionId | 'aquarium_view';

export interface AquariumState {
  waterClarity: number;  // 0..100
  fishSatiety: number;   // 0..100
  plantHealth: number;   // 0..100
  lastCareAt: number;    // Unix ms (converted from Firestore Timestamp on read)
}

export interface DailyProgress {
  dateKey: string;
  activityCounts: Partial<Record<RewardActionId, number>>;
  lastCompletedAt: Partial<Record<RewardActionId, number | null>>;
  questClaimed: Partial<Record<string, boolean>>;
}

export interface GameState {
  schemaVersion: 1;
  totalXp: number;
  daily: DailyProgress;
  aquarium: AquariumState;
  recentActionIds: string[];
  updatedAt: number;
}

export interface PlayerProfile {
  nickname: string;
  robeColor: RobeColor;
  createdAt: number;
  updatedAt: number;
}

export interface ActivityResult {
  awardedXp: number;
  totalXp: number;
  alreadyProcessed: boolean;
  daily: DailyProgress;
  aquarium: AquariumState;
}
