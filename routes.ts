/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to home
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/signup'];

/**
 * An array of static routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicStaticRoutes = ['/', '/about'];

/**
 * An array of dynamic routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicDynamicRoutes = ['/posts'];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
