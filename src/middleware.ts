import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('middleware ran');
  },
  {
    pages: {
      signIn: '/signin',
    },
  },
);

export const config = {
  matcher: [
    '/((?!_next|[^?]\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    '/(api|trpc)(.*)',
    '/',
    '/create-post'
  ],
};