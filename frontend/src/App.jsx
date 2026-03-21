import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faTableCells, faServer } from "@fortawesome/free-solid-svg-icons";


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
             
  <div className="mt-16 lg:mt-24 relative pl-6 pr-6">
<div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent z-10"></div>
<div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900 ">
<img alt="App Interface Preview" className="w-full h-auto object-cover aspect-video" data-alt="UI dashboard mockup showing chat interface with sidebar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0DQ5XsPUd7_ZsF7aE6C_OcS9olc92ms9CNZ3Q0OaCbBY4v3EXKfpdEWpDplGd9hledFcjHcf1_RBLc62TiRs28SHqXjlpZNCy5lRqwI--aULsJFMqGY38-ZQBFdnExvDJ1wwtEhawYfJPsCZXnxb0XWQRQfSMXiObK2snj7s-9ZFN1cF0BXuWwZdSkHjBn2xHavn4fPQytXsWoBjRrvq0L_qqsyqvNwqa8gWZV4WskeoEY4TfzAD7V2YuDo1UvUTJJ3S0PbVj7F0u"/>
</div>
</div>
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

      </section>
  

      <h2 className="text-blue-700 text-2xl pt-4 pl-4">KEY FEATURES</h2>
      <section>
        <h2 className="text-slate-900 text-4xl lg:text-4xl font-bold pt-4 pl-4">Streamline Your Communication </h2>
        <p className="text-slate-600 text-lg pt-4 pl-4">Everything you need to stay connected and organized in one place, built with speed and 
          <span className="block"> security in mind.</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pl-4 pr-4 pb-4">

  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-slate-200">
    <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl">
  <FontAwesomeIcon icon={faBolt} className="text-blue-600 text-lg" />
</div>
    <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
    <p className="text-slate-600">Instant delivery with sub-50ms latency.
      <span className="block">Experience seamless conversations that </span>
      <span className="block">flow naturally without delays.</span>
    </p>
  </div>

  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-slate-200">
    <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl">
  <FontAwesomeIcon icon={faTableCells} className="text-blue-600 text-lg" />
</div>
    <h3 className="text-xl font-semibold mb-2"> Organized Channels</h3>
    <p className="text-slate-600">Categorize conversations by project,
      <span className="block">topic, or department. Keep your </span>
      <span className="block">workspace clean and your focus sharp.</span>
    </p>
  </div>

  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-slate-200">
    <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl">
  <FontAwesomeIcon icon={faServer} className="text-blue-600 text-lg" />
</div>
    <h3 className="text-xl font-semibold mb-2"> Personal Servers</h3>
    <p className="text-slate-600">Create private spaces for your 
      <span className="block">community.Full control over permissions,</span>
      <span className="block">roles, and custom integrations.</span>
    </p>
  </div>

</div>
    

      </section>
     <div className="bg-slate-200">
      <h2 className="text-slate-900 text-4xl lg:text-4xl font-bold pt-16 pl-4">Experience the Modern Interface</h2>
      <p className="text-slate-600 text-lg pt-4 pl-4">We've meticulously designed every pixel to ensure a distraction-free 
        <span className="block">environment.From dark mode support to keyboard shortcuts.</span>
        <span className="block">Syncrova is built for power users.</span>
      </p>

      
    <div className="p-6">
      <div className="space-y-4">
        
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            ✓
          </div>
          <p className="text-gray-700">
            Fully customizable dark and light themes
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            ✓
          </div>
          <p className="text-gray-700">
            Advanced search across all channels
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            ✓
          </div>
          <p className="text-gray-700">
            Native file sharing and previewing
          </p>
        </div>

      </div>

      {/* CTA Card — properly centered */}
      <div className="flex justify-center w-full mt-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600
                        rounded-3xl shadow-2xl
                        px-12 py-14
                        text-center text-white
                        max-w-4xl w-full">

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to sync with your team?
          </h1>

          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join over 10,000+ teams who have switched to Syncrova for better,
            faster, and more organized communication.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Get Started Now
            </button>
            <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
              Contact Sales
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
  
  
    
   
 <footer className="border-t border-slate-200 px-8 pt-12 pb-6">
        <div className="max-w-6xl mx-auto">
 
          
          <div className="flex justify-between items-start mb-10">
 
            
            <div className="max-w-xs">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  ↔
                </div>
                <span className="text-slate-900 font-bold text-xl">Syncrova</span>
              </div>
              {/* Tagline */}
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The next generation of team 
                <span className="block">communication. Real-time, organized,</span> 
                <span className="block">and secure.</span>
              </p>
              {/* Social icons */}
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
 
            {/* Column 2 — Product links */}
            <div>
              <h4 className="text-slate-900 font-semibold text-sm tracking-widest uppercase mb-5">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Features</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Integrations</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Pricing</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Changelog</a></li>
              </ul>
            </div>
             
              <div>
              <h4 className="text-slate-900 font-semibold text-sm tracking-widest uppercase mb-5">company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">About</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Careers</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Privacy</a></li>
                <li><a href="#" className="text-slate-500 text-sm hover:text-slate-800 transition">Terms</a></li>
              </ul>
            </div>
          </div>
 
          {/* Bottom row — copyright */}
          <div className="border-t border-slate-200 pt-5">
            <p className="text-slate-400 text-xs">© 2024 Syncrova Inc. All rights reserved.</p>
          </div>
 
        </div>
      </footer>

    </>
  );
};

export default App;