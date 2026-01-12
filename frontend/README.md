# 🩺 Skin Cancer Detection – Frontend

This repository contains the **frontend application** for a skin cancer detection system focused on melanoma screening. The application provides an intuitive web interface for interacting with a deep learning model trained on dermoscopic images.

The goal of this project is to demonstrate the use of **modern web technologies combined with AI-driven medical decision support**, suitable for portfolio, academic, and research-oriented contexts.

---

## 🚀 Project Overview

* **Purpose:** Visualize and interact with a skin cancer classification model
* **Use case:** Educational and research-oriented melanoma screening (non-clinical)
* **Core focus:** Model interpretability, usability, and ML-driven insights

⚠️ **Disclaimer:** This project is not intended for clinical diagnosis or medical use.

---

## 🧠 Key Features

* Upload and preview dermoscopic images
* Send images to a backend ML model for inference
* Display predicted skin lesion class probabilities
* Clean, responsive UI optimized for clarity and accessibility
* Ready-to-deploy architecture using Docker and Vercel

---

## 🛠️ Tech Stack

### Frontend

* **Next.js** (App Router)
* **React**
* **TypeScript**
* **Tailwind CSS**

### DevOps & Deployment

* **Docker / Docker Compose**
* **Vercel** (production deployment)

### AI / ML (Backend – external)

* CNN-based image classifier (TensorFlow / Keras)
* Trained on dermoscopic skin lesion datasets

---

## 📦 Getting Started

### 🔹 Development (Local)

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Or using alternative package managers:

```bash
yarn dev
pnpm dev
bun dev
```

The app will be available at:

```
http://localhost:3000
```

---

### 🔹 Development (Docker)

Run the development environment using Docker Compose:

```bash
docker-compose up
```

This ensures environment consistency across systems.

---

### 🔹 Production (Docker)

Build and run the production container:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Or using Docker directly:

```bash
docker build -t melanoma-frontend .
docker run -p 3000:3000 melanoma-frontend
```

---

## ☁️ Deployment

This project is configured for **automatic deployment on Vercel**.

To deploy manually:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Configure environment variables if required
4. Deploy 🚀

---

## ⭐ Why This Project Matters

This project demonstrates the ability to:

* Integrate ML models into real-world web systems
* Translate complex AI outputs into user-friendly interfaces
* Apply data science responsibly in sensitive domains like healthcare

Ideal for roles in **Data Science, Machine Learning Engineering, and AI for Health**.
