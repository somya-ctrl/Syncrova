import React from "react";

const App = () => {
  return (
    <nav className="h-[70px] bg-slate-50 flex items-center justify-between px-8 border-b border-slate-200">
      
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
  );
};

export default App;