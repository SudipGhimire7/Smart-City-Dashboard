import { motion } from "motion/react";
import { Info, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export type NotificationType = "info" | "warning" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onClick?: (id: string) => void;
}

export function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case "success": return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBg = () => {
    switch (notification.type) {
      case "warning": return "bg-rose-50";
      case "success": return "bg-emerald-50";
      default: return "bg-blue-50";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onClick?.(notification.id)}
      className={`p-4 rounded-xl border flex gap-4 cursor-pointer transition-all hover:shadow-md ${
        notification.isRead 
          ? "bg-white border-slate-100 opacity-60" 
          : `${getBg()} border-transparent shadow-sm`
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${notification.isRead ? 'bg-slate-100 text-slate-400' : 'bg-white shadow-sm'}`}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h4 className={`text-xs font-bold truncate ${notification.isRead ? 'text-slate-500' : 'text-slate-800'}`}>
            {notification.title}
          </h4>
          <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
            <Clock className="w-3 h-3" />
            {notification.timestamp}
          </div>
        </div>
        <p className={`text-[10px] leading-relaxed line-clamp-2 ${notification.isRead ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
          {notification.description}
        </p>
      </div>
      
      {!notification.isRead && (
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
    </motion.div>
  );
}
