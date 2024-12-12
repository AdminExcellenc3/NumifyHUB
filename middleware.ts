import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const isPublicRoute = Object.values(AUTH_ROUTES).includes(request.nextUrl.pathname as any);
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isStaticRoute = request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/);
    const isAuthCallback = request.nextUrl.pathname === AUTH_ROUTES.CALLBACK;

    // Skip middleware for API routes, static files, and auth callback
    if (isApiRoute || isStaticRoute || isAuthCallback) {
      return res;
    }

    // Redirect authenticated users away from public routes
    if (session && isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users to login from protected routes
    if (!session && !isPublicRoute) {
      const redirectUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};