import React from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

// Purely decorative — pointer-events stay off so it never blocks clicks.
// mouseX/mouseY are shared motion values owned by Hero (tracked on the
// section itself, since this layer needs pointer-events-none to stay
// click-through).
const CursorSpotlight = ({ mouseX, mouseY }) => {
  const x = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(124,92,255,0.14), transparent 65%)`;

  return (
    <motion.div
      className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen"
      style={{ background }}
      aria-hidden="true"
    />
  );
};

export default CursorSpotlight;
