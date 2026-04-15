import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "./ui/sidebar";
import { Map, AlertTriangle, BarChart3, Newspaper, Settings, LayoutDashboard, Brain, Bell } from "lucide-react";
import { useState } from "react";
import { MobileBottomNav } from "./MobileBottomNav";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
  isCrisisMode: boolean;
  setIsCrisisMode: (val: boolean) => void;
}

export function Layout({ children, isCrisisMode, setIsCrisisMode }: LayoutProps) {
  const [activeTab, setActiveTab] = useState("map");

  const menuItems = [
    { id: "map", icon: Map, label: "City Map" },
    { id: "alerts", icon: AlertTriangle, label: "Active Alerts" },
    { id: "analytics", icon: BarChart3, label: "City Analytics" },
    { id: "news", icon: Newspaper, label: "News Feed" },
    { id: "ai", icon: Brain, label: "AI Commands" },
    { id: "settings", icon: Settings, label: "System Config" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-950 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex border-r border-white/5 bg-slate-900/50 backdrop-blur-xl" collapsible="icon">
          <SidebarHeader className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
              KATHMANDU
            </span>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.label}
                    className={`transition-all duration-300 ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <button 
              onClick={() => setIsCrisisMode(!isCrisisMode)}
              className={`w-full p-4 rounded-xl border transition-all flex flex-col gap-2 group/crisis relative overflow-hidden ${
                isCrisisMode 
                  ? "bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                  : "bg-slate-800/50 border-white/5 hover:border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isCrisisMode ? "bg-red-500" : "bg-green-500"}`} />
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isCrisisMode ? "text-red-400" : "text-slate-400"}`}>
                  {isCrisisMode ? "CRISIS_ACTIVE" : "SYSTEM_STABLE"}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight group-data-[collapsible=icon]:hidden relative z-10 text-left">
                {isCrisisMode ? "Deactivate Override" : "Emergency Protocol"}
              </div>
              {isCrisisMode && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                />
              )}
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="relative flex-1 flex flex-col min-w-0 bg-transparent">
          {/* Top Bar for Mobile/Desktop */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-md px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex-1 flex items-center gap-4">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest hidden md:block">
                Dashboard / {menuItems.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </header>

          <main className="flex-1 relative overflow-auto custom-scrollbar">
            {children}
          </main>

          {/* Mobile Navigation */}
          <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
