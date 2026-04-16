import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Readying Systems");

  useEffect(() => {
    const texts = [
      "Readying Systems",
      "Optimizing Dashboard",
      "Syncing City Data",
      "Calibrating Analytics",
      "Interface Preparation",
      "System Ready"
    ];

    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex < texts.length - 1) {
        currentIndex++;
        setLoadingText(texts[currentIndex]);
      }
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-8"
      >
        <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-sm">
          {/* Logo/Title Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-200 mx-auto mb-6">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              CityDesk
            </h1>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              Central Management Suite
            </div>
          </motion.div>

          {/* Loading Container */}
          <div className="w-full space-y-4">
            {/* Progress Bar Label */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <motion.span
                key={loadingText}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {loadingText}
              </motion.span>
              <span className="text-blue-600">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-600 rounded-full shadow-lg shadow-blue-400/50"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-medium text-center leading-relaxed">
            Optimized for enterprise city management. <br />
            Powered by Kathmandu Analytics.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
