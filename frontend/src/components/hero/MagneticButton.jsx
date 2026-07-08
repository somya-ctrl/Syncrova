import React, { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const MAGNETIC_STRENGTH = 0.3;

// x/y are bound via `style`, so callers must use non-transform CSS (glow, background-position) for hover polish, not transform-based hover classes.
const MagneticButton = ({ as = "a", to, href, className, children, onClick, ...rest }) => {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * MAGNETIC_STRENGTH);
      y.set(relY * MAGNETIC_STRENGTH);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(
    (e) => {
      const rect = ref.current.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, cx: e.clientX - rect.left, cy: e.clientY - rect.top }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
      onClick?.(e);
    },
    [onClick]
  );

  const Component = as === "link" ? MotionLink : motion.a;
  const targetProp = as === "link" ? { to } : { href };

  return (
    <Component
      ref={ref}
      {...targetProp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={className}
      {...rest}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.cx, top: r.cy, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 14, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </Component>
  );
};

export default MagneticButton;
