import React from "react";
import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  glow = true,
  hoverLift = true,
  as: Component = motion.div,
  ...motionProps
}) => {
  return (
    <Component
      className={`group relative rounded-3xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] ${
        hoverLift ? "transition-transform duration-300 hover:-translate-y-1" : ""
      } ${className}`}
      {...motionProps}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(124,92,255,0.25)]" />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="relative">{children}</div>
    </Component>
  );
};

export default GlassCard;
