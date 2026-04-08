"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Leaf } from "lucide-react";

export default function CTAFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="cta"
      style={{ background: "var(--navy)" }}
      className="relative overflow-hidden"
    >
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }}
      />

      {/* CTA Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Badge */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(16,185,129,0.12)",
              color: "#34D399",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            🚀 Free during Hackathon Beta
          </span>

          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Start eating with{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              intention.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10">
            Join thousands building healthier habits — one meal at a time. Get early
            access to your personalized nutrition dashboard.
          </p>

          {/* Email form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="cta-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-2xl transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-lg"
            >
              <span>✅</span> You&apos;re on the list! We&apos;ll reach out soon.
            </motion.div>
          )}

          <p className="mt-4 text-xs text-gray-600">
            No spam ever · Unsubscribe anytime
          </p>
        </motion.div>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {["🧬 AI Analysis", "📊 Weekly Reports", "🌿 5000+ Indian Dishes", "⚡ 60s Scan", "🔒 Privacy First"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="border-t px-4 sm:px-6 py-8"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-extrabold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              NutriScan
            </span>
          </div>

          {/* Hackathon credit */}
          <div className="text-xs text-gray-600 text-center">
            Made with 💙 for the{" "}
            <span className="text-gray-400 font-semibold">Debug Your Diet Hackathon</span>
            {" "}· © 2025 NutriScan
          </div>

        </div>
      </div>
    </section>
  );
}
