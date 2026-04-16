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
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-border px-4 py-2 flex justify-around items-center pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-1 p-2 w-16"
          >
            <div className={`transition-all duration-300 p-1.5 rounded-xl ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
