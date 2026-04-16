import { motion } from "motion/react";
import { Newspaper, ExternalLink } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  category: string;
  time: string;
  url: string;
}

export function NewsFeed() {
  const [news] = useState<NewsItem[]>([
    {
      id: 1,
      title: "New traffic management system deployed on Ring Road",
      source: "Kathmandu Post",
      category: "Traffic",
      time: "2h ago",
      url: "https://kathmandupost.com/money/2024/04/16/traffic-management-system-to-be-expanded"
    },
    {
      id: 2,
      title: "Air quality improves after rainfall in valley",
      source: "The Himalayan Times",
      category: "Environment",
      time: "4h ago",
      url: "https://thehimalayantimes.com/kathmandu/valley-aqi-improves-significantly"
    },
    {
      id: 3,
      title: "Smart sensors installed at 50 new locations",
      source: "My Republica",
      category: "Technology",
      time: "6h ago",
      url: "https://myrepublica.nagariknetwork.com/news/smart-city-sensors-kathmandu"
    },
    {
      id: 4,
      title: "Public transport routes optimized for efficiency",
      source: "Kathmandu Post",
      category: "Transport",
      time: "8h ago",
      url: "https://kathmandupost.com/kathmandu/2024/04/16/public-transport-routes-optimization-kathmandu"
    },
    {
      id: 5,
      title: "Weather forecast: Clear skies expected tomorrow",
      source: "The Himalayan Times",
      category: "Weather",
      time: "10h ago",
      url: "https://thehimalayantimes.com/nepal/weather-forecast-clear-skies"
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Traffic": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Environment": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Technology": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Transport": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Weather": return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-slate-50/50">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Newspaper className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Live News Feed</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {news.map((item, index) => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block no-underline"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 rounded-xl border border-border bg-white hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="relative space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">{item.time}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">{item.source}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                </div>
              </div>
            </motion.div>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 border-t border-border bg-slate-50/50">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-75" />
          <div className="relative w-2 h-2 bg-rose-500 rounded-full" />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Live Updates</span>
      </div>
    </div>
  );
}
