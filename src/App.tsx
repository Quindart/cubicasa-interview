/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileCode2, Clock, Code2, Check, Copy } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Sidebar } from './components/shared/sidebar';
import { MainEditor } from './components/common/main-editor';
import { ResponseGallery } from './components/common/response-gallery';
import { useFloorPlan } from './hooks/useFloorPlan.hook';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Footer from './components/common/footer';

const AppSkeleton = () => (
  <div className="mx-auto grid max-w-400 animate-pulse grid-cols-1 gap-4 lg:grid-cols-2">
    <div className="flex flex-col gap-4">
      <div className="h-24 w-full rounded-2xl bg-slate-200" />
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-6 h-6 w-1/3 rounded bg-slate-200" />
        <div className="space-y-4">
          <div className="h-40 w-full rounded-xl bg-slate-100" />
          <div className="h-40 w-full rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 h-6 w-1/4 rounded bg-slate-200" />
        <div className="h-64 w-full rounded-xl bg-slate-100" />
      </div>
      <div className="h-1/2 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-40 w-full rounded-xl bg-slate-800" />
      </div>
    </div>
  </div>
);

export default function App() {
  const {
    history,
    currentConfig,
    fileConfigInfo,
    apiResponse,
    isLoading,
    isChanging,
    updateConfig,
    importConfig,
    selectFromHistory,
    generateFloorPlan
  } = useFloorPlan();

  const [copied, setCopied] = useState(false);

  const showSkeleton = isChanging || (history.length > 0 && !currentConfig);

  const handleCopy = () => {
    const text = JSON.stringify(currentConfig, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Đã sao chép cấu hình vào bộ nhớ tạm');
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (history.length === 0) {
      toast.warning('Lịch sử cấu hình trống. Vui lòng nhập (import) hoặc tạo cấu hình mới.');
    }
    if (currentConfig == null && history.length > 0) {
      selectFromHistory(history[0]);
    }
  }, []);

  return (
    <>
      <div className="flex h-auto min-h-screen w-full overflow-hidden bg-[#f8fafc]">
        <Sidebar
          currentSelected={{
            name: fileConfigInfo?.name || 'Chưa chọn cấu hình',
            data: currentConfig,
            id: fileConfigInfo?.id || 0,
            timestamp: fileConfigInfo?.timestamp || new Date().toISOString()
          }}
          history={history}
          onSelect={selectFromHistory}
          onImport={importConfig}
        />
        <main className="custom-scrollbar container mx-auto mb-2 flex-1 p-6">
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              Bài Test Cubi Casa - Trình Xuất Sơ Đồ Mặt Bằng
            </h1>
            <p className="text-gray-600">
              Xây dựng ứng dụng một trang để chỉnh sửa cấu hình bộ xuất và tạo sơ đồ mặt bằng qua
              API
            </p>
          </div>
          {showSkeleton ? (
            <AppSkeleton />
          ) : (
            <div className="animate-in fade-in zoom-in-95 mx-auto grid max-w-400 grid-cols-1 gap-4 duration-500 lg:grid-cols-2">
              <div className="flex flex-col gap-4 overflow-hidden">
                {fileConfigInfo && (
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center">
                        <FileCode2 size={36} className="text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {fileConfigInfo.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                          <p className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {new Date(fileConfigInfo.timestamp).toLocaleString('vi-VN')}
                          </p>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <p className="font-mono">ID: {fileConfigInfo.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <MainEditor
                    config={currentConfig}
                    updateConfig={updateConfig}
                    onSubmit={generateFloorPlan}
                    isLoading={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">
                      Kết quả sơ đồ mặt bằng
                    </h2>
                  </div>
                  <ResponseGallery responseData={apiResponse} isLoading={isLoading} />
                </div>
                <div className="flex h-1/2 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 size={18} className="text-slate-500" />
                      <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">
                        Xem trước JSON trực tiếp
                      </h2>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                    >
                      {copied ? (
                        <Check size={12} className="text-emerald-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copied ? 'Đã chép' : 'Sao chép JSON'}
                    </button>
                  </div>
                  <div className="relative max-h-96 flex-1 overflow-hidden rounded-xl border border-slate-800 bg-[#0F172B]">
                    <div className="absolute top-0 right-0 left-0 flex h-8 items-center border-b border-white/5 bg-slate-800/50 px-4">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                      </div>
                    </div>
                    <div className="custom-scrollbar-dark h-full w-full overflow-auto px-4 pt-8 pb-4">
                      <pre className="font-mono text-[11px] leading-5 text-blue-300">
                        {JSON.stringify(currentConfig, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}
