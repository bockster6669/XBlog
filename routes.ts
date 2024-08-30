/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to home
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/signup'];

/**
 * Prefix for api authentication routes.
 * Routes that start with this type of prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthRegex = /^\/api\/auth(\/.*)?$|^\/api\/register$/;

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/about'];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
