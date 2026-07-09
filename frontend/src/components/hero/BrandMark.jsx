import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Normal in-flow section (not pinned to the viewport) sitting directly between the footer and
// the copyright line, so it's naturally flush against both. Anchored from the TOP (transform-
// origin + items-start) so it stays attached to the footer above at every scroll position, and
// grows downward toward the copyright line as the section scrolls into view. The vertical scale
// is a plain scroll-position-driven transform (no spring/velocity, no entrance animation).
//
// Horizontal fit: a fixed vw font-size can't guarantee "SYNCROVA" spans exactly one viewport
// width across every screen (font metrics vary), so instead we measure the text's natural
// rendered width and scale it horizontally to fit the container exactly — the word always stays
// fully visible, edge to edge, with no letters clipped off the right side.
const BrandMark = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [scaleX, setScaleX] = useState(1);

  useEffect(() => {
    // scrollWidth reflects the pre-transform layout size, so it stays accurate
    // across re-measurements even after scaleX has already been applied.
    const fit = () => {
      if (!sectionRef.current || !textRef.current) return;
      const containerWidth = sectionRef.current.offsetWidth;
      const naturalWidth = textRef.current.scrollWidth;
      if (naturalWidth > 0) setScaleX(containerWidth / naturalWidth);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden flex items-start justify-start h-[25vw]"
    >
      <motion.h2
        ref={textRef}
        style={{ scaleX, scaleY, transformOrigin: "top left" }}
        className="whitespace-nowrap leading-none font-extrabold tracking-tighter text-[20vw] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent opacity-[0.16] select-none"
      >
        SYNCROVA
      </motion.h2>
    </section>
  );
};

export default BrandMark;
