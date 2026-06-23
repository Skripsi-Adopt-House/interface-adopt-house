# 🐾 Adopt House - Pet Adoption Platform

Platform adopsi hewan peliharaan modern dengan teknologi Next.js terkini. Menghubungkan calon pengadopsi dengan hewan peliharaan yang membutuhkan rumah baru.

![Adopt House](https://img.shields.io/badge/Status-Production%20Ready-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?style=flat-square&logo=tailwind-css)

---

## ✨ Fitur Utama

### 👤 User Features
- ✅ **User Authentication** - Registrasi & login dengan JWT token (7 hari expiration)
- ✅ **Browse Pets** - Jelajahi 50+ hewan peliharaan dengan search & filter
- ✅ **Pet Details** - Lihat galeri foto, informasi kesehatan, & cerita hewan
- ✅ **Favorites System** - Tambah/hapus favorit dengan instant sync across pages
- ✅ **Dashboard** - View semua hewan peliharaan favorit
- ✅ **Responsive Design** - Mobile-first, optimal di semua devices

### 👨‍💼 Admin Features
- ✅ **Pet Management** - Create, Read, Update, Delete posting hewan
- ✅ **Image Upload** - Support multiple images dengan cloud storage
- ✅ **Admin Dashboard** - Kelola semua listing hewan peliharaan
- ✅ **Protected Routes** - Middleware protection untuk admin-only pages

### 📚 Information Pages
- ✅ **Panduan Perawatan** - Comprehensive guides untuk perawatan hewan
- ✅ **FAQ** - Tanya jawab dengan kategori & filtering
- ✅ **Hubungi Kami** - Contact form & informasi kontak
- ✅ **Kebijakan Privasi** - Privacy policy lengkap
- ✅ **Syarat Layanan** - Terms of service & legal terms

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript 5.0
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4.0
- **Component Library:** Flowbite
- **Notifications:** SweetAlert2
- **HTTP Client:** Axios

### Backend (Integration)
- **API Base URL:** `http://localhost:3000/api` (dev)
- **Authentication:** JWT (Bearer Token)
- **Request Timeout:** 30 seconds
- **File Upload:** FormData support

### State Management
- **Context API** - AuthContext, FavoritesContext
- **Local Storage** - Token persistence
- **Global State** - Favorites sync across pages

### Development Tools
- **Build Tool:** Turbopack
- **Package Manager:** npm / yarn
- **Version Control:** Git
- **Code Quality:** TypeScript strict mode

---

## 📋 Persyaratan

- **Node.js:** v18.0.0 atau lebih tinggi
- **npm:** v9.0.0 atau lebih tinggi (atau yarn/pnpm)
- **Backend API:** Running di http://localhost:3000/api
- **Browser:** Modern browser dengan ES6+ support

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Skripsi-Adopt-House/interface-adopt-house.git
cd interface-adopt-house
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Konfigurasi `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4. Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Akses aplikasi di [http://localhost:3001](http://localhost:3001)

### 5. Build for Production
```bash
npm run build
npm run start
# atau
yarn build
yarn start
```

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout dengan providers
│   ├── page.tsx                 # Home page
│   ├── login/                   # Authentication pages
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── pets/                    # Pet browsing
│   │   ├── page.tsx            # Pet list dengan search/filter
│   │   └── [id]/
│   │       └── page.tsx        # Pet detail
│   ├── dashboard/               # User & Admin dashboard
│   │   ├── page.tsx            # User favorites dashboard
│   │   └── admin/              # Admin pages (middleware protected)
│   │       ├── pets/
│   │       │   ├── page.tsx    # Admin pet list
│   │       │   └── new/
│   │       │       └── page.tsx # Create new pet posting
│   ├── panduan-perawatan/       # Information pages
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── hubungi-kami/
│   │   └── page.tsx
│   ├── kebijakan-privasi/
│   │   └── page.tsx
│   ├── syarat-layanan/
│   │   └── page.tsx
│   ├── globals.css              # Global styles
│   └── middleware.ts            # Route protection
│
├── components/                   # Reusable components
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── PetCard.tsx             # Pet card component
│   ├── SearchBar.tsx           # Search functionality
│   ├── FilterSidebar.tsx       # Filter options
│   └── ...
│
├── contexts/                     # Global state management
│   ├── AuthContext.tsx         # Authentication state
│   └── FavoritesContext.tsx    # Favorites state
│
├── services/                     # API & utilities
│   ├── apiService.ts           # Axios API client
│   ├── alertService.ts         # SweetAlert2 wrapper
│   └── ...
│
├── types/                        # TypeScript types
│   ├── pet.ts
│   ├── auth.ts
│   └── ...
│
├── lib/                          # Utilities
│   ├── axios.ts                # Axios configuration
│   └── ...
│
└── public/                       # Static assets
    ├── logo.webp
    ├── images/
    └── ...

next.config.js                   # Next.js configuration
tailwind.config.ts              # Tailwind CSS config
tsconfig.json                   # TypeScript config
package.json                    # Dependencies
.env.example                    # Environment variables template
middleware.ts                   # Route middleware
```

---

## 🔐 Environment Variables

### Development (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Optional: Analytics, etc
# NEXT_PUBLIC_GA_ID=your-ga-id
```

### Production (Vercel/Hosting)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.adoptehouse.com/api
NEXT_PUBLIC_APP_URL=https://adoptehouse.com

# Other production variables
# NEXT_PUBLIC_GA_ID=your-ga-id
```

**Important:** 
- Prefix `NEXT_PUBLIC_` berarti variable accessible di client-side
- Jangan commit `.env.local` ke repository (sudah di `.gitignore`)
- Update environment variables sesuai environment (dev/staging/production)

---

## 🔑 API Authentication

Aplikasi menggunakan **JWT (JSON Web Tokens)** untuk authentication:

### Token Management
- **Token Duration:** 7 hari
- **Storage:** localStorage (`auth_token`)
- **Header:** `Authorization: Bearer {token}`
- **Auto-logout:** Automatic pada token expiration

### API Request Flow
```
1. User login → Server return JWT token
2. Client store token di localStorage
3. Axios interceptor inject token ke header
4. Server verify token & return data
5. Token expired → Auto-logout & redirect ke login
```

### Example API Calls
```bash
# Login
POST /api/auth/login
Body: { email, password }
Response: { token, user }

# Get Favorites
GET /api/favorites
Header: Authorization: Bearer {token}

# Add Favorite
POST /api/favorites
Body: { posting_id }
Header: Authorization: Bearer {token}

# Create Pet Posting (Admin)
POST /api/postings
Body: FormData { name, breed, age, images, ... }
Header: Authorization: Bearer {token}
```

---

## 📊 Key Features Details

### Favorite System (v2.0)
- **Global State:** FavoritesContext dengan Set<string>
- **Instant Sync:** Update di satu page → sync ke semua pages
- **API Integration:** Auto-load favorites pada user login
- **Persistent:** Favorites maintained throughout session

### Admin Panel
- **Middleware Protection:** Route `/dashboard/admin/*` protected
- **Pet Management:** Create, update, delete listings
- **Image Upload:** Multiple image support dengan cloud storage
- **Form Validation:** Frontend validation sebelum API call

### Responsive Design
- **Mobile:** 100% responsive, optimized untuk mobile
- **Tablet:** Perfect layout untuk tablet devices
- **Desktop:** Full featured desktop experience
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)

---

## 🧪 Testing & Quality

### TypeScript Strict Mode
- All components fully typed
- No `any` types
- Strict null checks enabled

### Code Quality
- ESLint configuration for code standards
- TypeScript compiler validation
- Next.js build verification

### Build Verification
```bash
# Check build
npm run build

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

---

## 📝 Development Workflow

### Creating New Component
```tsx
// src/components/MyComponent.tsx
'use client';

import { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
}

export default function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

### Creating New API Integration
```tsx
// Use apiService from services/apiService
import { apiService } from '@/services/apiService';

const response = await apiService.getPets({
  page: 1,
  limit: 10,
  search: 'anjing'
});
```

### Using Global State
```tsx
// Use AuthContext
import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Please login</p>;
  }
  
  return <p>Welcome {user?.name}</p>;
}

// Use FavoritesContext
import { useFavorites } from '@/contexts/FavoritesContext';

export default function PetCard({ petId }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const liked = isFavorited(petId);
  
  return (
    <button onClick={() => toggleFavorite(petId, !liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
```

---

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

#### Prerequisites
- GitHub repository connected to Vercel
- Vercel account

#### Steps

1. **Push Code ke GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect Vercel**
- Masuk ke [vercel.com](https://vercel.com)
- Click "New Project"
- Select repository `interface-adopt-house`
- Click "Import"

3. **Configure Environment**
- Set Environment Variables:
  - `NEXT_PUBLIC_API_BASE_URL`: Production API URL
  - `NEXT_PUBLIC_APP_URL`: Production app URL
- Click "Deploy"

4. **Custom Domain (Optional)**
- Go to Project Settings → Domains
- Add custom domain
- Update DNS records

#### Vercel Configuration
File `vercel.json` (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api_base_url",
    "NEXT_PUBLIC_APP_URL": "@app_url"
  }
}
```

### Deploy ke Server Lain

#### Build Static Export (if needed)
```bash
npm run build
# Output di: .next/
```

#### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

---

## 🔧 Troubleshooting

### Hydration Mismatch Error
**Cause:** Browser extensions adding attributes to HTML  
**Solution:** Already fixed with `suppressHydrationWarning` in layout.tsx

### API Connection Failed
- Verify backend API running di http://localhost:3000/api
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check network tab di browser DevTools

### Token Expired
- Clear localStorage & login kembali
- Check JWT expiration time (7 hari)

### Build Fails
- Delete `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Restart dev server

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Axios:** https://axios-http.com
- **Flowbite React:** https://flowbite-react.com

---

## 🤝 Contributing

### Development Setup
1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes & commit: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open Pull Request

### Code Standards
- Follow TypeScript strict mode
- Use functional components with hooks
- Add meaningful commit messages
- Test before submitting PR

### Commit Message Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### Contact Information
- **Email:** support@adoptehouse.com
- **Website:** https://adoptehouse.com
- **Phone:** +62-XXX-XXXX-XXXX
- **Office:** Jl. Contoh, Kota, Provinsi, Indonesia

### Support Hours
- **Monday - Friday:** 09:00 - 17:00 WIB
- **Saturday:** 10:00 - 15:00 WIB
- **Sunday & Holiday:** Closed

### Follow Us
- **Instagram:** @adoptehouse.id
- **Facebook:** Adopt House Indonesia
- **Twitter:** @AdoptHouseID
- **TikTok:** @adoptehouse.id

---

## 🎯 Roadmap

### Version 2.0 (Planned)
- [ ] Video tour untuk each pet
- [ ] Advanced adoption matching algorithm
- [ ] Pet health tracking system
- [ ] Mobile app (React Native)
- [ ] AI-powered pet recommendations
- [ ] Adoption success stories
- [ ] Vaccination & medical records

### Version 3.0 (Future)
- [ ] Pet insurance integration
- [ ] Virtual pet consultation
- [ ] Pet training programs
- [ ] Community forum
- [ ] Pet finder based on location
- [ ] Adoption sponsorship program

---

## 📈 Performance Optimization

### Current Optimizations
- Image optimization dengan Next.js Image component
- Code splitting & lazy loading
- CSS-in-JS with Tailwind (minimal bundle)
- API response caching
- LocalStorage for token persistence

### Monitoring
- Browser DevTools Network tab untuk API performance
- Lighthouse untuk performance metrics
- Vercel Analytics untuk real-world usage

---

## 🔐 Security Best Practices

✅ Implemented:
- JWT authentication dengan 7-day expiration
- Middleware protection untuk admin routes
- HTTPS ready untuk production
- XSS protection dengan React sanitization
- CSRF protection via Next.js built-in

---

## 📊 Project Statistics

- **Total Pages:** 18 routes
- **Components:** 15+ reusable components
- **API Endpoints:** 30+ endpoints
- **Development Time:** Complete & production ready
- **Code Quality:** TypeScript strict mode ✅

---

**Last Updated:** June 24, 2026  
**Status:** Production Ready ✅  
**Maintained By:** Adopt House Development Team
