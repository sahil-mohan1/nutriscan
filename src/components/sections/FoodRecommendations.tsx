"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Leaf, Flame, Target, ChevronRight, Star } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
type Goal = "lose" | "maintain" | "gain";
type Diet = "veg" | "nonveg" | "vegan";

type FoodItem = {
  name: string;
  cal: number;
  protein: number;
  serving: string;
  tags: string[];
  emoji: string;
  reason: string;
};

type MealPlan = {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
};

const foodDB: Record<Goal, Record<Diet, MealPlan>> = {
  lose: {
    veg: {
      breakfast: [
        { name: "Moong Dal Chilla", cal: 180, protein: 12, serving: "2 pieces", tags: ["High Protein", "Low GI"], emoji: "🫓", reason: "Fills you up with plant protein at low calories" },
        { name: "Oats Upma", cal: 160, protein: 7, serving: "1 bowl", tags: ["High Fiber", "Low Carb"], emoji: "🥣", reason: "Slow-digesting oats keep you full till lunch" },
        { name: "Besan Chilla + Mint Chutney", cal: 165, protein: 10, serving: "2 pieces", tags: ["Gluten-Free", "High Protein"], emoji: "🟡", reason: "Chickpea flour provides sustained energy without the sugar spike" },
      ],
      lunch: [
        { name: "Brown Rice + Rajma", cal: 350, protein: 18, serving: "1 plate", tags: ["Complete Protein", "High Fiber"], emoji: "🍛", reason: "Brown rice + legume combo = complete amino acids" },
        { name: "Jowar Roti + Dal", cal: 300, protein: 14, serving: "2 rotis + dal", tags: ["Millet", "Low GI"], emoji: "🫓", reason: "Jowar is a diabetes-friendly millet with low GI" },
        { name: "Bajra Khichdi + Raita", cal: 280, protein: 12, serving: "1 bowl + raita", tags: ["Millet", "Probiotic"], emoji: "🍲", reason: "Pearl millet is iron-rich and keeps blood sugar stable" },
      ],
      dinner: [
        { name: "Vegetable Soup + Salad", cal: 140, protein: 6, serving: "1 bowl + salad", tags: ["Low Cal", "Hydrating"], emoji: "🥗", reason: "Light on calories, heavy on micronutrients" },
        { name: "Palak Paneer (less oil)", cal: 220, protein: 16, serving: "1 bowl", tags: ["High Protein", "Iron-Rich"], emoji: "🥬", reason: "Spinach + paneer = iron & protein powerhouse" },
        { name: "Lauki Sabzi + 1 Roti", cal: 155, protein: 5, serving: "1 bowl + 1 roti", tags: ["Low Cal", "Digestive"], emoji: "🥒", reason: "Bottle gourd is 96% water — great for digestion and satiety" },
      ],
      snacks: [
        { name: "Roasted Chana", cal: 90, protein: 6, serving: "¼ cup", tags: ["Fiber-Rich", "Protein"], emoji: "🫘", reason: "Crunchy, filling, and blood-sugar friendly" },
        { name: "Fruit + Curd Bowl", cal: 120, protein: 5, serving: "1 bowl", tags: ["Probiotic", "Vitamin C"], emoji: "🍇", reason: "Probiotics + antioxidants = ideal midday snack" },
        { name: "Cucumber + Hummus", cal: 80, protein: 4, serving: "½ cup hummus + slices", tags: ["Low Cal", "Hydrating"], emoji: "🥒", reason: "Zero-fat crunch with chickpea protein to curb cravings" },
      ],
    },
    nonveg: {
      breakfast: [
        { name: "Egg White Omelette", cal: 130, protein: 18, serving: "3 egg whites", tags: ["High Protein", "Low Fat"], emoji: "🍳", reason: "Pure protein boost to kickstart your metabolism" },
        { name: "Chicken Poha", cal: 200, protein: 14, serving: "1 bowl", tags: ["Lean Protein", "Iron"], emoji: "🍚", reason: "Light, nutritious, and very Indian!" },
        { name: "Tuna Salad on Toast", cal: 175, protein: 20, serving: "1 slice toast + 80g tuna", tags: ["Omega-3", "Quick Meal"], emoji: "🥫", reason: "Canned tuna is a budget-friendly high-protein breakfast" },
      ],
      lunch: [
        { name: "Grilled Chicken + Roti", cal: 380, protein: 32, serving: "100g chicken + 2 rotis", tags: ["Lean Protein", "Balanced"], emoji: "🍗", reason: "High protein keeps you satiated without excess fat" },
        { name: "Fish Curry (light) + Rice", cal: 340, protein: 28, serving: "1 plate", tags: ["Omega-3", "Heart Health"], emoji: "🐟", reason: "Fatty fish = omega-3 rich low-calorie lunch" },
        { name: "Keema Stuffed Capsicum", cal: 310, protein: 26, serving: "2 capsicums", tags: ["Low Carb", "High Protein"], emoji: "🫑", reason: "Lean mince inside a low-carb veggie shell — flavourful and filling" },
      ],
      dinner: [
        { name: "Grilled Fish + Salad", cal: 220, protein: 26, serving: "120g fish + salad", tags: ["Low Carb", "Omega-3"], emoji: "🐠", reason: "Perfect low-carb, high-protein dinner option" },
        { name: "Chicken Soup + Veggies", cal: 180, protein: 20, serving: "1 bowl", tags: ["Hydrating", "Low Cal"], emoji: "🍲", reason: "Satisfying and calorie-light for weight loss" },
        { name: "Steamed Prawns + Stir-Fried Veggies", cal: 195, protein: 24, serving: "100g prawns + veggies", tags: ["Seafood", "Low Cal"], emoji: "🦐", reason: "Prawns are one of the lowest calorie, highest protein seafood options" },
      ],
      snacks: [
        { name: "Boiled Eggs", cal: 78, protein: 6, serving: "1 egg", tags: ["Perfect Protein", "Portable"], emoji: "🥚", reason: "Most bioavailable protein source, under 80 kcal" },
        { name: "Roasted Chana", cal: 90, protein: 6, serving: "¼ cup", tags: ["Fiber-Rich"], emoji: "🫘", reason: "Great fiber source to reduce cravings" },
        { name: "Greek Yogurt + Berries", cal: 95, protein: 9, serving: "½ cup yogurt", tags: ["Probiotic", "Low Sugar"], emoji: "🍓", reason: "Strained yogurt doubles the protein of regular dahi" },
      ],
    },
    vegan: {
      breakfast: [
        { name: "Chia Pudding", cal: 160, protein: 8, serving: "1 bowl", tags: ["Omega-3", "High Fiber"], emoji: "🥣", reason: "Chia seeds gel in liquid, keeping you full for hours" },
        { name: "Tofu Scramble", cal: 170, protein: 14, serving: "1 bowl", tags: ["Plant Protein", "Iron"], emoji: "🥘", reason: "Tofu replicates scrambled eggs with more fiber" },
        { name: "Avocado Toast + Hemp Seeds", cal: 185, protein: 7, serving: "1 slice + ½ avocado", tags: ["Healthy Fats", "Omega-3"], emoji: "🥑", reason: "Avocado's monounsaturated fats support heart health and fullness" },
      ],
      lunch: [
        { name: "Lentil & Veggie Bowl", cal: 280, protein: 16, serving: "1 bowl", tags: ["Complete Meal", "High Fiber"], emoji: "🥗", reason: "Lentils are the best plant-protein source" },
        { name: "Quinoa Khichdi", cal: 300, protein: 12, serving: "1 bowl", tags: ["Complete Protein", "Millet"], emoji: "🍲", reason: "Quinoa provides all essential amino acids" },
        { name: "Edamame & Brown Rice Bowl", cal: 265, protein: 14, serving: "1 bowl", tags: ["Plant Protein", "Low GI"], emoji: "🫛", reason: "Edamame delivers soy-based complete protein with minimal prep" },
      ],
      dinner: [
        { name: "Roasted Chickpea Curry", cal: 260, protein: 14, serving: "1 bowl", tags: ["High Fiber", "Iron"], emoji: "🫘", reason: "Chickpeas are dense in protein and iron" },
        { name: "Vegetable Stir Fry + Tofu", cal: 210, protein: 12, serving: "1 bowl", tags: ["Low Cal", "Protein"], emoji: "🥦", reason: "Light and packed with micronutrients" },
        { name: "Miso Soup + Edamame", cal: 140, protein: 10, serving: "1 bowl + ½ cup edamame", tags: ["Probiotic", "Low Cal"], emoji: "🍜", reason: "Fermented miso supports gut health with minimal calories" },
      ],
      snacks: [
        { name: "Almond & Date Mix", cal: 110, protein: 3, serving: "10 almonds + 2 dates", tags: ["Healthy Fats", "Energy"], emoji: "🌰", reason: "Natural energy boost with healthy fats" },
        { name: "Roasted Pumpkin Seeds", cal: 85, protein: 5, serving: "2 tbsp", tags: ["Zinc", "Magnesium"], emoji: "🌱", reason: "Rich in zinc and magnesium for immune health" },
        { name: "Celery + Peanut Butter", cal: 95, protein: 4, serving: "2 stalks + 1 tbsp PB", tags: ["Low Carb", "Healthy Fats"], emoji: "🥜", reason: "Zero-sugar crunch paired with healthy fats to keep you full" },
      ],
    },
  },
  maintain: {
    veg: {
      breakfast: [
        { name: "Idli + Sambar + Chutney", cal: 280, protein: 12, serving: "3 idlis", tags: ["Probiotic", "Balanced"], emoji: "🫓", reason: "A complete balanced South Indian breakfast" },
        { name: "Paratha + Curd", cal: 320, protein: 10, serving: "2 parathas", tags: ["Calcium", "Carbs"], emoji: "🫓", reason: "Whole wheat paratha + curd = morning fuel" },
        { name: "Poha + Peanuts", cal: 260, protein: 9, serving: "1 large bowl", tags: ["Iron-Rich", "Quick"], emoji: "🍚", reason: "Flattened rice with peanuts = iron absorption boosted by vitamin C" },
      ],
      lunch: [
        { name: "Dal Chawal + Sabzi", cal: 480, protein: 18, serving: "1 full plate", tags: ["Balanced", "Traditional"], emoji: "🍛", reason: "The classic Indian balanced meal" },
        { name: "Chole Bhature (moderate)", cal: 520, protein: 16, serving: "1 serving", tags: ["Protein Rich", "Traditional"], emoji: "🥙", reason: "Chickpea protein makes this indulgence acceptable" },
        { name: "Mix Veg Curry + Roti", cal: 420, protein: 14, serving: "2 rotis + curry", tags: ["Micronutrients", "Balanced"], emoji: "🥘", reason: "Variety of vegetables ensures a broad micronutrient profile" },
      ],
      dinner: [
        { name: "Roti + Paneer Sabzi", cal: 380, protein: 20, serving: "2 rotis + sabzi", tags: ["High Protein", "Calcium"], emoji: "🥘", reason: "Paneer is the Indian protein staple for good reason" },
        { name: "Khichdi + Raita", cal: 340, protein: 14, serving: "1 bowl + raita", tags: ["Comfort Food", "Digestive"], emoji: "🍲", reason: "Easily digestible and nutritionally balanced" },
        { name: "Methi Dal + 2 Rotis", cal: 360, protein: 16, serving: "1 bowl dal + 2 rotis", tags: ["Blood Sugar", "Iron"], emoji: "🌿", reason: "Fenugreek lowers blood glucose and is rich in iron" },
      ],
      snacks: [
        { name: "Mixed Dry Fruits", cal: 130, protein: 4, serving: "1 small handful", tags: ["Healthy Fats", "Energy"], emoji: "🌰", reason: "Dense micronutrients in a small package" },
        { name: "Sprout Chaat", cal: 110, protein: 8, serving: "1 bowl", tags: ["Vitamin C", "Protein"], emoji: "🥗", reason: "Sprouted legumes have enhanced nutrition" },
        { name: "Makhana (Roasted)", cal: 90, protein: 4, serving: "1 cup", tags: ["Low Cal", "Calcium"], emoji: "🌱", reason: "Fox nuts are a guilt-free calcium-rich crunch" },
      ],
    },
    nonveg: {
      breakfast: [
        { name: "Egg Bhurji + Toast", cal: 310, protein: 20, serving: "2 eggs + 2 toasts", tags: ["Quick", "Protein-Rich"], emoji: "🍳", reason: "Classic protein-packed Indian breakfast" },
        { name: "Chicken Sandwich", cal: 340, protein: 24, serving: "1 sandwich", tags: ["Balanced", "Lean Protein"], emoji: "🥪", reason: "Lean chicken + whole grain = ideal morning meal" },
        { name: "Scrambled Eggs + Avocado", cal: 325, protein: 22, serving: "3 eggs + ½ avocado", tags: ["Healthy Fats", "Filling"], emoji: "🥑", reason: "Eggs + avocado = protein and healthy fats to power through the morning" },
      ],
      lunch: [
        { name: "Chicken Biryani (home-style)", cal: 520, protein: 28, serving: "1 plate", tags: ["Complete Meal", "Protein"], emoji: "🍛", reason: "Rich protein and complex carbs in one dish" },
        { name: "Mutton Curry + Rice", cal: 480, protein: 26, serving: "1 plate", tags: ["Iron-Rich", "Protein"], emoji: "🥘", reason: "Mutton is high in iron and B12" },
        { name: "Egg Curry + Brown Rice", cal: 440, protein: 24, serving: "2 eggs + 1 cup rice", tags: ["Budget Meal", "Balanced"], emoji: "🍛", reason: "Eggs in curry form make an affordable high-protein lunch" },
      ],
      dinner: [
        { name: "Grilled Chicken + Dal + Roti", cal: 420, protein: 34, serving: "1 plate", tags: ["High Protein", "Balanced"], emoji: "🍗", reason: "Best post-workout dinner combination" },
        { name: "Prawn Masala + Brown Rice", cal: 390, protein: 30, serving: "1 plate", tags: ["Seafood", "Lean Protein"], emoji: "🍤", reason: "Prawns = ultra-lean protein with omega-3" },
        { name: "Baked Salmon + Quinoa", cal: 410, protein: 36, serving: "120g salmon + ½ cup quinoa", tags: ["Omega-3", "Complete Protein"], emoji: "🐟", reason: "Salmon's omega-3 reduces inflammation while quinoa completes the amino acid profile" },
      ],
      snacks: [
        { name: "Chicken Tikka (2 pcs)", cal: 100, protein: 14, serving: "2 pieces", tags: ["Lean", "High Protein"], emoji: "🍢", reason: "Low-calorie, high-protein snack option" },
        { name: "Boiled Egg + Toast", cal: 155, protein: 9, serving: "1 egg + 1 toast", tags: ["Balanced", "Quick"], emoji: "🥚", reason: "Quick energy + protein combo" },
        { name: "Tuna Rice Cakes", cal: 120, protein: 12, serving: "2 rice cakes + 50g tuna", tags: ["Low Cal", "High Protein"], emoji: "🥫", reason: "Rice cakes + tuna = a crispy high-protein snack under 125 kcal" },
      ],
    },
    vegan: {
      breakfast: [
        { name: "Smoothie Bowl", cal: 280, protein: 10, serving: "1 bowl", tags: ["Antioxidants", "Fiber"], emoji: "🥣", reason: "Nutrient-dense start to the day" },
        { name: "Oats with Plant Milk", cal: 240, protein: 8, serving: "1 bowl", tags: ["Beta-Glucan", "Fiber"], emoji: "🥛", reason: "Oat beta-glucan actively lowers cholesterol" },
        { name: "Overnight Oats + Chia + Mango", cal: 295, protein: 11, serving: "1 mason jar", tags: ["No-Cook", "Fiber-Rich"], emoji: "🥭", reason: "Preps the night before — chia swells to create a filling gel" },
      ],
      lunch: [
        { name: "Rajma + Brown Rice", cal: 420, protein: 18, serving: "1 plate", tags: ["Complete Protein", "Iron"], emoji: "🍛", reason: "Rajma rice is a vegan complete protein source" },
        { name: "Tofu & Veggie Curry", cal: 350, protein: 20, serving: "1 bowl + roti", tags: ["High Protein", "Ca-Rich"], emoji: "🥘", reason: "Firm tofu rivals paneer in protein content" },
        { name: "Chana Masala + Roti", cal: 390, protein: 17, serving: "1 bowl + 2 rotis", tags: ["Fiber-Rich", "Protein"], emoji: "🫘", reason: "Chickpeas have a low GI and are high in plant protein" },
      ],
      dinner: [
        { name: "Dal Tadka + Jeera Rice", cal: 380, protein: 16, serving: "1 plate", tags: ["Digestive", "Iron"], emoji: "🍲", reason: "Lentils provide plant iron with cumin aiding absorption" },
        { name: "Veggie Buddha Bowl", cal: 340, protein: 14, serving: "1 bowl", tags: ["Balanced", "Colorful"], emoji: "🥗", reason: "A spectrum of colors = a spectrum of nutrients" },
        { name: "Mushroom & Spinach Stir Fry + Roti", cal: 300, protein: 12, serving: "1 bowl + 2 rotis", tags: ["Vitamin D", "Iron"], emoji: "🍄", reason: "Mushrooms are the only plant source of vitamin D" },
      ],
      snacks: [
        { name: "Hummus + Veggie Sticks", cal: 120, protein: 5, serving: "3 tbsp + veggie sticks", tags: ["Fiber", "Healthy Fats"], emoji: "🥙", reason: "Chickpea protein + veggie fiber = ideal snack" },
        { name: "Roasted Makhana", cal: 80, protein: 4, serving: "1 cup", tags: ["Low Cal", "Calcium"], emoji: "🌱", reason: "Fox nuts are calcium-rich and gut-friendly" },
        { name: "Dark Chocolate + Walnuts", cal: 130, protein: 3, serving: "2 squares + 5 walnuts", tags: ["Antioxidants", "Omega-3"], emoji: "🍫", reason: "70%+ dark chocolate is rich in antioxidants and mood-boosting" },
      ],
    },
  },
  gain: {
    veg: {
      breakfast: [
        { name: "Paneer Paratha + Lassi", cal: 520, protein: 22, serving: "2 parathas + 1 glass", tags: ["High Cal", "Protein", "Calcium"], emoji: "🫓", reason: "Calorie-dense with good protein for muscle gain" },
        { name: "Banana Smoothie + Oats", cal: 480, protein: 15, serving: "1 large glass", tags: ["High Cal", "Quick Energy"], emoji: "🥤", reason: "Banana + oats = calorie-dense muscle fuel" },
        { name: "Masala Dosa + Coconut Chutney", cal: 460, protein: 12, serving: "1 large dosa", tags: ["Fermented", "Probiotic"], emoji: "🫔", reason: "Fermented batter is easier to digest and provides complex carbs for energy" },
      ],
      lunch: [
        { name: "Dal Rice + Ghee", cal: 600, protein: 20, serving: "1 large plate + 1 tsp ghee", tags: ["High Cal", "Traditional"], emoji: "🍛", reason: "Ghee adds healthy calorie density" },
        { name: "Paneer Biryani", cal: 580, protein: 24, serving: "1 plate", tags: ["High Cal", "Protein Rich"], emoji: "🍛", reason: "Protein-rich festive meal great for bulking" },
        { name: "Aloo Gobi + Roti + Dahi", cal: 540, protein: 16, serving: "3 rotis + sabzi + dahi", tags: ["Carb-Rich", "Comfort Food"], emoji: "🥔", reason: "Potato provides fast carbs while dahi adds probiotics" },
      ],
      dinner: [
        { name: "Chole + Bhature + Raita", cal: 620, protein: 22, serving: "1 serving", tags: ["High Cal", "Protein"], emoji: "🥙", reason: "Chickpeas + fermented raita for gut health" },
        { name: "Roti + Aloo Mutter + Dal", cal: 520, protein: 18, serving: "3 rotis + 2 sabzis", tags: ["Carb-Rich", "Balanced"], emoji: "🥘", reason: "Triple combo for maximum caloric intake" },
        { name: "Paneer Butter Masala + Naan", cal: 580, protein: 24, serving: "1 bowl + 2 naans", tags: ["High Cal", "Calcium"], emoji: "🍛", reason: "Rich tomato-cream base with paneer for calorie-dense bulking" },
      ],
      snacks: [
        { name: "Peanut Butter Banana Toast", cal: 280, protein: 10, serving: "2 toasts", tags: ["Healthy Fats", "High Cal"], emoji: "🍌", reason: "Peanut butter is calorie-dense with healthy fats" },
        { name: "Mixed Nut Ladoo", cal: 200, protein: 6, serving: "2 pieces", tags: ["Traditional", "Calorie Dense"], emoji: "🍡", reason: "Traditional energy balls packed with nutrient-dense nuts" },
        { name: "Chikki (Peanut Jaggery Bar)", cal: 220, protein: 7, serving: "2 pieces", tags: ["Iron", "Energy Dense"], emoji: "🍯", reason: "Jaggery provides iron while peanuts deliver healthy fats and protein" },
      ],
    },
    nonveg: {
      breakfast: [
        { name: "4-Egg Omelette + Brown Toast", cal: 480, protein: 34, serving: "4 eggs + 2 toasts", tags: ["Muscle Building", "High Protein"], emoji: "🍳", reason: "Highest bioavailable protein for muscle growth" },
        { name: "Chicken Keema + Paratha", cal: 520, protein: 30, serving: "1 bowl keema + 2 parathas", tags: ["High Protein", "Calorie Dense"], emoji: "🫓", reason: "Lean ground chicken packed into calorie-rich paratha" },
        { name: "Steak + Eggs + Sweet Potato", cal: 560, protein: 40, serving: "120g steak + 2 eggs + ½ potato", tags: ["Athlete Meal", "Anabolic"], emoji: "🥩", reason: "Red meat + eggs = creatine and complete protein for serious muscle building" },
      ],
      lunch: [
        { name: "Mutton Biryani", cal: 640, protein: 32, serving: "1 large plate", tags: ["High Cal", "High Protein"], emoji: "🍛", reason: "Mutton + rice = perfect mass-gain combination" },
        { name: "Chicken Curry + Rice + Dal", cal: 600, protein: 36, serving: "1 plate", tags: ["Complete Protein", "Calorie Dense"], emoji: "🍛", reason: "Three protein sources in a single meal" },
        { name: "Lamb Keema + Pav", cal: 580, protein: 34, serving: "1 bowl keema + 3 pavs", tags: ["High Cal", "Iron-Rich"], emoji: "🫓", reason: "Street-food style bulking meal packed with iron and B12" },
      ],
      dinner: [
        { name: "Grilled Chicken (250g) + Roti", cal: 560, protein: 46, serving: "250g + 3 rotis", tags: ["Athlete Meal", "High Protein"], emoji: "🍗", reason: "High-protein dinner ideal for post-gym recovery" },
        { name: "Fish Curry + Rice + Raita", cal: 520, protein: 34, serving: "1 large plate", tags: ["Omega-3", "Complete Meal"], emoji: "🐟", reason: "Omega-3 aids muscle recovery and growth" },
        { name: "Egg Fried Rice + Chicken", cal: 545, protein: 38, serving: "1 large bowl", tags: ["High Cal", "Post Workout"], emoji: "🍳", reason: "Carb + protein combo maximises muscle glycogen replenishment" },
      ],
      snacks: [
        { name: "Protein Shake + Banana", cal: 280, protein: 25, serving: "1 shake + 1 banana", tags: ["Post Workout", "Fast Protein"], emoji: "🥤", reason: "Fast-absorbing protein + carbs for recovery" },
        { name: "Chicken Tikka Roll", cal: 320, protein: 24, serving: "1 roll", tags: ["High Protein", "On-The-Go"], emoji: "🌯", reason: "High protein snack with complex carbs" },
        { name: "Hard Boiled Eggs + Cheese", cal: 240, protein: 18, serving: "2 eggs + 1 cheese slice", tags: ["Calorie Dense", "Calcium"], emoji: "🧀", reason: "Cheese adds calorie density and extra protein to a hard-boiled egg" },
      ],
    },
    vegan: {
      breakfast: [
        { name: "Peanut Butter Smoothie", cal: 450, protein: 18, serving: "1 large glass", tags: ["High Cal", "Plant Protein"], emoji: "🥤", reason: "Peanut butter + plant protein powder = muscle fuel" },
        { name: "Tempeh & Veggie Wrap", cal: 420, protein: 22, serving: "2 wraps", tags: ["Fermented", "High Protein"], emoji: "🌯", reason: "Tempeh has more protein than tofu with added probiotics" },
        { name: "Sattu Paratha + Mango Lassi", cal: 490, protein: 20, serving: "2 parathas + 1 glass", tags: ["High Cal", "Roasted Gram"], emoji: "🫓", reason: "Sattu is one of the richest plant proteins — a bulking secret weapon" },
      ],
      lunch: [
        { name: "Chickpea Biryani", cal: 550, protein: 20, serving: "1 large plate", tags: ["High Cal", "Plant Protein"], emoji: "🍛", reason: "Festive and calorie-dense plant-based version" },
        { name: "Lentil + Quinoa Bowl", cal: 480, protein: 24, serving: "1 bowl", tags: ["Complete Protein", "Iron"], emoji: "🥗", reason: "Quinoa + lentil = all 9 essential amino acids" },
        { name: "Black Bean Burrito Bowl", cal: 510, protein: 22, serving: "1 large bowl", tags: ["High Fiber", "Complete Meal"], emoji: "🌯", reason: "Black beans + rice + avocado = a vegan mass-gain powerhouse" },
      ],
      dinner: [
        { name: "Tofu Palak + Dal + Rice", cal: 520, protein: 26, serving: "1 plate", tags: ["Iron Rich", "Protein Dense"], emoji: "🥘", reason: "Iron-packed spinach with protein-rich tofu and lentils" },
        { name: "Rajma + Roti + Curd", cal: 490, protein: 22, serving: "1 large plate", tags: ["Traditional", "High Fiber"], emoji: "🍲", reason: "Classic bulk meal with complete plant proteins" },
        { name: "Tempeh Curry + Brown Rice", cal: 530, protein: 28, serving: "1 bowl + 1 cup rice", tags: ["Fermented", "High Protein"], emoji: "🥘", reason: "Tempeh's fermentation boosts protein digestibility for better absorption" },
      ],
      snacks: [
        { name: "Granola Bar (homemade)", cal: 220, protein: 8, serving: "1 bar", tags: ["Energy Dense", "Fiber"], emoji: "🍫", reason: "Oats + nuts + seeds = calorie-dense fitness snack" },
        { name: "Soy Milk + Banana", cal: 200, protein: 8, serving: "1 glass + 1 banana", tags: ["Plant Protein", "Potassium"], emoji: "🥛", reason: "Soy milk rivals dairy in protein with zero cholesterol" },
        { name: "Trail Mix (Nuts + Dried Fruit)", cal: 240, protein: 6, serving: "¼ cup", tags: ["Energy Dense", "Healthy Fats"], emoji: "🌰", reason: "Calorie-dense on-the-go mix with healthy fats and quick sugars for energy" },
      ],
    },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function FoodCard({ item, delay }: { item: FoodItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl p-4 border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl">
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.serving}</p>
          <div className="flex gap-3 mt-2 text-xs">
            <span className="font-semibold" style={{ color: "#EF4444" }}>
              <Flame className="inline w-3 h-3 mr-0.5 -mt-0.5" />{item.cal} kcal
            </span>
            <span className="font-semibold" style={{ color: "#2563EB" }}>
              <Target className="inline w-3 h-3 mr-0.5 -mt-0.5" />{item.protein}g protein
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Hover reason */}
      <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400 italic opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        💡 {item.reason}
      </div>
    </motion.div>
  );
}

function MealSection({ title, icon, items, baseDelay }: { title: string; icon: string; items: FoodItem[]; baseDelay: number }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-base">{icon}</span> {title}
      </h4>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <FoodCard key={item.name} item={item} delay={baseDelay + i * 0.08} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function FoodRecommendations() {
  const [goal, setGoal] = useState<Goal>("maintain");
  const [diet, setDiet] = useState<Diet>("veg");
  const [showPlan, setShowPlan] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setShowPlan(false);
    setTimeout(() => {
      setGenerating(false);
      setShowPlan(true);
    }, 1000);
  };

  const plan = foodDB[goal][diet];

  // We should only calculate totals for ONE choice per meal slot (the first one)
  // otherwise we sum up every option making it look like 5000+ kcal
  const activeMeals = [plan.breakfast[0], plan.lunch[0], plan.dinner[0], plan.snacks[0]];

  const totalCal = activeMeals.reduce((sum, f) => sum + f.cal, 0);
  const totalProtein = activeMeals.reduce((sum, f) => sum + f.protein, 0);

  const goals: { id: Goal; label: string; emoji: string; desc: string; color: string; bg: string }[] = [
    { id: "lose", label: "Lose Weight", emoji: "🔥", desc: "Calorie deficit meals", color: "#EF4444", bg: "#FEF2F2" },
    { id: "maintain", label: "Stay Balanced", emoji: "⚖️", desc: "Maintain current weight", color: "#10B981", bg: "#ECFDF5" },
    { id: "gain", label: "Build Muscle", emoji: "💪", desc: "Calorie surplus meals", color: "#2563EB", bg: "#EFF6FF" },
  ];

  const diets: { id: Diet; label: string; emoji: string }[] = [
    { id: "veg", label: "Vegetarian", emoji: "🥦" },
    { id: "nonveg", label: "Non-Veg", emoji: "🍗" },
    { id: "vegan", label: "Vegan", emoji: "🌱" },
  ];

  return (
    <section
      id="recommendations"
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
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
            <Utensils className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
            Smart Meal Planner
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Your personalized{" "}
            <span className="gradient-text">food roadmap</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Tell us your goal and dietary preference — we&apos;ll build an Indian meal plan designed for your body.
          </p>
        </motion.div>

        {/* Config Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 card-shadow-lg mb-6"
        >
          {/* Goal selector */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Goal</p>
            <div className="grid grid-cols-3 gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  id={`goal-${g.id}`}
                  onClick={() => { setGoal(g.id); setShowPlan(false); }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                    goal === g.id ? "border-transparent shadow-md" : "border-gray-100 hover:border-gray-200"
                  }`}
                  style={goal === g.id ? { background: g.bg, borderColor: g.color + "40" } : {}}
                >
                  <div className="text-xl mb-1">{g.emoji}</div>
                  <p className="text-sm font-bold text-gray-800">{g.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Diet preference */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Dietary Preference</p>
            <div className="flex gap-2">
              {diets.map((d) => (
                <button
                  key={d.id}
                  id={`diet-${d.id}`}
                  onClick={() => { setDiet(d.id); setShowPlan(false); }}
                  className={`flex-1 py-3 text-sm font-semibold rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                    diet === d.id
                      ? "text-white border-transparent"
                      : "text-gray-600 border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                  style={
                    diet === d.id
                      ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)" }
                      : {}
                  }
                >
                  {d.emoji} {d.label}
                </button>
              ))}
            </div>
          </div>

          <button
            id="generate-plan-btn"
            onClick={generate}
            disabled={generating}
            className="w-full py-4 text-sm font-bold text-white rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Leaf className="w-4 h-4" />
            {generating ? "Building your plan…" : "Generate My Meal Plan"}
            {!generating && <ChevronRight className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Plan Result */}
        <AnimatePresence>
          {showPlan && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Est. Daily Calories", value: `~${totalCal} kcal`, icon: "🔥", color: "#EF4444", bg: "#FEF2F2" },
                  { label: "Est. Daily Protein", value: `~${totalProtein}g`, icon: "💪", color: "#2563EB", bg: "#EFF6FF" },
                  { label: "Meal Plan Quality", value: "Premium", icon: "⭐", color: "#F59E0B", bg: "#FFFBEB" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-2xl p-4 text-center card-shadow"
                    style={{ borderTop: `3px solid ${s.color}` }}
                  >
                    <div className="text-xl mb-1">{s.icon}</div>
                    <p className="text-base font-extrabold text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Plan label */}
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <h3 className="text-base font-bold text-gray-800">
                  {goals.find((g) => g.id === goal)?.label} Plan —{" "}
                  {diets.find((d) => d.id === diet)?.label}
                </h3>
              </div>

              {/* Meals */}
              <div className="space-y-8">
                <MealSection title="Breakfast" icon="🌅" items={plan.breakfast} baseDelay={0} />
                <MealSection title="Lunch" icon="☀️" items={plan.lunch} baseDelay={0.15} />
                <MealSection title="Dinner" icon="🌙" items={plan.dinner} baseDelay={0.3} />
                <MealSection title="Snacks" icon="🍎" items={plan.snacks} baseDelay={0.45} />
              </div>

              {/* Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center text-xs text-gray-400"
              >
                * Calorie values are estimates. For medical conditions, consult a registered dietitian.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
