import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface AssistantState {
  theme: Theme;
  micOn: boolean;
  captionsOn: boolean;
  transcript: string;
  captionOpacity: number;
  captionScale: number;
  setTheme: (theme: Theme) => void;
  toggleMic: () => void;
  toggleCaptions: () => void;
  setTranscript: (value: string) => void;
  clearTranscript: () => void;
  setCaptionOpacity: (value: number) => void;
  setCaptionScale: (value: number) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  theme: 'dark',
  micOn: false,
  captionsOn: true,
  transcript: '',
  captionOpacity: 0.82,
  captionScale: 1,
  setTheme: (theme) => set({ theme }),
  toggleMic: () => set((state) => ({ micOn: !state.micOn })),
  toggleCaptions: () => set((state) => ({ captionsOn: !state.captionsOn })),
  setTranscript: (transcript) => set({ transcript }),
  clearTranscript: () => set({ transcript: '' }),
  setCaptionOpacity: (captionOpacity) => set({ captionOpacity }),
  setCaptionScale: (captionScale) => set({ captionScale })
}));
