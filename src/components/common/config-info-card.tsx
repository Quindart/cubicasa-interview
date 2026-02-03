import { FileCode2, Clock } from 'lucide-react';

interface ConfigInfoCardProps {
  name: string;
  timestamp: string;
  id: string | number;
}

export const ConfigInfoCard = ({ name, timestamp, id }: ConfigInfoCardProps) => (
  <div className="animate-in fade-in slide-in-from-top-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 duration-500">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <FileCode2 size={36} className="text-slate-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <div className="mt-1 flex items-center gap-4">
          <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <Clock size={13} className="text-slate-400" />
            {new Date(timestamp).toLocaleString('vi-VN')}
          </p>
          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
          <p className="font-mono text-sm text-slate-500">ID: {id}</p>
        </div>
      </div>
    </div>
  </div>
);
