"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Zap } from "lucide-react";

const navLinks = [
  { href: "#problem", label: "Why It Matters" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#analyzer", label: "Meal Analyzer" },
  { href: "#bmi", label: "BMI Check" },
  { href: "#recommendations", label: "Meal Plans" },
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" onClick={() => handleNavClick("#hero")} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                <span style={{ color: "var(--primary)" }}>Nutri</span>
                <span className="text-gray-900">Scan</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#analyzer")}
                className="ml-3 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
              >
                <Zap className="w-3.5 h-3.5" />
                Try Free
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-extrabold text-lg" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    <span style={{ color: "var(--primary)" }}>Nutri</span>Scan
                  </span>
                  <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick("#analyzer")}
                    className="mt-4 w-full px-4 py-3 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
                  >
                    <Zap className="w-4 h-4" />
                    Try Free
                  </button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
