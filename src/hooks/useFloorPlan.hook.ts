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
      data: INITIAL_BODY_DATA,
      apiResponse: null
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
      const newHistory = ConfigService.addToHistory(history, name, newData, null);
      setHistory(newHistory);

      const newItem = newHistory[0];
      setCurrentConfig(newData);
      setFileConfigInfo({
        name: newItem.name,
        timestamp: newItem.timestamp.toString(),
        id: newItem.id
      });
      setApiResponse(null); 

      toast.success(`Configuration imported: ${name}`);
    },
    [history]
  );

  const selectFromHistory = useCallback((selectedConfig: ConfigHistoryItem) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentConfig(selectedConfig.data);
      setFileConfigInfo({
        name: selectedConfig.name,
        timestamp: selectedConfig.timestamp.toString(),
        id: selectedConfig.id
      });
      setApiResponse(selectedConfig.apiResponse || null);
      setIsChanging(false);
    }, 300);
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

      if (fileConfigInfo?.id) {
        setHistory((prev) =>
          ConfigService.updateHistoryItemResponse(prev, fileConfigInfo.id, response)
        );
      }
    } catch (error: any) {
      console.error('Floor Plan Generation Error:', error);
      toast.error(error.message || 'Error calling CubiCasa API');

      if (import.meta.env.DEV) {
        const mockResponse = FloorPlanService.getMockResponse();
        setApiResponse(mockResponse);

        if (fileConfigInfo?.id) {
          setHistory((prev) =>
            ConfigService.updateHistoryItemResponse(prev, fileConfigInfo.id, mockResponse)
          );
        }

        toast.info('Using mock data for development');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentConfig, fileConfigInfo]);

  const saveAsNewVersion = useCallback(() => {
    if (!currentConfig) {
      toast.error('No configuration to save');
      return;
    }

    const newName = `Floor Plan ${new Date().toLocaleString('en-US')}`;
    const newHistory = ConfigService.addToHistory(history, newName, currentConfig, apiResponse);
    setHistory(newHistory);

    const newItem = newHistory[0];
    setFileConfigInfo({
      name: newItem.name,
      timestamp: newItem.timestamp.toString(),
      id: newItem.id
    });

    toast.success('Saved as new version');
  }, [currentConfig, apiResponse, history]);

  const exportConfig = useCallback(() => {
    const filename = `floorplan-config-${Date.now()}.json`;
    ConfigService.exportAsJSON(currentConfig, filename);
    toast.success('Configuration exported successfully');
  }, [currentConfig]);

  const resetConfig = useCallback(() => {
    setCurrentConfig(null);
    setFileConfigInfo(undefined);
    setApiResponse(null);
    toast.info('Reset to default configuration');
  }, []);

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
    saveAsNewVersion,
    exportConfig,
    resetConfig
  };
}
