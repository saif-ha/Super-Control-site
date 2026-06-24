"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Monitor, Camera, Brain, MessageSquare, HelpCircle, BarChart3,
  Shield, Lock, Server, Eye, CheckCircle, ArrowRight, Star,
  ChevronDown, Zap, Users, Activity, AlertTriangle, Play,
  Download, Wifi, LayoutDashboard, Bell, TrendingUp, FileText,
  Database, Key,
} from "lucide-react";

// ─── Shared helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.section>
  );
}

function SectionBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-5">
      <Icon size={12} className="text-[#06B6D4]" />
      <span className="text-xs font-medium text-slate-300">{text}</span>
    </motion.div>
  );
}

// ─── Dashboard Mockup ──────────────────────────────────────────────────────
function DashboardMockup() {
  const students = [
    { name: "Alex M.", status: "active", task: "Lab Exercise 3" },
    { name: "Sara K.", status: "active", task: "Reading Docs" },
    { name: "Omar T.", status: "alert", task: "YouTube detected" },
    { name: "Lily R.", status: "active", task: "Code Editor" },
    { name: "James P.", status: "idle", task: "Idle 12m" },
    { name: "Maya L.", status: "active", task: "Browser - Docs" },
    { name: "Ryan C.", status: "active", task: "Terminal" },
    { name: "Nour A.", status: "alert", task: "Social Media" },
    { name: "Ben S.", status: "active", task: "VS Code" },
  ];
  const statusColor: Record<string, string> = {
    active: "bg-emerald-500",
    idle: "bg-yellow-500",
    alert: "bg-red-500",
  };
  return (
    <div className="bg-[#060E1C] flex min-h-[400px] lg:min-h-[460px]">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 p-3 hidden sm:flex flex-col gap-2">
        <p className="px-2 py-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Session</p>
        <div className="px-2 py-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
          <div className="text-xs font-bold text-white">CS-101</div>
          <div className="text-[10px] text-slate-400">Computer Science</div>
        </div>
        <div className="mt-1 space-y-0.5">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Monitor, label: "Screens" },
            { icon: Bell, label: "Alerts", badge: "3" },
            { icon: MessageSquare, label: "Messages" },
            { icon: BarChart3, label: "Analytics" },
            { icon: FileText, label: "Reports" },
          ].map(({ icon: Ic, label, active, badge }) => (
            <div key={label}
              className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${active ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-white/5"}`}>
              <div className="flex items-center gap-2"><Ic size={12} /><span className="text-[11px]">{label}</span></div>
              {badge && <span className="text-[9px] bg-red-500 text-white rounded-full px-1.5 font-bold">{badge}</span>}
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-2">
          {[["Students", "24", "text-white"], ["Session", "45:22", "text-emerald-400"]].map(([lbl, val, cls]) => (
            <div key={lbl} className="glass rounded-lg p-2 border border-white/5">
              <div className="text-[10px] text-slate-400">{lbl}</div>
              <div className={`text-base font-bold ${cls}`}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-white">Live Monitor — Lab A</span>
          <div className="flex gap-1.5">
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20"><Wifi size={9} />24 Live</span>
            <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20"><AlertTriangle size={9} />3 Alerts</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {students.map((s) => (
            <div key={s.name} className={`glass rounded-lg p-1.5 border ${s.status === "alert" ? "border-red-500/30 bg-red-500/5" : "border-white/5"}`}>
              <div className="w-full h-12 rounded bg-slate-800/80 flex items-center justify-center mb-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-900/60" />
                <Monitor size={12} className="text-slate-600 relative z-10" />
                {s.status === "alert" && <AlertTriangle size={9} className="text-red-400 absolute top-1 right-1" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-white truncate">{s.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${statusColor[s.status]}`} />
              </div>
              <p className="text-[9px] text-slate-500 truncate">{s.task}</p>
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-2 border border-white/5">
          <p className="text-[10px] text-slate-400 mb-1">Activity Timeline</p>
          <div className="flex items-end gap-px h-8">
            {Array.from({ length: 40 }, (_, i) => (
              <div key={i} className="flex-1 rounded-sm bg-blue-600/40 hover:bg-blue-500/60 transition-colors"
                style={{ height: `${25 + Math.sin(i * 0.6) * 20 + (i % 3) * 8}%` }} />
            ))}
          </div>
        </div>
      </div>
      {/* AI Alerts panel */}
      <div className="w-44 border-l border-white/5 p-3 hidden md:flex flex-col gap-2">
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">AI Alerts</p>
        {[
          { s: "Omar T.", t: "YouTube", sev: "high", ago: "1m ago" },
          { s: "Nour A.", t: "Social", sev: "high", ago: "2m ago" },
          { s: "James P.", t: "Idle", sev: "low", ago: "12m ago" },
        ].map((a, i) => (
          <div key={i} className={`rounded-lg p-2 border ${a.sev === "high" ? "bg-red-500/10 border-red-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}>
            <div className="text-[10px] font-bold text-white">{a.s}</div>
            <div className={`text-[10px] ${a.sev === "high" ? "text-red-400" : "text-yellow-400"}`}>{a.t} detected</div>
            <div className="text-[9px] text-slate-500">{a.ago}</div>
          </div>
        ))}
        <div className="mt-auto glass rounded-lg p-2 border border-blue-500/20">
          <div className="text-[10px] text-slate-400">AI Focus Score</div>
          <div className="text-xl font-black text-blue-400">94%</div>
          <div className="text-[9px] text-slate-500">Class average</div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      {/* Glow orbs */}
      {[
        { size: 600, pos: "top-1/4 -left-24", color: "bg-blue-600/10" },
        { size: 500, pos: "bottom-1/3 -right-24", color: "bg-cyan-500/8" },
      ].map((o, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i }}
          className={`absolute ${o.pos} w-[${o.size}px] h-[${o.size}px] rounded-full ${o.color} blur-[120px] pointer-events-none`}
          style={{ width: o.size, height: o.size }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/25 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs font-medium text-slate-300">AI-Powered · Real-Time · Enterprise-Grade</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black tracking-tight leading-[1.06] mb-6">
          <span className="text-white">Transform Computer</span><br />
          <span className="gradient-text">Lab Management</span><br />
          <span className="text-white">with AI</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Monitor, assist, and guide students in real time through a secure and intelligent classroom supervision platform built for modern educators.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <motion.a href="#demo" whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(37,99,235,0.55)" }} whileTap={{ scale: 0.97 }}
            id="hero-request-demo"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-blue-600/30 transition-all duration-300">
            <Play size={17} className="fill-white" />
            Request Demo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a href="#pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            id="hero-get-started"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white glass border border-white/10 hover:border-white/20 transition-all duration-300">
            Get Started Free
          </motion.a>
        </motion.div>

        {/* Trust pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 mb-16">
          {["No credit card required", "Setup in 5 minutes", "Free 30-day trial", "SOC 2 Compliant"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-emerald-500" />{item}
            </span>
          ))}
        </motion.div>

        {/* Dashboard */}
        <motion.div initial={{ opacity: 0, y: 70, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ y }}
          className="relative mx-auto max-w-5xl">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-b from-blue-600/25 via-blue-600/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

          {/* Browser window */}
          <div className="relative glass border border-white/10 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
              <div className="flex gap-1.5">
                {["bg-red-500/70", "bg-yellow-500/70", "bg-green-500/70"].map((c) => (
                  <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white/5 rounded-md flex items-center px-3 gap-2 max-w-xs mx-auto">
                  <Lock size={9} className="text-emerald-400" />
                  <span className="text-[11px] text-slate-500">app.super-control.io/classroom/CS-101</span>
                </div>
              </div>
              <div className="w-6" />
            </div>
            <DashboardMockup />
          </div>

          {/* Floating stat cards */}
          <motion.div animate={{ y: [-8, 0, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-14 top-1/3 glass border border-white/10 rounded-xl p-3 hidden lg:flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20">
              <Users size={15} className="text-emerald-400" />
            </div>
            <div><div className="text-[10px] text-slate-400">Connected</div><div className="text-sm font-bold text-white">24 Students</div></div>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-14 top-1/4 glass border border-white/10 rounded-xl p-3 hidden lg:flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center border border-red-500/20">
              <AlertTriangle size={15} className="text-red-400" />
            </div>
            <div><div className="text-[10px] text-slate-400">AI Alert</div><div className="text-sm font-bold text-white">3 Flagged</div></div>
          </motion.div>
          <motion.div animate={{ y: [-5, 8, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-10 bottom-20 glass border border-white/10 rounded-xl p-3 hidden lg:flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center border border-blue-500/20">
              <TrendingUp size={15} className="text-blue-400" />
            </div>
            <div><div className="text-[10px] text-slate-400">Engagement</div><div className="text-sm font-bold text-white">94% Active</div></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Trusted By ────────────────────────────────────────────────────────────
function TrustedBySection() {
  const logos = [
    "Stanford University", "MIT OpenEd", "Coursera Pro", "EdX Institute",
    "TechAcademy", "Global School", "LearnHub", "EduCorp", "UniTech", "CampusAI",
  ];
  return (
    <Section className="py-14 border-y border-white/5 bg-white/[0.015] overflow-hidden">
      <motion.div variants={fadeUp} className="text-center mb-8">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">
          Trusted by 500+ Educational Institutions Worldwide
        </p>
      </motion.div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: [0, -1600] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-2.5 glass px-5 py-2.5 rounded-xl border border-white/5 shrink-0">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                <span className="text-[10px] font-black text-white">{logo[0]}</span>
              </div>
              <span className="text-sm font-semibold text-slate-300">{logo}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────
const features = [
  { icon: Monitor, title: "Real-Time Classroom Monitoring", description: "Monitor all connected student devices from a single unified dashboard. Track activity, status, and engagement with zero latency.", gradient: "from-[#2563EB] to-[#3B82F6]", glow: "hover:shadow-[0_8px_40px_rgba(37,99,235,0.25)]" },
  { icon: Camera, title: "Live Screen Capture", description: "View classroom activity instantly through secure, high-quality screenshots. Capture on-demand or set automated intervals.", gradient: "from-[#06B6D4] to-[#22D3EE]", glow: "hover:shadow-[0_8px_40px_rgba(6,182,212,0.25)]" },
  { icon: Brain, title: "AI-Powered Detection", description: "Identify suspicious activities through intelligent ML models. Receive instant context-aware alerts with action recommendations.", gradient: "from-violet-600 to-purple-500", glow: "hover:shadow-[0_8px_40px_rgba(139,92,246,0.25)]" },
  { icon: MessageSquare, title: "Classroom Communication", description: "Send messages, announcements, and instructions instantly to individual students, groups, or the entire class.", gradient: "from-emerald-600 to-green-500", glow: "hover:shadow-[0_8px_40px_rgba(16,185,129,0.25)]" },
  { icon: HelpCircle, title: "Student Assistance", description: "Provide remote guidance without disrupting classroom flow. Help students one-on-one while monitoring everyone else.", gradient: "from-orange-500 to-amber-500", glow: "hover:shadow-[0_8px_40px_rgba(249,115,22,0.25)]" },
  { icon: BarChart3, title: "Advanced Reporting", description: "Generate detailed session reports and classroom analytics. Track engagement, activity patterns, and productivity trends.", gradient: "from-pink-600 to-rose-500", glow: "hover:shadow-[0_8px_40px_rgba(244,63,94,0.25)]" },
];

function FeaturesSection() {
  return (
    <Section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <SectionBadge icon={Zap} text="Powerful Features" />
        <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
          Everything You Need to<br /><span className="gradient-text">Run a Smarter Classroom</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
          A comprehensive suite of tools designed for modern educators who demand precision, efficiency, and intelligence.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} variants={fadeUp} custom={i}
            whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group glass border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 cursor-default ${f.glow}`}>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}>
              <f.icon size={20} className="text-white" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:gap-2 transition-all duration-200">
              Learn more <ArrowRight size={11} />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Demo Section ──────────────────────────────────────────────────────────
const demoTabs = [
  { id: "monitor", label: "Live Monitor", icon: Monitor },
  { id: "alerts", label: "AI Alerts", icon: Brain },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
];

function AlertsPanel() {
  const alerts = [
    { student: "Omar T.", type: "YouTube Video Playback", sev: "critical", time: "Just now", room: "Seat 12" },
    { student: "Nour A.", type: "Facebook / Social Media", sev: "critical", time: "2m ago", room: "Seat 8" },
    { student: "James P.", type: "Extended Idle Period (12 min)", sev: "warning", time: "12m ago", room: "Seat 5" },
    { student: "Ryan C.", type: "Unknown Application Launched", sev: "warning", time: "15m ago", room: "Seat 19" },
    { student: "Ben S.", type: "Multiple Browser Tabs (15+)", sev: "info", time: "20m ago", room: "Seat 22" },
  ];
  const sevStyles: Record<string, string> = {
    critical: "bg-red-500/10 border-red-500/20", warning: "bg-yellow-500/10 border-yellow-500/20", info: "bg-blue-500/10 border-blue-500/20",
  };
  const sevIcon: Record<string, string> = { critical: "bg-red-500/20", warning: "bg-yellow-500/20", info: "bg-blue-500/20" };
  const sevText: Record<string, string> = { critical: "text-red-400", warning: "text-yellow-400", info: "text-blue-400" };
  return (
    <div className="bg-[#060E1C] p-6 min-h-[420px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">AI Detection Alerts</h3>
        <span className="text-xs text-slate-500">Updated just now</span>
      </div>
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${sevStyles[a.sev]}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sevIcon[a.sev]}`}>
                <AlertTriangle size={13} className={sevText[a.sev]} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{a.student} — {a.type}</div>
                <div className="text-xs text-slate-400">{a.room}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${sevIcon[a.sev]} ${sevText[a.sev]}`}>{a.sev}</div>
              <div className="text-xs text-slate-500 mt-0.5">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const data = [65, 72, 58, 80, 76, 90, 85, 92, 78, 88, 94, 89];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div className="bg-[#060E1C] p-6 min-h-[420px]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[["Avg. Focus Score","87%","+5%",true],["Sessions / Month","248","+12%",true],["Alerts Generated","142","-8%",false],["Students Assisted","89","+23%",true]].map(([lbl,val,chg,up], i) => (
          <div key={i} className="glass rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-slate-400">{lbl}</div>
            <div className="text-xl font-black text-white mt-0.5">{val}</div>
            <div className={`text-xs ${up ? "text-emerald-400" : "text-red-400"}`}>{chg} vs last month</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-4 border border-white/5">
        <div className="text-sm font-semibold text-white mb-3">Monthly Focus Score</div>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-sm bg-gradient-to-t from-[#2563EB] to-[#06B6D4] hover:from-blue-500 hover:to-cyan-400 transition-colors"
                style={{ height: `${v}%` }} />
              <span className="text-[9px] text-slate-500">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsPanel() {
  const reports = [
    { name: "Session Report — CS-101 Lab A", date: "Jun 24, 2025", size: "2.4 MB", type: "PDF" },
    { name: "Weekly Engagement Summary", date: "Jun 20, 2025", size: "1.8 MB", type: "PDF" },
    { name: "AI Alert Analysis — June", date: "Jun 18, 2025", size: "3.1 MB", type: "XLSX" },
    { name: "Student Progress Report", date: "Jun 15, 2025", size: "4.2 MB", type: "PDF" },
  ];
  return (
    <div className="bg-[#060E1C] p-6 min-h-[420px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Generated Reports</h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs border border-blue-500/20 hover:bg-blue-600/30 transition-colors">Generate New</button>
      </div>
      <div className="space-y-2">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 glass rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center border border-blue-500/20">
                <FileText size={15} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-slate-400">{r.date} · {r.size}</div>
              </div>
            </div>
            <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">{r.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSection() {
  const [activeTab, setActiveTab] = useState("monitor");
  return (
    <Section id="demo" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionBadge icon={Eye} text="Product Demo" />
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
            See Super-Control in <span className="gradient-text">Action</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
            Explore the interface that thousands of educators use daily to transform their classrooms.
          </motion.p>
        </div>
        {/* Tabs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {demoTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} id={`demo-tab-${tab.id}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id ? "bg-[#2563EB] text-white shadow-lg shadow-blue-600/30" : "glass text-slate-400 hover:text-white border border-white/5 hover:border-white/15"
              }`}>
              <tab.icon size={14} />{tab.label}
            </button>
          ))}
        </motion.div>
        {/* Panel */}
        <motion.div variants={fadeUp} className="relative glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
            <div className="flex gap-1.5">
              {["bg-red-500/70","bg-yellow-500/70","bg-green-500/70"].map(c=><div key={c} className={`w-3 h-3 rounded-full ${c}`}/>)}
            </div>
            <div className="flex-1 mx-4">
              <div className="h-6 bg-white/5 rounded-md flex items-center px-3 gap-2 max-w-xs mx-auto">
                <Lock size={9} className="text-emerald-400" /><span className="text-[11px] text-slate-500">app.super-control.io/dashboard</span>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {activeTab === "monitor" && <DashboardMockup />}
              {activeTab === "alerts" && <AlertsPanel />}
              {activeTab === "analytics" && <AnalyticsPanel />}
              {activeTab === "reports" && <ReportsPanel />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Benefits ──────────────────────────────────────────────────────────────
function BenefitsSection() {
  const stats = [
    { value: "90%", label: "Faster Supervision", desc: "Reduce monitoring time per workstation", icon: Zap, grad: "from-[#2563EB] to-[#06B6D4]" },
    { value: "70%", label: "Less Disruption", desc: "Silent monitoring keeps learning flowing", icon: Users, grad: "from-violet-600 to-purple-500" },
    { value: "100%", label: "Centralized Control", desc: "All workstations visible in one view", icon: Monitor, grad: "from-emerald-600 to-green-500" },
    { value: "< 1s", label: "Real-Time Alerts", desc: "Instant AI detection & notification", icon: Bell, grad: "from-orange-500 to-amber-500" },
  ];
  return (
    <Section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <SectionBadge icon={TrendingUp} text="Measurable Impact" />
        <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
          Results That Speak <span className="gradient-text">for Themselves</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
          Educators who use Super-Control report significant improvements in classroom efficiency and student engagement.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i} whileHover={{ y: -6 }}
            className="group relative glass border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-all duration-300 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
            <div className={`mx-auto w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-4 shadow-lg`}>
              <s.icon size={22} className="text-white" />
            </div>
            <div className="text-4xl font-black text-white mb-1">{s.value}</div>
            <div className="text-sm font-bold text-slate-200 mb-1.5">{s.label}</div>
            <div className="text-xs text-slate-400">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { step: "01", title: "Install Student Agent", desc: "Deploy the lightweight Super-Control agent on student workstations. Compatible with Windows, macOS, and Linux. Silent installation takes under 2 minutes.", icon: Download, color: "from-[#2563EB] to-[#3B82F6]" },
    { step: "02", title: "Connect to Server", desc: "Student devices automatically connect to your school's secure Super-Control server. End-to-end encrypted over your local network or cloud infrastructure.", icon: Wifi, color: "from-[#06B6D4] to-[#22D3EE]" },
    { step: "03", title: "Open Teacher Dashboard", desc: "Launch the intuitive teacher dashboard in any modern browser. No installation required. All devices appear instantly on your live classroom view.", icon: LayoutDashboard, color: "from-violet-600 to-violet-500" },
    { step: "04", title: "Monitor & Manage", desc: "Supervise all students in real time. Send messages, capture screens, receive AI alerts, and generate reports — all from one powerful interface.", icon: Brain, color: "from-emerald-600 to-emerald-500" },
  ];
  return (
    <Section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionBadge icon={Activity} text="How It Works" />
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Up and Running in <span className="gradient-text">Minutes</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
            Getting started with Super-Control is simple. Four easy steps to transform your classroom.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line */}
          <div className="absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent hidden lg:block" />
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} custom={i} whileHover={{ y: -6 }}
              className="relative glass border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg z-10 relative`}>
                  <s.icon size={20} className="text-white" />
                </div>
                <span className="text-5xl font-black text-white/[0.04] select-none">{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Security ──────────────────────────────────────────────────────────────
function SecuritySection() {
  const secFeatures = [
    { icon: Lock, title: "AES-256 Encryption", desc: "All communications between student devices and the teacher dashboard are encrypted using military-grade AES-256.", tag: "Encryption" },
    { icon: Server, title: "Secure Infrastructure", desc: "SOC 2 Type II compliant infrastructure. Available as on-premise or private cloud deployment for maximum control.", tag: "Infrastructure" },
    { icon: Database, title: "Data Protection", desc: "GDPR and FERPA compliant. Student data is never sold or shared. Automatic data purging policies ensure privacy.", tag: "Privacy" },
    { icon: Key, title: "Access Control", desc: "Role-based access control (RBAC) with multi-factor authentication. Granular permissions for all roles.", tag: "Identity" },
  ];
  return (
    <Section id="security" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0F172A] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <SectionBadge icon={Shield} text="Enterprise Security" />
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
              Enterprise-Grade <span className="gradient-text">Security</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 leading-relaxed mb-8">
              We take security seriously. Super-Control is built from the ground up with privacy and security as core principles — not afterthoughts.
            </motion.p>
            <div className="space-y-3">
              {secFeatures.map((f, i) => (
                <motion.div key={f.title} variants={fadeUp} custom={i}
                  className="flex gap-4 p-4 glass border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/15 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <f.icon size={17} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{f.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{f.tag}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Right: animated shield */}
          <motion.div variants={fadeUp} className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Rotating rings */}
              {[0,1,2].map(i=>(
                <motion.div key={i} animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-blue-600/15"
                  style={{ inset: `${i * 20}px` }} />
              ))}
              {/* Center shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-2xl"
                  style={{ boxShadow: "0 0 80px rgba(37,99,235,0.4), 0 0 160px rgba(37,99,235,0.15)" }}>
                  <Shield size={60} className="text-white" />
                </motion.div>
              </div>
              {/* Orbiting icons */}
              {[Lock, Server, Database, Key, Eye, CheckCircle].map((Ic, i) => {
                const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                const r = 46;
                return (
                  <motion.div key={i} animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center"
                    style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%`, transform: "translate(-50%,-50%)" }}>
                    <Ic size={15} className="text-blue-400" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  { name: "Dr. Sarah Chen", role: "CS Department Head", org: "Stanford University", av: "SC", rating: 5, quote: "Super-Control has completely transformed how I manage our 200-seat computer lab. The AI alerts catch problems before they escalate, and the real-time monitoring gives me peace of mind during exams." },
  { name: "Prof. James Okafor", role: "IT Director", org: "MIT OpenCourseWare", av: "JO", rating: 5, quote: "We evaluated five different classroom management tools. Super-Control won on every metric — UI design, AI capabilities, security, and support. It's simply in a class of its own." },
  { name: "Maria Rodriguez", role: "Senior Teacher", org: "Texas K-12 District", av: "MR", rating: 5, quote: "My students used to be on YouTube within minutes of class starting. With Super-Control, I can see everything instantly. Student focus improved by 60% in the first week alone." },
  { name: "Dr. Ahmed Hassan", role: "Dean of Technology", org: "Cairo Technology Institute", av: "AH", rating: 5, quote: "The reporting features alone justify the cost. I can now present detailed classroom analytics to our board every month. Incredible product with outstanding support." },
  { name: "Lisa Park", role: "Lab Coordinator", org: "Seoul National University", av: "LP", rating: 5, quote: "Setup took under 10 minutes for 50 workstations. The automatic agent deployment is a dream for IT teams. Support has been exceptional throughout our onboarding." },
  { name: "Tom Brennan", role: "Instructor", org: "Dublin Coding Bootcamp", av: "TB", rating: 5, quote: "We run intensive coding bootcamps with 40+ students per session. Super-Control lets me ensure everyone is on task and gets help exactly when they need it." },
];

function TestimonialsSection() {
  return (
    <Section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionBadge icon={Star} text="Testimonials" />
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Loved by <span className="gradient-text">Educators Worldwide</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400">
            Join thousands of teachers and institutions already using Super-Control.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i} whileHover={{ y: -5 }}
              className="glass border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-sm font-black text-white">
                  {t.av}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role} · {t.org}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────
const plans = [
  { name: "Starter", price: "$29", period: "/mo", desc: "Perfect for small classrooms and individual teachers.", badge: null, highlight: false,
    features: ["Up to 30 student devices","Real-time monitoring","Screen capture","Basic messaging","Email reports","Community support"] },
  { name: "Professional", price: "$79", period: "/mo", desc: "For schools and training centers that need more power.", badge: "Most Popular", highlight: true,
    features: ["Up to 150 student devices","Everything in Starter","AI-powered detection","Advanced analytics","Remote assistance","Priority support","Custom branding","API access"] },
  { name: "Enterprise", price: "Custom", period: "", desc: "For universities and large institutions at scale.", badge: null, highlight: false,
    features: ["Unlimited student devices","Everything in Professional","On-premise deployment","SSO / LDAP integration","Advanced security controls","SLA guarantee","Dedicated account manager","Custom integrations"] },
];

function PricingSection() {
  return (
    <Section id="pricing" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/25 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionBadge icon={Zap} text="Pricing" />
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Start with a free 30-day trial on any plan.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((p, i) => (
            <motion.div key={p.name} variants={fadeUp} custom={i} whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${p.highlight
                ? "bg-gradient-to-b from-blue-600/15 to-blue-600/5 border-2 border-blue-500/50 shadow-2xl shadow-blue-600/15"
                : "glass border border-white/5 hover:border-white/10"}`}>
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-lg">{p.badge}</span>
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-black text-white mb-1">{p.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <span className="text-slate-400 pb-1">{p.period}</span>
                </div>
                <p className="text-sm text-slate-400">{p.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className={p.highlight ? "text-cyan-400 shrink-0" : "text-emerald-500 shrink-0"} />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                id={`pricing-${p.name.toLowerCase()}`}
                className={`block w-full text-center py-3 rounded-xl font-bold transition-all duration-300 ${p.highlight
                  ? "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                  : "glass border border-white/10 text-white hover:border-white/20"}`}>
                {p.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </motion.a>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="text-center text-xs text-slate-500 mt-8">
          All plans include 30-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </Section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
const faqs = [
  { q: "How does the real-time monitoring work?", a: "Super-Control's lightweight agent runs on each student workstation and securely streams activity data to the teacher dashboard. The teacher can view live screen thumbnails, track application usage, and monitor browser activity — all in real time with sub-second latency." },
  { q: "Is all data encrypted and private?", a: "Absolutely. All data transmitted between student devices and the teacher dashboard uses AES-256 encryption. Student data is never stored on external servers (unless you choose cloud deployment), and we are fully GDPR and FERPA compliant." },
  { q: "Can Super-Control scale to large classrooms?", a: "Yes. Super-Control is designed to scale from a small 10-device classroom to university computer labs with 500+ concurrent connections. Our Enterprise plan supports unlimited devices across multiple buildings and campuses." },
  { q: "Does it support remote learning?", a: "Yes. Super-Control supports both local network monitoring (for physical computer labs) and secure remote monitoring over the internet. Students can be supervised whether they are on campus or studying from home." },
  { q: "What operating systems does the student agent support?", a: "The Super-Control student agent supports Windows 10/11, macOS 12+, and popular Linux distributions (Ubuntu, Fedora, Debian). Chromebook support is coming in Q3 2025." },
  { q: "How long does installation take?", a: "The student agent can be installed manually in under 2 minutes, or deployed silently across all workstations using Group Policy (Windows), MDM solutions, or our automated deployment scripts. Most schools are fully set up in under an hour." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <SectionBadge icon={HelpCircle} text="FAQ" />
        <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-slate-400">Everything you need to know about Super-Control.</motion.p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <motion.div key={i} variants={fadeUp} custom={i}
            className={`glass border rounded-xl overflow-hidden transition-all duration-300 ${open === i ? "border-blue-500/30" : "border-white/5 hover:border-white/10"}`}>
            <button onClick={() => setOpen(open === i ? null : i)} id={`faq-item-${i}`}
              className="w-full flex items-center justify-between px-6 py-4 text-left gap-4">
              <span className="text-sm font-bold text-white">{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                <ChevronDown size={17} className="text-slate-400" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <Section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} className="relative glass border border-white/8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/15 via-transparent to-[#06B6D4]/10 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative px-6 sm:px-12 py-20 text-center">
          <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-semibold text-slate-300">Join 500+ Institutions Today</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Elevate Your <span className="gradient-text">Classroom Experience</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Transform the way you manage your computer lab. Start your free 30-day trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#" whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(37,99,235,0.55)" }} whileTap={{ scale: 0.97 }}
              id="cta-schedule-demo"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-lg shadow-blue-600/30 transition-all duration-300">
              Schedule Demo <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a href="mailto:sales@super-control.io" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              id="cta-contact-sales"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white glass border border-white/15 hover:border-white/25 transition-all duration-300">
              Contact Sales
            </motion.a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            {["30-day free trial", "No credit card required", "Setup in minutes", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5"><CheckCircle size={13} className="text-emerald-500" />{item}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-[#0F172A] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <DemoSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SecuritySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
