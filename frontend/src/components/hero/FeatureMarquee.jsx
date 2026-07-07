import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const FeatureRow = ({ items, duration }) => {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <GlassCard key={i} hoverLift={false} className="flex items-center gap-3 px-4 py-3 w-64 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-cyan shrink-0">
              <item.icon size={17} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{item.title}</p>
              <p className="text-white/45 text-xs truncate">{item.desc}</p>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  );
};

const FeatureMarquee = ({ rows }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {rows.map((row, i) => (
        <FeatureRow key={i} items={row.items} duration={row.duration} />
      ))}
    </div>
  );
};

export default FeatureMarquee;
