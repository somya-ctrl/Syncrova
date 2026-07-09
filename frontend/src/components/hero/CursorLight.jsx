import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

// Self-contained cursor-follow spotlight — tracks the cursor globally and converts it to
// coordinates relative to its own bounding box, so the parent just drops it in without wiring
// up any mouse handlers. Only lights up while the cursor is actually inside its bounds.
const CursorLight = ({ color = "124,92,255", size = 550, opacity = 0.5, zIndex = 0 }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const x = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 22 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color},${opacity}), transparent 65%)`;

  useEffect(() => {
    const handleMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        mouseX.set(-9999);
        mouseY.set(-9999);
        return;
      }
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ background, zIndex }}
      aria-hidden="true"
    />
  );
};

export default CursorLight;
