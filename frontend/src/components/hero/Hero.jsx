import React, { useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Play,
  Star,
  Mic,
  Hash,
  Sparkles,
  ShieldCheck,
  Users,
  Paperclip,
  Bell,
  Video,
  MessageSquare,
} from "lucide-react";
import AuroraBackground from "./AuroraBackground";
import FeatureMarquee from "./FeatureMarquee";
import MagneticButton from "./MagneticButton";
import CursorSpotlight from "./CursorSpotlight";

const marqueeRows = [
  {
    duration: 11,
    items: [
      { icon: MessageSquare, title: "Real-time Messaging", desc: "Sub-50ms latency" },
      { icon: Video, title: "Voice & Video", desc: "Crystal clear calls" },
      { icon: Hash, title: "Channels", desc: "Organized conversations" },
    ],
  },
  {
    duration: 14,
    items: [
      { icon: Sparkles, title: "AI Assistant", desc: "Smart meeting summaries" },
      { icon: ShieldCheck, title: "End-to-end Encrypted", desc: "Secure by default" },
      { icon: Users, title: "Team Workspaces", desc: "Built for collaboration" },
    ],
  },
  {
    duration: 12.5,
    items: [
      { icon: Paperclip, title: "File Sharing", desc: "Native previews" },
      { icon: Bell, title: "Smart Notifications", desc: "Stay in the loop" },
      { icon: Mic, title: "Voice Rooms", desc: "Drop in, talk instantly" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const Hero = () => {
  const sectionRef = useRef(null);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const handleSectionMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const handleSectionMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative font-geist bg-[#050505] overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AuroraBackground />
      </motion.div>

      <CursorSpotlight mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div style={{ y: leftColY }}>
            <motion.div
              initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-white/[0.06] text-white/80 border border-white/10 mb-8"
            >
              <span className="absolute -inset-1 -z-10 rounded-full bg-accent-cyan/20 blur-md animate-pulse-glow" />
              <Zap size={13} className="text-accent-cyan" />
              Built for modern teams
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.05] mb-6">
              <motion.span custom={0.05} variants={fadeUp} initial="hidden" animate="visible" className="block text-white">
                Collaborate.
              </motion.span>
              <motion.span custom={0.15} variants={fadeUp} initial="hidden" animate="visible" className="block text-white">
                Communicate.
              </motion.span>
              <motion.span
                custom={0.25}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="block bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent animate-gradient-shift"
              >
                Move Faster.
              </motion.span>
            </h1>

            <motion.p
              custom={0.35}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white/50 text-lg max-w-md mb-10 leading-relaxed"
            >
              Syncrova brings messaging, voice, video, and AI assistance into one fast,
              secure workspace built for teams that move quickly together.
            </motion.p>

            <motion.div
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 flex-wrap mb-10"
            >
              <div className="relative inline-block">
                <span className="absolute -inset-2 -z-10 rounded-2xl bg-accent-purple/30 blur-xl animate-pulse-glow" />
                <MagneticButton
                  as="link"
                  to="/login"
                  className="btn-shine relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-purple bg-[length:200%_auto] bg-left shadow-[0_0_30px_rgba(124,92,255,0.4)] transition-[background-position,box-shadow] duration-500 hover:bg-right hover:shadow-[0_0_45px_rgba(124,92,255,0.65)]"
                >
                  Start Free
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>

              <MagneticButton
                as="a"
                href="#features"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold text-white bg-white/[0.05] border border-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.09]"
              >
                <Play size={15} />
                Watch Demo
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </motion.div>

            <motion.div
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <div className="flex text-accent-cyan">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 1.18, 1] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 3 + i * 0.4,
                      delay: 2 + i * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Star size={15} fill="currentColor" strokeWidth={0} />
                  </motion.span>
                ))}
              </div>
              <span className="text-white/40 text-sm">
                Trusted by developers, startups &amp; teams
              </span>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            style={{ y: rightColY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FeatureMarquee rows={marqueeRows} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
