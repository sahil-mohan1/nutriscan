# 🥗 NutriScan

![NutriScan Banner](/public/banner.png) <!-- Consider adding a banner image here -->

NutriScan is an AI-powered nutrition assistant and meal planner tailored specifically for the Indian food context. Built for the **"Debug Your Diet"** hackathon, this application helps users understand the nutritional value of their meals, calculate their BMI, and generate personalized meal plans based on their custom goals and dietary preferences.

## ✨ Features

- 🧬 **Live Meal Analyzer**: Type in what you ate (e.g., "2 rotis and paneer") or select from quick picks, and get an instant nutritional breakdown. The app calculates estimated calories, macronutrients (Protein, Carbs, Fiber, Vitamins), and provides an overall health score with actionable insights.
- ⚖️ **BMI Calculator**: Calculate your Body Mass Index using either metric (cm/kg) or imperial (in/lbs) units. Receive personalized, actionable diet tips based on your specific BMI category (Underweight, Healthy, Overweight, Obese) and see how you fare against the ideal range.
- 🍽️ **Smart Meal Planner**: Generate fully customized Indian meal plans spanning Breakfast, Lunch, Dinner, and Snacks. These plans are dynamically mapped securely to your specific health goals (Lose Weight, Maintain current weight, or Build Muscle) and diet type (Veg, Non-Veg, Vegan).
- 📊 **Responsive Dashboard & UI**: Built with a mobile-first approach. Visualizes your nutrition data with beautiful, interactive tools and clean, glassmorphism-styled components using Tailwind CSS and Framer Motion for a fluid experience.

## 🛠️ Tech Stack

### Frontend Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router paradigm)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

### UI & UX Extensions
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and interactive elements.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) for data dashboarding.
- **Vector Graphics**: [Lottie React](https://lottiereact.com/) for lightweight SVG animations.

### Backend & AI Infrastructure
- **AI Integration**: [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai) (The `@google-cloud/vertexai` SDK is installed and pre-configured for future live Gemini model prompting).

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A package manager: npm, yarn, pnpm, or bun.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nutriscan_app
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```

4. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

---

## 📁 Project Architecture

The project follows a modular, single-page application structure utilizing the Next.js App Router:

```text
src/
├── app/
│   ├── layout.tsx         # The root layout wrapping the entire app (fonts, metadata).
│   ├── page.tsx           # The main entry page assembling all the sections sequentially.
│   └── globals.css        # Global design tokens, custom SCSS variables, and utilities.
└── components/
    ├── Navbar.tsx         # Responsive top navigation with smooth scroll tracking.
    ├── ScrollToTop.tsx    # Floating action button.
    └── sections/          # Modular logic and UI for the major sections of the page.
        ├── Hero.tsx
        ├── Problem.tsx
        ├── HowItWorks.tsx
        ├── MealAnalyzer.tsx
        ├── BMICalculator.tsx
        ├── FoodRecommendations.tsx
        ├── Features.tsx
        ├── Dashboard.tsx
        └── CTAFooter.tsx
```

---

## 🔮 Roadmap / Future Enhancements

While NutriScan is fully functional with a rich local dataset, the following features are planned:

- **Live Gemini AI Integration**: The next step is to connect the `MealAnalyzer` component to Google Gemini to process open-ended, complex meal descriptions dynamically instead of relying on the local mock database.
- **User Authentication / Accounts**: Allow users to save their daily logs, track their BMI progress over time, and save favorite meal plans.
- **Expanded Indian Food Database**: Incorporate a wider variety of hyper-regional Indian dishes, snacks, and street food into the existing datasets.
- **Progressive Web App (PWA) Support**: Enable users to install the application on mobile devices and use it offline.


---
*Built for the Debug Your Diet Hackathon.*
