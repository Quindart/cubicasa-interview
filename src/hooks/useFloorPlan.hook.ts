/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { ConfigHistoryItem, ConfigService } from '@/services/config.service';
import { FloorPlanResponse, FloorPlanService } from '@/services/floorPlan.service';
import { INITIAL_BODY_DATA } from '@/constants/initialData';

interface IFileConfigInfo {
  name: string;
  timestamp: string;
  id: number;
}

export function useFloorPlan() {
  const [history, setHistory] = useState<ConfigHistoryItem[]>([
    {
      id: 1,
      name: 'Default Configuration',
      timestamp: new Date('2024-01-01T10:00:00'),
      data: INITIAL_BODY_DATA
    }
  ]);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [fileConfigInfo, setFileConfigInfo] = useState<IFileConfigInfo>();
  const [apiResponse, setApiResponse] = useState<FloorPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const updateConfig = useCallback((path: string, value: any) => {
    setCurrentConfig((prev) => ConfigService.updateConfigByPath(prev, path, value));
  }, []);

  const importConfig = useCallback(
    (newData: any, name: string) => {
      setCurrentConfig(newData);
      const newHistory = ConfigService.addToHistory(history, name, newData);
      setHistory(newHistory);
      const latestItem = newHistory[newHistory.length - 1];
      setFileConfigInfo({
        name: latestItem.name,
        timestamp: latestItem.timestamp.toString(),
        id: latestItem.id
      });

      toast.success(`Configuration imported: ${name}`);
    },
    [history]
  );

  const selectFromHistory = useCallback((selectedConfig: any) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentConfig(selectedConfig.data);
      setFileConfigInfo({
        name: selectedConfig.name,
        timestamp: selectedConfig.timestamp.toString(),
        id: selectedConfig.id
      });
      setApiResponse(null);
      setIsChanging(false);
    }, 300);
  }, []);

  const exportConfig = useCallback(() => {
    const filename = `floorplan-config-${Date.now()}.json`;
    ConfigService.exportAsJSON(currentConfig, filename);
    toast.success('Configuration exported successfully');
  }, [currentConfig]);

  const resetConfig = useCallback(() => {
    setCurrentConfig(null);
    toast.info('Reset to default configuration');
  }, []);

  const generateFloorPlan = useCallback(async () => {
    const validation = ConfigService.validateConfig(currentConfig);
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }
    setIsLoading(true);
    try {
      const modelId = import.meta.env.VITE_MODEL_ID;
      if (!modelId || currentConfig == null) {
        throw new Error('Missing configuration or Model ID');
      }
      const response = await FloorPlanService.generateFloorPlan(modelId, currentConfig);
      setApiResponse(response);
      toast.success('Floor plan generated successfully!');
    } catch (error: any) {
      console.error('Floor Plan Generation Error:', error);
      toast.error(error.message || 'Error calling CubiCasa API');

      if (import.meta.env.DEV) {
        setApiResponse(FloorPlanService.getMockResponse());
        toast.info('Using mock data for development');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentConfig]);

  const saveToHistory = useCallback(() => {
    if (!currentConfig || !apiResponse) {
      toast.error('No configuration or result to save');
      return;
    }

    const newHistory = ConfigService.addToHistory(
      history,
      `Floor Plan ${new Date().toLocaleString('en-US')}`,
      currentConfig
    );
    setHistory(newHistory);
    toast.success('Saved to history');
  }, [currentConfig, apiResponse, history]);

  return {
    history,
    currentConfig,
    apiResponse,
    isLoading,
    fileConfigInfo,
    isChanging,
    updateConfig,
    importConfig,
    selectFromHistory,
    generateFloorPlan,
    saveToHistory,
    exportConfig,
    resetConfig
  };
}
