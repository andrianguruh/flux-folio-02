# PM.TECH Portfolio - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pmtech-portfolio)

### Manual Deployment

1. **Prerequisites**
   ```bash
   npm install -g vercel
   ```

2. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd pmtech-portfolio
   npm install
   ```

3. **Build Locally (Optional)**
   ```bash
   npm run build
   npm run preview
   ```

4. **Deploy to Vercel**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy (first time)
   vercel
   
   # Deploy to production
   vercel --prod
   ```

### Environment Variables
No environment variables required for this static portfolio.

### Custom Domain Setup

1. **Add Domain in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **DNS Configuration**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

### Performance Optimizations

The project includes:
- ✅ Static asset optimization
- ✅ Image optimization with Vercel
- ✅ Automatic caching headers
- ✅ Security headers
- ✅ SPA routing support

### Vercel Configuration

The `vercel.json` file includes:
- **Framework**: Vite detection
- **Build Settings**: Automatic build command detection
- **Routing**: SPA fallback to index.html
- **Headers**: Security and caching headers
- **Asset Optimization**: Long-term caching for static assets

### Build Process

1. **Install Dependencies**: `npm install`
2. **Build Project**: `npm run build`
3. **Output Directory**: `dist/`

### Analytics & Monitoring

Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to your main component:
```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Speed & Performance

Expected performance scores:
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s

### Troubleshooting

**Common Issues:**

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues**
   - Ensure `vercel.json` includes SPA rewrites
   - Check React Router configuration

3. **Asset Loading Issues**
   - Verify public assets are in `public/` directory
   - Check import paths for assets

### Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/

---

## 🎨 Project Features

- **Futuristic Design System** with cyberpunk aesthetics
- **Responsive Layout** optimized for all devices
- **Performance Optimized** with lazy loading and caching
- **SEO Ready** with proper meta tags and structure
- **Accessibility Compliant** with ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills showcase
│   ├── Projects.tsx    # Project portfolio
│   ├── Clients.tsx     # Client testimonials
│   ├── Contact.tsx     # Contact form
│   └── Navigation.tsx  # Navigation header
├── assets/             # Static assets
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css          # Global styles & design system
```