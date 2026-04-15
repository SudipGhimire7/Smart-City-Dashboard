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
    { id: "1", type: "ai", text: "City Systems AI online. How can I assist with Kathmandu's optimization today?", status: "completed" }
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
        aiResponse = `Emergency Protocol 7.1 initiated. Reporting "${incidentLabel}" to central dispatch. Coordinating response teams... incident logged on city map.`;
        if (onReportIncident) onReportIncident(incidentLabel);
      } else if (lowerInput.includes("traffic")) {
        aiResponse = "Analyzing traffic patterns... Traffic optimization protocol 4.2 initiated for Ring Road. Re-routing 15% of heavy vehicles to secondary arterials.";
      } else if (lowerInput.includes("aqi") || lowerInput.includes("air")) {
        aiResponse = "AQI levels are currently elevated. Recommending activation of industrial air scrubbers in Zone B. Estimated improvement: 12% in 2 hours.";
      } else {
        aiResponse = "City-wide systems are stable. I am monitoring 45,201 data points. Energy consumption is 5% below peak projections.";
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
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Command Center</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-mono">NEURAL_LINK_ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400">
            <Database className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl border ${
                msg.type === "user" 
                  ? "bg-cyan-500/10 border-cyan-500/20 text-slate-200 rounded-tr-none" 
                  : "bg-purple-500/10 border-purple-500/20 text-slate-200 rounded-tl-none"
              }`}>
                {msg.type === "ai" && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest text-xs">System AI</span>
                  </div>
                )}
                <p className="text-xs leading-relaxed">{msg.text}</p>
                {msg.status === "analyzing" && (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-purple-400 font-mono italic">
                    <Activity className="w-3 h-3 animate-pulse" />
                    Analyzing impact...
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
              <div className="bg-purple-500/5 p-3 rounded-2xl border border-white/5 flex gap-1">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          <Terminal className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="ENTER_COMMAND_OR_QUERY..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
        />
        <button 
          onClick={handleSend}
          disabled={!inputValue.trim() || isProcessing}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-cyan-500/20"
        >
          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          Neural Link
        </span>
        <span className="flex items-center gap-1.5 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          Quantum Core
        </span>
      </div>
    </div>
  );
}
