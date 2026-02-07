/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer';
import { set } from 'lodash';

export interface ConfigHistoryItem {
  id: number;
  name: string;
  data: any;
  timestamp: Date;
}
export class ConfigService {
  static updateConfigByPath(config: any, path: string, value: any): any {
    return produce(config, (draft:any) => {
      set(draft, path, value);
    });
  }
  static addToHistory(
    currentHistory: ConfigHistoryItem[],
    name: string,
    data: any
  ): ConfigHistoryItem[] {
    const newItem: ConfigHistoryItem = {
      id: Date.now(),
      name,
      data,
      timestamp: new Date()
    };
    return [newItem, ...currentHistory];
  }
  static validateConfig(config: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.globalModelOptions) {
      errors.push('globalModelOptions is required');
    }

    if (!config.exports || !Array.isArray(config.exports)) {
      errors.push('exports must be an array');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
  static exportAsJSON(config: any, filename: string = 'config.json'): void {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  static async importFromJSON(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          resolve(config);
        } catch (error : any) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
  
}
