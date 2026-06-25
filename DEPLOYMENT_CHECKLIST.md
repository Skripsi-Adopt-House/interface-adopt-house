# 📋 Quick Deployment Checklist - Melodi Kucing

Referensi cepat untuk melakukan deployment production.

---

## 🔄 Pre-Deployment (Local Development)

- [ ] Semua perubahan sudah di-test
- [ ] `npm run build` sukses tanpa error
- [ ] `npm run type-check` no errors
- [ ] Tidak ada `console.error` di browser
- [ ] Favorit feature working cross-pages
- [ ] Login/Register working
- [ ] API calls successful
- [ ] Mobile responsive tested
- [ ] `.env.local` NOT committed

---

## 📤 Git Push

```bash
# 1. Check git status
git status

# 2. Commit changes
git add .
git commit -m "feat: [describe changes]"

# 3. Push to main branch
git push origin main
# ✅ Vercel auto-triggers deployment
```

---

## 🚀 Vercel Deployment

### First Time Setup
- [ ] GitHub connected to Vercel
- [ ] Project imported in Vercel
- [ ] Build settings auto-configured

### Environment Variables Setup
```bash
# Go to Vercel Dashboard → Settings → Environment Variables
# Add these for PRODUCTION:

NEXT_PUBLIC_API_BASE_URL=https://api.adoptehouse.com/api
NEXT_PUBLIC_APP_URL=https://adopt-house.vercel.app
NEXT_PUBLIC_GA_ID=production-ga-id (optional)
```

### Trigger Deployment
1. Push code ke `main` branch
2. Vercel auto-starts build
3. Wait for "READY" status (~3-5 min)
4. Get production URL

---

## ✅ Post-Deployment Verification

### Step 1: Basic Checks
- [ ] Production URL accessible
- [ ] No error in browser console
- [ ] CSS/Styling loaded correctly
- [ ] Images displaying properly

### Step 2: Feature Testing
- [ ] Login page loads
- [ ] Register page loads
- [ ] Can login with test account
- [ ] Homepage pet list loads
- [ ] Search/filter working
- [ ] Can click on pet detail
- [ ] Favorite button working
- [ ] Favorites sync across pages
- [ ] Dashboard shows favorites
- [ ] Logout working

### Step 3: API Integration
```bash
# Open browser DevTools → Network tab
# Check API calls:
- [ ] GET /pets → 200 OK
- [ ] POST /auth/login → 200 OK
- [ ] GET /favorites → 200 OK
- [ ] POST /favorites → 200 OK
- [ ] DELETE /favorites → 200 OK

# If API failing:
- Check NEXT_PUBLIC_API_BASE_URL matches backend
- Check backend CORS allows Vercel domain
- Check backend running & accessible
```

### Step 4: Performance
- [ ] Page load time < 3s
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] Images cached properly

---

## 🔧 Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| Build failed | Delete `.next` locally, test `npm run build` |
| Env vars not working | Check Vercel Dashboard, env var name/value correct |
| API 404 error | Verify backend URL in env vars |
| CORS error | Check backend CORS config for Vercel domain |
| Page blank | Check browser console for errors |
| Hydration error | Hard refresh (Ctrl+Shift+R), clear cache |
| Mobile broken | Check responsive design, test on real device |

---

## 🔄 Rollback (if needed)

```bash
# Via Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Rollback"
4. Confirm

# Via CLI:
vercel promote <deployment-url>
```

---

## 📞 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Production URL:** https://adopt-house.vercel.app
- **GitHub Repo:** https://github.com/Skripsi-Adopt-House/interface-adopt-house
- **Backend API:** https://api.adoptehouse.com/api
- **Custom Domain:** adoptehouse.com

---

## 📊 Deployment Timeline

```
Push to main (0 min)
      ↓
Vercel detects change (1 min)
      ↓
Build starts (2 min)
      ↓
Build completes (5 min)
      ↓
Tests & checks (6 min)
      ↓
Deploy to edge (7 min)
      ↓
Live on production (8 min)
      ↓
DNS cache invalidates (varies)
      ↓
✅ READY (Check Vercel dashboard)
```

---

## 🆘 Emergency Contacts

- **Technical Issues:** tech-support@adoptehouse.com
- **Production Alert:** oncall@adoptehouse.com
- **Vercel Support:** support@vercel.com

---

## ✨ Deployment Success Checklist

- [x] Code compiled successfully
- [x] Build completed on Vercel
- [x] All tests passed
- [x] Production URL accessible
- [x] Core features working
- [x] API integration verified
- [x] No console errors
- [x] Performance acceptable
- [x] Team notified
- [x] Monitoring active

---

**Status:** ✅ READY FOR PRODUCTION

**Last Deployment:** [DATE & TIME]  
**Deployed By:** [TEAM MEMBER]  
**Build ID:** [VERCEL BUILD ID]
