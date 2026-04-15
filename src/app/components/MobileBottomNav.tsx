import { Map, AlertTriangle, BarChart3, Newspaper, Settings } from "lucide-react";
import { motion } from "motion/react";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  const tabs = [
    { id: "map", icon: Map, label: "Map" },
    { id: "alerts", icon: AlertTriangle, label: "Alerts" },
    { id: "analytics", icon: BarChart3, label: "Stats" },
    { id: "news", icon: Newspaper, label: "Updates" },
    { id: "settings", icon: Settings, label: "System" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-panel border-t border-white/10 px-4 py-2 flex justify-around items-center pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-1 p-2"
          >
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-cyan-500/10 blur-md rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon 
              className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} 
            />
            <span className={`text-[10px] uppercase tracking-tighter transition-colors duration-300 ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500 font-medium'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
