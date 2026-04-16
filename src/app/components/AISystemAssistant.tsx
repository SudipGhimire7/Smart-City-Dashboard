import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Command, Terminal, Send, Sparkles, Database, Cpu, Activity } from "lucide-react";

interface Message {
  id: string;
  type: "ai" | "user";
  text: string;
  status?: "optimizing" | "analyzing" | "completed";
}

interface AISystemAssistantProps {
  onReportIncident?: (label: string) => void;
}

export function AISystemAssistant({ onReportIncident }: AISystemAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", type: "ai", text: "Hello! I'm Kathmandu's central management assistant. How can I help you today?", status: "completed" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: "user", text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes("report")) {
        const incidentLabel = inputValue.replace(/report/i, "").trim() || "Unspecified Incident";
        aiResponse = `I've logged a report for "${incidentLabel}" and dispatched it to the relevant city department. The incident has been added to our live monitoring system.`;
        if (onReportIncident) onReportIncident(incidentLabel);
      } else if (lowerInput.includes("traffic")) {
        aiResponse = "I'm analyzing current traffic flow. There's some congestion on Ring Road; I've adjusted the signal timing to help clear it faster.";
      } else if (lowerInput.includes("aqi") || lowerInput.includes("air")) {
        aiResponse = "Air quality is currently being monitored close to industrial zones. We're increasing filtration in affected areas to maintain optimal levels.";
      } else {
        aiResponse = "All city systems are functioning normally. I'm currently monitoring infrastructure, energy, and traffic data across all sectors.";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), type: "ai", text: aiResponse, status: "analyzing" };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
      
      // Secondary status update
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, status: "completed" } : m));
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">City Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">System Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <Cpu className="w-4 h-4" />
          <Database className="w-4 h-4" />
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm border ${
                msg.type === "user" 
                  ? "bg-blue-600 border-blue-700 text-white rounded-tr-none" 
                  : "bg-white border-border text-slate-700 rounded-tl-none"
              }`}>
                {msg.type === "ai" && (
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">City Intelligence</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.status === "analyzing" && (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-blue-500 font-medium italic">
                    <Activity className="w-3 h-3 animate-pulse" />
                    Processing request...
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-50 p-3 rounded-2xl border border-border flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50/50 border-t border-border">
        <div className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question or command..."
            className="w-full bg-white border border-border rounded-xl py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isProcessing}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6 text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Infrastructure Link
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Live Data Feed
          </span>
        </div>
      </div>
    </div>
  );
}
