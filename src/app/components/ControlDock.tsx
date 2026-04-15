import { motion } from "motion/react";
import { MapPin, Wind, Cloud, Layers, Maximize2 } from "lucide-react";

interface ControlDockProps {
  showTraffic: boolean;
  showAqi: boolean;
  showWeather: boolean;
  onToggleTraffic: () => void;
  onToggleAqi: () => void;
  onToggleWeather: () => void;
}

export function ControlDock({
  showTraffic,
  showAqi,
  showWeather,
  onToggleTraffic,
  onToggleAqi,
  onToggleWeather,
}: ControlDockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1
      }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      style={{
        filter: 'drop-shadow(0 20px 50px rgba(6, 182, 212, 0.4))'
      }}
    >
      <motion.div 
        className="glass-panel px-6 py-4 flex items-center gap-4"
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          boxShadow: `
            0 0 80px rgba(6, 182, 212, 0.5),
            0 0 120px rgba(139, 92, 246, 0.3),
            inset 0 0 60px rgba(6, 182, 212, 0.15)
          `
        }}
      >
        {/* Traffic Toggle */}
        <motion.button
          onClick={onToggleTraffic}
          className={`relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            showTraffic 
              ? "bg-red-500/30 border-2 border-red-500" 
              : "bg-slate-800/50 border-2 border-slate-700/50"
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: showTraffic 
              ? [
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                  '0 0 40px rgba(239, 68, 68, 0.6)',
                  '0 0 20px rgba(239, 68, 68, 0.4)'
                ]
              : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity
            }
          }}
        >
          {showTraffic && (
            <motion.div
              className="absolute inset-0 bg-red-500/20 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <div className="relative">
            <MapPin className={`w-6 h-6 ${showTraffic ? "text-red-400" : "text-cyan-400/50"} relative z-10`} />
            {showTraffic && (
              <motion.div
                className="absolute inset-0 bg-red-400 rounded-full blur-lg"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <span className={`text-xs uppercase tracking-wider ${showTraffic ? "text-red-300" : "text-cyan-300/50"}`}>
            Traffic
          </span>
          {showTraffic && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
              }}
            />
          )}
        </motion.button>

        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* AQI Toggle */}
        <motion.button
          onClick={onToggleAqi}
          className={`relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            showAqi 
              ? "bg-yellow-500/30 border-2 border-yellow-500" 
              : "bg-slate-800/50 border-2 border-slate-700/50"
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: showAqi 
              ? [
                  '0 0 20px rgba(234, 179, 8, 0.4)',
                  '0 0 40px rgba(234, 179, 8, 0.6)',
                  '0 0 20px rgba(234, 179, 8, 0.4)'
                ]
              : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity
            }
          }}
        >
          {showAqi && (
            <motion.div
              className="absolute inset-0 bg-yellow-500/20 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <div className="relative">
            <Wind className={`w-6 h-6 ${showAqi ? "text-yellow-400" : "text-cyan-400/50"} relative z-10`} />
            {showAqi && (
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-full blur-lg"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <span className={`text-xs uppercase tracking-wider ${showAqi ? "text-yellow-300" : "text-cyan-300/50"}`}>
            AQI
          </span>
          {showAqi && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                boxShadow: '0 0 10px rgba(234, 179, 8, 0.8)'
              }}
            />
          )}
        </motion.button>

        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3
          }}
        />

        {/* Weather Toggle */}
        <motion.button
          onClick={onToggleWeather}
          className={`relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            showWeather 
              ? "bg-cyan-500/30 border-2 border-cyan-500" 
              : "bg-slate-800/50 border-2 border-slate-700/50"
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: showWeather 
              ? [
                  '0 0 20px rgba(6, 182, 212, 0.4)',
                  '0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 20px rgba(6, 182, 212, 0.4)'
                ]
              : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity
            }
          }}
        >
          {showWeather && (
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <div className="relative">
            <Cloud className={`w-6 h-6 ${showWeather ? "text-cyan-400" : "text-cyan-400/50"} relative z-10`} />
            {showWeather && (
              <motion.div
                className="absolute inset-0 bg-cyan-400 rounded-full blur-lg"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <span className={`text-xs uppercase tracking-wider ${showWeather ? "text-cyan-300" : "text-cyan-300/50"}`}>
            Weather
          </span>
          {showWeather && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
              }}
            />
          )}
        </motion.button>

        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.6
          }}
        />

        {/* View Layers */}
        <motion.button
          className="relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all bg-slate-800/50 border-2 border-slate-700/50"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Layers className="w-6 h-6 text-cyan-400/50" />
          <span className="text-xs uppercase tracking-wider text-cyan-300/50">
            Layers
          </span>
        </motion.button>

        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.9
          }}
        />

        {/* Fullscreen */}
        <motion.button
          className="relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all bg-slate-800/50 border-2 border-slate-700/50"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Maximize2 className="w-6 h-6 text-cyan-400/50" />
          <span className="text-xs uppercase tracking-wider text-cyan-300/50">
            Expand
          </span>
        </motion.button>
      </motion.div>

      {/* Energy pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-500/50"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)'
        }}
      />
    </motion.div>
  );
}