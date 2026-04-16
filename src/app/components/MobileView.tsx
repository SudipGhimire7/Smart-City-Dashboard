import React, { useState } from "react";
import { motion } from "motion/react";
import { LayoutDashboard, Menu, X, Map, AlertTriangle } from "lucide-react";

interface MobileViewProps {
  children: React.ReactNode;
}

export function MobileView({ children }: MobileViewProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              CityDesk
            </h1>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              Management Suite
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-xl hover:bg-slate-50 text-slate-600 border border-transparent hover:border-border transition-all"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-4/5 z-40 bg-white border-l border-border shadow-2xl overflow-y-auto"
      >
        <div className="p-6 pt-24 space-y-6">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Main Navigation
          </div>
          {/* Mobile content placeholder - In a real app this would map to menuItems */}
          <div className="space-y-1">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm flex items-center gap-3">
              <Map className="w-5 h-5" /> City Map
            </div>
            <div className="p-3 rounded-xl text-slate-600 font-medium text-sm flex items-center gap-3 hover:bg-slate-50">
              <AlertTriangle className="w-5 h-5" /> Active Alerts
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop content hidden on mobile */}
      <div className="hidden">
        {children}
      </div>
    </div>
  );
}
