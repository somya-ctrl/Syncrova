import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Normal in-flow section (not pinned to the viewport) sitting directly between the footer and
// the copyright line, so it's naturally flush against both. Anchored from the TOP (transform-
// origin + items-start) so it stays attached to the footer above at every scroll position, and
// grows downward toward the copyright line as the section scrolls into view. The scale is a
// plain scroll-position-driven transform (no spring/velocity, no entrance animation).
const BrandMark = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden flex items-start justify-start h-[21vw]"
    >
      <motion.h2
        style={{ scaleY, transformOrigin: "top" }}
        className="whitespace-nowrap leading-none font-extrabold tracking-tighter text-[20vw] text-white select-none"
      >
        SYNCROVA
      </motion.h2>
    </section>
  );
};

export default BrandMark;
