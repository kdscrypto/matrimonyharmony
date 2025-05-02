
import { create } from 'zustand';

type AudioStore = {
  isPlaying: boolean;
  hasInteracted: boolean;
  volume: number;
  setPlaying: (playing: boolean) => void;
  setHasInteracted: (interacted: boolean) => void;
  setVolume: (volume: number) => void;
  togglePlaying: () => void;
};

export const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: localStorage.getItem('audioPlaying') === 'true',
  hasInteracted: localStorage.getItem('audioPlaying') !== null,
  volume: Number(localStorage.getItem('audioVolume')) || 0.2,
  
  setPlaying: (playing) => {
    localStorage.setItem('audioPlaying', playing.toString());
    set({ isPlaying: playing });
  },
  
  setHasInteracted: (interacted) => set({ hasInteracted: interacted }),
  
  setVolume: (volume) => {
    localStorage.setItem('audioVolume', volume.toString());
    set({ volume });
  },
  
  togglePlaying: () => set((state) => {
    const newState = !state.isPlaying;
    localStorage.setItem('audioPlaying', newState.toString());
    return { isPlaying: newState, hasInteracted: true };
  }),
}));
