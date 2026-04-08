"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Activity, ChevronRight } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type BMICategory = {
  label: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
  tip: string;
  range: string;
};

// ─── Category Map ────────────────────────────────────────────────────────────
const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "#3B82F6",
      bg: "#EFF6FF",
      border: "#BFDBFE",
      emoji: "⚡",
      range: "< 18.5",
      tip: "Focus on calorie-dense, nutrient-rich foods like nuts, dairy, and whole grains to gain healthy weight.",
    };
  if (bmi < 25)
    return {
      label: "Healthy Weight",
      color: "#10B981",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      emoji: "✅",
      range: "18.5 – 24.9",
      tip: "Great job! Maintain your lifestyle with balanced Indian meals and 30 mins of daily activity.",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      color: "#F59E0B",
      bg: "#FFFBEB",
      border: "#FDE68A",
      emoji: "⚠️",
      range: "25 – 29.9",
      tip: "Reduce refined carbs (maida, white rice). Swap to millets, dal, and more vegetables.",
    };
  return {
    label: "Obese",
    color: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
    emoji: "🔴",
    range: "≥ 30",
    tip: "Consult a nutritionist. Focus on portion control, low-GI foods, and daily physical activity.",
  };
};

// ─── BMI Arc Gauge ────────────────────────────────────────────────────────────
function BMIGauge({ bmi, category }: { bmi: number; category: BMICategory }) {
  // Arc from 10 to 40 BMI mapped to 0-100%
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
  const radius = 80;
  const stroke = 14;
  const normalizedR = radius - stroke / 2;
  const circumference = Math.PI * normalizedR;
  const offset = circumference - (pct / 100) * circumference;

  // Gradient stops for the track: blue → green → yellow → red
  const trackSegments = [
    { color: "#3B82F6", pct: 28 },   // underweight 10-18.5
    { color: "#10B981", pct: 49 },   // healthy 18.5-25
    { color: "#F59E0B", pct: 67 },   // overweight 25-30
    { color: "#EF4444", pct: 100 },  // obese 30+
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 220, height: 125 }}>
        <svg width="220" height="125" viewBox="-10 0 240 120" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="bmiTrack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="28%" stopColor="#10B981" />
              <stop offset="67%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <path
            d={`M 10,100 A ${normalizedR},${normalizedR} 0 0,1 190,100`}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Colored value arc */}
          <motion.path
            d={`M 10,100 A ${normalizedR},${normalizedR} 0 0,1 190,100`}
            fill="none"
            stroke="url(#bmiTrack)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          {/* BMI number */}
          <text x="100" y="92" textAnchor="middle" fontSize="34" fontWeight="800" fill={category.color}>
            {bmi.toFixed(1)}
          </text>
          <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#94A3B8">
            kg/m²
          </text>
        </svg>
      </div>
      <div
        className="mt-1 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"
        style={{ color: category.color, background: category.bg, border: `1px solid ${category.border}` }}
      >
        <span>{category.emoji}</span>
        <span>{category.label}</span>
        <span className="text-xs font-normal opacity-70">({category.range})</span>
      </div>
    </div>
  );
}

// ─── Range Indicator ─────────────────────────────────────────────────────────
function RangeBar({ bmi }: { bmi: number }) {
  const zones = [
    { label: "Under", max: 18.5, color: "#3B82F6" },
    { label: "Healthy", max: 25, color: "#10B981" },
    { label: "Over", max: 30, color: "#F59E0B" },
    { label: "Obese", max: 40, color: "#EF4444" },
  ];
  const totalWidth = 40 - 10;
  const clampedBmi = Math.min(40, Math.max(10, bmi));
  const markerPct = ((clampedBmi - 10) / totalWidth) * 100;

  return (
    <div className="w-full mt-4">
      <div className="flex rounded-full overflow-hidden h-3 relative">
        {zones.map((z, i) => {
          const start = i === 0 ? 10 : zones[i - 1].max;
          const w = ((z.max - start) / totalWidth) * 100;
          return <div key={z.label} style={{ width: `${w}%`, background: z.color }} />;
        })}
        {/* Marker */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 shadow"
          style={{ left: `calc(${markerPct}% - 8px)`, borderColor: "#1E293B" }}
          initial={{ left: "0%" }}
          animate={{ left: `calc(${markerPct}% - 8px)` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-xs text-gray-400">
        {zones.map((z) => <span key={z.label}>{z.label}</span>)}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    setCalculating(true);
    setBmiResult(null);

    setTimeout(() => {
      let bmi: number;
      if (unit === "metric") {
        const hM = h / 100;
        bmi = w / (hM * hM);
      } else {
        // imperial: lbs / (inches)^2 * 703
        bmi = (w / (h * h)) * 703;
      }
      setBmiResult(Math.round(bmi * 10) / 10);
      setCalculating(false);
    }, 800);
  };

  const category = bmiResult !== null ? getBMICategory(bmiResult) : null;

  return (
    <section
      id="bmi"
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(16,185,129,0.09)",
              color: "var(--accent)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <Scale className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
            BMI Check
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Know your{" "}
            <span className="gradient-text-green">body baseline</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Calculate your BMI instantly and get personalized diet tips tailored for Indian lifestyle and body types.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 card-shadow-lg"
        >
          {/* Unit toggle */}
          <div className="flex gap-2 mb-6">
            <button
              id="unit-metric"
              onClick={() => { setUnit("metric"); setHeight(""); setWeight(""); setBmiResult(null); }}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                unit === "metric"
                  ? "text-white"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200"
              }`}
              style={unit === "metric" ? { background: "linear-gradient(135deg,#10B981,#059669)" } : {}}
            >
              Metric (cm / kg)
            </button>
            <button
              id="unit-imperial"
              onClick={() => { setUnit("imperial"); setHeight(""); setWeight(""); setBmiResult(null); }}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                unit === "imperial"
                  ? "text-white"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200"
              }`}
              style={unit === "imperial" ? { background: "linear-gradient(135deg,#10B981,#059669)" } : {}}
            >
              Imperial (in / lbs)
            </button>
          </div>

          {/* Inputs */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                id="bmi-height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 170" : "e.g. 67"}
                className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:bg-white transition-all"
                style={{ "--tw-ring-color": "rgba(16,185,129,0.3)" } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                id="bmi-weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 68" : "e.g. 150"}
                className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:bg-white transition-all"
                style={{ "--tw-ring-color": "rgba(16,185,129,0.3)" } as React.CSSProperties}
              />
            </div>
          </div>

          <button
            id="bmi-calculate-btn"
            onClick={calculate}
            disabled={!height || !weight || calculating}
            className="w-full py-3.5 text-sm font-semibold text-white rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
          >
            <Activity className="w-4 h-4" />
            {calculating ? "Calculating…" : "Calculate BMI"}
          </button>

          {/* Result */}
          <AnimatePresence>
            {bmiResult !== null && category && !calculating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 border-t border-gray-100 pt-8"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Gauge side */}
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-semibold text-gray-600">Your BMI Score</p>
                    <BMIGauge bmi={bmiResult} category={category} />
                    <RangeBar bmi={bmiResult} />
                  </div>

                  {/* Info side */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Your BMI", value: bmiResult.toFixed(1), unit: "kg/m²" },
                        { label: "Category", value: category.label, unit: category.range },
                        { label: "Ideal BMI", value: "18.5 – 24.9", unit: "Healthy Range" },
                        {
                          label: "Ideal Weight",
                          value: (() => {
                            if (unit === "metric") {
                              const h = parseFloat(height) / 100;
                              return `${(18.5 * h * h).toFixed(0)}–${(24.9 * h * h).toFixed(0)} kg`;
                            } else {
                              const h = parseFloat(height);
                              return `${((18.5 * h * h) / 703).toFixed(0)}–${((24.9 * h * h) / 703).toFixed(0)} lbs`;
                            }
                          })(),
                          unit: "for your height",
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="p-3 rounded-2xl"
                          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                        >
                          <p className="text-xs text-gray-400 mb-0.5">{stat.label}</p>
                          <p className="text-sm font-bold text-gray-800">{stat.value}</p>
                          <p className="text-xs text-gray-400">{stat.unit}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tip */}
                    <div
                      className="p-4 rounded-2xl text-sm leading-relaxed"
                      style={{ background: category.bg, border: `1px solid ${category.border}`, color: category.color }}
                    >
                      <p className="font-semibold mb-1">{category.emoji} Personalized Tip</p>
                      <p className="text-gray-600">{category.tip}</p>
                    </div>

                    <button
                      onClick={() =>
                        document.querySelector("#recommendations")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-2xl transition-all hover:scale-[1.02]"
                      style={{ background: category.bg, color: category.color, border: `1px solid ${category.border}` }}
                    >
                      See Food Recommendations <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
