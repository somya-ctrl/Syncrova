import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hash,
  MessageCircle,
  Users,
  Video,
  Mic,
  Send,
} from "lucide-react";

/* =========================================================
   HERO PREVIEW COMPONENT
========================================================= */

const WorkspacePreview = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto mt-24 w-full max-w-5xl"
    >
      {/* Glow behind preview */}
      <div
        className="
          absolute
          -inset-8
          rounded-[40px]
          bg-purple-400/20
          blur-3xl
        "
      />

      {/* Main application window */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#ddd6ef]
          bg-white
          shadow-[0_30px_80px_rgba(55,35,110,0.16)]
        "
      >
        {/* =================================================
            WINDOW TOP BAR
        ================================================= */}

        <div
          className="
            flex
            h-14
            items-center
            gap-2
            border-b
            border-[#eeeaf7]
            bg-white
            px-5
          "
        >
          <span className="h-3 w-3 rounded-full bg-[#ddd8e9]" />
          <span className="h-3 w-3 rounded-full bg-[#ddd8e9]" />
          <span className="h-3 w-3 rounded-full bg-[#ddd8e9]" />

          <div
            className="
              mx-auto
              h-7
              w-[42%]
              rounded-lg
              bg-[#f5f2fa]
            "
          />
        </div>

        {/* =================================================
            APPLICATION BODY
        ================================================= */}

        <div className="grid min-h-[430px] grid-cols-[190px_1fr]">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside
            className="
              border-r
              border-[#eeeaf7]
              bg-[#faf9fd]
              p-5
            "
          >
            {/* Workspace */}
            <div className="mb-7 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#6d3df5]
                  text-white
                "
              >
                <MessageCircle size={17} />
              </div>

              <div className="h-4 w-20 rounded bg-[#ded9ea]" />
            </div>

            {/* Channels */}
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Channels
            </div>

            <div className="space-y-2">
              <Channel icon={<Hash size={14} />} name="general" active />

              <Channel icon={<Hash size={14} />} name="development" />

              <Channel icon={<Hash size={14} />} name="design" />

              <Channel icon={<Hash size={14} />} name="random" />
            </div>

            {/* Members */}
            <div className="mb-3 mt-8 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Members
            </div>

            <div className="space-y-3">
              <SmallUser name="Alex" />
              <SmallUser name="Emma" />
              <SmallUser name="David" />
            </div>
          </aside>

          {/* =================================================
              CHAT AREA
          ================================================= */}

          <main className="flex min-w-0 flex-col bg-white">
            {/* Chat header */}
            <div
              className="
                flex
                h-16
                items-center
                justify-between
                border-b
                border-[#eeeaf7]
                px-6
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-[#8c849d]" />

                  <span className="text-sm font-semibold text-[#211d29]">
                    general
                  </span>
                </div>

                <div className="mt-1 text-[10px] text-gray-400">
                  Team discussion
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1edfa]">
                  <Users size={15} className="text-[#776d87]" />
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1edfa]">
                  <Video size={15} className="text-[#776d87]" />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-hidden p-6">
              <ChatMessage
                name="Emma"
                time="10:32 AM"
                text="Hey everyone! How is the new project going?"
              />

              <ChatMessage
                name="David"
                time="10:34 AM"
                text="Everything is looking good. I pushed the latest updates."
              />

              {/* Current user message */}
              <div className="flex justify-end">
                <div className="max-w-[65%]">
                  <div
                    className="
                      rounded-2xl
                      rounded-tr-md
                      bg-[#6d3df5]
                      px-4
                      py-3
                      text-sm
                      leading-5
                      text-white
                    "
                  >
                    Perfect! I'll review everything and share feedback.
                  </div>

                  <div className="mt-1 text-right text-[9px] text-gray-400">
                    10:36 AM
                  </div>
                </div>
              </div>

              <ChatMessage
                name="Alex"
                time="10:37 AM"
                text="Sounds good! Let's sync up later today."
              />
            </div>

            {/* Message input */}
            <div className="border-t border-[#eeeaf7] p-5">
              <div
                className="
                  flex
                  h-12
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#e9e4f2]
                  bg-[#faf9fd]
                  px-4
                "
              >
                <div className="flex-1 text-xs text-gray-400">
                  Message #general
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6d3df5]">
                  <Send size={14} className="text-white" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   CHANNEL
========================================================= */

const Channel = ({ icon, name, active = false }) => {
  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-xs
        transition-all
        ${
          active
            ? "bg-[#eee8ff] font-semibold text-[#6938f5]"
            : "text-gray-500 hover:bg-gray-100"
        }
      `}
    >
      {icon}
      {name}
    </div>
  );
};

/* =========================================================
   SMALL USER
========================================================= */

const SmallUser = ({ name }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <div
        className="
          h-7
          w-7
          rounded-full
          bg-gradient-to-br
          from-[#d7ccfa]
          to-[#eee8ff]
        "
      />

      {name}
    </div>
  );
};

/* =========================================================
   CHAT MESSAGE
========================================================= */

const ChatMessage = ({ name, time, text }) => {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div
        className="
          h-9
          w-9
          shrink-0
          rounded-full
          bg-gradient-to-br
          from-[#d6c9ff]
          to-[#eee8ff]
        "
      />

      {/* Message */}
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-[#211d29]">{name}</span>

          <span className="text-[9px] text-gray-400">{time}</span>
        </div>

        <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
      </div>
    </div>
  );
};

/* =========================================================
   HERO
========================================================= */

const Hero = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f6f2ff]
        text-[#17151f]
      "
    >
      {/* =====================================================
          BACKGROUND GRID
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="
            absolute
            -inset-[100px]
            opacity-100
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(105, 56, 245, 0.13) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(105, 56, 245, 0.13) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left purple glow */}
        <div
          className="
            absolute
            -left-[250px]
            top-[120px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-purple-300/40
            blur-[150px]
          "
        />

        {/* Right blue glow */}
        <div
          className="
            absolute
            -right-[250px]
            top-[180px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-blue-300/35
            blur-[150px]
          "
        />

        {/* Center glow */}
        <div
          className="
            absolute
            left-1/2
            top-[35%]
            h-[550px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-purple-200/30
            blur-[160px]
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-[260px]
            bg-gradient-to-t
            from-[#f6f2ff]
            via-[#f6f2ff]/80
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          pb-24
          pt-32
          sm:px-8
          lg:px-10
          lg:pb-28
          lg:pt-40
        "
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[52px]
              font-extrabold
              leading-[0.98]
              tracking-[-0.055em]
              sm:text-[68px]
              md:text-[82px]
              lg:text-[92px]
              xl:text-[100px]
            "
          >
            <span className="block text-[#15131d]">Better communication.</span>

            <span
              className="
                block
                bg-gradient-to-r
                from-[#6338f5]
                via-[#743cf5]
                to-[#914df7]
                bg-clip-text
                text-transparent
              "
            >
              Better teamwork.
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-base
              leading-7
              text-[#69657a]
              sm:text-lg
              sm:leading-8
              lg:text-xl
            "
          >
            Real-time, organized, and secure communication for modern teams.
            <br className="hidden sm:block" />
            Syncrova brings your conversations, channels, and collaboration
            together in one powerful workspace.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            {/* Get Started */}

            <motion.a
              href="/login"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#6d3df5]
                px-8
                py-4
                text-base
                font-semibold
                text-white
                shadow-[0_12px_30px_rgba(109,61,245,0.28)]
                transition-all
                duration-300
                hover:bg-[#5e32e8]
                hover:shadow-[0_16px_38px_rgba(109,61,245,0.38)]
              "
            >
              Get Started
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            {/* Explore Features */}

            <motion.a
              href="#features"
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-[#ddd6f2]
                bg-white/85
                px-8
                py-4
                text-base
                font-semibold
                text-[#17151f]
                shadow-[0_8px_25px_rgba(45,30,90,0.06)]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
                hover:shadow-[0_12px_30px_rgba(45,30,90,0.10)]
              "
            >
              Explore Features
            </motion.a>
          </motion.div>
        </div>

        {/* =====================================================
            PRODUCT PREVIEW
        ====================================================== */}

        <WorkspacePreview />
      </div>
    </section>
  );
};

export default Hero;
