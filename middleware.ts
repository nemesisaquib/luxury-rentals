import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const path = request.nextUrl.pathname;
  
  // If the user is on the login or signup page and they have a session, redirect them to root
  if (session && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user tries to access a protected route without a session, redirect to login
  if (!session && (path.startsWith('/admin') || path.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/admin/:path*', '/dashboard/:path*'],
};
