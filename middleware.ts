import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /profile)
  const path = request.nextUrl.pathname;

  // Define paths that require authentication
  const protectedPaths = ['/profile', '/admin'];
  
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // If it's a protected path, we'll let the client-side handle the redirect
  // since we need to check the Firebase auth state
  if (isProtectedPath) {
    // The ProtectedRoute component will handle the actual authentication check
    return NextResponse.next();
  }

  return NextResponse.next();
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
