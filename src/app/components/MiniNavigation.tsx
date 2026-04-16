import { motion } from "motion/react";
import { Navigation2, MapPin } from "lucide-react";

interface Location {
  name: string;
  coords: { x: number; y: number };
}

export function MiniNavigation() {
  const locations: Location[] = [
    { name: "Ring Road", coords: { x: 50, y: 40 } },
    { name: "Thamel", coords: { x: 45, y: 50 } },
    { name: "Durbar Square", coords: { x: 55, y: 48 } },
    { name: "Patan", coords: { x: 60, y: 55 } },
  ];

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-slate-50/50">
        <div className="relative">
          <Navigation2 className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Quick Navigation</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {locations.map((location, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-white hover:bg-slate-50 hover:border-blue-200 transition-all group text-left shadow-sm"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                {location.name}
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">District Sector A-4</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
