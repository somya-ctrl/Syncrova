import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuroraBackground from "../components/hero/AuroraBackground";
import GlassCard from "../components/hero/GlassCard";
import MagneticButton from "../components/hero/MagneticButton";
import { GithubIcon, EyeIcon, MailIcon, LockIcon, SparkleIcon } from "../components/icons/AuthIcons";

export default function SyncrovaLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");
  setLoading(true);

  try {
    const apiUrl = import.meta.env.DEV
      ? "http://localhost:5000/api/auth/login"
      : "https://syncrova-z7sn.onrender.com/api/auth/login";

    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        // Zod validation errors (e.g. from backend validate.middleware.js)
        const validationMessages = data.errors.map(err => err.message).join(" | ");
        throw new Error(validationMessages);
      }
      throw new Error(data.error || data.message || "Login failed");
    }

    // Save JWT token
    localStorage.setItem("token", data.accesstoken);

    // Save user data if returned
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setSuccessMessage("Login successful! Redirecting...");

    // Navigate to home after a short delay so user sees the success message
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex font-geist bg-[#050505]">

      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 pb-24 overflow-hidden border-r border-white/10">
        <AuroraBackground />

        {/* Top content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-white/[0.06] text-white/80 border border-white/10 mb-8">
            <span className="text-accent-cyan"><SparkleIcon /></span>
            <span className="text-xs font-bold tracking-widest uppercase">New Version 2.0 Live</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Sync your{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent animate-gradient-shift">
              digital universe
            </span>{" "}
            with Syncrova.
          </h1>

          <p className="text-base text-white/50 font-medium leading-relaxed mb-10">
            The next generation of cross-platform workflow automation and real-time data orchestration.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <GlassCard hoverLift={false} className="p-5">
              <div className="text-3xl font-extrabold text-white mb-1">99.9%</div>
              <div className="text-xs text-white/50">Uptime SLA</div>
            </GlassCard>
            <GlassCard hoverLift={false} className="p-5">
              <div className="text-3xl font-extrabold text-white mb-1">500+</div>
              <div className="text-xs text-white/50">Integrations</div>
            </GlassCard>
          </div>

          <div className="space-y-4">
            {[
              "Real-time sync across every device",
              "Enterprise-grade end-to-end encryption",
              "Built to scale from 10 to 10,000 teammates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <p className="text-white/60 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="absolute bottom-12 left-12 right-12 z-10 flex justify-between items-center text-white/30 text-[10px] font-medium uppercase tracking-widest">
          <span>© 2024 Syncrova Inc.</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Security</span>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 md:px-20 bg-[#050505]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-accent-blue to-accent-purple rounded-md flex items-center justify-center text-white text-base font-bold">
                ↔
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">Syncrova</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Login to Syncrova
            </h2>
            <p className="text-sm text-white/50 font-medium">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-xl text-sm font-semibold text-white hover:bg-white/[0.09] active:scale-[0.98] transition-all"
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
              className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-xl text-sm font-semibold text-white hover:bg-white/[0.09] active:scale-[0.98] transition-all"
            >
              <GithubIcon />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="px-4 bg-[#050505] text-white/30">Or login with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-white/80">
                  Password
                </label>
                <a href="#" className="text-xs font-bold text-accent-cyan hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
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
                className="w-4 h-4 rounded border-white/20 accent-accent-blue cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-white/50 font-medium cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 flex items-center gap-2 p-3 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 flex items-center gap-2 p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Submit */}
            <MagneticButton
              as="button"
              type="submit"
              disabled={loading}
              className={`btn-shine relative overflow-hidden w-full py-3.5 ${
                loading
                  ? "bg-accent-blue/40 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-accent-blue to-accent-purple bg-[length:200%_auto] bg-left hover:bg-right"
              } text-white text-sm font-bold rounded-xl shadow-[0_0_30px_rgba(124,92,255,0.4)] hover:shadow-[0_0_45px_rgba(124,92,255,0.65)] transition-[background-position,box-shadow] duration-500 flex items-center justify-center gap-2`}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              )}
            </MagneticButton>
          </form>

          {/* Sign up */}
          <p className="mt-8 text-center text-xs text-white/50 font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-accent-cyan font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="fixed bottom-0 w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 bg-[#050505] border-t border-white/10 text-[10px] text-white/30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">Syncrova</span>
          <span>© 2024 Syncrova Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/60 hover:underline transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/60 hover:underline transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white/60 hover:underline transition-colors">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
