"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MonitorPlay, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg px-4">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_24px_rgba(37,99,235,0.5)] transition-shadow duration-300">
              <MonitorPlay size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Super</span>
              <span className="text-[#06B6D4]">Control</span>
            </span>
          </a>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white mb-1.5">Welcome back</h1>
            <p className="text-sm text-slate-400">Sign in to your Super-Control dashboard</p>
          </div>

          {/* Social sign-in */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                label: "Google",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              {
                label: "Microsoft",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022"/>
                    <path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00"/>
                    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF"/>
                    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900"/>
                  </svg>
                ),
              },
            ].map((provider) => (
              <motion.button
                key={provider.label}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-white/15"
              >
                {provider.icon}
                {provider.label}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-slate-500 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-[#06B6D4] hover:text-cyan-300 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border border-white/15 bg-white/5 accent-[#2563EB] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 0 30px rgba(37,99,235,0.45)" } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              id="sign-in-submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-[#06B6D4] hover:text-cyan-300 font-semibold transition-colors">
              Get started free
            </a>
          </p>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-5 mt-6"
        >
          {["SOC 2 Compliant", "AES-256 Encrypted", "GDPR Ready"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle size={12} className="text-emerald-500" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
