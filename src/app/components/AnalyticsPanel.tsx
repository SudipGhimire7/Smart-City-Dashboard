import { motion } from "motion/react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, BarChart3, Zap, Droplets, Bus, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const mockSeries = (base: number, variance: number, count: number) => 
  Array.from({ length: count }, (_, i) => ({
    time: `${String(i * 2).padStart(2, '0')}:00`,
    value: Math.round(base + (Math.random() - 0.5) * variance)
  }));

const aqiData = mockSeries(140, 40, 12);
const energyData = mockSeries(450, 100, 12);
const waterData = mockSeries(85, 10, 12);
const transitData = [
  { route: "Ring Road", efficiency: 88 },
  { route: "Arniko Hwy", efficiency: 72 },
  { route: "Kantipath", efficiency: 94 },
  { route: "Bishnumati", efficiency: 65 },
  { route: "Bagmati", efficiency: 91 },
];

export function AnalyticsPanel() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl shadow-2xl backdrop-blur-md bg-opacity-95">
          <p className="text-white text-xs font-bold tracking-tight">{payload[0].value}</p>
          <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest mt-0.5">Metric Units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/30 overflow-hidden">
      {/* Analytics Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">City Intelligence Hub</h2>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-0.5">Real-time resource and infrastructure auditing</p>
          </div>
        </div>
        
        <Tabs defaultValue="24h" className="w-[240px]">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100 p-1">
            <TabsTrigger value="24h" className="text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">24H</TabsTrigger>
            <TabsTrigger value="7d" className="text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">7D</TabsTrigger>
            <TabsTrigger value="30d" className="text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">30D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* AQI Analytics */}
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Environment: Air Quality</CardTitle>
                <CardDescription className="text-lg font-bold text-slate-900 leading-none mt-1">165 AQI Index</CardDescription>
              </div>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <Activity className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={aqiData}>
                    <defs>
                      <linearGradient id="aqiColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#aqiColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Energy Analytics */}
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Infrastructure: Energy Grid</CardTitle>
                <CardDescription className="text-lg font-bold text-slate-900 leading-none mt-1">452.4 MW Load</CardDescription>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Zap className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} strokeDasharray="10 5" />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} strokeOpacity={0.4} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Water Resource */}
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resources: Water Reserves</CardTitle>
                <CardDescription className="text-lg font-bold text-slate-900 leading-none mt-1">82% Overall Storage</CardDescription>
              </div>
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
                <Droplets className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waterData}>
                    <defs>
                      <linearGradient id="waterColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0891b2" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[60, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="stepAfter" dataKey="value" stroke="#0891b2" strokeWidth={3} fillOpacity={1} fill="url(#waterColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transit Load */}
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Transit: Network Efficiency</CardTitle>
                <CardDescription className="text-lg font-bold text-slate-900 leading-none mt-1">82.1% Avg Flux</CardDescription>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Bus className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-2">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="route" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="efficiency" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Predictive Insights Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center relative z-10 shrink-0">
            <Info className="w-6 h-6 text-blue-400" />
          </div>
          <div className="relative z-10 flex-1">
            <h4 className="text-white font-bold text-sm tracking-tight">AI Predictive Audit: Power Demand Spike Expected</h4>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl">
              Analyzing historical patterns and local event data suggests a 12% surge in energy demand across the Patan Sector within the next 2 hours. Smart-cycling protocol initialized.
            </p>
          </div>
          <button className="relative z-10 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] uppercase font-black tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Confirm Shift
          </button>
        </div>
      </div>
    </div>
  );
}
