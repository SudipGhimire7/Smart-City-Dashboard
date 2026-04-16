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
          color: "border-rose-100 bg-rose-50",
          icon: AlertTriangle,
          iconColor: "text-rose-600",
          titleColor: "text-rose-900",
          textColor: "text-rose-700"
        };
      case "medium":
        return {
          color: "border-amber-100 bg-amber-50",
          icon: AlertCircle,
          iconColor: "text-amber-600",
          titleColor: "text-amber-900",
          textColor: "text-amber-700"
        };
      default:
        return {
          color: "border-emerald-100 bg-emerald-50",
          icon: CheckCircle,
          iconColor: "text-emerald-600",
          titleColor: "text-emerald-900",
          textColor: "text-emerald-700"
        };
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full bg-card">
      {/* Active Alerts */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Active Alerts</h2>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => {
              const config = getSeverityConfig(alert.severity);
              const Icon = config.icon;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-3 rounded-xl border ${config.color} shadow-sm group cursor-pointer transition-all hover:shadow-md`}
                >
                  <div className="flex gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 ${config.iconColor}`} />
                    <div>
                      <h3 className={`text-xs font-bold ${config.titleColor}`}>{alert.title}</h3>
                      <p className={`text-[10px] ${config.textColor} mt-0.5 opacity-80`}>{alert.message}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Insights */}
      <div className="flex flex-col gap-4 p-4 border-t border-border bg-slate-50/50 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Brain className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Intelligence Insights</h2>
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
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-border shadow-sm hover:border-indigo-200 transition-all cursor-default"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[11px] font-medium text-slate-600">{insight.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}