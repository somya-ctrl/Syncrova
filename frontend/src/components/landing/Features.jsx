import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Hash,
  ArrowRight,
  MessageSquare,
  RefreshCcw,
  Users,
  Trash2,
  Send,
  Image as ImageIcon,
  Mic
} from "lucide-react";

const FeatureMockup1 = () => {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-[24px] border border-[#ddd6ef] bg-white shadow-[0_20px_60px_rgba(55,35,110,0.12)] overflow-hidden">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-[#eeeaf7] bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-[#6d3df5]">
            <Hash size={16} />
          </div>
          <span className="text-sm font-bold text-[#6d3df5]">project-launch</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Users size={14} />
        </div>
      </div>

      <div className="p-6 bg-[#fcfbfe] flex flex-col items-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[#6d3df5] mb-4">
          <FileText size={24} />
        </div>
        <h3 className="text-sm font-bold mb-6 text-[#15131d] text-center">Project Launch Workflow</h3>

        <div className="w-full space-y-3 mb-10">
          <button className="w-full flex items-center justify-between bg-white border border-[#eeeaf7] rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:border-purple-200 transition-colors">
            Design Updates <ArrowRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between bg-[#6d3df5] border border-[#6d3df5] rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#582fe0] transition-colors">
            Marketing Assets <ArrowRight size={16} className="text-white/70" />
          </button>
          <button className="w-full flex items-center justify-between bg-white border border-[#eeeaf7] rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:border-purple-200 transition-colors">
            Development Status <ArrowRight size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="w-full border-t border-[#eeeaf7] pt-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#e9e4f2] bg-white p-2 pr-2 pl-3">
            <MessageSquare size={14} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Message #project-launch" 
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
              readOnly
            />
            <button className="flex items-center gap-1 rounded-lg bg-[#a586ff] px-3 py-1.5 text-[10px] font-bold text-white">
              SEND <Send size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureMockup2 = () => {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-[24px] border border-[#ddd6ef] bg-white shadow-[0_20px_60px_rgba(55,35,110,0.12)] overflow-hidden">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-[#eeeaf7] bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-[#6d3df5]">
            <Hash size={16} />
          </div>
          <span className="text-sm font-bold text-[#6d3df5]">design-team</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Users size={14} />
        </div>
      </div>

      <div className="p-6 bg-[#fcfbfe] h-[360px] flex flex-col gap-4 overflow-hidden">
        {/* User Msg */}
        <div className="flex flex-row-reverse gap-3">
          <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300" />
          <div className="rounded-2xl rounded-tr-sm bg-[#6d3df5] p-3 text-xs text-white shadow-sm leading-relaxed max-w-[80%]">
            Has everyone reviewed the latest UI designs for the new dashboard?
          </div>
        </div>

        {/* Team Msg */}
        <div className="flex gap-3">
          <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-pink-200 to-rose-300" />
          <div className="rounded-2xl rounded-tl-sm border border-[#eeeaf7] bg-white p-3 shadow-sm max-w-[85%]">
            <div className="flex gap-2">
              {/* Image placeholders */}
              <div className="h-20 w-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex flex-col items-center justify-center text-white/50">
                <ImageIcon size={16} />
              </div>
              <div className="h-20 w-24 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center text-white/50">
                <ImageIcon size={16} />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">
              Yes, the new layouts look great! I've left some specific comments on the main component structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <>
      {/* SECTION 1: Services */}
      <section className="py-24 bg-[#fbfaff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold text-[#a586ff] mb-4 tracking-wide uppercase">Syncrova Platform Features</p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold mb-16 text-[#15131d] leading-tight tracking-tight">
              Everything Your Team Needs:<br />Syncrova at Your Service
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white hover:bg-[#6d3df5] border border-[#eeeaf7] hover:border-[#6d3df5] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#f1edfa] group-hover:bg-white/20 rounded-full flex items-center justify-center text-[#6d3df5] group-hover:text-white mb-8 transition-colors duration-300">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-extrabold text-lg mb-4 text-[#15131d] group-hover:text-white transition-colors duration-300">Real-time Messaging</h3>
                <p className="text-[#69657a] group-hover:text-white/90 text-sm leading-relaxed mb-8 transition-colors duration-300">
                  Connect instantly with your team through fast and reliable direct messages. Keep the conversation flowing without any delays.
                </p>
                <a href="#" className="text-sm font-bold text-[#6d3df5] group-hover:text-white inline-flex items-center transition-colors duration-300">
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white hover:bg-[#6d3df5] border border-[#eeeaf7] hover:border-[#6d3df5] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#f1edfa] group-hover:bg-white/20 rounded-full flex items-center justify-center text-[#6d3df5] group-hover:text-white mb-8 transition-colors duration-300">
                  <FileText size={24} />
                </div>
                <h3 className="font-extrabold text-lg mb-4 text-[#15131d] group-hover:text-white transition-colors duration-300">File Sharing & Collab</h3>
                <p className="text-[#69657a] group-hover:text-white/90 text-sm leading-relaxed mb-8 transition-colors duration-300">
                  Share documents, images, and files directly within your workspace for seamless collaboration on any project.
                </p>
                <a href="#" className="text-sm font-bold text-[#6d3df5] group-hover:text-white inline-flex items-center transition-colors duration-300">
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white hover:bg-[#6d3df5] border border-[#eeeaf7] hover:border-[#6d3df5] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#f1edfa] group-hover:bg-white/20 rounded-full flex items-center justify-center text-[#6d3df5] group-hover:text-white mb-8 transition-colors duration-300">
                  <Hash size={24} />
                </div>
                <h3 className="font-extrabold text-lg mb-4 text-[#15131d] group-hover:text-white transition-colors duration-300">Organized Channels</h3>
                <p className="text-[#69657a] group-hover:text-white/90 text-sm leading-relaxed mb-8 transition-colors duration-300">
                  Keep conversations focused and organized by creating dedicated channels for specific projects or topics.
                </p>
                <a href="#" className="text-sm font-bold text-[#6d3df5] group-hover:text-white inline-flex items-center transition-colors duration-300">
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Card 4 (Voice Chat) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-white hover:bg-[#6d3df5] border border-[#eeeaf7] hover:border-[#6d3df5] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#f1edfa] group-hover:bg-white/20 rounded-full flex items-center justify-center text-[#6d3df5] group-hover:text-white mb-8 transition-colors duration-300">
                  <Mic size={24} />
                </div>
                <h3 className="font-extrabold text-lg mb-4 text-[#15131d] group-hover:text-white transition-colors duration-300">Voice & Video Calls</h3>
                <p className="text-[#69657a] group-hover:text-white/90 text-sm leading-relaxed mb-8 transition-colors duration-300">
                  Jump into high-quality voice and video calls with a single click. Perfect for quick syncs or deep-dive team meetings.
                </p>
                <a href="#" className="text-sm font-bold text-[#6d3df5] group-hover:text-white inline-flex items-center transition-colors duration-300">
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14"
          >
            <button className="bg-[#a586ff] hover:bg-[#9371f8] text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-[0_8px_20px_rgba(165,134,255,0.3)] transition-all">
              Get Started for Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Chat Smarter */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Mockup Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-50 rounded-full blur-[80px] -z-10" />
              <FeatureMockup1 />
            </motion.div>

            {/* Text Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-bold text-[#a586ff] mb-4">Work Faster With Syncrova</p>
              <h2 className="text-[32px] sm:text-[40px] font-extrabold mb-6 text-[#15131d] leading-[1.15] tracking-tight">
                Communicate Smarter, Not Harder:<br />Unified Team Chat
              </h2>
              <p className="text-[#69657a] mb-6 text-base sm:text-lg leading-relaxed">
                Say goodbye to scattered emails and hello to instant, organized communication. Syncrova brings your team together in one unified workspace, offering real-time assistance and streamlining collaboration.
              </p>
              <p className="text-[#69657a] mb-10 text-base sm:text-lg leading-relaxed">
                Step into a new era of collaboration. Seamlessly integrated into your daily workflow, our platform offers intuitive messaging, rich media sharing, and instant search across all your channels.
              </p>
              <button className="bg-[#a586ff] hover:bg-[#9371f8] text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-[0_8px_20px_rgba(165,134,255,0.3)] transition-all">
                Create Your Workspace
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Elevate Experiences */}
      <section className="py-24 bg-[#fbfaff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm font-bold text-[#a586ff] mb-4">Collaborate Securely</p>
              <h2 className="text-[32px] sm:text-[40px] font-extrabold mb-6 text-[#15131d] leading-[1.15] tracking-tight">
                Elevate Team Productivity<br />with Organized Conversations
              </h2>
              <p className="text-[#69657a] mb-6 text-base sm:text-lg leading-relaxed">
                Keep everyone on the same page with threaded conversations and mentions. Ensure important updates are never missed in the noise, and align your departments effortlessly.
              </p>
              <p className="text-[#69657a] mb-10 text-base sm:text-lg leading-relaxed">
                Experience secure, reliable communication built for modern remote and hybrid teams. Your data remains protected while your team works efficiently across time zones and devices.
              </p>
            </motion.div>

            {/* Mockup Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-100/50 rounded-full blur-[80px] -z-10" />
              <FeatureMockup2 />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;