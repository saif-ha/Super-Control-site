"use client";

import { motion } from "framer-motion";
import { MonitorPlay, Globe, Link2, GitBranch, PlayCircle, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#security" },
    { label: "Roadmap", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Solutions: [
    { label: "Universities", href: "#" },
    { label: "K-12 Schools", href: "#" },
    { label: "Training Centers", href: "#" },
    { label: "Remote Learning", href: "#" },
    { label: "Enterprise", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Support", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Twitter / X" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: GitBranch, href: "#", label: "GitHub" },
  { icon: PlayCircle, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060D1A] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                <MonitorPlay size={17} className="text-white" />
              </div>
              <span className="text-[17px] font-bold">
                <span className="text-white">Super</span>
                <span className="text-[#06B6D4]">Control</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              AI-powered classroom management platform that helps educators supervise and guide students in real time.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Mail size={13} className="text-[#06B6D4]" />
              <a href="mailto:hello@super-control.io" className="hover:text-white transition-colors">
                hello@super-control.io
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2025 Super-Control, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
