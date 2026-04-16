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
    if (aqi <= 50) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (aqi <= 100) return "text-amber-600 bg-amber-50 border-amber-100";
    if (aqi <= 150) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Temperature</div>
            <div className="text-lg font-bold text-foreground">{temperature}°C</div>
          </div>
        </div>

        {/* AQI */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getAqiColor(aqi)}`}>
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Air Quality</div>
            <div className={`text-lg font-bold ${getAqiColor(aqi).split(' ')[0]}`}>
              {aqi}
            </div>
          </div>
        </div>

        {/* Traffic */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Traffic</div>
            <div className="text-lg font-bold text-foreground">{trafficLevel}</div>
          </div>
        </div>

        {/* Time */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Time</div>
            <div className="text-lg font-bold text-foreground">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}