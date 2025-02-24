import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { auth } from "./auth";

export default async function middleware(req: NextRequest) {
  const authResponse = await auth();
  const isAuthenticated = !!authResponse;

  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.includes("/auth");

  const isProtected =
    pathname.startsWith("/dashboard") || pathname.includes("/dashboard");

  if (isProtected && !isAuthenticated) {
    // Detect locale from the URL
    const locale = pathname.startsWith("/ar") ? "ar" : "en";
    const loginUrl = new URL(`/${locale}/auth/login`, req.nextUrl.origin);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    const locale = pathname.startsWith("/ar") ? "ar" : "en";
    const dashboardUrl = new URL(`/${locale}`, req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
