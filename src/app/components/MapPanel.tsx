import { motion } from "motion/react";
import { ZoomIn, ZoomOut, Maximize2, Navigation, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface MapPanelProps {
  showTraffic: boolean;
  showAqi: boolean;
  showWeather: boolean;
  incidents?: { id: string; x: number; y: number; label: string; type: string }[];
}

export function MapPanel({ showTraffic, showAqi, showWeather, incidents = [] }: MapPanelProps) {
  const [zoom, setZoom] = useState(12);
  const [dataPoints, setDataPoints] = useState<{x: number; y: number; value: number}[]>([]);

  // Generate animated data points
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        value: Math.random()
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Key locations in Kathmandu
  const markers = [
    { x: 45, y: 50, label: "Thamel", traffic: "high", aqi: 165 },
    { x: 55, y: 48, label: "Durbar Square", traffic: "medium", aqi: 142 },
    { x: 60, y: 55, label: "Patan", traffic: "low", aqi: 95 },
    { x: 50, y: 40, label: "Ring Road", traffic: "high", aqi: 180 },
    { x: 40, y: 60, label: "Boudhanath", traffic: "medium", aqi: 120 },
  ];

  const getTrafficColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-red-500";
      default: return "bg-cyan-500";
    }
  };

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "rgba(34, 197, 94, 0.3)";
    if (aqi <= 100) return "rgba(234, 179, 8, 0.3)";
    if (aqi <= 150) return "rgba(249, 115, 22, 0.3)";
    return "rgba(239, 68, 68, 0.3)";
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Main Map Container with Enhanced Depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 1,
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="relative w-full h-full"
        style={{
          transform: 'perspective(1500px) rotateX(3deg)',
          filter: 'drop-shadow(0 25px 50px rgba(6, 182, 212, 0.3)) drop-shadow(0 50px 100px rgba(139, 92, 246, 0.2))',
        }}
      >
        {/* Map Background with Enhanced Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden"
          style={{
            boxShadow: `
              0 0 60px rgba(6, 182, 212, 0.4),
              0 0 120px rgba(139, 92, 246, 0.3),
              inset 0 0 100px rgba(6, 182, 212, 0.1)
            `
          }}
        >
          {/* Animated scanning grid overlay */}
          <motion.div 
            className="absolute inset-0 opacity-40"
            animate={{
              backgroundPosition: ['0px 0px', '30px 30px']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Animated Data Point Overlay */}
          <div className="absolute inset-0">
            {dataPoints.map((point, i) => (
              <motion.div
                key={`data-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </div>

          {/* Scanning beam effect */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
            }}
            animate={{
              y: ['0%', '100%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* AQI Heat Zones with Enhanced Glow */}
          {showAqi && markers.map((marker, i) => (
            <motion.div
              key={`aqi-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                width: '200px',
                height: '200px',
                background: getAqiColor(marker.aqi),
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 80px ${getAqiColor(marker.aqi)}`
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Traffic Routes with Enhanced Animation */}
          {showTraffic && (
            <>
              <svg className="absolute inset-0 w-full h-full">
                {/* Main road routes */}
                <motion.path
                  d="M 20,50 Q 40,45 60,48 T 90,50"
                  stroke="rgba(239, 68, 68, 0.8)"
                  strokeWidth="5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                  filter="url(#enhanced-glow)"
                />
                <motion.path
                  d="M 50,10 Q 52,30 50,60 T 48,90"
                  stroke="rgba(234, 179, 8, 0.8)"
                  strokeWidth="5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                  filter="url(#enhanced-glow)"
                />
                
                {/* Animated traffic flow particles */}
                {[...Array(10)].map((_, i) => (
                  <motion.circle
                    key={`traffic-${i}`}
                    r="3"
                    fill="rgba(6, 182, 212, 0.8)"
                    filter="url(#enhanced-glow)"
                    initial={{ offsetDistance: '0%', opacity: 0 }}
                    animate={{ 
                      offsetDistance: '100%',
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "linear"
                    }}
                    style={{
                      offsetPath: 'path("M 20,50 Q 40,45 60,48 T 90,50")',
                    }}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    >
                      <mpath href="#path1"/>
                    </animateMotion>
                  </motion.circle>
                ))}
                
                <defs>
                  <path id="path1" d="M 20,50 Q 40,45 60,48 T 90,50" />
                  <filter id="enhanced-glow">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </>
          )}

          {/* Location Markers */}
          {markers.map((marker, i) => (
            <motion.div
              key={`marker-${i}`}
              className="absolute"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.2 }}
            >
              {/* Pulsing circle */}
              <motion.div
                className={`w-4 h-4 rounded-full ${showTraffic ? getTrafficColor(marker.traffic) : 'bg-cyan-500'}`}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${showTraffic && marker.traffic === 'high' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(6, 182, 212, 0.7)'}`,
                    `0 0 0 20px rgba(6, 182, 212, 0)`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Label */}
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="glass-panel px-3 py-1 text-xs text-cyan-300">
                  {marker.label}
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Dynamic Incidents */}
          {incidents.map((incident) => (
            <motion.div
              key={incident.id}
              className="absolute"
              style={{
                left: `${incident.x}%`,
                top: `${incident.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 40,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="relative">
                <motion.div
                  className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.7)",
                      "0 0 0 30px rgba(239, 68, 68, 0)",
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AlertTriangle className="w-4 h-4" />
                </motion.div>
                
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50">
                  <div className="bg-red-600/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white rounded-lg border border-red-400/50 shadow-xl">
                    ALRT: {incident.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Weather particles */}
          {showWeather && (
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`rain-${i}`}
                  className="absolute w-0.5 h-4 bg-gradient-to-b from-cyan-400/60 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${-10}%`,
                  }}
                  animate={{
                    y: ['0vh', '110vh'],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            className="glass-panel p-3 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(z => Math.min(z + 1, 18))}
          >
            <ZoomIn className="w-5 h-5 text-cyan-400" />
          </motion.button>
          <motion.button
            className="glass-panel p-3 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(z => Math.max(z - 1, 8))}
          >
            <ZoomOut className="w-5 h-5 text-cyan-400" />
          </motion.button>
          <motion.button
            className="glass-panel p-3 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="w-5 h-5 text-cyan-400" />
          </motion.button>
          <motion.button
            className="glass-panel p-3 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="w-5 h-5 text-cyan-400" />
          </motion.button>
        </div>

        {/* Zoom level indicator */}
        <div className="absolute bottom-4 right-4 glass-panel px-4 py-2">
          <div className="text-xs text-cyan-300/70 uppercase tracking-wider">Zoom Level</div>
          <div className="text-xl font-bold text-white font-mono">{zoom}</div>
        </div>
      </motion.div>
    </div>
  );
}