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
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Sustainability Index</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Eco Systems Active</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Rank</div>
          <div className="text-xl font-bold text-emerald-600">#04</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {resourceMetrics.map((item, i) => (
            <div key={i} className="bg-white border border-border shadow-sm rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <item.icon className={`w-4 h-4 mb-2 ${item.color.replace('400', '600')}`} />
              <div className="text-lg font-bold text-foreground leading-none">{item.value}<span className="text-[10px] ml-0.5 text-muted-foreground font-medium">{item.unit}</span></div>
              <div className="text-[9px] uppercase font-bold text-slate-500 mt-1.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Energy Visualization */}
        <div className="bg-slate-50 rounded-2xl border border-border p-5 mb-8 relative group overflow-hidden shadow-inner">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Energy Distribution</div>
              <div className="text-xs font-bold text-emerald-600">Renewable Optimization: 82.4%</div>
            </div>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorRen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="renewable" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRen)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="grid" 
                  stroke="#64748b" 
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Grid Load Balance</span>
              </div>
              <span className="text-[10px] font-bold text-slate-900">42%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '42%' }}
                className="h-full bg-amber-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Carbon Offset Target</span>
              </div>
              <span className="text-[10px] font-bold text-slate-900">89%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '89%' }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
