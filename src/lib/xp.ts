export function totalXpToReachLevel(level: number): number {
  return level <= 1 ? 0 : (100 * (level - 1) * level) / 2;
}

export function levelFromTotalXp(totalXp: number): number {
  let level = 1;
  while (totalXpToReachLevel(level + 1) <= totalXp) {
    level++;
  }
  return level;
}

export function xpForNextLevel(totalXp: number): number {
  const level = levelFromTotalXp(totalXp);
  return totalXpToReachLevel(level + 1);
}

export function xpProgressInLevel(totalXp: number): number {
  const level = levelFromTotalXp(totalXp);
  const current = totalXpToReachLevel(level);
  const next = totalXpToReachLevel(level + 1);
  return (totalXp - current) / (next - current);
}
