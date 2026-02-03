/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from './axios.config';

export interface FloorPlanConfig {
  globalModelOptions: any;
  exports: any[];
  [key: string]: any;
}

export interface FloorPlanResponse {
  Lite?: {
    png?: string[];
    pdf?: string[];
  };
  [key: string]: any;
}

export class FloorPlanService {
  static async generateFloorPlan(
    modelId: string,
    config: FloorPlanConfig
  ): Promise<FloorPlanResponse> {
    try {
      const response = await apiClient.post<FloorPlanResponse>(
        `/exporter/floorplan/${modelId}`,
        config
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo floor plan');
    }
  }
  static getMockResponse(): FloorPlanResponse {
    return {
      Lite: {
        png: [
          'https://s3-us-west-2.amazonaws.com/cubi.casa.exporter.output/53dbce983bf47c0f3bddd11096b6fc38/Lite_1b-mannerheiminaukio-helsinki-uusimaa-finland-00100_0.png',
          'https://s3-us-west-2.amazonaws.com/cubi.casa.exporter.output/53dbce983bf47c0f3bddd11096b6fc38/Lite_1b-mannerheiminaukio-helsinki-uusimaa-finland-00100_1.png'
        ]
      }
    };
  }
}
