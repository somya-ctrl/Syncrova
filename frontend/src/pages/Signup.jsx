import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuroraBackground from "../components/hero/AuroraBackground";
import GlassCard from "../components/hero/GlassCard";
import MagneticButton from "../components/hero/MagneticButton";
import { GithubIcon, EyeIcon, MailIcon, LockIcon, UserIcon, SparkleIcon } from "../components/icons/AuthIcons";

export default function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");

  if (!formData.terms) {
    setErrorMessage("Please accept Terms and Conditions");
    return;
  }

  setLoading(true);

  try {
    const apiUrl = import.meta.env.DEV
      ? "http://localhost:5000/api/auth/signup"
      : "https://syncrova-z7sn.onrender.com/api/auth/signup";

    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
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
      throw new Error(data.error || data.message || "Signup failed");
    }

    // Save JWT token
    if (data.accesstoken) {
      localStorage.setItem("token", data.accesstoken);
    }

    // Save user data if returned
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setSuccessMessage("Account created successfully! Redirecting...");

    // Navigate to home after a short delay so user sees the success message
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex font-geist bg-[#050505]">

      {/* ── Left Branding Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 pb-24 overflow-hidden border-r border-white/10">
        <AuroraBackground />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-white/[0.06] text-white/80 border border-white/10 mb-8">
            <span className="text-accent-cyan"><SparkleIcon /></span>
            <span className="text-xs font-bold tracking-widest uppercase">Enterprise Grade Security</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Powering the next generation of{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent animate-gradient-shift">
              digital synergy
            </span>
            .
          </h1>

          <p className="text-base text-white/50 font-medium leading-relaxed mb-10">
            Syncrova integrates your entire workflow into a single, intelligent
            ecosystem. Join 10,000+ professionals optimizing their output every day.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <GlassCard hoverLift={false} className="p-5">
              <div className="text-3xl font-extrabold text-white mb-1">99.9%</div>
              <div className="text-xs text-white/50">System Uptime</div>
            </GlassCard>
            <GlassCard hoverLift={false} className="p-5">
              <div className="text-3xl font-extrabold text-white mb-1">24/7</div>
              <div className="text-xs text-white/50">Expert Support</div>
            </GlassCard>
          </div>

          <div className="space-y-4">
            {[
              "Onboard your whole team in minutes",
              "SOC 2 & ISO 27001 compliant infrastructure",
              "Cancel anytime — no long-term lock-in",
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
          <span>Enterprise Grade Security</span>
          <span>ISO 27001 Certified</span>
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
              Join the Syncrova Network
            </h2>
            <p className="text-sm text-white/50 font-medium">
              Start your 14-day free trial. No credit card required.
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
              <span className="px-4 bg-[#050505] text-white/30">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label htmlFor="username" className="block text-xs font-bold text-white/80 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <UserIcon />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all"
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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
              <p className="text-[10px] text-white/40 italic mt-1.5 pl-1">
                Must be at least 8 characters with one special symbol.
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 py-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-white/20 accent-accent-blue cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-white/50 font-medium leading-relaxed cursor-pointer select-none">
                I agree to the{" "}
                <a href="#" className="text-accent-cyan font-bold hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-accent-cyan font-bold hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="flex items-center gap-2 p-3 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
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
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              )}
            </MagneticButton>
          </form>

          {/* Login link */}
          <p className="mt-8 text-center text-xs text-white/50 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-cyan font-bold hover:underline">
              Login
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
