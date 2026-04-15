# 🛠️ Dashboard Tech Stack & Tooling

This dashboard was built using a cutting-edge "Flying Interface" architecture, combining modern web frameworks with high-performance animation engines.

### ⚛️ Core Framework
- **[React 18](https://react.dev/)**: For building a modular, component-based user interface.
- **[Vite 6](https://vitejs.dev/)**: Lightning-fast build tool and development server for instant feedback.

### 🎨 Styling & Aesthetics
- **[Tailwind CSS v4](https://tailwindcss.com/)**: A utility-first CSS framework used for the unified design system and glassmorphic effects.
- **[Framer Motion](https://www.framer.com/motion/)**: Powering the cinematic HUD overlays, micro-animations, and fluid transitions.
- **Vanilla CSS Tokens**: Custom HSL/OKLCH color tokens defined in `theme.css` for consistent "Crisis Mode" shifts.

### 🧱 Component Architecture
- **[Shadcn UI](https://ui.shadcn.com/)**: A collection of re-usable components built using Radix UI and Tailwind CSS.
- **[Lucide React](https://lucide.dev/)**: A library of beautiful, consistent icons for futuristic system monitoring.
- **[Sonner](https://sonner.stevenly.me/)**: High-performance toast notifications for system-wide alerts.

### 📊 Data & Systems
- **[Recharts](https://recharts.org/)**: Composable charting library used for the Sustainability Index and grid analytics.
- **Custom Simulation Engine**: Internal React state logic simulating real-time city data streams (AQI, Traffic, Energy).

### 🤖 Development Assistant
- **[Antigravity AI](https://github.com/google-deepmind/advanced-agentic-coding)**: AI pair-programmer used for architectural planning, refactoring, and implementing complex futuristic visual systems.

---

## Architecture Overview
The dashboard follows a **Responsive Grid Layout** that adapts seamlessly from ultra-wide HUD monitors to mobile handhelds. Every component is "Theme-Aware," allowing for instant context shifts (e.g., Crisis Mode Protocol) without page reloads.
