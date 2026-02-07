/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutGrid, Info, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageCard } from './image-card';

interface ResponseGalleryProps {
  responseData: any;
  isLoading?: boolean;
}

export function ResponseGallery({ responseData, isLoading }: ResponseGalleryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
          <LayoutGrid className="text-slate-300" size={32} />
        </div>
        <p className="text-sm font-semibold text-slate-500">No results generated yet</p>
        <p className="mt-1 max-w-xs text-xs text-slate-400">
          Configure the settings on the left and click "Generate Plan" to see results.
        </p>
      </div>
    );
  }

  const images = responseData.Lite?.png || [];

  if (images.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/30 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <AlertCircle className="text-amber-500" size={32} />
        </div>
        <p className="text-sm font-semibold text-amber-700">Generation completed but no images</p>
        <p className="mt-1 max-w-xs text-xs text-amber-600">
          The API returned a response, but no floor plan images were generated.
        </p>
      </div>
    );
  }

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `floor-plan-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-slate-900">
          <h3 className="text-sm font-bold tracking-wider uppercase">Generated Assets</h3>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            {images.length} {images.length > 1 ? 'FILES' : 'FILE'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 italic">
          <Info size={12} /> Saved with this config
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {images.map((url: string, index: number) => (
          <ImageCard key={url} url={url} index={index} onDownload={handleDownload} />
        ))}
      </div>
    </div>
  );
}
