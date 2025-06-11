import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const AUTH_ROUTES = ["/auth/login", "/auth/sign-up"];
const PRIVATE_ROUTES = ["/dashboard", "/payment"];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  const { pathname } = req.nextUrl;

  // Extract locale and clean pathname
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const cleanPathname = pathname.replace(/^\/(ar|en)/, "") || "/";

  // Check if current route is protected or auth route
  const isProtected = PRIVATE_ROUTES.some((route) =>
    cleanPathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    cleanPathname.startsWith(route)
  );

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl);
  }

  // Continue with next-intl middleware for internationalization
  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
