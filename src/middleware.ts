import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '../routes';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  console.log({ token });

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return NextResponse.next();
  }

  if(!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    // '/(api|trpc)(.*)',
  ],
};

/*

  cookies: RequestCookies {"authjs.session-token":{"name":"authjs.session-token","value":"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiVk1kRkg3WGVVZUFsZG1pR2llOEY1cWY0LTFEaFR1enVuOHVEVl9pOEJjUXRLdy1DelhqZ3ZRMDBubDdTa21zaDR4T3B0RVhTa2hBSUlXN0Q0Vnl2S3cifQ..ZaaRBgu0utkJGzbJ01nehA.zyprhEzOek7uU2xV_L_dOyWH9mNZuyGiFodoDijy92iRUZemcDR6nvt5By6z5zt6G7ig3t2A-60xZlb4SdePY7ZGFazvBaKSI4MAFFdMzd7ZsCb8M8FJvuHtNE7fQ6AjxOOwZMsHMP-RrmGHijsqdHI1WbGZRhF5XAFkc-X5fayYYXkbmh4PDGbbctyg95fa.83FNzfTZwbLkNM_t1m-IY-ylG-T1yo9DakisKq2gkew"},"next-auth.csrf-token":{"name":"next-auth.csrf-token","value":"582b3b402537287723775fa9e9a13f41a1b0d5a68805220e00145d87d61ae41c|b37d684ac97c5fa2e16f8fca8b90ecd7d2be677c38ca534e50492c01f56351ad"},"next-auth.callback-url":{"name":"next-auth.callback-url","value":"http://localhost:3000/create-post"}},
 
*/
