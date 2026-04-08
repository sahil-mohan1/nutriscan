"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";
import { TrendingUp, Award } from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────────────────────
const weeklyCalories = [
  { day: "Mon", calories: 1850, target: 2000 },
  { day: "Tue", calories: 2120, target: 2000 },
  { day: "Wed", calories: 1640, target: 2000 },
  { day: "Thu", calories: 1980, target: 2000 },
  { day: "Fri", calories: 2250, target: 2000 },
  { day: "Sat", calories: 1720, target: 2000 },
  { day: "Sun", calories: 1900, target: 2000 },
];

const nutrientRadar = [
  { nutrient: "Protein", current: 55, ideal: 100 },
  { nutrient: "Fiber", current: 42, ideal: 100 },
  { nutrient: "Iron", current: 68, ideal: 100 },
  { nutrient: "Calcium", current: 38, ideal: 100 },
  { nutrient: "Vitamins", current: 72, ideal: 100 },
  { nutrient: "Omega-3", current: 30, ideal: 100 },
];

// ─── Custom Tooltip ─────────────────────────────────────────────────────────
const CalorieTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white rounded-xl px-4 py-3 text-sm"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          border: "1px solid #E2E8F0",
        }}
      >
        <p className="font-bold text-gray-800 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.name === "calories" ? "#2563EB" : "#CBD5E1" }}>
            {p.name === "calories" ? "🍽 Eaten: " : "🎯 Target: "}
            <strong>{p.value.toLocaleString()}</strong> kcal
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RadarTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white rounded-xl px-3 py-2 text-sm"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.1)", border: "1px solid #E2E8F0" }}
      >
        <p className="font-semibold text-gray-700">{payload[0]?.value}% of daily need</p>
      </div>
    );
  }
  return null;
};

// ─── Dashboard Component ─────────────────────────────────────────────────────
export default function Dashboard() {
  const avg =
    Math.round(weeklyCalories.reduce((s, d) => s + d.calories, 0) / weeklyCalories.length);

  return (
    <section
      id="dashboard"
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 100%)" }}
    >
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
              background: "rgba(37,99,235,0.09)",
              color: "var(--primary)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            📊 Weekly Overview
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Your nutrition{" "}
            <span className="gradient-text">at a glance</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Track weekly calorie intake vs target and see your overall nutrient balance — all in one view.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Avg Daily Calories", value: `${avg.toLocaleString()} kcal`, icon: "🔥", color: "#F59E0B" },
            { label: "Best Day", value: "Sat +12%", icon: "🏆", color: "#10B981" },
            { label: "Protein Score", value: "55%", icon: "💪", color: "#2563EB" },
            { label: "Fiber Score", value: "42%", icon: "🌿", color: "#7C3AED" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 card-shadow flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-400 truncate">{s.label}</div>
                <div className="text-sm font-bold text-gray-900 truncate">{s.value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Charts grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* BarChart */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Weekly Calorie Intake
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">vs 2000 kcal daily target</p>
              </div>
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: "#ECFDF5", color: "#059669" }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                On Track
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyCalories} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  domain={[0, 2500]}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip content={<CalorieTooltip />} cursor={{ fill: "#F8FAFC" }} />
                <Bar dataKey="target" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="target" />
                <Bar
                  dataKey="calories"
                  radius={[6, 6, 0, 0]}
                  name="calories"
                  fill="url(#blueGrad)"
                />
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* RadarChart */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Nutrient Balance Radar
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">% of daily recommended intake</p>
              </div>
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: "#FFFBEB", color: "#D97706" }}
              >
                <Award className="w-3.5 h-3.5" />
                Proteins low
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={nutrientRadar} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#F1F5F9" />
                <PolarAngleAxis
                  dataKey="nutrient"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                />
                <Radar
                  name="Ideal"
                  dataKey="ideal"
                  stroke="#E2E8F0"
                  fill="#F8FAFC"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Your intake"
                  dataKey="current"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.25}
                />
                <Tooltip content={<RadarTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span style={{ fontSize: 12, color: "#64748B" }}>{value}</span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
