import { motion } from "motion/react";

export function HUDOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Subtle scanline pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} 
      />

      {/* Dynamic corner markings */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[var(--city-cyan)] opacity-20 rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[var(--city-cyan)] opacity-20 rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[var(--city-cyan)] opacity-20 rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[var(--city-cyan)] opacity-20 rounded-br-xl" />

      {/* Center crosshair (subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-[var(--city-cyan)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-[var(--city-cyan)]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-px bg-[var(--city-cyan)]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-px bg-[var(--city-cyan)]" />
      </div>

      {/* Side status bars */}
      <div className="absolute left-2 top-1/4 bottom-1/4 w-1 flex flex-col justify-between opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-full h-2 bg-[var(--city-cyan)] rounded-full" />
        ))}
      </div>
      <div className="absolute right-2 top-1/4 bottom-1/4 w-1 flex flex-col justify-between opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-full h-2 bg-[var(--city-cyan)] rounded-full" />
        ))}
      </div>

      {/* Moving scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--city-cyan)] to-transparent opacity-20"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
