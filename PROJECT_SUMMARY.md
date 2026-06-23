# 🐾 Adopt House - Project Summary

**Pet Adoption Platform Frontend** | Built with Next.js 16.2.4 + TypeScript + Tailwind CSS

---

## 📋 Project Overview

Adopt House adalah platform adopsi hewan peliharaan modern yang menghubungkan calon pemilik dengan hewan-hewan yang membutuhkan rumah. Aplikasi ini menyediakan interface yang user-friendly untuk browsing, favoriting, dan mengadopsi hewan peliharaan.

**Live Port:** `http://localhost:3001`  
**Backend API:** `http://localhost:3000/api`

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.4 | React framework with App Router |
| **TypeScript** | Latest | Type-safe development |
| **Tailwind CSS** | 4.0 | Utility-first styling |
| **Flowbite** | Latest | UI components library |
| **SweetAlert2** | Latest | Beautiful alerts & modals |
| **Axios** | Latest | HTTP client with interceptors |
| **React Context API** | Built-in | Global state management |
| **Node.js** | 18+ | Runtime environment |

---

## 📁 Project Structure

```
adopt_interface/
├── src/
│   ├── app/                           # Next.js app directory
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Homepage/landing page
│   │   ├── login/page.tsx             # Login page
│   │   ├── register/page.tsx          # Registration page
│   │   ├── profile/page.tsx           # User profile page
│   │   ├── pets/
│   │   │   ├── page.tsx               # Pet listing/search page
│   │   │   └── [id]/page.tsx          # Pet detail page
│   │   ├── dashboard/
│   │   │   ├── page.tsx               # Favorites dashboard
│   │   │   └── admin/                 # Admin routes (protected)
│   │   │       ├── page.tsx           # Admin dashboard
│   │   │       └── pets/
│   │   │           ├── page.tsx       # Pet management list
│   │   │           ├── new/page.tsx   # Create new pet
│   │   │           └── [id]/edit/page.tsx # Edit pet
│   │   ├── faq/page.tsx               # FAQ page
│   │   ├── panduan-perawatan/page.tsx # Care guide page
│   │   ├── hubungi-kami/page.tsx      # Contact us page
│   │   ├── about/page.tsx             # About page
│   │   ├── kebijakan-privasi/page.tsx # Privacy policy
│   │   ├── syarat-layanan/page.tsx    # Terms of service
│   │   ├── globals.css                # Global styles
│   │   └── middleware.ts              # Route protection middleware
│   ├── components/
│   │   ├── Layout.tsx                 # Main layout wrapper
│   │   ├── Navigation.tsx             # Header/navbar
│   │   ├── Footer.tsx                 # Footer component
│   │   ├── PetCard.tsx                # Pet card component
│   │   ├── ErrorBoundary.tsx          # Error boundary wrapper
│   │   └── [other components]
│   ├── context/
│   │   ├── AuthContext.tsx            # Auth provider & hook
│   │   └── useAuth.ts                 # useAuth hook
│   ├── contexts/
│   │   └── FavoritesContext.tsx       # Favorites global state (NEW)
│   ├── lib/
│   │   ├── api.ts                     # Centralized API service
│   │   ├── alert.ts                   # Alert service (SweetAlert2)
│   │   └── types.ts                   # TypeScript types/interfaces
│   ├── hooks/
│   │   └── useAuth.ts                 # Custom auth hook
│   └── styles/
│       └── [custom styles]
├── public/                            # Static assets
│   ├── logo.webp
│   └── [images]
├── .env.local                         # Environment variables
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.ts                 # Tailwind configuration
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies & scripts
└── PROJECT_SUMMARY.md                 # This file
```

---

## 🗂️ Key Files Overview

### **Entry Points**

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with Auth & Favorites providers |
| `src/app/page.tsx` | Homepage with featured pets & CTA |
| `middleware.ts` | Route protection for `/dashboard/admin/*` |

### **Core Services**

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | Centralized API client with 30+ endpoints |
| `src/lib/alert.ts` | Alert/toast notifications using SweetAlert2 |
| `src/context/AuthContext.tsx` | Auth state & JWT management |
| `src/contexts/FavoritesContext.tsx` | Global favorites state (v2 - synced across pages) |

### **Reusable Components**

| Component | Purpose | Location |
|-----------|---------|----------|
| `Layout` | Wrapper with nav & footer | `src/components/Layout.tsx` |
| `PetCard` | Pet display card with actions | `src/components/PetCard.tsx` |
| `Navigation` | Header with user menu | `src/components/Navigation.tsx` |
| `Footer` | Footer with links | `src/components/Footer.tsx` |
| `ErrorBoundary` | Error handling wrapper | `src/components/ErrorBoundary.tsx` |

---

## 🌐 Routes & Pages

### **Public Routes** (No login required)
```
/                         # Homepage
/register                 # User registration
/login                    # User login
/pets                     # Pet listing & search
/pets/[id]               # Pet detail view
/about                   # About page
/faq                     # FAQ
/panduan-perawatan       # Care guides
/hubungi-kami            # Contact form
/kebijakan-privasi       # Privacy policy
/syarat-layanan          # Terms of service
```

### **Protected Routes** (Login required)
```
/dashboard               # User's favorites
/profile                 # User profile & settings
```

### **Admin Routes** (Admin only - Protected by middleware)
```
/dashboard/admin         # Admin dashboard
/dashboard/admin/pets    # Pet management list
/dashboard/admin/pets/new          # Create new pet
/dashboard/admin/pets/[id]/edit    # Edit existing pet
```

---

## 🎨 Design System

### **Color Palette**
```
Primary:      #6499E9    (Blue - Main brand color)
Secondary:    #9EDDFF    (Light Blue)
Accent:       #A6F6FF    (Cyan)
Soft Highlight: #BEFFF7  (Pale Cyan)
Neutral BG:   #EEEEEE    (Off-white)
```

### **Typography**
- **Fonts:** Inter (body), Montserrat (headings)
- **Sizes:** 12px (sm) to 48px (5xl)
- **Font Weights:** 400 (regular), 600 (semibold), 700 (bold), 900 (black)

### **Custom Animations**
- `fadeIn` - Smooth fade entrance
- `slideInUp` - Slide up from bottom

---

## ✨ Key Features

### **Authentication** ✅
- Register with email & password
- Login with JWT token (7-day expiration)
- Auto-logout on token expiration
- Login check via middleware

### **Pet Management** ✅
- Browse 50+ adoptable pets
- Search & filter by type, breed, age
- View detailed pet profiles with gallery
- Auto-slideshow of pet photos

### **Favorites System** ✅ (v2 - Global State)
- Add/remove pets from favorites
- Favorite status syncs across all pages instantly
- Favorites dashboard with all favorited pets
- Remove favorite from any page

### **Admin Dashboard** ✅
- Create new pet listings
- Upload pet photos (multiple)
- Edit/update pet information
- Delete pet listings
- View all pets management

### **User Profile** ✅
- View personal information
- Update profile settings
- Change password
- View adoption history

### **Information Pages** ✅
- Pet care guides (dogs, cats, new pets, health)
- FAQ with 14 Q&As in 5 categories
- Contact form with validation
- Social media links
- About company page
- Privacy policy (12 sections)
- Terms of service (16 sections)

---

## 🔐 Security Features

### **Authentication & Authorization**
- JWT-based authentication
- Secure token storage in localStorage
- Automatic token refresh (via interceptors)
- Route protection via middleware
- Admin-only route verification

### **Data Protection**
- API request/response interceptors
- Automatic Bearer token injection
- Error handling & validation
- CORS configuration
- XSS protection via React escaping

### **Form Validation**
- Email format validation
- Required field checks
- Password strength requirements
- Phone number formatting

---

## 📊 API Integration

### **Base URL**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### **Key Endpoints**
```
Auth:
  POST   /auth/register           # Register new user
  POST   /auth/login              # Login user
  POST   /auth/refresh            # Refresh JWT token

Pets:
  GET    /postings                # List all pets
  GET    /postings/:id            # Get pet details
  POST   /postings                # Create pet (admin)
  PUT    /postings/:id            # Update pet (admin)
  DELETE /postings/:id            # Delete pet (admin)

Favorites:
  GET    /favorites               # Get user's favorites
  GET    /favorites/:id           # Check if favorited
  POST   /favorites               # Add to favorites
  DELETE /favorites/:id           # Remove from favorites

User:
  GET    /users/me                # Get current user profile
  PUT    /users/me                # Update profile
  POST   /users/change-password   # Change password
```

### **Request/Response Interceptors**
- Auto-inject JWT token in headers
- Handle 401 (auto-logout)
- Global error handling
- Request timeout (30s)

---

## 🎯 State Management

### **Authentication State** (Context API)
```
AuthContext provides:
  - user (User object)
  - token (JWT)
  - isLoading
  - login(email, password)
  - register(...)
  - logout()
```

### **Favorites State** (FavoritesContext - Global)
```
FavoritesContext provides:
  - favoritedPetIds (Set<string>)
  - isFavorited(petId)
  - toggleFavorite(petId, bool)
  - addFavoritePetId(petId)
  - removeFavoritePetId(petId)
  - loadFavorites()
  - isLoading
```

---

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Backend API running on port 3000

### **Install Dependencies**
```bash
npm install
```

### **Environment Variables** (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### **Development Server**
```bash
npm run dev
```
Open `http://localhost:3001` in browser

### **Build for Production**
```bash
npm run build
npm start
```

### **Development Commands**
```bash
npm run dev              # Start dev server (with Turbopack)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript
```

---

## 📈 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Automatic code splitting per route
- ✅ CSS-in-JS with Tailwind (no runtime overhead)
- ✅ Server-side rendering (App Router)
- ✅ Static generation where possible
- ✅ Turbopack compilation (fast builds)

---

## 🐛 Error Handling

### **Global Error Boundary**
```
ErrorBoundary wrapper catches React errors
→ Shows error page with details
→ Allows retry or navigation back
```

### **API Errors**
```
APIService error handling:
  - 401: Auto-logout & redirect to login
  - 404: Show "not found" message
  - 500: Show server error message
  - Network error: Show connection error
```

### **Form Validation**
```
AlertService.error()    # Error alerts
AlertService.warning()  # Warning alerts
AlertService.success()  # Success alerts
AlertService.toast()    # Toast notifications
AlertService.confirm()  # Confirmation dialogs
```

---

## 📦 Dependencies Summary

```json
{
  "react": "19.x",
  "next": "16.2.4",
  "typescript": "5.x",
  "tailwindcss": "4.0",
  "flowbite": "latest",
  "sweetalert2": "latest",
  "axios": "latest",
  "next-image-export-optimizer": "latest"
}
```

---

## 🔄 Recent Updates (v2.0)

### **Favorite Feature Overhaul**
- ❌ Removed local component state
- ✅ Implemented FavoritesContext (global state)
- ✅ Instant sync across all pages
- ✅ Auto-load favorites on login
- ✅ Consistent button states everywhere

### **New Pages Added**
- ✅ Panduan Perawatan (Care Guides)
- ✅ FAQ (14 items, 5 categories)
- ✅ Hubungi Kami (Contact Form)
- ✅ Kebijakan Privasi (Privacy Policy)
- ✅ Syarat Layanan (Terms of Service)

### **Component Improvements**
- ✅ PetCard simplified with context
- ✅ Better error handling
- ✅ Responsive design refinements

---

## 🧪 Testing Strategy

### **Manual Testing Checklist**
```
[ ] User Registration & Login
[ ] Pet Listing & Search
[ ] Pet Detail View
[ ] Favorite Toggle
[ ] Admin Pet CRUD
[ ] Profile Update
[ ] Responsive Design (Mobile/Tablet/Desktop)
[ ] Error Handling
[ ] Page Navigation
[ ] FAQ Category Filter
[ ] Contact Form Validation
```

---

## 📝 Commit History

```
v2.0.0  - Add favorite global state, 5 new info pages
v1.5.0  - Admin pet management complete
v1.4.0  - Authentication system
v1.3.0  - Pet listing & detail pages
v1.2.0  - UI/UX refinements
v1.1.0  - API integration
v1.0.0  - Initial project setup
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes with TypeScript strict mode
3. Test thoroughly across devices
4. Commit with clear messages
5. Push and create pull request

---

## 📞 Support & Contact

**Project Issues/Questions:**
- Email: dev@adopthouse.com
- GitHub Issues: [Project Repository]

**User Support:**
- Email: info@adopthouse.com
- Phone: (021) 1234-5678
- Website: www.adopthouse.com

---

## 📄 License

© 2026 Adopt House. All rights reserved.

---

## 🎯 Future Roadmap

- [ ] Real-time chat with adopters
- [ ] Video call consultations
- [ ] Mobile app (React Native)
- [ ] Adoption progress tracking
- [ ] Pet wellness subscription
- [ ] AI pet recommendation
- [ ] Social community features
- [ ] Payment integration (Stripe)

---

**Last Updated:** 23 Juni 2026  
**Maintained By:** Adopt House Dev Team  
**Status:** ✅ Production Ready
