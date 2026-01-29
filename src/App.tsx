import { useExporterStore } from "./store/useExporterStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function App() {
  const { config, updateField, setConfig, fetchFloorPlan, loading } = useExporterStore();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        setConfig(JSON.parse(ev.target?.result as string));
        toast.success("Configuration loaded!");
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* CỘT TRÁI: FORM CHỈNH SỬA */}
      <Card shadow-lg>
        <CardHeader>
          <CardTitle>Editor Settings</CardTitle>
          <Input type="file" onChange={handleUpload} accept=".json" className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Wall Color</Label>
            <div className="flex gap-2">
              <Input type="color" value={config.wall_color} onChange={(e) => updateField('wall_color', e.target.value)} className="w-12 h-10 p-1" />
              <Input type="text" value={config.wall_color} onChange={(e) => updateField('wall_color', e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label>Hide Dimensions</Label>
            <Switch checked={config.hide_dimensions} onCheckedChange={(v) => updateField('hide_dimensions', v)} />
          </div>

          <Button className="w-full" onClick={() => fetchFloorPlan("KEY_HERE", "ID_HERE")} disabled={loading}>
             {loading ? "Generating..." : "Request Floor Plan"}
          </Button>
        </CardContent>
      </Card>

      {/* CỘT PHẢI: PREVIEW JSON */}
      <div className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-auto max-h-[600px]">
        <h3 className="text-sm font-mono text-slate-400 mb-4">// Current Configuration</h3>
        <pre className="text-sm">{JSON.stringify(config, null, 2)}</pre>
      </div>
    </div>
  );
}