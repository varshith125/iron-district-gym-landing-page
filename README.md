# 🏋️ IRON DISTRICT — Strength & Performance Gym Landing Page

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

A high-converting, premium landing page designed for **IRON DISTRICT** — an elite strength and athletic performance gym based in Bengaluru. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 📸 Live Preview

- **Live URL**: *(Add your deployed Netlify link here)*
- **Repository**: [github.com/varshith125/iron-district-gym-landing-page](https://github.com/varshith125/iron-district-gym-landing-page)

---

## ✨ Features

- **⚡ Blazing Fast Performance**: Built with Vite 6 for instant load times and optimal bundle size.
- **📱 Fully Responsive**: Pixel-perfect layout across mobile, tablet, and widescreen desktop monitors.
- **🎨 Modern Dark Aesthetic**: Industrial, high-contrast visual design tailored for strength and fitness brands.
- **📊 Core Sections Included**:
  - **Hero Section**: High-impact headline, live stats, and direct call-to-actions.
  - **Philosophy & Principles**: Clear breakdown of gym methodology and training ethics.
  - **Training Programs**: Program cards featuring Olympic Weightlifting, Strength & Conditioning, and Athletic Development.
  - **Coach Showcase**: Detailed profiles with certifications, roles, and specializations.
  - **Member Transformations**: Before/After performance metrics, story highlights, and testimonials.
  - **Membership Pricing**: Transparent pricing grid with feature comparison and highlighted recommended tier.
  - **Interactive Consultation Form**: Modal/Form for visitor inquiries and trial bookings.
  - **Comprehensive Footer**: Contact details, operating hours, gym address, and social links.
- **🚀 Netlify-Ready**: Pre-configured with `netlify.toml` and SPA `_redirects` for zero-configuration deployments.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI components and state management |
| **TypeScript** | Type safety and enhanced developer experience |
| **Vite 6** | Ultra-fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling with customized design tokens |
| **Lucide React** | Clean, lightweight icon suite |
| **PostCSS & Autoprefixer** | CSS vendor prefixing and optimizations |

---

## 📁 Project Structure

```text
iron-district-gym-landing-page/
├── public/
│   ├── _redirects         # Netlify SPA routing rules
│   ├── favicon.svg        # Site favicon
│   └── icons.svg          # SVG asset bundle
├── src/
│   ├── assets/            # Static images and brand assets
│   ├── App.tsx            # Main landing page component
│   ├── App.css            # Component-specific styles
│   ├── index.css          # Tailwind base & custom utilities
│   └── main.tsx           # React root entry point
├── dist/                  # Optimized production output (after build)
├── netlify.toml           # Netlify build and routing configuration
├── package.json           # Dependencies and project scripts
├── tailwind.config.js     # Tailwind design system configuration
├── tsconfig.json          # TypeScript compiler options
└── vite.config.ts         # Vite configuration
```

---

## 🚀 Getting Started Locally

Follow these simple steps to run this project on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/varshith125/iron-district-gym-landing-page.git
cd iron-district-gym-landing-page
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with hot module replacement (HMR) |
| `npm run build` | Compiles TypeScript and builds production-ready bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs fast code linting via Oxlint |

---

## 🌐 Deploying to Netlify

This repository is already optimized for Netlify deployment with `netlify.toml` and `public/_redirects`.

### Option A: Via Netlify Dashboard (Automatic CI/CD)
1. Go to [app.netlify.com](https://app.netlify.com/) and log in.
2. Click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and select `varshith125/iron-district-gym-landing-page`.
4. Netlify will auto-detect the configuration:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**. Any future pushes to the `main` branch will automatically update the live site.

### Option B: Via Terminal (Netlify CLI)
```bash
npx netlify deploy --prod
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
