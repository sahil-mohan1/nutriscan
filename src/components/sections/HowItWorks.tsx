"use client";

import { motion } from "framer-motion";
import { ClipboardList, Brain, FileBarChart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Log Your Meals",
    description:
      "Type what you ate or pick from popular Indian meals. No calorie counting — just natural language.",
    color: "var(--primary)",
    bg: "#EFF6FF",
    highlight: "#2563EB",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Scans for Gaps",
    description:
      "Our nutritional AI cross-references your meal log against recommended daily intake values, detecting hidden deficiencies.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    highlight: "#7C3AED",
  },
  {
    icon: FileBarChart,
    number: "03",
    title: "Get Your Report",
    description:
      "Receive a personalized wellness report with actionable insights, food swaps, and a nutrient score breakdown.",
    color: "var(--accent)",
    bg: "#ECFDF5",
    highlight: "#10B981",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, var(--bg) 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(37,99,235,0.08)",
              color: "var(--primary)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            ⚡ Simple & Fast
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            From meal log to{" "}
            <span className="gradient-text">wellness report</span> in 3 steps
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            No complicated setup. No subscriptions. Just tell us what you ate.
          </p>
        </motion.div>

        {/* Steps with connector */}
        <div className="relative">
          {/* Dashed connector — hidden on mobile, visible md+ */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6">
            <svg
              width="100%"
              height="2"
              viewBox="0 0 800 2"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <line
                x1="120"
                y1="1"
                x2="680"
                y2="1"
                stroke="#2563EB"
                strokeWidth="2"
                strokeDasharray="10 8"
                strokeOpacity="0.35"
                className="animated-dash"
              />
              {/* Arrow */}
              <circle cx="390" cy="1" r="4" fill="#2563EB" opacity="0.4" />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                  className="relative bg-white rounded-2xl p-8 card-shadow text-center group hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Step number */}
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                    style={{ background: step.highlight }}
                  >
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 mt-2"
                    style={{ background: step.bg }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>

                  <div
                    className="text-xs font-bold tracking-widest mb-2 uppercase"
                    style={{ color: step.color }}
                  >
                    Step {step.number}
                  </div>

                  <h3
                    className="text-lg font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: step.highlight }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
