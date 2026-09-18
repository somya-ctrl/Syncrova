import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GithubIcon, EyeIcon, MailIcon, LockIcon, SparkleIcon } from "../components/icons/AuthIcons";
import { MessageSquare } from "lucide-react";

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
        const validationMessages = data.errors.map(err => err.message).join(" | ");
        throw new Error(validationMessages);
      }
      throw new Error(data.error || data.message || "Login failed");
    }

    localStorage.setItem("token", data.accesstoken);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setSuccessMessage("Login successful! Redirecting...");

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
    <div className="min-h-screen flex bg-[#fbfaff]">

      {/* ── Left Branding Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 pb-24 overflow-hidden border-r border-[#eeeaf7] bg-white">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        {/* Top content */}
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-[#f1edfa] text-[#6d3df5] border border-[#ddd6ef] mb-8">
            <span className="text-[#6d3df5]"><SparkleIcon /></span>
            <span className="text-xs font-bold tracking-widest uppercase">New Version 2.0 Live</span>
          </div>

          <h1 className="text-4xl xl:text-[54px] font-extrabold text-[#15131d] leading-tight tracking-tight mb-6">
            Sync your{" "}
            <span className="text-[#6d3df5]">
              team's workflow
            </span>{" "}
            with Syncrova.
          </h1>

          <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12">
            The ultimate communication platform for modern teams. Bring your conversations, files, and tools into one unified workspace.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="p-6 bg-white border border-[#eeeaf7] rounded-2xl shadow-sm">
              <div className="text-3xl font-extrabold text-[#15131d] mb-1">99.9%</div>
              <div className="text-sm font-medium text-gray-500">Uptime SLA</div>
            </div>
            <div className="p-6 bg-white border border-[#eeeaf7] rounded-2xl shadow-sm">
              <div className="text-3xl font-extrabold text-[#15131d] mb-1">500+</div>
              <div className="text-sm font-medium text-gray-500">Integrations</div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              "Real-time sync across every device",
              "Enterprise-grade end-to-end encryption",
              "Built to scale from 10 to 10,000 teammates",
            ].map((item) => (
               <div key={item} className="flex items-center gap-3">
                 <div className="w-6 h-6 shrink-0 rounded-full bg-[#f1edfa] flex items-center justify-center text-[#6d3df5] text-xs font-bold">
                   ✓
                 </div>
                 <p className="text-gray-600 text-sm font-medium">{item}</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 md:px-20 relative bg-[#fbfaff]">
        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6d3df5] text-white">
                <MessageSquare size={20} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#15131d]">Syncrova</span>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl lg:text-[40px] font-extrabold text-[#15131d] mb-3 tracking-tight">
              Welcome back
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-8">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border border-[#ddd6ef] rounded-xl text-sm font-bold text-[#15131d] hover:border-[#a586ff] hover:bg-[#fcfbfe] active:scale-[0.98] shadow-sm transition-all"
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
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border border-[#ddd6ef] rounded-xl text-sm font-bold text-[#15131d] hover:border-[#a586ff] hover:bg-[#fcfbfe] active:scale-[0.98] shadow-sm transition-all"
            >
              <GithubIcon className="text-[#15131d]" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#eeeaf7]" />
            </div>
            <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest">
              <span className="px-4 bg-[#fbfaff] text-gray-400">Or login with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#15131d] mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#ddd6ef] rounded-xl text-sm text-[#15131d] font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#6d3df5]/10 focus:border-[#6d3df5] shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-[#15131d] uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs font-bold text-[#6d3df5] hover:text-[#582fe0] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-white border border-[#ddd6ef] rounded-xl text-sm text-[#15131d] font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#6d3df5]/10 focus:border-[#6d3df5] shadow-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6d3df5] transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3 pt-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                className="w-4 h-4 rounded border-[#ddd6ef] text-[#6d3df5] focus:ring-[#6d3df5] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 flex items-center gap-3 p-4 text-sm font-bold text-[#059669] bg-[#d1fae5] border border-[#34d399] rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 flex items-center gap-3 p-4 text-sm font-bold text-[#e11d48] bg-[#ffe4e6] border border-[#f43f5e] rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-2 text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(109,61,245,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(109,61,245,0.35)] transition-all flex items-center justify-center gap-2 ${
                loading ? "bg-[#a586ff] cursor-not-allowed" : "bg-[#6d3df5] hover:bg-[#582fe0]"
              }`}
            >
              {loading ? "Logging in..." : "Login to Workspace"}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              )}
            </button>
          </form>

          {/* Sign up */}
          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#6d3df5] font-bold hover:text-[#582fe0] hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
