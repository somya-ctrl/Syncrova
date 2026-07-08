import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Particles from "./Particles";

const AuroraBackground = () => {
  const rootRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = rootRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const useParallax = (mv, amount) =>
    useSpring(useTransform(mv, [-0.5, 0.5], [-amount, amount]), {
      stiffness: 60,
      damping: 20,
    });

  const blob1X = useParallax(mouseX, 24);
  const blob1Y = useParallax(mouseY, 18);
  const blob2X = useParallax(mouseX, -18);
  const blob2Y = useParallax(mouseY, 22);
  const blob3X = useParallax(mouseX, 14);
  const blob3Y = useParallax(mouseY, -14);

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden bg-[#050505]"
    >
      {/* Soft grid pattern */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* Aurora blobs — outer wrapper carries cursor parallax, inner carries the slow ambient drift */}
      <motion.div className="absolute -top-40 left-[10%]" style={{ x: blob1X, y: blob1Y }}>
        <motion.div
          className="w-[600px] h-[600px] rounded-full bg-accent-blue/25 blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div className="absolute top-0 right-[5%]" style={{ x: blob2X, y: blob2Y }}>
        <motion.div
          className="w-[550px] h-[550px] rounded-full bg-accent-purple/25 blur-[140px]"
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>
      <motion.div className="absolute bottom-[-200px] left-[35%]" style={{ x: blob3X, y: blob3Y }}>
        <motion.div
          className="w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[140px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Decorative "network" energy lines — pure ambience, not wired to real DOM positions */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="networkLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#7C5CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -50 120 C 250 60, 450 220, 780 140 S 1200 60, 1500 160"
          fill="none"
          stroke="url(#networkLine)"
          strokeWidth="1.5"
          strokeDasharray="6 14"
          className="animate-dash-travel"
        />
        <path
          d="M -50 420 C 300 480, 600 340, 900 420 S 1250 500, 1550 400"
          fill="none"
          stroke="url(#networkLine)"
          strokeWidth="1.5"
          strokeDasharray="4 18"
          className="animate-dash-travel"
          style={{ animationDuration: "9s", animationDirection: "reverse" }}
        />
      </svg>

      {/* Subtle film grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-overlay" />

      {/* Glowing particle field */}
      <Particles />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
};

export default AuroraBackground;
