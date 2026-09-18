import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f4f0ff]/90 backdrop-blur-xl border-b border-[#ded7f2]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#6d3df5] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-200">
            ↔
          </div>

          <span className="text-xl font-bold tracking-tight">
            Syncrova
          </span>

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#625d70]">

          <a href="#features" className="hover:text-[#6d3df5] transition">
            Features
          </a>

          <a href="#interface" className="hover:text-[#6d3df5] transition">
            Pricing
          </a>

          <a href="#about" className="hover:text-[#6d3df5] transition">
            About
          </a>

        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            to="/login"
            className="text-sm font-semibold text-[#625d70] hover:text-[#6d3df5] transition"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-[#6d3df5] text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:-translate-y-0.5 transition"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile */}
        <button
          className="md:hidden w-10 h-10 rounded-xl bg-white border border-[#ded7f2]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#ded7f2] bg-[#f4f0ff] px-6 py-6 space-y-5">

          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>

          <a href="#interface" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/login"
            className="block text-center px-5 py-3 rounded-xl bg-[#6d3df5] text-white font-semibold"
          >
            Get Started
          </Link>

        </div>
      )}

    </nav>
  );
};

export default Navbar;