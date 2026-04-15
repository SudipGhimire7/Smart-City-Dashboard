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
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Navigation2 className="w-5 h-5 text-cyan-400" />
          <motion.div 
            className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {locations.map((location, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all group text-left"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-400 border border-cyan-500/20`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {location.name}
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">District Sector A-4</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
