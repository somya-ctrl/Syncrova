import React from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

const BrandMark = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Scrolling up produces negative velocity — stretch the mark upward from its base.
  // Scrolling down (or idle) stays at its natural height.
  const scaleY = useTransform(smoothVelocity, [-2500, 0, 2500], [1.6, 1, 1]);

  return (
    <section className="relative bg-[#050505] border-t border-white/10 overflow-hidden">
      <div className="h-[26vw] max-h-[300px] min-h-[140px] flex items-end justify-center">
        <motion.h2
          initial={{ y: "70%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ scaleY, transformOrigin: "bottom" }}
          className="whitespace-nowrap leading-none font-extrabold tracking-tighter text-[20vw] sm:text-[18vw] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent select-none"
        >
          SYNCROVA
        </motion.h2>
      </div>
    </section>
  );
};

export default BrandMark;
