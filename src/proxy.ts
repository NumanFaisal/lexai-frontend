import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'token';

// Routes that require authentication
const protectedPaths = ['/chat', '/vault', '/documents', '/settings', '/pricing', '/onboard'];

// Routes only for unauthenticated users
const authPaths = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = !!sessionCookie;

  // Rule 1: Unauthenticated user visits protected route → redirect to /login
  if (!isAuthenticated && protectedPaths.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 2: Authenticated user visits /login or /signup → redirect to /chat
  if (isAuthenticated && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next internals
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.svg$).*)',
  ],
};
