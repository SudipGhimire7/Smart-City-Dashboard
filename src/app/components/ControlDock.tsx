import { motion } from "motion/react";
import { MapPin, Wind, Cloud, Layers, Maximize2 } from "lucide-react";

interface ControlDockProps {
  showTraffic: boolean;
  showAqi: boolean;
  showWeather: boolean;
  onToggleTraffic: () => void;
  onToggleAqi: () => void;
  onToggleWeather: () => void;
}

export function ControlDock({
  showTraffic,
  showAqi,
  showWeather,
  onToggleTraffic,
  onToggleAqi,
  onToggleWeather,
}: ControlDockProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-md border border-border px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-slate-200/50">
        {/* Traffic Toggle */}
        <button
          onClick={onToggleTraffic}
          className={`flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl transition-all ${
            showTraffic 
              ? "bg-rose-50 text-rose-600 border border-rose-100" 
              : "text-slate-400 hover:bg-slate-50 border border-transparent"
          }`}
        >
          <div className="relative">
            <MapPin className="w-5 h-5" />
            {showTraffic && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Traffic</span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* AQI Toggle */}
        <button
          onClick={onToggleAqi}
          className={`flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl transition-all ${
            showAqi 
              ? "bg-amber-50 text-amber-600 border border-amber-100" 
              : "text-slate-400 hover:bg-slate-50 border border-transparent"
          }`}
        >
          <div className="relative">
            <Wind className="w-5 h-5" />
            {showAqi && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full border border-white" />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">AQI</span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* Weather Toggle */}
        <button
          onClick={onToggleWeather}
          className={`flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl transition-all ${
            showWeather 
              ? "bg-blue-50 text-blue-600 border border-blue-100" 
              : "text-slate-400 hover:bg-slate-50 border border-transparent"
          }`}
        >
          <div className="relative">
            <Cloud className="w-5 h-5" />
            {showWeather && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full border border-white" />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Weather</span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* View Layers */}
        <button className="flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Layers</span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* Fullscreen */}
        <button className="flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
          <Maximize2 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Expand</span>
        </button>
      </div>
    </div>
  );
}