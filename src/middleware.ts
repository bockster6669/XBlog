import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicDynamicRoutes,
  publicStaticRoutes,
} from '../routes';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute =
    publicStaticRoutes.includes(pathname) ||
    publicDynamicRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
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
