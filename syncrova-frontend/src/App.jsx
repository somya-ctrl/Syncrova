import React from "react";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="h-[70px] bg-white-70 flex items-center justify-between px-8 border-b border-slate-200">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center text-white text-lg font-bold">
            ↔
          </div>
          <h1 className="text-slate-800 font-semibold text-lg">Syncrova</h1>
        </div>

        <div className="flex gap-8 text-slate-600 font-medium">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-600 font-medium">
            Login
          </a>

          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative  bg-slate-200 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-600 mb-6 ring-1 ring-inset ring-indigo-200">
              <span className="mr-2">✨</span> Now in Public Beta
            </div>

            <div className="container mx-auto px-8">
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Connect, Collaborate, and{" "}
                <span className="text-indigo-600">Sync</span> with Syncrova
              </h1>

              <p className="text-lg text-slate-600 text-center mb-8">
                Experience the next generation of communication with organised
                channels, custom servers and lightning-fast messaging designed
                for modern teams.
              </p>

              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                Get Started for free
              </button>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;