import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;
  
  let role: string | null = null;
  
  if (sessionCookie) {
    const payload = await verifyToken(sessionCookie);
    if (payload) {
      role = payload.role as string;
    }
  }

  // If the user is on the login or signup page and they have a session, redirect them
  if (sessionCookie && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL(role === 'ADMIN' ? '/admin' : '/', request.url));
  }

  // If the user tries to access a protected route without a session, redirect to login
  if (!sessionCookie && (path.startsWith('/admin') || path.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If an ADMIN visits a non-admin page (like Home, Stays, Dashboard), log them out immediately
  if (role === 'ADMIN' && !path.startsWith('/admin')) {
    const response = NextResponse.next();
    response.cookies.delete('session');
    return response;
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
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
