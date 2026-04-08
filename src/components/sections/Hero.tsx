"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, BarChart2, Zap } from "lucide-react";

// Dynamic import for Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Inline health/nutrition lottie animation data (lightweight pulse animation)
const healthLottieUrl =
  "https://assets5.lottiefiles.com/packages/lf20_5njp3vgg.json";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #F8FAFC 40%, #ECFDF5 100%)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "rgba(37,99,235,0.08)",
                color: "var(--primary)",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              <Zap className="w-3 h-3" />
              AI-Powered Nutrition Analysis
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Know exactly{" "}
              <span className="gradient-text">what your body</span>{" "}
              is missing.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg"
            >
              Log your meals, let our AI scan for nutritional gaps, and unlock a
              personalized wellness report — all in under 60 seconds. Built for
              the real Indian diet.
            </motion.p>

            {/* Stats row */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-6"
            >
              {[
                { num: "68%", label: "Indians protein deficient" },
                { num: "50K+", label: "Meals analyzed" },
                { num: "98%", label: "Accuracy score" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl font-extrabold"
                    style={{ color: "var(--primary)", fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  document.querySelector("#analyzer")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  boxShadow: "0 8px 30px rgba(37,99,235,0.35)",
                }}
              >
                Analyze My Meals
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-7 py-3.5 font-semibold rounded-2xl border-2 transition-all duration-200 hover:bg-blue-50"
                style={{
                  color: "var(--primary)",
                  borderColor: "rgba(37,99,235,0.35)",
                }}
              >
                <BarChart2 className="w-4 h-4" />
                View Dashboard
              </button>
            </motion.div>
          </div>

          {/* Right — Lottie animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-md"
              style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: "2rem",
                padding: "2rem",
                border: "1px solid rgba(37,99,235,0.12)",
                boxShadow: "0 20px 60px rgba(37,99,235,0.12), 0 4px 6px rgba(0,0,0,0.05)",
              }}
            >
              {/* Lottie or fallback nutrition illustration */}
              <LottieOrFallback url={healthLottieUrl} />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--accent)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Scanning...
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--primary)", border: "1px solid rgba(37,99,235,0.2)" }}
              >
                🎯 Score: 84/100
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-gray-400">scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-4 rounded-full"
          style={{ background: "var(--primary)", opacity: 0.4 }}
        />
      </motion.div>
    </section>
  );
}

function LottieOrFallback({ url }: { url: string }) {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Nutrition visualization fallback (always shown as primary) */}
      <NutritionIllustration />
    </div>
  );
}

function NutritionIllustration() {
  const items = [
    { emoji: "🥗", label: "Fiber", pct: 78, color: "#10B981" },
    { emoji: "🥩", label: "Protein", pct: 45, color: "#2563EB" },
    { emoji: "🌾", label: "Carbs", pct: 82, color: "#F59E0B" },
    { emoji: "🫐", label: "Vitamins", pct: 61, color: "#8B5CF6" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🍱</div>
        <div className="text-sm font-semibold text-gray-500">Today&apos;s Nutrition Score</div>
        <div
          className="text-4xl font-extrabold mt-1"
          style={{ color: "var(--primary)", fontFamily: "var(--font-plus-jakarta)" }}
        >
          84<span className="text-xl text-gray-400">/100</span>
        </div>
      </div>
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              {item.emoji} {item.label}
            </span>
            <span className="text-sm font-semibold" style={{ color: item.color }}>
              {item.pct}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
