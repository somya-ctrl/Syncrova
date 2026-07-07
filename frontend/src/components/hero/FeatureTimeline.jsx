import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Hash, Video, ShieldCheck, Sparkles } from "lucide-react";
import GlassCard from "./GlassCard";

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Messaging",
    desc: "Instant delivery with sub-50ms latency. Conversations that flow naturally, without delay.",
  },
  {
    icon: Hash,
    title: "Organized Channels",
    desc: "Categorize conversations by project, topic, or department. Keep every workspace sharp.",
  },
  {
    icon: Video,
    title: "Voice & Video Calls",
    desc: "Crystal clear calls with screen sharing, built for teams that talk as much as they type.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end Encryption",
    desc: "Secure by default. Your conversations stay private, always.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    desc: "Smart meeting summaries and instant answers, right inside your workspace.",
  },
];

const TimelineNode = ({ scrollYProgress, position }) => {
  const lit = useTransform(scrollYProgress, [Math.max(position - 0.08, 0), position], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.85, 1.15]);
  const dotOpacity = useTransform(lit, [0, 1], [0.3, 1]);

  return (
    <motion.div
      style={{ x: "-50%", y: "-50%", scale }}
      className="absolute left-4 lg:left-1/2 top-6 lg:top-1/2 z-10 w-4 h-4 rounded-full border-2 border-accent-purple flex items-center justify-center"
    >
      <motion.div
        style={{ opacity: dotOpacity }}
        className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(56,217,255,0.8)]"
      />
    </motion.div>
  );
};

const FeatureTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="relative bg-[#050505] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center px-6 mb-20 lg:mb-28">
        <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-white/[0.06] text-white/70 border border-white/10 mb-6">
          Key Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Everything your team needs,{" "}
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            in one place
          </span>
        </h2>
        <p className="text-white/50 text-lg">
          Built with speed and security in mind, so your team can stay connected without friction.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div ref={containerRef} className="relative">
          {/* Center line track */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 lg:-translate-x-1/2 w-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute inset-0 w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan"
            />
          </div>

          <div className="flex flex-col gap-14 lg:gap-20">
            {features.map((feature, i) => {
              const isLeft = i % 2 === 0;
              const position = i / (features.length - 1);
              return (
                <div
                  key={feature.title}
                  className="relative pl-12 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-x-16 items-center"
                >
                  <TimelineNode scrollYProgress={scrollYProgress} position={position} />

                  <div className={isLeft ? "lg:flex lg:justify-end" : ""}>
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full lg:max-w-md"
                      >
                        <GlassCard className="p-6 lg:p-7" hoverLift={false}>
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-cyan mb-4">
                            <feature.icon size={20} />
                          </div>
                          <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                        </GlassCard>
                      </motion.div>
                    )}
                  </div>

                  <div className={!isLeft ? "lg:flex lg:justify-start" : ""}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full lg:max-w-md"
                      >
                        <GlassCard className="p-6 lg:p-7" hoverLift={false}>
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-cyan mb-4">
                            <feature.icon size={20} />
                          </div>
                          <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                        </GlassCard>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTimeline;
