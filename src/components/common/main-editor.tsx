/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Settings2, Palette, FileOutput } from 'lucide-react';

interface IMainEditorProps {
  config: any;
  updateConfig: (path: string, value: any) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function MainEditor({ config, updateConfig, onSubmit, isLoading }: IMainEditorProps) {
  const getConfigValue = (path: string) => path.split('.').reduce((obj, key) => obj?.[key], config);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase">Render Configuration</h2>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          style={{ background: 'linear-gradient(90deg, #1A3C4D 0%, #00786F 100%)' }}
          className="group flex items-center justify-center gap-3 rounded-xl px-8 py-2 text-[13px] font-semibold text-white shadow-none transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {isLoading ? 'PROCESSING DATA...' : 'GENERATE FLOOR PLAN'}
        </button>
      </div>

      <div className="flex h-full flex-col overflow-hidden bg-white">
        <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
          <Accordion
            type="multiple"
            defaultValue={['global', 'visual', 'output']}
            className="space-y-4 border-none"
          >
            {/* SECTION 1: GLOBAL MODEL SETTINGS */}
            <AccordionItem value="global" className="border-none">
              <AccordionTrigger className="rounded-xl border-b border-slate-100 bg-[#eafaf9] px-3 py-2 hover:no-underline">
                <div className="text-md flex items-center gap-2 font-medium text-[#03726C] uppercase">
                  <Settings2 size={16} /> Global Model Settings
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Measurement Unit
                    </Label>
                    <Select
                      value={getConfigValue('globalModelOptions.unit')}
                      onValueChange={(v) => updateConfig('globalModelOptions.unit', v)}
                    >
                      <SelectTrigger className="h-9 border-slate-200 bg-slate-50/50 shadow-none focus:ring-1 focus:ring-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ft">Feet (ft)</SelectItem>
                        <SelectItem value="m">Meters (m)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Door Swing Angle ({getConfigValue('globalModelOptions.swingDoorOpeningAngle')}
                      °)
                    </Label>
                    <Input
                      type="number"
                      className="h-9 border-slate-200 bg-slate-50/50 shadow-none focus:ring-1 focus:ring-slate-200"
                      value={getConfigValue('globalModelOptions.swingDoorOpeningAngle')}
                      onChange={(e) =>
                        updateConfig(
                          'globalModelOptions.swingDoorOpeningAngle',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <Label className="cursor-pointer text-sm font-semibold text-gray-700">
                      Show Space Labels
                    </Label>
                    <Switch
                      className="scale-75"
                      checked={getConfigValue('globalModelOptions.showSpaceLabels')}
                      onCheckedChange={(v) => updateConfig('globalModelOptions.showSpaceLabels', v)}
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <Label className="cursor-pointer text-sm font-semibold text-gray-700">
                      Exterior Dimensions
                    </Label>
                    <Switch
                      className="scale-75"
                      checked={getConfigValue('globalModelOptions.outerMeasurements')}
                      onCheckedChange={(v) =>
                        updateConfig('globalModelOptions.outerMeasurements', v)
                      }
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 2: VISUAL STYLE & COLORS */}
            <AccordionItem value="visual" className="border-none">
              <AccordionTrigger className="rounded-xl border-b border-slate-100 bg-[#eafaf9] px-3 py-2 hover:no-underline">
                <div className="text-md flex items-center gap-2 font-medium text-[#03726C] uppercase">
                  <Palette size={16} /> Visual Style & Styling
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-4 pb-2">
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Wall Fill Color
                    </Label>
                    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/50 p-1.5">
                      <input
                        type="color"
                        className="h-6 w-6 cursor-pointer rounded-sm border-none bg-transparent"
                        value={getConfigValue('globalModelOptions.elementStyles.Wall.style.fill')}
                        onChange={(e) =>
                          updateConfig(
                            'globalModelOptions.elementStyles.Wall.style.fill',
                            e.target.value
                          )
                        }
                      />
                      <span className="font-mono text-[11px] text-slate-500 uppercase">
                        {getConfigValue('globalModelOptions.elementStyles.Wall.style.fill')}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Door Stroke Color
                    </Label>
                    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/50 p-1.5">
                      <input
                        type="color"
                        className="h-6 w-6 cursor-pointer rounded-sm border-none bg-transparent"
                        value={getConfigValue('globalModelOptions.elementStyles.Door.style.stroke')}
                        onChange={(e) =>
                          updateConfig(
                            'globalModelOptions.elementStyles.Door.style.stroke',
                            e.target.value
                          )
                        }
                      />
                      <span className="font-mono text-[11px] text-slate-500 uppercase">
                        {getConfigValue('globalModelOptions.elementStyles.Door.style.stroke')}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1 space-y-3">
                    <div className="flex justify-between text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      <span>Wall Stroke Weight</span>
                      <span className="font-mono text-slate-900">
                        {getConfigValue('globalModelOptions.elementStyles.Wall.style.stroke-width')}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={10}
                      step={0.5}
                      value={[
                        getConfigValue(
                          'globalModelOptions.elementStyles.Wall.style.stroke-width'
                        ) || 1
                      ]}
                      onValueChange={([v]) =>
                        updateConfig('globalModelOptions.elementStyles.Wall.style.stroke-width', v)
                      }
                    />
                  </div>

                  <div className="col-span-1 space-y-3">
                    <div className="flex justify-between text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      <span>Space Fill Opacity</span>
                      <span className="font-mono text-slate-900">
                        {Math.round(
                          getConfigValue(
                            'globalModelOptions.elementStyles.Space.style.fill-opacity'
                          ) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={[
                        getConfigValue(
                          'globalModelOptions.elementStyles.Space.style.fill-opacity'
                        ) || 1
                      ]}
                      onValueChange={([v]) =>
                        updateConfig('globalModelOptions.elementStyles.Space.style.fill-opacity', v)
                      }
                    />
                  </div>

                  <div className="col-span-1 space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Space Stroke Width
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      className="h-9 border-slate-200 bg-slate-50/50 shadow-none focus:ring-1 focus:ring-slate-200"
                      value={getConfigValue(
                        'globalModelOptions.elementStyles.Space.style.stroke-width'
                      )}
                      onChange={(e) =>
                        updateConfig(
                          'globalModelOptions.elementStyles.Space.style.stroke-width',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-span-1 mt-6 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <Label className="cursor-pointer text-sm font-semibold">Show Area Labels</Label>
                    <Switch
                      className="scale-75"
                      checked={getConfigValue('globalModelOptions.area')}
                      onCheckedChange={(v) => updateConfig('globalModelOptions.area', v)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 3: EXPORT & RESOLUTION */}
            <AccordionItem value="output" className="border-none">
              <AccordionTrigger className="rounded-xl border-b border-slate-100 bg-[#eafaf9] px-3 py-2 hover:no-underline">
                <div className="text-md flex items-center gap-2 font-medium text-[#03726C] uppercase">
                  <FileOutput size={16} /> Export & Resolution
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Area Standard
                    </Label>
                    <Select
                      value={getConfigValue('globalModelOptions.areaSpecification')}
                      onValueChange={(v) => updateConfig('globalModelOptions.areaSpecification', v)}
                    >
                      <SelectTrigger className="h-9 border-slate-200 bg-slate-50/50 shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GIA">GIA (Gross Internal)</SelectItem>
                        <SelectItem value="GEA">GEA (Gross External)</SelectItem>
                        <SelectItem value="ANSI">ANSI Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Output Language
                    </Label>
                    <Select
                      value={getConfigValue('globalModelOptions.unit')} // Note: Consider if this should be a different config key
                      onValueChange={(v) => updateConfig('globalModelOptions.unit', v)}
                    >
                      <SelectTrigger className="h-9 border-slate-200 bg-slate-50/50 shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-pr">English</SelectItem>
                        <SelectItem value="vi">Vietnamese</SelectItem>
                        <SelectItem value="fi">Finnish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Width (px)
                    </Label>
                    <Input
                      type="number"
                      className="h-9 border-slate-200 bg-slate-50/50 shadow-none"
                      value={getConfigValue('exports.0.singleFloor.resolution.width')}
                      onChange={(e) =>
                        updateConfig(
                          'exports.0.singleFloor.resolution.width',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Height (px)
                    </Label>
                    <Input
                      type="number"
                      className="h-9 border-slate-200 bg-slate-50/50 shadow-none"
                      value={getConfigValue('exports.0.singleFloor.resolution.height')}
                      onChange={(e) =>
                        updateConfig(
                          'exports.0.singleFloor.resolution.height',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      Resolution (DPI)
                    </Label>
                    <Input
                      type="number"
                      className="h-9 border-slate-200 bg-slate-50/50 shadow-none"
                      value={getConfigValue('exports.0.singleFloor.dpi')}
                      onChange={(e) =>
                        updateConfig('exports.0.singleFloor.dpi', Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                      File Format
                    </Label>
                    <Select
                      value={getConfigValue('exports.0.singleFloor.format')}
                      onValueChange={(v) => updateConfig('exports.0.singleFloor.format', v)}
                    >
                      <SelectTrigger className="h-9 border-slate-200 bg-slate-50/50 shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG Image</SelectItem>
                        <SelectItem value="svg">SVG Vector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
