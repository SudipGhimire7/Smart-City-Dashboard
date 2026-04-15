import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Info, CheckCircle, Brain, TrendingUp, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Alert {
  id: number;
  title: string;
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: Date;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "High Traffic Detected",
      message: "Ring Road experiencing heavy congestion",
      severity: "high",
      timestamp: new Date(),
    },
    {
      id: 2,
      title: "Air Quality Alert",
      message: "AQI levels elevated in Thamel area",
      severity: "medium",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 3,
      title: "Weather Update",
      message: "Light rain expected in next 2 hours",
      severity: "low",
      timestamp: new Date(Date.now() - 600000),
    },
  ]);

  const aiInsights = [
    { icon: TrendingUp, text: "Best travel time: 6:00 AM - 8:00 AM", type: "success" },
    { icon: AlertCircle, text: "Pollution peaks between 8-10 AM", type: "warning" },
    { icon: Info, text: "Traffic reduces by 40% after 8 PM", type: "info" },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          color: "border-red-500/50 bg-red-500/10",
          glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
          icon: AlertTriangle,
          iconColor: "text-red-400",
        };
      case "medium":
        return {
          color: "border-yellow-500/50 bg-yellow-500/10",
          glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
          icon: AlertCircle,
          iconColor: "text-yellow-400",
        };
      default:
        return {
          color: "border-green-500/50 bg-green-500/10",
          glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
          icon: CheckCircle,
          iconColor: "text-green-400",
        };
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Active Alerts */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <motion.div 
              className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Alerts</h2>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => {
              const config = getSeverityConfig(alert.severity);
              const Icon = config.icon;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-3 rounded-xl border ${config.color} relative group cursor-pointer transition-all hover:bg-white/5`}
                >
                  <div className="flex gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 ${config.iconColor}`} />
                    <div>
                      <h3 className="text-xs font-bold text-white">{alert.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Insights */}
      <div className="flex flex-col gap-4 border-t border-white/5 pt-6 mt-auto">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-purple-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Insights</h2>
        </div>
        <div className="space-y-2">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default"
              >
                <Icon className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] text-slate-300">{insight.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}