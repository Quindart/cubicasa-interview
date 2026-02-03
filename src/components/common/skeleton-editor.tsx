const SkeletonEditor = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 w-1/3 rounded bg-slate-200"></div>
    <div className="space-y-3">
      <div className="h-20 w-full rounded-xl bg-slate-100"></div>
      <div className="h-40 w-full rounded-xl bg-slate-100"></div>
      <div className="h-10 w-full rounded-xl bg-slate-200"></div>
    </div>
  </div>
);

export default SkeletonEditor;