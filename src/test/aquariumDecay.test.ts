import { describe, it, expect } from 'vitest';
import { computeDisplayState } from '../lib/aquariumDecay';
import type { AquariumState } from '../types';

const base: AquariumState = {
  waterClarity: 80,
  fishSatiety: 80,
  plantHealth: 80,
  lastCareAt: 0,
};

describe('computeDisplayState', () => {
  it('0 hours elapsed — no decay', () => {
    const result = computeDisplayState(base, 0);
    expect(result.waterClarity).toBeCloseTo(80);
    expect(result.fishSatiety).toBeCloseTo(80);
    expect(result.plantHealth).toBeCloseTo(80);
  });

  it('24 hours elapsed — apply 1-day decay', () => {
    const result = computeDisplayState(base, 24 * 60 * 60 * 1000);
    expect(result.waterClarity).toBeCloseTo(75);
    expect(result.fishSatiety).toBeCloseTo(72);
    expect(result.plantHealth).toBeCloseTo(77);
  });

  it('clamps to 0 minimum', () => {
    const low: AquariumState = { ...base, fishSatiety: 2, lastCareAt: 0 };
    const result = computeDisplayState(low, 10 * 24 * 60 * 60 * 1000);
    expect(result.fishSatiety).toBe(0);
  });
});
