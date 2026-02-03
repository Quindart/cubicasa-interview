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
      name: 'Cấu hình mẫu 1',
      timestamp: new Date('2024-01-01T10:00:00'),
      data: INITIAL_BODY_DATA
    }
  ]);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [fileConfigInfo, setFileConfigInfo] = useState<IFileConfigInfo>();
  const [apiResponse, setApiResponse] = useState<FloorPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateConfig = useCallback((path: string, value: any) => {
    setCurrentConfig((prev) => ConfigService.updateConfigByPath(prev, path, value));
  }, []);

  const importConfig = useCallback((newData: any, name: string) => {
    setCurrentConfig(newData);
    setHistory((prev) => ConfigService.addToHistory(prev, name, newData));
    toast.success(`Đã import cấu hình: ${name}`);
  }, []);

const selectFromHistory = useCallback((selectedConfig: any) => {
  setCurrentConfig(selectedConfig.data);

  setFileConfigInfo({
    name: selectedConfig.name,
    timestamp: selectedConfig.timestamp.toString(),
    id: selectedConfig.id.toString()
  });

  setApiResponse(null);

  const message = `Đã chọn file cấu hình từ lịch sử: ${selectedConfig.name}`;
  toast.info(message);
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
      if (!modelId ||  currentConfig == null) {
        throw new Error('Thiếu cấu hình');
      }
      const response = await FloorPlanService.generateFloorPlan(modelId, currentConfig);
      setApiResponse(response);
      toast.success('Đã tạo bản vẽ thành công!');
      setHistory((prev) =>
        ConfigService.addToHistory(prev, `Floor Plan ${new Date().toLocaleString()}`, currentConfig)
      );
    } catch (error: any) {
      console.error('Floor Plan Generation Error:', error);
      toast.error(error.message || 'Lỗi khi gọi API CubiCasa');
      if (import.meta.env.DEV) {
        setApiResponse(FloorPlanService.getMockResponse());
        toast.info('Đang sử dụng mock data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentConfig]);

  const exportConfig = useCallback(() => {
    const filename = `floorplan-config-${Date.now()}.json`;
    ConfigService.exportAsJSON(currentConfig, filename);
    toast.success('Đã export cấu hình');
  }, [currentConfig]);

  const resetConfig = useCallback(() => {
    setCurrentConfig(null);
    toast.info('Đã reset về cấu hình mặc định');
  }, []);

  return {
    history,
    currentConfig,
    apiResponse,
    isLoading,
    fileConfigInfo,
    updateConfig,
    importConfig,
    selectFromHistory,
    generateFloorPlan,
    exportConfig,
    resetConfig
  };
}
