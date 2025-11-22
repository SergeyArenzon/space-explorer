import { create } from 'zustand';
import type { HistoryItem } from '@/types/history.interface';

interface HistoryState {
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  addHistoryItem: (item: HistoryItem) => void;
  removeHistoryItem: (q: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],

  setHistory: (history) => set({ history }),

  addHistoryItem: (item) => set((state) => ({
    history: [item, ...state.history]
  })),

  removeHistoryItem: (q: string) => set((state) => ({
    history: state.history.filter((item) => item.q !== q)
  })),

  clearHistory: () => set({ history: [] }),
}));

