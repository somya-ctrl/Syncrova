import React from "react";

import Navbar from "../components/landing/Navbar";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f2ff]">
      <Navbar />

      <main>
        <Hero />

        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
