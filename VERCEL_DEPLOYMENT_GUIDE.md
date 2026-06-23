# 🚀 Vercel Deployment Guide - Adopt House

Panduan lengkap untuk deploy Adopt House ke Vercel dengan konfigurasi optimal.

---

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan hal-hal berikut sudah ready:

- [ ] Code sudah di-commit dan push ke GitHub
- [ ] `.env.local` NOT committed (di `.gitignore`)
- [ ] `.env.example` sudah di-commit dengan template yang benar
- [ ] `package.json` dependencies sudah di-update
- [ ] Build sudah tested locally dengan `npm run build`
- [ ] Tidak ada TypeScript errors
- [ ] Backend API URL sudah disiapkan (production URL)
- [ ] Vercel account sudah dibuat

---

## 🔧 Prerequisites

### 1. GitHub Repository
- Repository harus public atau Vercel punya akses
- Connected ke GitHub organization/personal account
- Branch `main` sebagai production branch

### 2. Vercel Account
- Sign up di [vercel.com](https://vercel.com)
- Link dengan GitHub account
- Vercel CLI (optional): `npm i -g vercel`

### 3. Backend API
- API harus accessible dari production environment
- CORS configuration sudah di-setup
- API endpoints sudah verified & working

---

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Code for Production

```bash
# 1. Update environment variables di .env.example
cat .env.example
# Pastikan semua required variables ada

# 2. Test build locally
npm run build

# 3. Verify no errors
npm run type-check

# 4. Commit & push to GitHub
git add .
git commit -m "chore: prepare for vercel deployment"
git push origin main
```

### Step 2: Create Vercel Project

#### Option A: Using Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Buka https://vercel.com
   - Login dengan GitHub account
   - Click "New Project"

2. **Import Repository**
   - Search "interface-adopt-house"
   - Click "Import"
   - Vercel akan auto-detect Next.js

3. **Project Settings**
   - Project Name: `adopt-house` (atau sesuai keinginan)
   - Framework: Next.js (should be auto-detected)
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
   - Install Command: `npm install` (auto)

4. **Environment Variables**
   - Click "Environment Variables"
   - Tambahkan variables (lihat bagian Environment Variables)
   - Select "Production" untuk production deployment

5. **Deploy**
   - Click "Deploy"
   - Tunggu build selesai (~3-5 menit)
   - Get production URL

#### Option B: Using Vercel CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login
# Follow instructions, login dengan GitHub

# 3. Deploy to Vercel
vercel --prod
# Follow prompts & select settings

# 4. Get production URL
# URL akan muncul di terminal
```

### Step 3: Configure Environment Variables

#### Production Environment Variables

Di Vercel Dashboard, go to **Settings → Environment Variables** dan tambahkan:

```env
# PRODUCTION URLs
NEXT_PUBLIC_API_BASE_URL=https://api.adoptehouse.com/api
NEXT_PUBLIC_APP_URL=https://adopt-house.vercel.app

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-production-ga-id

# Optional: Sentry
NEXT_PUBLIC_SENTRY_DSN=your-production-sentry-dsn
```

**Important Notes:**
- Gunakan PRODUCTION API URL, bukan localhost!
- Setiap perubahan env vars butuh re-deploy
- Env vars harus di-set SEBELUM atau SESUDAH deploy?
  - Sebelum: Deploy akan skip, harus manual trigger
  - Sesudah: Deploy baru dengan new env vars

### Step 4: Verify Deployment

```bash
# 1. Check Vercel Dashboard
# - Go to Deployments
# - Check latest deployment status
# - Should show "READY" status

# 2. Test Production URL
curl https://adopt-house.vercel.app
# Should return HTML response

# 3. Browser Test
# - Open https://adopt-house.vercel.app
# - Check console for errors
# - Test login functionality
# - Test favorite feature
# - Test API calls

# 4. Check Logs
# - Go to Vercel Dashboard → Deployments
# - Click latest deployment
# - Check Build Logs & Runtime Logs
# - Look for any errors or warnings
```

---

## 🔐 Environment Variables Setup

### Development (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Production (Vercel Dashboard)
```env
NEXT_PUBLIC_API_BASE_URL=https://api.adoptehouse.com/api
NEXT_PUBLIC_APP_URL=https://adopt-house.vercel.app
```

### Preview (Optional)
```env
# Untuk preview deployments dari PR
NEXT_PUBLIC_API_BASE_URL=https://api-staging.adoptehouse.com/api
NEXT_PUBLIC_APP_URL=https://adopt-house-preview.vercel.app
```

**Variable Types:**
- `NEXT_PUBLIC_*` → Accessible di client (browser)
- `*` (tanpa prefix) → Server-only (backend secrets)
- Dokumentasi: [Vercel Env Vars](https://vercel.com/docs/environment-variables)

---

## 🌐 Custom Domain Setup

### Connect Custom Domain

1. **Go to Vercel Dashboard**
   - Project → Settings → Domains

2. **Add Domain**
   - Click "Add"
   - Enter domain name: `adoptehouse.com`
   - Pilih verification method:
     - CNAME (recommended): `adoptehouse-prod.vercel.app`
     - Name Server: Update NS records

3. **Update DNS**
   - Go ke domain registrar (GoDaddy, Cloudflare, etc)
   - Add CNAME record:
     ```
     Name: adoptehouse.com
     Type: CNAME
     Value: adoptehouse-prod.vercel.app
     TTL: 3600
     ```
   - Wait ~24 hours untuk DNS propagation

4. **Verify**
   - Check in Vercel Dashboard
   - Should show "Valid Configuration"
   - HTTPS certificate auto-created

### SSL Certificate
- Vercel auto-generates SSL via Let's Encrypt
- No additional setup needed
- Free & auto-renews

---

## 📊 Monitoring & Logs

### Real-time Logs
```bash
# Tail logs dari production deployment
vercel logs --prod
# atau di Vercel Dashboard → Deployments → Functions
```

### Performance Analytics
- **Vercel Dashboard** → Analytics
- Track:
  - Page views
  - Response times
  - Error rates
  - Bandwidth usage

### Error Tracking (Optional)
1. Setup Sentry integration
2. Add `NEXT_PUBLIC_SENTRY_DSN` env var
3. Errors auto-reported ke Sentry dashboard

### Debugging Failed Deployment
```bash
# 1. Check build logs
vercel logs --prod

# 2. Common issues:
# - Build fails: Check npm run build locally
# - Runtime errors: Check env variables
# - CORS errors: Check API CORS configuration
# - 404 errors: Check routes & redirects

# 3. Re-deploy
vercel redeploy
```

---

## 🔄 CI/CD Pipeline (Optional)

### Auto-Deploy on Git Push

Vercel auto-deploys pada:
- **Push ke main** → Production deployment
- **Create PR** → Preview deployment
- **Push ke other branches** → No auto-deploy

### Disable Auto-Deploy (if needed)
- Vercel Dashboard → Settings → Git
- Uncheck "Automatic deployments"

### Manual Redeploy
```bash
# Redeploy last commit
vercel redeploy

# Redeploy from dashboard
# Deployments → Select deployment → Redeploy
```

---

## 🔀 Preview Deployments

### Automatic Preview Deployments
- Setiap PR ke `main` → auto create preview deployment
- URL: `https://adopt-house-pr-123.vercel.app`
- Share preview URL untuk review

### Manual Preview
```bash
# Deploy ke preview
vercel --target=production
# atau
vercel preview
```

---

## ⚡ Performance Optimization

### Vercel Edge Network
- Sudah default dengan Vercel
- Content cached di edge locations globally
- Auto-invalidate cache saat deploy baru

### Image Optimization
- Next.js Image component auto-optimized
- Vercel handles resizing & format conversion
- No additional setup needed

### Cache Headers (sudah di vercel.json)
```json
{
  "headers": [
    {
      "source": "/static/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🔧 Rollback to Previous Deployment

### Using Vercel Dashboard
1. Go to Deployments
2. Find previous working deployment
3. Click "..." menu
4. Select "Rollback"
5. Confirm & deploy

### Using CLI
```bash
# List recent deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

---

## 🚨 Troubleshooting

### Build Failed

**Error: "npm run build failed"**
```bash
# 1. Test locally
npm run build
npm run type-check

# 2. Check package.json scripts
npm run build
# Should complete without errors

# 3. Clear Vercel cache
# Dashboard → Settings → Git → Clear Build Cache

# 4. Re-deploy
vercel redeploy
```

### Environment Variables Not Loaded

**Error: "Cannot find module" atau undefined env vars**
```bash
# 1. Verify env vars in Vercel Dashboard
# Settings → Environment Variables
# Check: variable name, value, environment selection

# 2. Env vars must start with NEXT_PUBLIC_ untuk client-side
# Client-side: NEXT_PUBLIC_API_BASE_URL
# Server-side: API_SECRET_KEY

# 3. Re-deploy after setting env vars
vercel redeploy
```

### CORS Error from API

**Error: "CORS error when fetching /api/..."**
```bash
# 1. Check backend CORS configuration
# Backend harus allow origin dari Vercel deployment:
# https://adopt-house.vercel.app

# 2. Verify API_BASE_URL is correct
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

# 3. Check browser console Network tab
# Look at API request headers
```

### Hydration Mismatch

**Error: "Hydration mismatch" di console**
- Already fixed in codebase dengan `suppressHydrationWarning`
- Clear browser cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R

### 404 Page Not Found

**Error: "404 Page Not Found"**
```bash
# 1. Check routes di src/app/
# Routes should exist as page.tsx files

# 2. Check redirects di vercel.json
# Redirects must be valid

# 3. Check production build locally
npm run build
npm start
# Try accessing same path locally
```

---

## 📈 Monitoring Checklist

After deployment, verify:

- [ ] Production URL accessible
- [ ] Homepage loads correctly
- [ ] No console errors
- [ ] API calls working (check Network tab)
- [ ] Authentication working (login/register)
- [ ] Favorites feature working
- [ ] Mobile responsive
- [ ] Images loading correctly
- [ ] CSS styles applied
- [ ] Analytics tracking (if enabled)

---

## 🔄 Deployment Process Flow

```
1. Make Changes Locally
   ↓
2. Test Build: npm run build
   ↓
3. Git Commit & Push
   ↓
4. Vercel Auto-Detects Push
   ↓
5. Build On Vercel Servers
   ↓
6. Run Tests & Checks
   ↓
7. Deploy to Production
   ↓
8. DNS Propagates
   ↓
9. Verify Production URL
```

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Vercel CLI:** https://vercel.com/docs/cli
- **Environment Variables:** https://vercel.com/docs/environment-variables
- **Custom Domains:** https://vercel.com/docs/concepts/projects/domains
- **Troubleshooting:** https://vercel.com/help

---

## 💬 Getting Help

### From Vercel
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel

### From Community
- **Stack Overflow:** Tag `vercel`
- **GitHub Discussions:** https://github.com/vercel/vercel/discussions
- **Next.js Discord:** https://discord.gg/nextjs

---

## 🎉 Production Checklist

Final verification sebelum launching ke production:

- [ ] Deployment successful on Vercel
- [ ] Custom domain connected & working
- [ ] SSL certificate active
- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] No console errors in production
- [ ] Authentication system working
- [ ] Database/API responding correctly
- [ ] Monitoring & logging setup
- [ ] Backup strategy in place
- [ ] Emergency rollback plan ready
- [ ] Team trained on deployment process
- [ ] Documentation updated
- [ ] Launch announced!

---

**Last Updated:** June 24, 2026  
**Guide Version:** 1.0  
**Status:** Production Ready ✅
