import type { AquariumState } from '../types';

const DECAY_PER_DAY = {
  waterClarity: 5,
  fishSatiety: 8,
  plantHealth: 3,
} as const;

/** Tính trạng thái bể hiển thị (chỉ đọc, không ghi Firestore) */
export function computeDisplayState(
  saved: AquariumState,
  now: number = Date.now()
): AquariumState {
  const hoursElapsed = (now - saved.lastCareAt) / (1000 * 60 * 60);
  const daysElapsed = hoursElapsed / 24;

  return {
    waterClarity: Math.max(0, Math.min(100, saved.waterClarity - DECAY_PER_DAY.waterClarity * daysElapsed)),
    fishSatiety: Math.max(0, Math.min(100, saved.fishSatiety - DECAY_PER_DAY.fishSatiety * daysElapsed)),
    plantHealth: Math.max(0, Math.min(100, saved.plantHealth - DECAY_PER_DAY.plantHealth * daysElapsed)),
    lastCareAt: saved.lastCareAt,
  };
}

/** Tính trạng thái sau khi chăm bể (dùng trong transaction) */
export function applyCareBenefit(
  saved: AquariumState,
  careType: 'waterClarity' | 'fishSatiety' | 'plantHealth',
  benefit: number,
  now: number
): AquariumState {
  const decayed = computeDisplayState(saved, now);
  return {
    ...decayed,
    [careType]: Math.min(100, decayed[careType] + benefit),
    lastCareAt: now,
  };
}
