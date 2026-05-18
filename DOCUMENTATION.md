# 🏠 Adopt House - Frontend Documentation

Modern pet adoption platform built with Next.js, TypeScript, Tailwind CSS, and SweetAlert2.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running at `http://localhost:3000/api`

### Installation

```bash
# Install dependencies
npm install

# Configure environment
# .env.local is already set up with:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
# NEXT_PUBLIC_APP_NAME=Adopt House

# Development server
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 📋 Features

### Public Features
- ✅ **Landing Page** - Hero section with featured pets
- ✅ **Pet Listing** - Browse all pets with search, sort, and filter
- ✅ **Pet Details** - View individual pet with image gallery
- ✅ **About Page** - Company information
- ✅ **Authentication** - Login/Register with JWT tokens

### User Features (Logged-in)
- ✅ **Favorites Dashboard** - Save and view favorite pets
- ✅ **Profile Page** - View account information
- ✅ **Add to Favorites** - One-click favorite button

### Admin Features (Admin accounts only)
- ✅ **Admin Dashboard** - Overview with stats cards
- ✅ **Pet Management** - Table view of all listings
- ✅ **Create Pet** - Add new pet with photos and details
- ✅ **Edit Pet** - Modify existing pet information
- ✅ **Delete Pet** - Remove pet listings
- ✅ **Admin Navigation** - Dedicated admin menu

---

## 🎨 Design & Colors

**Color Palette:**
- Primary: `#6499E9` (Blue)
- Secondary: `#9EDDFF` (Light Blue)
- Accent: `#A6F6FF` (Cyan)
- Soft Highlight: `#BEFFF7` (Light Cyan)
- Neutral: `#EEEEEE` (Light Gray)

**Typography:**
- Headings: Montserrat
- Body: Inter

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (public routes)
│   │   ├── page.tsx (Home)
│   │   ├── login/
│   │   ├── register/
│   │   ├── about/
│   │   ├── pets/
│   │   ├── profile/
│   │   └── dashboard/ (User favorites)
│   ├── dashboard/
│   │   └── admin/ (Admin only)
│   │       ├── page.tsx (Dashboard)
│   │       └── pets/ (Management)
│   ├── layout.tsx (Root layout)
│   ├── error.tsx (Error boundary)
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── PetCard.tsx
├── lib/
│   ├── api.ts (API service)
│   ├── alert.ts (Alert service)
│   ├── types.ts (TypeScript interfaces)
├── context/
│   └── AuthContext.tsx (Auth provider)
├── hooks/
│   └── useAuth.ts (Custom hook)
└── middleware.ts (Route protection)
```

---

## 🔐 Authentication

### Login Flow
1. User enters email/password
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. Token automatically included in all API requests
5. Token expires after 7 days

### Protected Routes
- `/dashboard/admin/*` - Admin only (middleware protection)
- `/dashboard` - Authenticated users
- `/profile` - Authenticated users

---

## 📝 API Integration

### Key Endpoints Used

**Authentication:**
- `POST /auth/register` - Create account
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout

**Pets:**
- `GET /postings` - List all pets
- `GET /postings/:id` - Get pet details
- `POST /postings` - Create pet (admin)
- `PUT /postings/:id` - Update pet (admin)
- `DELETE /postings/:id` - Delete pet (admin)

**Favorites:**
- `GET /favorites` - Get user favorites
- `POST /favorites/:petId` - Add to favorites
- `DELETE /favorites/:petId` - Remove from favorites

---

## 🧪 Testing Checklist

### Authentication
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout clears session
- [ ] Token persists on refresh
- [ ] Invalid credentials show error

### Pet Browsing
- [ ] Home page loads featured pets
- [ ] Pet listing page loads all pets
- [ ] Search filters pets by name/breed
- [ ] Sorting works (newest, name, price)
- [ ] Pet details page displays correctly
- [ ] Pet gallery shows all images

### User Features
- [ ] Add pet to favorites
- [ ] Favorites page shows saved pets
- [ ] Remove from favorites works
- [ ] Profile page displays info

### Admin Features
- [ ] Admin dashboard shows stats
- [ ] Pet management table loads
- [ ] Create pet form submits
- [ ] Edit pet form loads and saves
- [ ] Delete pet with confirmation
- [ ] Admin navigation appears when logged in as admin

### Responsiveness
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

---

## 🚀 Deployment

### Environment Variables for Production
```
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
NEXT_PUBLIC_APP_NAME=Adopt House
```

### Build & Deploy
```bash
# Build production version
npm run build

# Test production build locally
npm start

# Deploy to hosting (Vercel, Netlify, etc.)
```

---

## 📦 Dependencies

**Core:**
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

**Styling:**
- `tailwindcss` - Utility CSS
- `flowbite` - Component library

**Forms & Data:**
- `axios` - HTTP client
- `sweetalert2` - Alert dialogs
- `react-hook-form` - Form handling (configured)

**DevTools:**
- `postcss` - CSS processing
- `autoprefixer` - CSS compatibility

---

## 🐛 Troubleshooting

**Build Fails:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version`

**API Connection Issues:**
- Verify backend is running on `http://localhost:3000`
- Check `.env.local` has correct API_BASE_URL
- Check browser console for CORS errors

**Auth Not Persisting:**
- Verify localStorage is enabled
- Check token in browser DevTools → Application → localStorage
- Token should have format: `Bearer <token>`

---

## 📄 File Reference

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | Centralized API service with all endpoints |
| `src/lib/types.ts` | TypeScript interfaces for all data models |
| `src/lib/alert.ts` | SweetAlert2 notification service |
| `src/context/AuthContext.tsx` | Global authentication state |
| `src/hooks/useAuth.ts` | Hook to access auth context |
| `middleware.ts` | Route protection middleware |
| `tailwind.config.ts` | Tailwind customization |
| `.env.local` | Environment configuration |

---

## 👥 User Types

### Regular User
- View all pets and details
- Search and filter pets
- Add/remove favorites
- View profile

### Admin User
- All regular user features +
- Create pet listings
- Edit pet information
- Delete listings
- View admin dashboard with statistics

---

## 🎯 Next Steps / Future Enhancements

- [ ] Advanced pet filtering (price range, age range)
- [ ] Messaging system between users/admins
- [ ] Pet adoption request flow
- [ ] Email notifications
- [ ] Advanced search with location
- [ ] Pet comparison feature
- [ ] User reviews/ratings
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check backend API logs
4. Ensure all dependencies are installed

---

**Last Updated:** May 2026  
**Status:** ✅ Production Ready
