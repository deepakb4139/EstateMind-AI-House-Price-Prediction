<<<<<<< HEAD
# EstateMind AI – House Price Prediction & Real Estate Analytics Platform

> **EstateMind AI** is a production-ready, luxury real estate valuation engine, interior cost estimator, and mortgage finance suite optimized for Indian metro markets.

---

## 🌟 Key Features

- 🏢 **Multi-Factor AI Valuation Engine**: Deterministic weighted price calculation taking into account city base rate, locality, property type (Apartment, Villa, Independent House), BHK layout, total floors & floor height, property age, societal luxury amenities, and metro/school/hospital transit distance.
- 🛋️ **Turn-Key Furniture & Interior Estimator**: Configurable 9-category furniture/appliance estimator with **Standard** and **Luxury** tiers, automated interior designer budget (+28%), and ready-to-move total outlay.
- 🏦 **Mortgage EMI & Acquisition Finance**: Dynamic sliders for down payment, bank interest rate, and loan tenure. Calculates monthly EMI, total interest, state stamp duty, and government registration fees.
- 📊 **Interactive Analytics Dashboard**: Powered by Recharts with 5 visual modes (Price Component Breakdown, 5-Year Capital Growth Trajectory, Rent vs EMI Cash Flow, Furniture Budget Distribution, Total Acquisition Outlay).
- 📑 **Executive PDF & Print Export**: Printable report layout generating structured executive real estate valuation summaries.
- 💾 **Local Persistence & Comparator**: LocalStorage-backed property comparison modal allowing side-by-side metrics evaluation.
- 🎨 **Luxury Glassmorphism UI**: High-end dark theme built with Tailwind CSS v4, Framer Motion micro-animations, and responsive layout.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/EstateMind-AI-House-Price-Prediction.git

# Navigate into project directory
cd EstateMind-AI-House-Price-Prediction

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ Build & Deployment

### Production Build

```bash
npm run build
```

This compiles TypeScript and outputs optimized assets into the `dist/` directory.

### One-Click Vercel Deployment

1. Push this folder to your GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the default settings (`Framework Preset: Vite`).
5. Click **Deploy**.

The repository includes a `vercel.json` file to automatically route single-page application URLs.

---

## 📁 Project Architecture

```
EstateMind-AI-House-Price-Prediction/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # UI Components (Navbar, Form, Charts, Calculators, Comparator, PDF)
│   ├── pages/            # Page Views (Dashboard)
│   ├── hooks/            # Custom React Hooks (useValuation)
│   ├── utils/            # Core Math & Prediction Engines
│   ├── data/             # Indian Metro Cities & Baseline Datasets
│   ├── types/            # TypeScript Interface Definitions
│   ├── index.css         # Glassmorphism & Print Stylesheet
│   ├── App.tsx           # App Root Container
│   └── main.tsx          # Application Entry Point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── README.md
├── .gitignore
└── vercel.json
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.
=======
# EstateMind-AI-House-Price-Prediction
>>>>>>> 73833b0d927774fb63a408834093823877b0ea3f
