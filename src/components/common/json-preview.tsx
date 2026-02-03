import { useState } from 'react';
import { Code2, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const JsonPreview = ({ config }: { config: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    toast.success('Đã sao chép cấu hình');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-1/2 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-slate-500" />
          <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">
            JSON Preview
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-[11px] hover:bg-slate-50"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          {copied ? 'Đã chép' : 'Sao chép JSON'}
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl bg-[#0F172B]">
        <div className="custom-scrollbar-dark h-full overflow-auto p-4 pt-8">
          <pre className="font-mono text-[11px] text-blue-300">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
