/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Code2, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const JsonPreview = ({ config }: { config: any }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    toast.success('Configuration copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex h-1/2 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-slate-500" />
            <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">
              JSON Preview
            </h2>
          </div>
          {/* Dòng description mới thêm ở đây */}
          <p className="text-[12px] text-slate-500">
            Real-time visualization of the current exporter configuration object.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy JSON'}
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl bg-[#0F172B]">
        {/* Thanh giả lập trình duyệt/editor để trông đẹp hơn */}
        <div className="absolute top-0 right-0 left-0 flex h-8 items-center border-b border-white/5 bg-slate-800/50 px-4">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/60"></div>
            <div className="h-2 w-2 rounded-full bg-amber-500/60"></div>
            <div className="h-2 w-2 rounded-full bg-emerald-500/60"></div>
          </div>
        </div>
        <div className="custom-scrollbar-dark h-full overflow-auto p-4 pt-10">
          <pre className="font-mono text-[11px] leading-relaxed text-blue-300">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
