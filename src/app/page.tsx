import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import MealAnalyzer from "@/components/sections/MealAnalyzer";
import BMICalculator from "@/components/sections/BMICalculator";
import FoodRecommendations from "@/components/sections/FoodRecommendations";
import Features from "@/components/sections/Features";
import Dashboard from "@/components/sections/Dashboard";
import CTAFooter from "@/components/sections/CTAFooter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <MealAnalyzer />
      <BMICalculator />
      <FoodRecommendations />
      <Features />
      <Dashboard />
      <CTAFooter />
      <ScrollToTop />
    </main>
  );
}
