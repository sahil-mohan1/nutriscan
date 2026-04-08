"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    stat: "68%",
    label: "of Indians are protein deficient",
    detail:
      "Despite the diversity of Indian cuisine, most daily diets fall critically short on protein — especially in vegetarian households.",
    color: "var(--primary)",
    bg: "#EFF6FF",
  },
  {
    icon: TrendingDown,
    stat: "80%",
    label: "lack adequate dietary fiber",
    detail:
      "Low fiber intake is directly linked to rising rates of Type 2 diabetes and gut disorders across all age groups in India.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: AlertTriangle,
    stat: "1 in 3",
    label: "Indians are micronutrient deficient",
    detail:
      "Iron, Vitamin D, B12, and Calcium deficiencies affect hundreds of millions — silently impacting energy, immunity, and cognition.",
    color: "var(--warning)",
    bg: "#FFFBEB",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Problem() {
  return (
    <section id="problem" className="section-pad" style={{ background: "var(--bg)" }}>
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
              background: "rgba(239,68,68,0.08)",
              color: "var(--danger)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            🚨 The Silent Crisis
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            India&apos;s nutrition gap is{" "}
            <span style={{ color: "var(--danger)" }}>hiding in plain sight</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
            Millions eat three meals a day and still lack essential nutrients. The
            problem isn&apos;t hunger — it&apos;s ignorance about what&apos;s actually on the plate.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={cardVariants}
                className="relative bg-white rounded-2xl p-7 card-shadow overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                style={{
                  borderLeft: `4px solid ${s.color}`,
                }}
              >
                {/* Bg decoration */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-40 blur-2xl pointer-events-none"
                  style={{ background: s.bg }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: s.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>

                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ color: s.color, fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {s.stat}
                </div>

                <div className="text-base font-semibold text-gray-800 mb-3">{s.label}</div>

                <p className="text-sm text-gray-500 leading-relaxed">{s.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom insight bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-400">
            Sources: ICMR National Nutrition Monitoring Bureau · WHO South-East Asia Report 2023
          </p>
        </motion.div>
      </div>
    </section>
  );
}
