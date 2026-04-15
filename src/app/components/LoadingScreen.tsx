import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM");

  useEffect(() => {
    const texts = [
      "INITIALIZING SYSTEM",
      "CONNECTING TO SENSORS",
      "LOADING CITY DATA",
      "CALIBRATING ANALYTICS",
      "ESTABLISHING REAL-TIME FEED",
      "SYSTEM READY"
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
        className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              KATHMANDU
            </h1>
            <div className="text-sm text-cyan-300/70 uppercase tracking-[0.5em]">
              Smart City Command Center
            </div>
          </motion.div>

          {/* Loading Bar */}
          <div className="w-96 space-y-4">
            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-400 blur-md"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading Text */}
            <div className="flex items-center justify-between">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-cyan-300 uppercase tracking-wider font-mono"
              >
                {loadingText}
              </motion.div>
              <div className="text-sm text-cyan-400 font-mono">
                {progress}%
              </div>
            </div>
          </div>

          {/* Scanning animation */}
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-8 bg-cyan-500 rounded-full"
                animate={{
                  scaleY: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyan-500/50"></div>
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-500/50"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-500/50"></div>
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-500/50"></div>
      </motion.div>
    </AnimatePresence>
  );
}
