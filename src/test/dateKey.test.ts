import { describe, it, expect } from 'vitest';
import { getVietnamDateKey } from '../lib/dateKey';

describe('getVietnamDateKey', () => {
  it('converts UTC midnight to Vietnam next day correctly', () => {
    // UTC 17:00 = Vietnam midnight (00:00 +7)
    const utcEvening = new Date('2026-01-01T17:00:00Z');
    expect(getVietnamDateKey(utcEvening)).toBe('2026-01-02');
  });

  it('converts UTC 16:59 to Vietnam same day', () => {
    const utcEvening = new Date('2026-01-01T16:59:00Z');
    expect(getVietnamDateKey(utcEvening)).toBe('2026-01-01');
  });
});
