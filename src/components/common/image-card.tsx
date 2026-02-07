import { Download, ExternalLink, ZoomIn, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface ImageCardProps {
  url: string;
  index: number;
  onDownload: (url: string, index: number) => void;
}

export function ImageCard({ url, index, onDownload }: ImageCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-slate-50">
        <img
          src={url}
          alt={`Floor Plan ${index + 1}`}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-md">
          <FileImage size={12} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-700 uppercase">Level {index + 1}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary" className="h-8 rounded-full">
                <ZoomIn className="mr-2 h-3.5 w-3.5" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-w-3xl flex-col p-4">
              <DialogHeader className="flex-none">
                <DialogTitle className="flex items-center gap-2">
                  Floor Plan Details - Level {index + 1}
                </DialogTitle>
              </DialogHeader>
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg border bg-slate-50 p-4">
                <img
                  src={url}
                  alt="Full size preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-none justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => window.open(url, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
                </Button>
                <Button size="sm" onClick={() => onDownload(url, index)}>
                  <Download className="mr-2 h-4 w-4" /> Download Print Version
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-900 uppercase">Schematic Drawing</span>
          <span className="text-[10px] text-slate-400">Format: PNG • High Quality</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
          onClick={() => onDownload(url, index)}
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
}
