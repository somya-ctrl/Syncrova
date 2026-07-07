import React, { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  top: (i * 37) % 100,
  left: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.6,
  duration: 4 + (i % 5),
}));

const AuroraBackground = () => {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
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

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-40 left-[10%] w-[600px] h-[600px] rounded-full bg-accent-blue/25 blur-[140px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-[5%] w-[550px] h-[550px] rounded-full bg-accent-purple/25 blur-[140px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[-200px] left-[35%] w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[140px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Glowing particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.4, 1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
};

export default AuroraBackground;
