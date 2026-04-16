import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { StatusBar } from "./components/StatusBar";
import { MapPanel } from "./components/MapPanel";
import { AlertsPanel } from "./components/AlertsPanel";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { NewsFeed } from "./components/NewsFeed";
import { Layout } from "./components/Layout";
import { AISystemAssistant } from "./components/AISystemAssistant";
import { SustainabilityPanel } from "./components/SustainabilityPanel";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Zap, Shield, Globe, Power } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("map");
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

  const renderContent = () => {
    switch (activeTab) {
      case "map":
        return (
          <div className="space-y-6">
            <div className="h-[calc(100vh-280px)] lg:h-[700px] rounded-3xl overflow-hidden bg-card border border-border relative group shadow-sm bg-white">
              <MapPanel 
                showTraffic={showTraffic}
                showAqi={showAqi}
                showWeather={showWeather}
                incidents={incidents}
              />
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {[
                  { label: "Traffic", active: showTraffic, set: setShowTraffic },
                  { label: "Air Quality", active: showAqi, set: setShowAqi },
                  { label: "Weather", active: showWeather, set: setShowWeather },
                ].map((ctrl) => (
                  <button
                    key={ctrl.label}
                    onClick={() => ctrl.set(!ctrl.active)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border shadow-sm ${
                      ctrl.active 
                        ? "bg-blue-600 text-white border-blue-700" 
                        : "bg-white/95 backdrop-blur-sm text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {ctrl.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "System Uptime", value: "99.98%", icon: Zap, color: "text-blue-600" },
                { label: "Network Security", value: "Protected", icon: Shield, color: "text-indigo-600" },
                { label: "Response Time", value: "0.8ms", icon: Globe, color: "text-cyan-600" },
                { label: "System Status", value: isCrisisMode ? "EMERGENCY" : "OPTIMAL", icon: Power, color: isCrisisMode ? "text-rose-500" : "text-emerald-500", action: () => setIsCrisisMode(!isCrisisMode) },
              ].map((metric) => (
                <button 
                  key={metric.label} 
                  onClick={metric.action}
                  disabled={!metric.action}
                  className="bg-white p-5 flex items-center gap-5 border border-border rounded-2xl shadow-sm hover:border-blue-200 hover:bg-slate-50 transition-all text-left group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${metric.color} border border-slate-100 shadow-sm group-hover:scale-105 transition-transform`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{metric.label}</div>
                    <div className="text-sm lg:text-md font-bold text-slate-800">{metric.value}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case "alerts":
        return <div className="bg-white rounded-3xl border border-border h-[calc(100vh-180px)] overflow-hidden"><AlertsPanel /></div>;
      case "analytics":
        return <div className="bg-white rounded-3xl border border-border h-[calc(100vh-180px)] overflow-hidden"><AnalyticsPanel /></div>;
      case "news":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          <NewsFeed />
          <SustainabilityPanel />
        </div>;
      case "ai":
        return <div className="bg-white rounded-3xl border border-border h-[calc(100vh-180px)] overflow-hidden"><AISystemAssistant onReportIncident={handleReportIncident} /></div>;
      default:
        return <div className="h-[calc(100vh-180px)] flex items-center justify-center text-slate-400">Settings Section Coming Soon</div>;
    }
  };

  // Emergency Mode Effect
  useEffect(() => {
    document.documentElement.setAttribute("data-crisis", isCrisisMode.toString());
    if (isCrisisMode) {
      toast.warning("EMERGENCY OVERRIDE ACTIVATED", {
        description: "Prioritizing emergency response protocols across city infrastructure.",
        duration: 10000,
      });
    } else {
      toast.info("System Status: Normal", {
        description: "Dashboard returned to standard monitoring mode.",
      });
    }
  }, [isCrisisMode]);

  // Data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => prev + (Math.random() - 0.5) * 2);
      setAqi(prev => {
        const next = Math.max(50, Math.min(200, prev + (Math.random() - 0.5) * 10));
        if (next > 180 && prev <= 180) {
          toast.error("Unhealthy AQI detected in Sector 7", {
            description: "Advising deployment of local filtration measures."
          });
        }
        return next;
      });
      
      const levels = ["Low", "Medium", "High"];
      const nextTraffic = isCrisisMode ? "Critical" : levels[Math.floor(Math.random() * levels.length)];
      if (nextTraffic !== trafficLevel && (nextTraffic === "High" || nextTraffic === "Critical")) {
        toast.warning(isCrisisMode ? "CRITICAL CONGESTION" : "Increasing traffic density on Central Arterial Road");
      }
      setTrafficLevel(nextTraffic);
    }, 8000);

    return () => clearInterval(interval);
  }, [trafficLevel, isCrisisMode]);

  return (
    <Layout 
      isCrisisMode={isCrisisMode} 
      setIsCrisisMode={setIsCrisisMode} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      <Toaster position="top-right" closeButton richColors theme="light" />
      
      <main className="relative z-10 w-full max-w-[1700px] mx-auto">
        <div className="p-4 lg:p-8 space-y-8 pb-24 lg:pb-8">
          <StatusBar 
            temperature={Math.round(temperature)} 
            aqi={Math.round(aqi)} 
            trafficLevel={trafficLevel}
          />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}