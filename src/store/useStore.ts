import { create } from 'zustand';

interface ExporterConfig {
  language: string;
  wall_color: string;
  hide_dimensions: boolean;
}

interface ExporterState {
  config: ExporterConfig;
  setConfig: (newConfig: Partial<ExporterConfig>) => void;
  resetConfig: () => void;
}

export const useExporterStore = create<ExporterState>((set) => ({
  config: {
    language: 'en',
    wall_color: '#000000',
    hide_dimensions: false,
  },
  setConfig: (newConfig) => set((state) => ({ 
    config: { ...state.config, ...newConfig } 
  })),
  resetConfig: () => set({ 
    config: { language: 'en', wall_color: '#000000', hide_dimensions: false } 
  }),
}));