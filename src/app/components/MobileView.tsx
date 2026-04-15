import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileViewProps {
  children: React.ReactNode;
}

export function MobileView({ children }: MobileViewProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-panel px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            KATHMANDU
          </h1>
          <div className="text-[10px] text-cyan-300/70 uppercase tracking-wider">
            Smart City
          </div>
        </div>
        
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-2"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-cyan-400" />
          ) : (
            <Menu className="w-6 h-6 text-cyan-400" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 bottom-0 w-4/5 z-40 glass-panel overflow-y-auto"
      >
        <div className="p-4 pt-20 space-y-4">
          {/* Mobile content placeholder */}
          <div className="text-cyan-300 text-sm">
            Mobile view - Simplified dashboard
          </div>
        </div>
      </motion.div>

      {/* Desktop content hidden on mobile */}
      <div className="hidden">
        {children}
      </div>
    </div>
  );
}
