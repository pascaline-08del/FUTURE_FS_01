# FUTURE_FS_01 Personal Portfolio Website

A modern, interactive and highly performant portfolio website built with **HTML5 / CSS3 (Tailwind CSS v4)** and **Vanilla TypeScript**, powered by **Vite** for a fast and efficient development experience.

---

## 🌐 Live Demo

Application live demo link here:

- Live Demo: [Insert your URL here]

---

## 🎨 Design

- Elegant dark theme
- Smooth scrolling animations
- Animated skill bars
- Dynamic statistics counters
- Clean and modern visual experience

---

## 🚀 Features

- Modern and interactive design
- Multilingual support (FR / EN)
- Real contact form with EmailJS
- Dynamic project filtering
- Excellent performance with lightweight technology

---

## 📦 Project Structure

```text
├── public/                 # Static files (favicon, etc.)
├── src/
│   ├── assets/             # Images, avatars and logos
│   ├── index.css           # Global stylesheet with Tailwind CSS v4
│   ├── main.ts             # Main TypeScript application logic
│   └── translations.ts     # French / English translation dictionary
├── .env.example            # Example environment configuration file
├── index.html              # Main HTML entry point
├── package.json            # npm scripts and dependencies
├── tsconfig.json           # TypeScript compiler configuration
└── vite.config.ts          # Vite server and bundle configuration
```

---

## 🛠️ Installation and Local Development

Follow these simple steps to run the project on your local machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed.

### 2. Clone or Extract the Project
Open the project folder in your preferred code editor, such as **Visual Studio Code**.

### 3. Install Dependencies
Run the following command in your terminal:
```bash
npm install
```

### 4. Configure Environment Variables (Optional)
The contact form uses **EmailJS**. To enable real email sending:
1. Create a free account on [EmailJS](https://dashboard.emailjs.com/).
2. Create a file named `.env` at the root of your project (you can copy the content from `.env.example`).
3. Fill in your keys:
    ```env
    VITE_EMAILJS_PUBLIC_KEY="your_public_key"
    VITE_EMAILJS_SERVICE_ID="your_service_id"
    VITE_EMAILJS_TEMPLATE_ID="your_template_id"
    ```
*Note: If no keys are configured, the form will automatically work in **Demo Mode** with a visual sending simulation for interface testing.*

### 5. Start the Development Server
To run the site locally with live reload:
```bash
npm run dev
```
Open your browser at the address shown in the terminal (by default, **http://localhost:3000**).

---

## 🚀 Production Build

To compile and optimize the site for deployment on GitHub Pages, Hostinger, Vercel, Netlify, or similar platforms:

```bash
npm run build
```

This command generates a self-contained folder named **dist/** containing optimized HTML, CSS, and JavaScript. You can copy the contents of this folder to any static hosting service.

---

## 📝 Author

Designed and developed by **Soukou Enyonam Pascaline**. All rights reserved.
