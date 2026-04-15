import { motion } from "motion/react";
import { Thermometer, Wind, Car, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface StatusBarProps {
  temperature: number;
  aqi: number;
  trafficLevel: string;
}

export function StatusBar({ temperature, aqi, trafficLevel }: StatusBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "from-green-500 to-emerald-500";
    if (aqi <= 100) return "from-yellow-500 to-amber-500";
    if (aqi <= 150) return "from-orange-500 to-red-500";
    return "from-red-500 to-rose-700";
  };

  const getAqiGlow = (aqi: number) => {
    if (aqi <= 50) return "shadow-[0_0_20px_rgba(34,197,94,0.5)]";
    if (aqi <= 100) return "shadow-[0_0_20px_rgba(234,179,8,0.5)]";
    if (aqi <= 150) return "shadow-[0_0_20px_rgba(249,115,22,0.5)]";
    return "shadow-[0_0_20px_rgba(239,68,68,0.5)]";
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-4 flex items-center gap-4 border border-white/5"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Temp</div>
            <div className="text-xl font-bold text-white font-mono">{temperature}°C</div>
          </div>
        </motion.div>

        {/* AQI */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-4 flex items-center gap-4 border border-white/5"
        >
          <div className={`w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20`}>
            <Wind className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AQI</div>
            <div className={`text-xl font-bold font-mono bg-gradient-to-r ${getAqiColor(aqi)} bg-clip-text text-transparent`}>
              {aqi}
            </div>
          </div>
        </motion.div>

        {/* Traffic */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-4 flex items-center gap-4 border border-white/5"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Traffic</div>
            <div className="text-xl font-bold text-white font-mono">{trafficLevel}</div>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-4 flex items-center gap-4 border border-white/5"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Time</div>
            <div className="text-xl font-bold text-white font-mono">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}