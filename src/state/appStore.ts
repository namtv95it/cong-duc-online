import { create } from 'zustand';
import type { PlayerProfile, GameState } from '../types';

export type AppStatus =
  | 'BOOTING'
  | 'SIGNED_IN'
  | 'READY'
  | 'INTERACTING'
  | 'SAVING'
  | 'REWARD'
  | 'OFFLINE'
  | 'CONFIG_REQUIRED'
  | 'ERROR';

interface AppStore {
  status: AppStatus;
  uid: string | null;
  profile: PlayerProfile | null;
  gameState: GameState | null;
  lastError: string | null;

  setStatus: (s: AppStatus) => void;
  setUid: (uid: string | null) => void;
  setProfile: (p: PlayerProfile | null) => void;
  setGameState: (gs: GameState | null) => void;
  setError: (err: string | null) => void;
  applyXpReward: (awarded: number, newTotal: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  status: 'BOOTING',
  uid: null,
  profile: null,
  gameState: null,
  lastError: null,

  setStatus: (status) => set({ status }),
  setUid: (uid) => set({ uid }),
  setProfile: (profile) => set({ profile }),
  setGameState: (gameState) => set({ gameState }),
  setError: (lastError) => set({ lastError }),
    applyXpReward: (_awarded, newTotal) =>
set((state) => ({
  gameState: state.gameState
    ? { ...state.gameState, totalXp: newTotal }
    : null,
})),
}));
