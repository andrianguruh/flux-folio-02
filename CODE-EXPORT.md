# PM.TECH Portfolio - Complete Code Export

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx
│   │   ├── About.tsx
│   │   ├── Clients.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── assets/
│   │   └── hero-background.jpg
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── tailwind.config.ts
├── vercel.json
├── .vercelignore
├── README-VERCEL.md
├── package.json
└── vite.config.ts
```

---

## 🎨 Design System & Styles

### src/index.css
Complete design system with futuristic theme, custom animations, and cyberpunk aesthetics.

### tailwind.config.ts  
Tailwind configuration with custom colors, fonts, and design tokens.

---

## 🧩 React Components

### Core Components:
- **Hero.tsx** - Animated hero section with glitch effects
- **About.tsx** - Professional about section with profile
- **Skills.tsx** - Interactive skills showcase with categories
- **Projects.tsx** - Project portfolio with filtering
- **Clients.tsx** - Client testimonials and logos
- **Contact.tsx** - Contact form with social links
- **Navigation.tsx** - Responsive navigation header
- **Footer.tsx** - Professional footer with links

### UI Components:
- **button.tsx** - Enhanced button component with futuristic variants

### Pages:
- **Index.tsx** - Main portfolio page
- **NotFound.tsx** - 404 error page

---

## ⚙️ Configuration Files

### Deployment:
- **vercel.json** - Vercel deployment configuration
- **.vercelignore** - Files to exclude from deployment
- **README-VERCEL.md** - Deployment guide

### Build System:
- **vite.config.ts** - Vite build configuration
- **package.json** - Dependencies and scripts

---

## 🚀 Features Included

✅ **Futuristic Design System** with neon colors and glowing effects
✅ **Responsive Layout** for all devices
✅ **Interactive Animations** and smooth transitions
✅ **SEO Optimized** with proper meta tags
✅ **Performance Optimized** with lazy loading
✅ **Accessibility Compliant** with ARIA labels
✅ **Modern Tech Stack** (React 18, TypeScript, Tailwind CSS)
✅ **Production Ready** with Vercel deployment config

---

## 📋 Installation & Setup

```bash
# Clone or create project
npm create vite@latest pmtech-portfolio -- --template react-ts

# Install dependencies
npm install

# Install additional packages
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-toast @tanstack/react-query
npm install react-router-dom lucide-react
npm install tailwindcss-animate

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 🎯 Key Design Elements

- **Color Scheme**: Electric cyan, purple, neon green on dark background
- **Typography**: Orbitron (headings) + Rajdhani (body text)
- **Animations**: Glitch effects, holographic text, scanner lines
- **Layout**: Grid-based with floating geometric elements
- **Effects**: Neon glows, pulse animations, gradient overlays

---

## 🛠️ Customization Guide

### Colors:
Edit `src/index.css` CSS variables to change the color scheme.

### Content:
Update component props and data arrays in each component file.

### Animations:
Modify animation classes and keyframes in `src/index.css`.

### Layout:
Adjust Tailwind classes and component structure as needed.

---

## 📞 Support

This complete export includes all necessary files to recreate the futuristic portfolio website. Each component is modular and can be customized independently.

**Tech Stack:**
- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS + Custom Design System
- Radix UI + shadcn/ui Components
- Lucide React Icons
- Vercel Ready Deployment

---

*Professional futuristic portfolio showcasing project management expertise with cutting-edge design and performance optimization.*