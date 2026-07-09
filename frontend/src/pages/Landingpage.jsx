import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/hero/Hero";
import FeatureTimeline from "../components/hero/FeatureTimeline";
import BrandMark from "../components/hero/BrandMark";
import CursorLight from "../components/hero/CursorLight";

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
      <section className="relative bg-[#050505] py-24 lg:py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center px-6 mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-white/[0.06] text-white/70 border border-white/10 mb-6">
            Modern Interface
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Experience the{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              modern interface
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            We've meticulously designed every pixel to ensure a distraction-free environment. From dark mode support to keyboard shortcuts, Syncrova is built for power users.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              "Fully customizable dark and light themes",
              "Advanced search across all channels",
              "Native file sharing and previewing",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5"
              >
                <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-accent-blue to-accent-purple shadow-[0_0_60px_rgba(124,92,255,0.35)] px-8 sm:px-12 py-14 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to sync with your team?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join over 10,000+ teams who have switched to Syncrova for better, faster, and more organized communication.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/login"
                className="bg-white text-accent-blue px-6 py-2.5 rounded-xl font-semibold hover:scale-105 transition inline-block"
              >
                Get Started Now
              </Link>
              <button className="border border-white/40 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/10 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 overflow-hidden bg-[#050505] border-t border-white/10">
        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-12 pb-6">
          <div className="flex justify-between items-start mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center text-white font-bold text-lg">↔</div>
                <span className="text-white font-bold text-xl">Syncrova</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                The next generation of team communication. Real-time, organized, and secure.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition">
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
                <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}><a href="#" className="text-white/50 text-sm hover:text-white transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <BrandMark />

        <div className="relative z-10 border-t border-white/10 px-8 py-5">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-white/30 text-xs">© 2024 Syncrova Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition">Cookie Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition">Security</a>
            </div>
          </div>
        </div>

        <CursorLight zIndex={20} />
      </footer>
    </>
  );
};

export default LandingPage;
