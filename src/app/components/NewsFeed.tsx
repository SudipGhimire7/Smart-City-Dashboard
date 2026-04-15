import { motion } from "motion/react";
import { Newspaper, ExternalLink } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  category: string;
  time: string;
}

export function NewsFeed() {
  const [news] = useState<NewsItem[]>([
    {
      id: 1,
      title: "New traffic management system deployed on Ring Road",
      source: "Kathmandu Post",
      category: "Traffic",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Air quality improves after rainfall in valley",
      source: "The Himalayan Times",
      category: "Environment",
      time: "4h ago",
    },
    {
      id: 3,
      title: "Smart sensors installed at 50 new locations",
      source: "My Republica",
      category: "Technology",
      time: "6h ago",
    },
    {
      id: 4,
      title: "Public transport routes optimized for efficiency",
      source: "Kathmandu Post",
      category: "Transport",
      time: "8h ago",
    },
    {
      id: 5,
      title: "Weather forecast: Clear skies expected tomorrow",
      source: "The Himalayan Times",
      category: "Weather",
      time: "10h ago",
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Traffic": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "Environment": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "Technology": return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Transport": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Weather": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Newspaper className="w-5 h-5 text-cyan-400" />
          <motion.div 
            className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live News Feed</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 max-h-[400px]">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
            />
            
            <div className="relative space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
              </div>
              <h3 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500">{item.source}</span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
          <div className="relative w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Live Updates</span>
      </div>
    </div>
  );
}