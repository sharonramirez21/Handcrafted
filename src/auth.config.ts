import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAuthPage = nextUrl.pathname.startsWith('/login');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                console.log('Not Logged in')
                return Response.redirect(new URL('/login', nextUrl));
            }

            // 3. If logged in and trying to access /login -> Bounce them to /dashboard
            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;