import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('middleware ran')
  },
  {
    pages: {
      signIn: '/signin',
    },
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
