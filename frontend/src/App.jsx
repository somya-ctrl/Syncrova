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
             
  <div class="mt-16 lg:mt-24 relative pl-6 pr-6">
<div class="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent z-10"></div>
<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900 ">
<img alt="App Interface Preview" class="w-full h-auto object-cover aspect-video" data-alt="UI dashboard mockup showing chat interface with sidebar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0DQ5XsPUd7_ZsF7aE6C_OcS9olc92ms9CNZ3Q0OaCbBY4v3EXKfpdEWpDplGd9hledFcjHcf1_RBLc62TiRs28SHqXjlpZNCy5lRqwI--aULsJFMqGY38-ZQBFdnExvDJ1wwtEhawYfJPsCZXnxb0XWQRQfSMXiObK2snj7s-9ZFN1cF0BXuWwZdSkHjBn2xHavn4fPQytXsWoBjRrvq0L_qqsyqvNwqa8gWZV4WskeoEY4TfzAD7V2YuDo1UvUTJJ3S0PbVj7F0u"/>
</div>
</div>
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

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
    </div>
   </div>  

    </>
  );
};

export default App;