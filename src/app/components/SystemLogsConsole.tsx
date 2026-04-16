import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { LogEntryTable, LogEntry, LogLevel } from "./LogEntryTable";
import { Input } from "./ui/input";
import { Search, Filter, Download, Terminal } from "lucide-react";
import { Button } from "./ui/button";

interface SystemLogsConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
}

export function SystemLogsConsole({ isOpen, onClose, logs }: SystemLogsConsoleProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<LogLevel | "all">("all");

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                            log.source.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || log.level === filter;
      return matchesSearch && matchesFilter;
    });
  }, [logs, search, filter]);

  const handleExport = () => {
    // Simulated export
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,Level,Source,Message\n" + 
      filteredLogs.map(l => `${l.timestamp.toISOString()},${l.level},${l.source},${l.message}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `citydesk_logs_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-4xl w-full flex flex-col p-0 border-l border-border bg-slate-50">
        <SheetHeader className="p-6 bg-white border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold text-slate-800 tracking-tight">System Event Terminal</SheetTitle>
              <SheetDescription className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                Comprehensive CityDesk Operation Logs
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
          {/* Controls Bar */}
          <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 min-w-[240px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search system logs..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-xs"
                />
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(["all", "info", "warning", "critical"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                      filter === lvl 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="h-10 rounded-xl px-4 gap-2 text-[10px] uppercase font-bold tracking-widest bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export .CSV
            </Button>
          </div>

          {/* Table Area */}
          <div className="flex-1 p-6 overflow-hidden">
            <LogEntryTable logs={filteredLogs} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-border flex items-center justify-between">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {filteredLogs.length} events matching current filters
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Live Sync Alpha</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
