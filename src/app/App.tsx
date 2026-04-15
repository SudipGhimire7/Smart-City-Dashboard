import { useState, useEffect } from "react";
import { StatusBar } from "./components/StatusBar";
import { MapPanel } from "./components/MapPanel";
import { AlertsPanel } from "./components/AlertsPanel";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { NewsFeed } from "./components/NewsFeed";
import { HUDOverlay } from "./components/HUDOverlay";
import { Layout } from "./components/Layout";
import { AISystemAssistant } from "./components/AISystemAssistant";
import { SustainabilityPanel } from "./components/SustainabilityPanel";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Zap, Shield, Globe, Power } from "lucide-react";

export default function App() {
  const [showTraffic, setShowTraffic] = useState(true);
  const [showAqi, setShowAqi] = useState(true);
  const [showWeather, setShowWeather] = useState(false);
  
  // Simulated real-time data
  const [temperature, setTemperature] = useState(22);
  const [aqi, setAqi] = useState(165);
  const [trafficLevel, setTrafficLevel] = useState("High");
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [incidents, setIncidents] = useState<{ id: string; x: number; y: number; label: string; type: string }[]>([]);

  const handleReportIncident = (label: string) => {
    const newIncident = {
      id: Date.now().toString(),
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      label,
      type: "alert"
    };
    setIncidents(prev => [...prev.slice(-4), newIncident]); // Keep last 5 incidents
  };

  // Crisis Mode Effect
  useEffect(() => {
    document.documentElement.setAttribute("data-crisis", isCrisisMode.toString());
    if (isCrisisMode) {
      toast.warning("EMERGENCY PROTOCOL ACTIVATED", {
        description: "City systems shifting to high-priority alert status.",
        duration: 10000,
      });
    } else {
      toast.info("System Status: Normal", {
        description: "Crisis protocols deactivated.",
      });
    }
  }, [isCrisisMode]);

  // Simulate data updates and notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => prev + (Math.random() - 0.5) * 2);
      setAqi(prev => {
        const next = Math.max(50, Math.min(200, prev + (Math.random() - 0.5) * 10));
        if (next > 180 && prev <= 180) {
          toast.error("Critical AQI level detected in Sector 7", {
            description: "Neural systems recommending air filtration activation."
          });
        }
        return next;
      });
      
      const levels = ["Low", "Medium", "High"];
      const nextTraffic = isCrisisMode ? "Critical" : levels[Math.floor(Math.random() * levels.length)];
      if (nextTraffic !== trafficLevel && (nextTraffic === "High" || nextTraffic === "Critical")) {
        toast.warning(isCrisisMode ? "CRITICAL CONGESTION" : "Traffic congestion rising on Main Arterial Road");
      }
      setTrafficLevel(nextTraffic);
    }, 8000);

    return () => clearInterval(interval);
  }, [trafficLevel, isCrisisMode]);

  return (
    <Layout isCrisisMode={isCrisisMode} setIsCrisisMode={setIsCrisisMode}>
      <HUDOverlay />
      <Toaster position="top-right" closeButton richColors theme="dark" />
      
      <main className="relative z-10 w-full max-w-[1700px] mx-auto">
        <div className="p-4 lg:p-8 space-y-8 pb-24 lg:pb-8">
          {/* Top Status Overview */}
          <StatusBar 
            temperature={Math.round(temperature)} 
            aqi={Math.round(aqi)} 
            trafficLevel={trafficLevel}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Map and Main Feed (3/4 on XL) */}
            <div className="xl:col-span-3 space-y-6">
              <div className="h-[500px] lg:h-[650px] rounded-3xl overflow-hidden glass-panel relative group border border-white/5">
                <MapPanel 
                  showTraffic={showTraffic}
                  showAqi={showAqi}
                  showWeather={showWeather}
                  incidents={incidents}
                />
                
                {/* Floating Map Controls */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
                  {[
                    { label: "Traffic", active: showTraffic, set: setShowTraffic },
                    { label: "Air Quality", active: showAqi, set: setShowAqi },
                    { label: "Weather", active: showWeather, set: setShowWeather },
                  ].map((ctrl) => (
                    <button
                      key={ctrl.label}
                      onClick={() => ctrl.set(!ctrl.active)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                        ctrl.active 
                          ? "bg-cyan-500 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                          : "bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {ctrl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Feed Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 min-h-[400px] border border-white/5">
                  <NewsFeed />
                </div>
                <div className="glass-panel p-6 min-h-[400px] border border-white/5">
                  <SustainabilityPanel />
                </div>
              </div>
            </div>

            {/* Right Column - Intelligence & Systems (1/4 on XL) */}
            <div className="xl:col-span-1 space-y-6">
              <div className="glass-panel p-6 min-h-[450px] border border-white/5">
                <AISystemAssistant onReportIncident={handleReportIncident} />
              </div>
              <div className="glass-panel p-6 min-h-[450px] border border-white/5">
                <AlertsPanel />
              </div>
              <div className="glass-panel p-6 min-h-[450px] border border-white/5">
                <AnalyticsPanel />
              </div>
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Grid Stability", value: "99.2%", icon: Zap, color: "text-cyan-400" },
              { label: "Security Status", value: "Optimal", icon: Shield, color: "text-blue-400" },
              { label: "Global Sync", value: "1.2ms", icon: Globe, color: "text-purple-400" },
              { label: "System Priority", value: isCrisisMode ? "EMERGENCY" : "OPTIMAL", icon: Power, color: isCrisisMode ? "text-red-500" : "text-green-500", action: () => setIsCrisisMode(!isCrisisMode) },
            ].map((metric) => (
              <button 
                key={metric.label} 
                onClick={metric.action}
                disabled={!metric.action}
                className={`glass-panel p-6 flex items-center gap-6 border border-white/5 hover:bg-white/5 transition-colors text-left ${metric.action ? "cursor-pointer" : "cursor-default animate-pulse-soft"}`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${metric.color} border border-white/5 shadow-inner`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{metric.label}</div>
                  <div className="text-xl font-bold text-white font-mono">{metric.value}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}