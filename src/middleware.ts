import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protected routes configuration
  const protectedRoutes = {
    '/dashboard/client': 'client',
    '/dashboard/reseller': 'reseller',
    '/dashboard/environment': 'environment',
    '/profile': null, // Any authenticated user
    '/settings': null, // Any authenticated user
  };
  
  // Check if the route is protected
  const protectedRoute = Object.keys(protectedRoutes).find(route => 
    pathname.startsWith(route)
  );
  
  if (!protectedRoute) {
    // Public route, allow access
    return NextResponse.next();
  }
  
  // Get user data from localStorage (client-side check)
  // Note: This is a simplified approach. In production, use JWT tokens or session cookies
  const userAgent = request.headers.get('user-agent') || '';
  
  // For now, we'll let the client-side AuthContext handle authentication
  // In production, you'd verify JWT tokens here
  
  // Add role information to headers for client-side use
  const response = NextResponse.next();
  response.headers.set('x-required-role', protectedRoutes[protectedRoute as keyof typeof protectedRoutes] || '');
  response.headers.set('x-protected-route', 'true');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 