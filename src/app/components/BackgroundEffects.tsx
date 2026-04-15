import { motion } from "motion/react";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(var(--city-cyan) 1px, transparent 1px),
              linear-gradient(90deg, var(--city-cyan) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--city-cyan)] rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Scan lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, var(--city-cyan) 50%)',
          backgroundSize: '100% 4px',
          opacity: 0.02
        }}
        animate={{ y: [0, 4] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />

      {/* Light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[var(--city-cyan)] via-transparent to-transparent opacity-10"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[var(--city-purple)] via-transparent to-transparent opacity-10"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
