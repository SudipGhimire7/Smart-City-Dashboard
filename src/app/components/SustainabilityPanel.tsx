import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { Leaf, Zap, Droplets, Wind, Sun } from "lucide-react";
import { motion } from "motion/react";

const energyData = [
  { time: '00:00', renewable: 45, grid: 20 },
  { time: '04:00', renewable: 52, grid: 15 },
  { time: '08:00', renewable: 48, grid: 35 },
  { time: '12:00', renewable: 75, grid: 10 },
  { time: '16:00', renewable: 68, grid: 25 },
  { time: '20:00', renewable: 55, grid: 30 },
];

const resourceMetrics = [
  { label: "Solar Array", value: 78, unit: "%", icon: Sun, color: "text-amber-400" },
  { label: "Hydro Output", value: 92, unit: "MW", icon: Wind, color: "text-blue-400" },
  { label: "Reservoir", value: 64, unit: "%", icon: Droplets, color: "text-cyan-400" },
];

export function SustainabilityPanel() {
  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Sustainability Index</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">ECO_SYNC_ACTIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Rank</div>
          <div className="text-xl font-bold text-green-400 font-mono">#04</div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {resourceMetrics.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <item.icon className={`w-4 h-4 mb-2 ${item.color}`} />
            <div className="text-lg font-bold text-white font-mono leading-none">{item.value}<span className="text-[10px] ml-0.5 opacity-50">{item.unit}</span></div>
            <div className="text-[9px] uppercase font-bold text-slate-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Energy Visualization */}
      <div className="flex-1 min-h-[180px] bg-black/20 rounded-2xl border border-white/5 p-4 mb-6 relative group overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Energy Distribution</div>
          <div className="text-xs text-green-400 font-mono">Renewable Optimization: 82.4%</div>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energyData}>
            <defs>
              <linearGradient id="colorRen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="renewable" 
              stroke="#22c55e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRen)" 
            />
            <Area 
              type="monotone" 
              dataKey="grid" 
              stroke="#64748b" 
              strokeWidth={1}
              strokeDasharray="5 5"
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold text-slate-300 uppercase">Grid Load Balance</span>
          </div>
          <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '42%' }}
              className="h-full bg-amber-400"
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-white">42%</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-bold text-slate-300 uppercase">Carbon Offset Target</span>
          </div>
          <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '89%' }}
              className="h-full bg-green-500"
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-white">89%</span>
        </div>
      </div>
    </div>
  );
}
