import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "./ui/sidebar";
import { Map, AlertTriangle, BarChart3, Newspaper, Settings, LayoutDashboard, Brain, Bell, CheckCheck, Trash2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { MobileBottomNav } from "./MobileBottomNav";
import { motion, AnimatePresence } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { NotificationCard, Notification } from "./NotificationCard";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { SystemLogsConsole } from "./SystemLogsConsole";
import { LogEntry } from "./LogEntryTable";

interface LayoutProps {
  children: React.ReactNode;
  isCrisisMode: boolean;
  setIsCrisisMode: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, isCrisisMode, setIsCrisisMode, activeTab, setActiveTab }: LayoutProps) {
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  
  // Notification & Log State
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "warning", title: "Traffic Surge", description: "Heavy congestion detected on Kalanki-Balkhu stretch.", timestamp: "2m ago", isRead: false },
    { id: "2", type: "info", title: "Grid Maintenance", description: "Scheduled maintenance in Maharajgunj sector.", timestamp: "15m ago", isRead: false },
  ]);

  const [allLogs, setAllLogs] = useState<LogEntry[]>([
    { id: "l1", timestamp: new Date(Date.now() - 120000), level: "warning", source: "Traffic System", message: "Heavy congestion detected on Kalanki-Balkhu stretch." },
    { id: "l2", timestamp: new Date(Date.now() - 900000), level: "info", source: "Power Grid", message: "Scheduled maintenance in Maharajgunj sector." },
    { id: "l3", timestamp: new Date(Date.now() - 3600000), level: "success", source: "Env Monitor", message: "AQI in Basantapur Area has returned to optimal levels." },
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Real-time Event Simulation (Unified for Notification & Logs)
  useEffect(() => {
    const templates = [
      { type: "info" as const, title: "Public Works", description: "Water pressure normalization confirmed in Patan sector.", source: "Water Utility" },
      { type: "warning" as const, title: "Power Advisory", description: "Substation 4 load balancing event detected. Minimal impact expected.", source: "Power Grid" },
      { type: "success" as const, title: "System Sync", description: "All city infrastructure monitors successfully synchronized.", source: "Core-AI" },
      { type: "warning" as const, title: "Transit Delay", description: "Traffic signal malfunction at Chabahil. Repair units dispatched.", source: "Traffic System" },
    ];

    const timer = setInterval(() => {
      if (allLogs.length > 50) return; // Cap logs
      const template = templates[Math.floor(Math.random() * templates.length)];
      const timestamp = new Date();
      const id = Date.now().toString();

      // Update Notifications
      setNotifications(prev => [
        { id, type: template.type, title: template.title, description: template.description, timestamp: "Just now", isRead: false },
        ...prev.slice(0, 9)
      ]);

      // Update Historical Logs
      setAllLogs(prev => [
        { id: `l-${id}`, timestamp, level: template.type, source: template.source, message: template.description },
        ...prev
      ]);
    }, 45000);

    return () => clearInterval(timer);
  }, [allLogs.length]);

  const menuItems = [
    { id: "map", icon: Map, label: "City Map" },
    { id: "alerts", icon: AlertTriangle, label: "Active Alerts" },
    { id: "analytics", icon: BarChart3, label: "City Analytics" },
    { id: "news", icon: Newspaper, label: "News Feed" },
    { id: "ai", icon: Brain, label: "AI Assistant" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex border-r border-border bg-white" collapsible="icon">
          <SidebarHeader className="p-4 flex items-center gap-3 border-b border-border mb-2 bg-slate-50/50">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight group-data-[collapsible=icon]:hidden">
              CityDesk
            </span>
          </SidebarHeader>
          
          <SidebarContent className="p-2 pt-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id} className="mb-1">
                  <SidebarMenuButton 
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.label}
                    className={`h-11 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border bg-slate-50/50">
            <button 
              onClick={() => setIsCrisisMode(!isCrisisMode)}
              className={`w-full p-4 rounded-xl border transition-all flex flex-col gap-2 group/crisis relative overflow-hidden ${
                isCrisisMode 
                  ? "bg-rose-50 border-rose-200 shadow-lg shadow-rose-100/50" 
                  : "bg-white border-border hover:border-rose-200 hover:bg-rose-50/30 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-2 h-2 rounded-full ${isCrisisMode ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCrisisMode ? "text-rose-600" : "text-slate-400"}`}>
                  {isCrisisMode ? "Protocol Active" : "Status Normal"}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight group-data-[collapsible=icon]:hidden relative z-10 text-left">
                {isCrisisMode ? "Deactivate Override" : "Emergency Override"}
              </div>
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="relative flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/80 backdrop-blur-md px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex-1 flex items-center gap-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden md:block opacity-60">
                Dashboard / <span className="text-slate-900 opacity-100">{menuItems.find(t => t.id === activeTab)?.label}</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors relative group">
                    <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {unreadCount > 0 && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-bounce" />
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[380px] p-0 rounded-2xl border-border shadow-2xl overflow-hidden mt-2">
                  <div className="p-4 bg-slate-50/80 border-b border-border flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">City Monitoring Alerts</h3>
                      <p className="text-[10px] text-slate-500 font-medium">{unreadCount} unread system messages</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="h-8 w-8 p-0 rounded-lg hover:bg-white border border-transparent hover:border-slate-200">
                        <CheckCheck className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8 w-8 p-0 rounded-lg hover:bg-white border border-transparent hover:border-slate-200">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[400px]">
                    <div className="p-3 space-y-2">
                      <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <NotificationCard 
                              key={n.id} 
                              notification={n} 
                              onClick={(id) => setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif))}
                            />
                          ))
                        ) : (
                          <div className="h-[300px] flex flex-col items-center justify-center text-slate-400 gap-3">
                            <Bell className="w-12 h-12 opacity-10" />
                            <p className="text-xs font-medium">System is currently clear</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                  
                  <div className="p-3 bg-slate-50/50 border-t border-border">
                    <button 
                      onClick={() => setIsLogsOpen(true)}
                      className="w-full py-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow transition-all uppercase tracking-widest"
                    >
                      View System Logs
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-border overflow-hidden cursor-pointer hover:border-blue-400 transition-colors shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </header>

          <main className="flex-1 relative overflow-auto custom-scrollbar">
            {children}
          </main>

          <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </SidebarInset>

        <SystemLogsConsole 
          isOpen={isLogsOpen} 
          onClose={() => setIsLogsOpen(false)} 
          logs={allLogs} 
        />
      </div>
    </SidebarProvider>
  );
}
