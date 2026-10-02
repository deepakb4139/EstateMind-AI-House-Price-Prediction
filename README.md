# Indian Property Search Platform (MagicBricks Clone)
A full-stack real estate property search web application focused on major Indian cities (**Bangalore** & **Mumbai**). Built using **React (Vite)** for the front-end, **FastAPI** for the backend API, and **SQLite** for database management.
---
## 🚀 Features
- **Location Filter:** Search properties exclusively in **Bangalore** or **Mumbai**.
- **Search Intent:** Filter by **Buy** (For Sale) or **Rent** (Rental properties).
- **Budget Filtering:** Set minimum and maximum budget ranges tailored to Indian Rupee (INR) pricing.
- **Interactive UI:** Dynamic property grid with visual property cards, price tags, location badges, and property feature summaries.
- **Pre-populated Database:** Includes 20 realistic mock properties (10 in Bangalore, 10 in Mumbai).
---
## 🛠 Tech Stack
- **Frontend:** React, Vite, Vanilla CSS (Modern design system, glassmorphism, responsive cards).
- **Backend:** Python 3.10+, FastAPI, Uvicorn, SQLAlchemy.
- **Database:** SQLite (`properties.db`).
---
## 📁 Project Structure
```text
property_search_app/
├── backend/
│   ├── main.py           # FastAPI application & API endpoints
│   ├── database.py       # SQLite connection & SQLAlchemy engine
│   ├── models.py         # Database ORM models
│   ├── seed_data.py      # Data seeder for 20 Bangalore & Mumbai properties
│   └── requirements.txt  # Python backend dependencies
└── frontend/
    ├── index.html        # Main HTML file
    ├── src/
    │   ├── App.jsx       # Root component & state management
    │   ├── App.css       # Layout & styling rules
    │   ├── main.jsx      # Vite React entry point
    │   └── components/
    │       ├── Hero.jsx        # Landing hero section
    │       ├── SearchBar.jsx   # Search & filter controller (City, Type, Budget)
    │       ├── PropertyList.jsx# Property listing grid
    │       └── PropertyCard.jsx# Individual property card UI
    ├── package.json      # Frontend package manifest
    └── vite.config.js    # Vite setup & dev proxy
```
---
## 🔌 API Endpoints
### `GET /api/properties`
Fetch property listings with optional search filters.
|
 Parameter 
|
 Type 
|
 Description 
|
 Example 
|
|
:---
|
:---
|
:---
|
:---
|
|
`city`
|
`string`
|
 Filter by city name (
`Bangalore`
 or 
`Mumbai`
) 
|
`Bangalore`
|
|
`property_type`
|
`string`
|
 Filter by transaction type (
`Buy`
 or 
`Rent`
) 
|
`Rent`
|
|
`min_price`
|
`integer`
|
 Minimum price filter (in INR) 
|
`25000`
|
|
`max_price`
|
`integer`
|
 Maximum price filter (in INR) 
|
`15000000`
|
---
## ⚙️ Quick Start Guide
### 1. Backend Setup (FastAPI & SQLite)
```bash
# Navigate to backend directory
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Populate SQLite database with 20 mock properties
python seed_data.py
# Start the FastAPI backend server
uvicorn main:app --reload --port 8000
```
The API server will run at: `http://localhost:8000`  
Interactive API Docs (Swagger): `http://localhost:8000/docs`
---
### 2. Frontend Setup (React & Vite)
```bash
# Navigate to frontend directory
cd frontend
# Install node dependencies
npm install
# Run Vite dev server
npm run dev
```
The React web application will run at: `http://localhost:5173`
---
## 🏙 Mock Properties Breakdown
The application comes pre-loaded with **20 curated properties**:
- **10 Properties in Bangalore** (Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City, Yelahanka, Sarjapur Road, etc.)
- **10 Properties in Mumbai** (Bandra West, Andheri West, Worli, Powai, Juhu, Thane West, Lower Parel, Malad West, etc.)
Includes a realistic mix of luxury apartments, studio rentals, gated villas, and commercial penthouse setups.
