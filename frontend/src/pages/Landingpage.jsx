import React from "react";

import Navbar from "../components/landing/Navbar";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f2ff]">
      <Navbar />

      <main>
        <Hero />

        <Features />
      </main>
    </div>
  );
};

export default LandingPage;
