import { motion } from "motion/react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, BarChart3 } from "lucide-react";

const aqiData = [
  { time: "00:00", value: 95 },
  { time: "04:00", value: 88 },
  { time: "08:00", value: 165 },
  { time: "12:00", value: 142 },
  { time: "16:00", value: 158 },
  { time: "20:00", value: 135 },
  { time: "24:00", value: 110 },
];

const temperatureData = [
  { time: "00:00", value: 12 },
  { time: "04:00", value: 10 },
  { time: "08:00", value: 15 },
  { time: "12:00", value: 22 },
  { time: "16:00", value: 24 },
  { time: "20:00", value: 18 },
  { time: "24:00", value: 14 },
];

const trafficData = [
  { time: "00:00", value: 15 },
  { time: "04:00", value: 10 },
  { time: "08:00", value: 85 },
  { time: "12:00", value: 65 },
  { time: "16:00", value: 78 },
  { time: "20:00", value: 45 },
  { time: "24:00", value: 20 },
];

export function AnalyticsPanel() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel px-3 py-2">
          <p className="text-cyan-300 text-sm font-mono">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <Activity className="w-5 h-5 text-cyan-400" />
          <motion.div 
            className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">City Analytics</h2>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* AQI Trend */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <h3 className="text-xs text-slate-400 uppercase tracking-wider">AQI Trend (24h)</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">Current: 165</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aqiData}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#aqiGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs text-slate-400 uppercase tracking-wider">Temperature (24h)</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">Current: 22°C</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Density */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-yellow-500" />
              <h3 className="text-xs text-slate-400 uppercase tracking-wider">Traffic Density</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">Status: High</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} fill="url(#trafficGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}