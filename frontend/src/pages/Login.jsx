import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const handleLogin = async (e) => {
  e.preventDefault();

  const data = await loginUser(email, password);

  if (data.token) {
    localStorage.setItem("token", data.token);
    navigate("/home");
  }
};
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

export default function SyncrovaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
    console.log({ email, password, remember });
  };

  return (
    <div className="min-h-screen flex font-['Plus_Jakarta_Sans',sans-serif] bg-[#f6f6f8]">

      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#3b2bee] flex-col justify-between p-12 overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b2bee] via-[#4f46e5] to-[#818cf8] opacity-95 z-0" />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,212,191,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
        />

        {/* Top content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
            <span className="text-[#2dd4bf]"><SparkleIcon /></span>
            <span className="text-xs font-bold tracking-widest uppercase text-white">New Version 2.0 Live</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Sync your{" "}
            <span className="text-[#2dd4bf]">digital universe</span>{" "}
            with Syncrova.
          </h1>

          <p className="text-base text-white/70 font-medium leading-relaxed mb-10">
            The next generation of cross-platform workflow automation and real-time data orchestration.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-white mb-1">99.9%</div>
              <div className="text-xs text-white/55">Uptime SLA</div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-white mb-1">500+</div>
              <div className="text-xs text-white/55">Integrations</div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="relative z-10 flex justify-between items-center text-white/40 text-[10px] font-medium uppercase tracking-widest">
          <span>© 2024 Syncrova Inc.</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Security</span>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 md:px-20 bg-[#f8f9ff]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-[#3b2bee] hover:text-[#4f46e5] transition">Syncrova</Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Login to Syncrova
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-slate-900 border border-slate-900 rounded-xl text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              <GithubIcon />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="px-4 bg-[#f8f9ff] text-slate-400">Or login with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-slate-800">
                  Password
                </label>
                <a href="#" className="text-xs font-bold text-[#3b2bee] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                className="w-4 h-4 rounded border-slate-300 text-[#3b2bee] accent-[#3b2bee] cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-500 font-medium cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#3b2bee] hover:bg-[#2b0ae2] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#3b2bee]/20 hover:shadow-[#3b2bee]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Login
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </button>
          </form>

          {/* Sign up */}
          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#3b2bee] font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="fixed bottom-0 w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#3b2bee] text-sm">Syncrova</span>
          <span>© 2024 Syncrova Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#3b2bee] hover:underline transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#3b2bee] hover:underline transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#3b2bee] hover:underline transition-colors">Help Center</a>
        </div>
      </footer>
    </div>
  );
}