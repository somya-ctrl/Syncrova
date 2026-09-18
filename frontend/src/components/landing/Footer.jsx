import React from 'react';
import { Twitter, Linkedin, Github, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#110e17] text-white pt-28 pb-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#6d3df5] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6d3df5]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* CTA Section */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold mb-8 tracking-tight leading-tight">
            Ready to <span className="text-[#a586ff]">transform</span><br className="hidden sm:block" /> your team's workflow?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of teams already using Syncrova to communicate, collaborate, and get work done faster.
          </p>
          <button className="bg-[#6d3df5] hover:bg-[#a586ff] text-white px-10 py-4 rounded-xl font-bold text-base shadow-[0_10px_30px_rgba(109,61,245,0.3)] transition-all hover:-translate-y-1">
            Get Started for Free
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16 border-t border-white/10 pt-16">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6d3df5] text-white">
                <MessageSquare size={20} />
              </div>
              <span className="text-2xl font-bold tracking-tight">Syncrova</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              The ultimate communication platform for modern teams. Bring your conversations, files, and tools into one unified workspace.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#6d3df5] hover:text-white hover:border-[#6d3df5] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#6d3df5] hover:text-white hover:border-[#6d3df5] transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#6d3df5] hover:text-white hover:border-[#6d3df5] transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#a586ff] text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Syncrova Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">English (US)</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Support Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
