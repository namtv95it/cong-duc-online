import { describe, it, expect } from 'vitest';
import { totalXpToReachLevel, levelFromTotalXp } from '../lib/xp';

describe('totalXpToReachLevel', () => {
  it('level 1 = 0 XP', () => expect(totalXpToReachLevel(1)).toBe(0));
  it('level 2 = 100 XP', () => expect(totalXpToReachLevel(2)).toBe(100));
  it('level 3 = 300 XP', () => expect(totalXpToReachLevel(3)).toBe(300));
  it('level 4 = 600 XP', () => expect(totalXpToReachLevel(4)).toBe(600));
});

describe('levelFromTotalXp', () => {
  it('0 XP = level 1', () => expect(levelFromTotalXp(0)).toBe(1));
  it('99 XP = level 1', () => expect(levelFromTotalXp(99)).toBe(1));
  it('100 XP = level 2', () => expect(levelFromTotalXp(100)).toBe(2));
  it('299 XP = level 2', () => expect(levelFromTotalXp(299)).toBe(2));
  it('300 XP = level 3', () => expect(levelFromTotalXp(300)).toBe(3));
});
