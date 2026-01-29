/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import axios from 'axios';

interface ExporterState {
  config: any;
  loading: boolean;
  setConfig: (newConfig: any) => void;
  updateField: (key: string, value: any) => void;
  fetchFloorPlan: (apiKey: string, modelId: string) => Promise<void>;
}

export const useExporterStore = create<ExporterState>((set, get) => ({
  config: {
    language: "en",
    wall_color: "#000000",
    hide_dimensions: false,
  },
  loading: false,
  setConfig: (newConfig) => set({ config: newConfig }),
  updateField: (key, value) => 
    set((state) => ({ config: { ...state.config, [key]: value } })),
  
  fetchFloorPlan: async (apiKey, modelId) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        `https://exporter.cubi.casa/v1/floor-plan/${modelId}`,
        get().config,
        {
          headers: { "X-API-KEY": apiKey },
          responseType: 'blob'
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `floorplan-${modelId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } finally {
      set({ loading: false });
    }
  }
}));