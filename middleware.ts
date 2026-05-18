import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  email: string;
  is_admin: boolean;
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routes that need protection
  const adminRoutes = ['/dashboard/admin'];
  
  // Check if this is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute) {
    // Get token from cookies or localStorage
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Check if user is admin
      if (!decoded.is_admin) {
        // Redirect to home if not admin
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Allow the request
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For non-admin routes, continue normally
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/admin/:path*',
  ],
};
