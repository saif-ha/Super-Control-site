"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MonitorPlay, Mail, Lock, Eye, EyeOff, ArrowRight,
  CheckCircle, User, Building2, ShieldCheck,
  GraduationCap, Server, Cpu, BriefcaseBusiness, MoreHorizontal,
} from "lucide-react";

// ─── Password strength ─────────────────────────────────────────────────────
function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-emerald-500"];
const strengthText  = ["", "text-red-400", "text-yellow-400", "text-blue-400", "text-emerald-400"];

// ─── Role definitions ──────────────────────────────────────────────────────
const roles = [
  { id: "Teacher",          icon: GraduationCap,     label: "Teacher",           desc: "Classroom instructor" },
  { id: "Lab Administrator",icon: Server,             label: "Lab Admin",         desc: "Computer lab manager" },
  { id: "IT Staff",         icon: Cpu,                label: "IT Staff",          desc: "Technical support" },
  { id: "Department Head",  icon: BriefcaseBusiness,  label: "Dept. Head",        desc: "Department leader" },
  { id: "Other",            icon: MoreHorizontal,     label: "Other",             desc: "Another role" },
];

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [customRole, setCustomRole]     = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    organization: "", role: "", password: "", confirm: "",
  });
  const [agreed, setAgreed] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const strength = getStrength(form.password);
  const passwordsMatch = form.confirm !== "" && form.password === form.confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg px-4 py-12">
      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-lg">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Free 30-day trial · No credit card</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-1.5">Create your account</h1>
            <p className="text-sm text-slate-400">Join 500+ institutions using Super-Control</p>
          </div>

          {/* Social sign-up */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                label: "Google",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022"/>
                    <path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00"/>
                    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF"/>
                    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900"/>
                  </svg>
                ),
              },
            ].map((p) => (
              <motion.button
                key={p.label}
                type="button"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-white/15"
              >
                {p.icon}{p.label}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-slate-500 font-medium">or fill in your details</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "firstName", label: "First name", placeholder: "Jane",  key: "firstName" },
                { id: "lastName",  label: "Last name",  placeholder: "Smith", key: "lastName"  },
              ].map((f) => (
                <div key={f.id} className="space-y-1.5">
                  <label htmlFor={f.id} className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {f.label}
                  </label>
                  <div className="relative">
                    <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      id={f.id} type="text" required
                      value={form[f.key as keyof typeof form]}
                      onChange={set(f.key)}
                      placeholder={f.placeholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="signup-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Work email
              </label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-email" type="email" autoComplete="email" required
                  value={form.email} onChange={set("email")}
                  placeholder="jane@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-1.5">
              <label htmlFor="organization" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Institution / Organization
              </label>
              <div className="relative">
                <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="organization" type="text" required
                  value={form.organization} onChange={set("organization")}
                  placeholder="Stanford University"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* ─── Role Card Selector ─────────────────────────────────────── */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Your role
              </label>
              <div className="grid grid-cols-5 gap-2">
                {roles.map((role) => {
                  const selected = form.role === role.id;
                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, role: role.id }))}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200 ${
                        selected
                          ? "border-[#2563EB]/70 bg-[#2563EB]/15 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                          : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        selected
                          ? "bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shadow-lg shadow-blue-600/30"
                          : "bg-white/[0.06]"
                      }`}>
                        <role.icon size={15} className={selected ? "text-white" : "text-slate-400"} />
                      </div>
                      {/* Label */}
                      <span className={`text-[10px] font-semibold leading-tight ${selected ? "text-white" : "text-slate-400"}`}>
                        {role.label}
                      </span>
                      {/* Selected tick */}
                      {selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#06B6D4] flex items-center justify-center shadow-md"
                        >
                          <CheckCircle size={10} className="text-white fill-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {/* Custom role input — shown when Other is selected */}
              <AnimatePresence>
                {form.role === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1">
                      <label htmlFor="custom-role" className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-1.5">
                        Describe your role
                      </label>
                      <div className="relative">
                        <MoreHorizontal size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        <input
                          id="custom-role"
                          type="text"
                          autoFocus
                          value={customRole}
                          onChange={(e) => setCustomRole(e.target.value)}
                          placeholder="e.g. School Principal, Course Coordinator…"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-[#2563EB]/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                        />
                      </div>
                      {customRole && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-[#06B6D4] font-medium pl-1 mt-1.5"
                        >
                          ✓ Role set to: "{customRole}"
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selected confirmation for non-Other roles */}
              <AnimatePresence>
                {form.role && form.role !== "Other" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-[#06B6D4] font-medium pl-1"
                  >
                    ✓ Selected: {roles.find(r => r.id === form.role)?.label}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="signup-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-password" type={showPassword ? "text" : "password"}
                  autoComplete="new-password" required
                  value={form.password} onChange={set("password")}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {/* Strength bar */}
              <AnimatePresence>
                {form.password.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="space-y-1.5 pt-0.5">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : "bg-white/10"}`} />
                      ))}
                    </div>
                    <p className={`text-[11px] font-semibold ${strengthText[strength]}`}>{strengthLabel[strength]} password</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label htmlFor="confirm-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Confirm password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="confirm-password" type={showConfirm ? "text" : "password"}
                  autoComplete="new-password" required
                  value={form.confirm} onChange={set("confirm")}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-white/[0.06] focus:ring-2 transition-all duration-200 ${
                    form.confirm.length > 0
                      ? passwordsMatch
                        ? "border-emerald-500/50 focus:border-emerald-500/70 focus:ring-emerald-500/20"
                        : "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                      : "border-white/8 focus:border-[#2563EB]/70 focus:ring-[#2563EB]/20"
                  }`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {form.confirm.length > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      {passwordsMatch
                        ? <CheckCircle size={13} className="text-emerald-400" />
                        : <span className="text-red-400 text-xs font-bold">✕</span>}
                    </motion.span>
                  )}
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    aria-label="Toggle confirm password visibility"
                    className="text-slate-500 hover:text-slate-300 transition-colors">
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input id="terms" type="checkbox" required checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border border-white/15 bg-white/5 accent-[#2563EB] cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#06B6D4] hover:text-cyan-300 font-semibold transition-colors">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#06B6D4] hover:text-cyan-300 font-semibold transition-colors">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading || !agreed}
              whileHover={!isLoading && agreed ? { scale: 1.02, boxShadow: "0 0 32px rgba(37,99,235,0.45)" } : {}}
              whileTap={!isLoading && agreed ? { scale: 0.98 } : {}}
              id="sign-up-submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account…
                </>
              ) : (
                <>Create Free Account <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <a href="/sign-in" className="text-[#06B6D4] hover:text-cyan-300 font-semibold transition-colors">
              Sign in
            </a>
          </p>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-5 mt-6"
        >
          {["SOC 2 Compliant", "AES-256 Encrypted", "GDPR Ready", "No credit card"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle size={12} className="text-emerald-500" />{item}
            </span>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
