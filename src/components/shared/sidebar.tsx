/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileJson, Upload, Download, CheckCircle2 } from 'lucide-react';
import { INITIAL_BODY_DATA } from '@/constants/initialData';

interface HistoryItem {
  id: number;
  name: string;
  data: any;
  timestamp: Date | string;
  apiResponse?: any;
}

interface SidebarProps {
  history: HistoryItem[];
  currentSelected?: HistoryItem;
  onSelect: (data: any) => void;
  onImport: (data: any, fileName: string) => void;
}

export function Sidebar({ history, currentSelected, onSelect, onImport }: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadSample = () => {
    const dataStr = JSON.stringify(INITIAL_BODY_DATA, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_config.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const content = ev.target?.result as string;
        const parsedData = JSON.parse(content);
        onImport(parsedData, file.name);
      } catch (error) {
        console.error('JSON Parse Error:', error);
        alert('Invalid JSON file format!');
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-4">
        <img
          className="mt-4 mb-6"
          width={200}
          height={100}
          src="/assets/logo-sidebar.png"
          alt="Logo"
        />
        <div className="flex flex-col gap-2">
          <Button variant="secondary" className="w-full justify-start" onClick={triggerFileInput}>
            <Upload className="mr-2 h-4 w-4" /> Import JSON
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={handleDownloadSample}
          >
            <Download className="mr-2 h-4 w-4" /> Download Sample
          </Button>
        </div>

        <input ref={fileInputRef} type="file" hidden accept=".json" onChange={handleFileChange} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-md mb-4 font-bold tracking-wider text-slate-200 uppercase">
          File History
        </p>
        <div className="space-y-2">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <HistoryButton
                currentSelected={currentSelected}
                key={`${item.id}-${idx}`}
                item={item}
                onSelect={onSelect}
              />
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">No history available</p>
          )}
        </div>
      </div>
    </aside>
  );
}

function HistoryButton({
  item,
  onSelect,
  currentSelected
}: {
  item: HistoryItem;
  onSelect: (data: any) => void;
  currentSelected?: HistoryItem;
}) {
  const hasResult = item.apiResponse && item.apiResponse.Lite?.png?.length > 0;

  return (
    <button
      onClick={() => onSelect(item)}
      className={` ${
        currentSelected?.id == item.id
          ? 'bg-[#03726C] text-white hover:bg-[#03726C]/90'
          : 'text-slate-400'
      } group relative flex w-full items-center gap-2 rounded-2xl p-2 px-4 text-sm transition-colors hover:bg-slate-800 focus:ring-1 focus:ring-slate-400 focus:outline-none`}
    >
      <FileJson className="size-7 shrink-0 text-slate-50 group-hover:text-white" />
      <span className="text-md flex-1 truncate text-left group-hover:text-white">{item.name}</span>
      {hasResult && (
        <CheckCircle2
          size={16}
          className="shrink-0 text-emerald-400"
        />
      )}
    </button>
  );
}
