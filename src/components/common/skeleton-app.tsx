const SkeletonPulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-2xl bg-slate-200 ${className}`} />
);

export const SkeletonApp = () => {
  return (
    <div className="mx-auto grid max-w-400 grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <SkeletonPulse className="h-24 w-full" />
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="space-y-4">
            <SkeletonPulse className="h-8 w-1/3" />
            <SkeletonPulse className="h-64 w-full" />
            <SkeletonPulse className="h-12 w-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">
          <SkeletonPulse className="mb-4 h-6 w-1/4" />
          <SkeletonPulse className="h-full min-h-[300px] w-full" />
        </div>
        <div className="h-1/2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex justify-between">
            <SkeletonPulse className="h-6 w-1/3" />
            <SkeletonPulse className="h-6 w-20" />
          </div>
          <SkeletonPulse className="h-full w-full bg-slate-800" />
        </div>
      </div>
    </div>
  );
};
