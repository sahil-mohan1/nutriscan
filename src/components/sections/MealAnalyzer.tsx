"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ChevronRight, Info } from "lucide-react";

// ─── Meal Database ──────────────────────────────────────────────────────────
type MealResult = {
  score: number;
  nutrients: { name: string; pct: number; color: string; ideal: number }[];
  insights: { label: string; type: "good" | "warn" | "tip" }[];
  calories: number;
  summary: string;
};

const mealDB: Record<string, MealResult> = {
  idli: {
    score: 72,
    calories: 320,
    summary: "Light, easily digestible, and low in fat. Good for breakfast but protein-light.",
    nutrients: [
      { name: "Protein", pct: 38, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 74, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 28, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 44, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Low glycemic index", type: "good" },
      { label: "⚠️ Low in protein — add sambar or chutney", type: "warn" },
      { label: "💡 Pair with eggs for a complete amino profile", type: "tip" },
    ],
  },
  "rice & dal": {
    score: 68,
    calories: 480,
    summary: "A staple combination. Dal brings protein but refined rice spikes glucose fast.",
    nutrients: [
      { name: "Protein", pct: 54, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 88, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 32, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 38, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Good plant-based protein combo", type: "good" },
      { label: "⚠️ High glycemic load — consider brown rice", type: "warn" },
      { label: "💡 Add a vegetable side for micronutrients", type: "tip" },
    ],
  },
  dosa: {
    score: 65,
    calories: 350,
    summary: "Fermented batter makes dosa probiotic-rich, but the oil can add up fast.",
    nutrients: [
      { name: "Protein", pct: 32, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 70, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 22, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 30, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Fermented — great for gut health", type: "good" },
      { label: "⚠️ Low in fiber and protein", type: "warn" },
      { label: "💡 Choose Pesarattu (moong dosa) for more protein", type: "tip" },
    ],
  },
  salad: {
    score: 88,
    calories: 180,
    summary: "Excellent micronutrient density. The star meal for fiber and vitamins.",
    nutrients: [
      { name: "Protein", pct: 42, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 38, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 92, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 96, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ High fiber — excellent for gut health", type: "good" },
      { label: "✅ Rich in vitamins C, K, and folate", type: "good" },
      { label: "💡 Add chickpeas or paneer for protein boost", type: "tip" },
    ],
  },
  "chicken curry": {
    score: 79,
    calories: 420,
    summary: "High-protein meal with rich spices. Watch the saturated fat from coconut-based gravies.",
    nutrients: [
      { name: "Protein", pct: 84, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 28, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 18, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 52, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Excellent protein source", type: "good" },
      { label: "✅ Anti-inflammatory spices (turmeric, ginger)", type: "good" },
      { label: "⚠️ Low in fiber — add a vegetable side", type: "warn" },
    ],
  },
  default: {
    score: 60,
    calories: 380,
    summary: "Custom meal detected. We've estimated based on typical Indian meal composition.",
    nutrients: [
      { name: "Protein", pct: 45, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 62, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 35, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 48, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "💡 Log more details for precise analysis", type: "tip" },
      { label: "⚠️ Balanced but room for improvement", type: "warn" },
      { label: "✅ Within safe nutritional range", type: "good" },
    ],
  },
  poha: {
    score: 82,
    calories: 220,
    summary: "A popular and light breakfast. Flattened rice provides carbs, peanuts add healthy fats.",
    nutrients: [
      { name: "Protein", pct: 25, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 60, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 30, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 65, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Easy to digest and light", type: "good" },
      { label: "✅ Peanuts add good fats and crunch", type: "good" },
      { label: "⚠️ Low in protein — add eggs or sprouts", type: "warn" },
    ],
  },
  "chole bhature": {
    score: 55,
    calories: 620,
    summary: "Delicious but heavy. High in calories and saturated fats from deep frying.",
    nutrients: [
      { name: "Protein", pct: 35, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 90, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 40, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 25, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Good protein and fiber from chickpeas", type: "good" },
      { label: "⚠️ Very high calorie and fat content", type: "warn" },
      { label: "💡 Eat in moderation or choose baked bhature", type: "tip" },
    ],
  },
  "paneer tikka": {
    score: 85,
    calories: 320,
    summary: "A fantastic high-protein, low-carb vegetarian option.",
    nutrients: [
      { name: "Protein", pct: 65, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 15, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 10, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 45, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Excellent vegetarian protein source", type: "good" },
      { label: "✅ Low carb and keto-friendly", type: "good" },
      { label: "💡 Pair with mint chutney for digestion", type: "tip" },
    ],
  },
  biryani: {
    score: 62,
    calories: 550,
    summary: "Rich in flavor and spices. Good energy source but often high in fats and simple carbs.",
    nutrients: [
      { name: "Protein", pct: 45, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 75, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 20, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 35, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ High in energy and satiety", type: "good" },
      { label: "⚠️ High in saturated fats", type: "warn" },
      { label: "💡 Choose brown rice biryani for more fiber", type: "tip" },
    ],
  },
  "rajma chawal": {
    score: 78,
    calories: 420,
    summary: "A classic balanced meal. Legumes provide excellent plant-based protein and fiber.",
    nutrients: [
      { name: "Protein", pct: 55, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 65, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 60, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 40, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Complete protein profile with rice + beans", type: "good" },
      { label: "✅ High in dietary fiber", type: "good" },
      { label: "💡 Add a squeeze of lemon for better iron absorption", type: "tip" },
    ],
  },
  "masala paratha": {
    score: 58,
    calories: 280,
    summary: "Filling and tasty, but primarily a source of carbohydrates and fats.",
    nutrients: [
      { name: "Protein", pct: 20, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 70, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 15, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 20, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "✅ Quick energy source", type: "good" },
      { label: "⚠️ Low in micronutrients", type: "warn" },
      { label: "💡 Use multi-grain flour for a health boost", type: "tip" },
    ],
  },
  samosa: {
    score: 42,
    calories: 250,
    summary: "Deep-fried snack high in refined flour and fats. Best enjoyed occasionally.",
    nutrients: [
      { name: "Protein", pct: 10, color: "#2563EB", ideal: 100 },
      { name: "Carbs", pct: 85, color: "#F59E0B", ideal: 100 },
      { name: "Fiber", pct: 5, color: "#10B981", ideal: 100 },
      { name: "Vitamins", pct: 10, color: "#7C3AED", ideal: 100 },
    ],
    insights: [
      { label: "❌ Deep fried - high in trans fats", type: "warn" },
      { label: "⚠️ High in refined carbohydrates", type: "warn" },
      { label: "💡 Try air-fried or baked versions", type: "tip" },
    ],
  },
};

const CHIPS = ["Idli", "Rice & Dal", "Poha", "Dosa", "Chole Bhature", "Salad", "Paneer Tikka", "Biryani", "Rajma Chawal", "Masala Paratha", "Samosa", "Chicken Curry"];

// ─── SVG Arc Gauge ──────────────────────────────────────────────────────────
function NutritionGauge({ score }: { score: number }) {
  const radius = 80;
  const stroke = 12;
  const normalizedR = radius - stroke / 2;
  const circumference = Math.PI * normalizedR; // half circle
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) =>
    s >= 80 ? "#10B981" : s >= 60 ? "#F59E0B" : "#EF4444";

  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 110 }}>
        <svg
          width="200"
          height="110"
          viewBox="-10 0 220 110"
          style={{ overflow: "visible" }}
        >
          {/* Track */}
          <path
            d={`M 10,100 A ${normalizedR},${normalizedR} 0 0,1 190,100`}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.path
            d={`M 10,100 A ${normalizedR},${normalizedR} 0 0,1 190,100`}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {/* Score text */}
          <text x="100" y="95" textAnchor="middle" fontSize="32" fontWeight="800" fill={color}>
            {score}
          </text>
          <text x="100" y="112" textAnchor="middle" fontSize="12" fill="#64748B">
            / 100
          </text>
        </svg>
      </div>
      <div
        className="text-sm font-bold mt-1 px-3 py-1 rounded-full"
        style={{ color, background: `${color}18` }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Nutrient Bar ───────────────────────────────────────────────────────────
function NutrientBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {pct}% <span className="text-gray-400 font-normal text-xs">of daily reco.</span>
        </span>
      </div>
      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function MealAnalyzer() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MealResult | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const performAnalysis = (meals: string[]) => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      if (meals.length === 0) {
        setLoading(false);
        return;
      }

      // Combine multiple meals
      let totalScore = 0;
      let totalCalories = 0;
      const combinedNutrients: Record<string, { pct: number; color: string }> = {};
      const combinedInsights: { label: string; type: "good" | "warn" | "tip" }[] = [];
      const summaries: string[] = [];

      meals.forEach((mealName) => {
        const key = mealName.toLowerCase().trim();
        const found = Object.entries(mealDB).find(([k]) => key.includes(k));
        const data = found ? found[1] : mealDB.default;

        totalScore += data.score;
        totalCalories += data.calories;
        summaries.push(data.summary);
        
        data.nutrients.forEach(n => {
          if (!combinedNutrients[n.name]) {
            combinedNutrients[n.name] = { pct: 0, color: n.color };
          }
          combinedNutrients[n.name].pct += n.pct;
        });

        // Take unique insights
        data.insights.forEach(ins => {
          if (!combinedInsights.find(ci => ci.label === ins.label)) {
            combinedInsights.push(ins);
          }
        });
      });

      const count = meals.length;
      setResult({
        score: Math.round(totalScore / count),
        calories: totalCalories,
        summary: meals.length > 1 
          ? `Combined analysis of ${meals.join(" + ")}. This meal combo provides higher satiety but watch total caloric intake.`
          : summaries[0],
        nutrients: Object.entries(combinedNutrients).map(([name, val]) => ({
          name,
          pct: Math.min(100, Math.round(val.pct / count)), // Average the percentage for the meal combo
          color: val.color,
          ideal: 100
        })),
        insights: combinedInsights.slice(0, 6) // Max 6 insights for UI
      });

      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }, 1200);
  };

  const toggleMeal = (meal: string) => {
    setSelectedMeals(prev => {
      const next = prev.includes(meal) 
        ? prev.filter(m => m !== meal)
        : [...prev, meal];
      
      if (next.length > 0) {
        performAnalysis(next);
      } else {
        setResult(null);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSelectedMeals([input]);
    performAnalysis([input]);
  };

  return (
    <section
      id="analyzer"
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 100%)" }}
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
              background: "rgba(37,99,235,0.09)",
              color: "var(--primary)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            🧬 Live Analyzer
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Combine your{" "}
            <span className="gradient-text">meals</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Select multiple items to see how they work together, or type a custom meal.
          </p>
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 card-shadow-lg"
        >
          {/* Text input */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="meal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a custom meal…"
                className="w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:bg-white transition-all"
                style={{ "--tw-ring-color": "rgba(37,99,235,0.3)" } as React.CSSProperties}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3.5 text-sm font-semibold text-white rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
            >
              <Sparkles className="w-4 h-4" />
              Analyze
            </button>
          </form>

          {/* Quick-pick chips */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-gray-400 font-medium">Select one or more:</p>
              {selectedMeals.length > 0 && (
                <button 
                  onClick={() => { setSelectedMeals([]); setResult(null); setInput(""); }}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => {
                const isActive = selectedMeals.includes(chip);
                return (
                  <button
                    key={chip}
                    id={`chip-${chip.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => toggleMeal(chip)}
                    disabled={loading}
                    className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 ${
                      isActive
                        ? "text-white border-transparent"
                        : "text-gray-600 bg-gray-50 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                    style={
                      isActive
                        ? { background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }
                        : {}
                    }
                  >
                    {isActive && <span className="mr-1.5">✓</span>}
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading state */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="flex flex-col items-center py-8 gap-4">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full border-4 border-blue-100"
                      style={{ borderTopColor: "var(--primary)" }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{ borderTopColor: "var(--primary)" }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-xl">🧬</div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Calculating synergy…</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Combining ${selectedMeals.length} selected items
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="border-t border-gray-100 pt-8">
                  {/* Result header */}
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        Combined Report
                        <span className="ml-2 text-sm font-medium text-gray-400">
                          — {selectedMeals.length} items
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        {result.summary}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-2xl font-extrabold" style={{ color: "var(--primary)" }}>
                        {result.calories}
                      </div>
                      <div className="text-xs text-gray-400">Total kcal</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left — Gauge */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-sm font-semibold text-gray-600 text-center">
                        Combo Nutrition Score
                      </p>
                      <NutritionGauge score={result.score} />

                      {/* Calorie label */}
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                        style={{ background: "#F0F9FF", color: "#0EA5E9" }}
                      >
                        <span className="font-semibold">{result.calories} kcal</span>
                        <span className="text-xs text-gray-400">Total for full combo</span>
                      </div>
                    </div>

                    {/* Right — Progress bars */}
                    <div className="space-y-5">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold text-gray-600">Avg Nutrient Density</p>
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      {result.nutrients.map((n) => (
                        <NutrientBar key={n.name} {...n} />
                      ))}
                    </div>
                  </div>

                  {/* Insight pills */}
                  <div className="mt-8">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Combined Insights</p>
                    <div className="flex flex-wrap gap-2">
                      {result.insights.map((pill) => (
                        <span
                          key={pill.label}
                          className="px-3 py-1.5 text-xs font-medium rounded-xl"
                          style={{
                            background:
                              pill.type === "good"
                                ? "#ECFDF5"
                                : pill.type === "warn"
                                ? "#FFFBEB"
                                : "#EFF6FF",
                            color:
                              pill.type === "good"
                                ? "#059669"
                                : pill.type === "warn"
                                ? "#D97706"
                                : "#2563EB",
                            border: `1px solid ${
                              pill.type === "good"
                                ? "#A7F3D0"
                                : pill.type === "warn"
                                ? "#FDE68A"
                                : "#BFDBFE"
                            }`,
                          }}
                        >
                          {pill.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 p-4 rounded-2xl flex items-center gap-3" style={{ background: "#EFF6FF" }}>
                    <Sparkles className="w-5 h-5 shrink-0" style={{ color: "var(--primary)" }} />
                    <p className="text-sm text-gray-700 flex-1">
                      <strong>Perfect your combo?</strong> Let AI refine your portion sizes for optimal macros.
                    </p>
                    <button
                      onClick={() => document.querySelector("#recommendations")?.scrollIntoView({ behavior: "smooth" })}
                      className="shrink-0 flex items-center gap-1 text-sm font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      Refine Portions <ChevronRight className="w-4 h-4" />
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

