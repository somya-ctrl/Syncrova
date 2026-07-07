import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/hero/Hero";
import FeatureTimeline from "../components/hero/FeatureTimeline";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);     

  return (
    <>
      <nav className="h-[70px] bg-[#050505] flex items-center justify-between px-8 border-b border-white/10 relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-md flex items-center justify-center text-white text-lg font-bold">
            ↔
          </div>
          <h1 className="text-white font-semibold text-lg">Syncrova</h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-white/60 font-medium">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">About</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="text-white/60 font-medium hover:text-white transition">Login</Link>
          <Link to="/login" className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition inline-block">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white/80 text-xl p-2 rounded-md hover:bg-white/5 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#050505] border-t border-white/10 shadow-lg flex flex-col px-6 py-5 gap-4 md:hidden">
            <a href="#" className="text-white/70 font-medium hover:text-white transition" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#" className="text-white/70 font-medium hover:text-white transition" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#" className="text-white/70 font-medium hover:text-white transition" onClick={() => setMenuOpen(false)}>About</a>
            <hr className="border-white/10" />
            <Link to="/login" className="text-white/70 font-medium hover:text-white transition" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/login" className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition w-full inline-block text-center">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <Hero />

      {/* Features Section */}
      <FeatureTimeline />

      {/* Modern Interface Section */}
      <div className="bg-slate-200">
        <h2 className="text-slate-900 text-4xl lg:text-4xl font-bold pt-16 pl-4">Experience the Modern Interface</h2>
        <p className="text-slate-600 text-lg pt-4 pl-4">
          We've meticulously designed every pixel to ensure a distraction-free environment. From dark mode support to keyboard shortcuts.
          <span className="block">Syncrova is built for power users.</span>
        </p>
        <div className="p-6">
          <div className="space-y-4">
            {[
              "Fully customizable dark and light themes",
              "Advanced search across all channels",
              "Native file sharing and previewing",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="flex justify-center w-full mt-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl px-12 py-14 text-center text-white max-w-4xl w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Ready to sync with your team?</h1>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join over 10,000+ teams who have switched to Syncrova for better, faster, and more organized communication.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">Get Started Now</button>
                <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-8 pt-12 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">↔</div>
                <span className="text-slate-900 font-bold text-xl">Syncrova</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The next generation of team communication. Real-time, organized, and secure.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
              { title: "Resources", links: ["Documentation", "Help Center", "Community", "Status"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-slate-900 font-semibold text-sm tracking-widest uppercase mb-6">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-5 flex items-center justify-between">
            <p className="text-slate-400 text-xs">© 2024 Syncrova Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 text-xs hover:text-slate-600 transition">Cookie Policy</a>
              <a href="#" className="text-slate-400 text-xs hover:text-slate-600 transition">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
