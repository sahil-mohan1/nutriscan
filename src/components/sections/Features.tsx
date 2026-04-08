"use client";

import { motion } from "framer-motion";
import {
  Heart, Brain, Zap, Shield, TrendingUp, Clock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Gap Detection",
    desc: "Our model analyzes 40+ micronutrients and cross-references them against ICMR daily recommendations.",
    color: "var(--primary)",
    bg: "#EFF6FF",
  },
  {
    icon: Heart,
    title: "Personalized Wellness Reports",
    desc: "Every report is unique — tailored to your age, weight, activity level, and dietary preferences.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: TrendingUp,
    title: "Weekly Progress Tracking",
    desc: "Visualize your nutritional journey over time with interactive charts and trend analysis.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Zap,
    title: "Instant Meal Recognition",
    desc: "Type naturally — 'had idli sambar for breakfast' — and our AI understands it instantly.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Shield,
    title: "Indian Diet Database",
    desc: "Built with 5000+ Indian dishes, regional cuisines, and homestyle recipes already mapped.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: Clock,
    title: "60-Second Analysis",
    desc: "No waiting. No complex forms. Get your complete nutritional breakdown in under a minute.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-pad" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(16,185,129,0.09)",
              color: "var(--accent)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            ✨ Built Different
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Everything you need to{" "}
            <span className="gradient-text-green">eat with intention</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            NutriScan is designed from the ground up for the Indian palate and lifestyle.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 card-shadow group cursor-pointer
                           hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5
                             group-hover:scale-110 transition-transform duration-300"
                  style={{ background: f.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: f.color }} />
                </div>

                <h3
                  className="text-base font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {f.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>

                {/* Hover indicator */}
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: f.color }}
                >
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
