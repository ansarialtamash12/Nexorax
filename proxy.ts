import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME ?? "user_session_token";

const PROTECTED_PATHS = [
  "/academy",
  "/ai-business-hub",
  "/ai-engine",
  "/analytics",
  "/binary-tree",
  "/booster",
  "/dashboard",
  "/direct-partners",
  "/downline",
  "/education",
  "/fund-director",
  "/income-reports",
  "/investment-amount",
  "/level-partners",
  "/network-tree",
  "/order-history",
  "/profile",
  "/rank",
  "/reports",
  "/settings",
  "/support",
  "/transactions",
  "/users",
];

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password"];
const PUBLIC_PATHS = ["/auth/callback"];

function isPathMatch(pathname: string, paths: string[]): boolean {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPathMatch(pathname, PUBLIC_PATHS)) {
    return NextResponse.next();
  }

  const hasSession = Boolean(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );

  if (isPathMatch(pathname, PROTECTED_PATHS) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPathMatch(pathname, AUTH_PATHS) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/academy/:path*",
    "/ai-business-hub/:path*",
    "/ai-engine/:path*",
    "/analytics/:path*",
    "/binary-tree/:path*",
    "/booster/:path*",
    "/dashboard/:path*",
    "/direct-partners/:path*",
    "/downline/:path*",
    "/education/:path*",
    "/fund-director/:path*",
    "/income-reports/:path*",
    "/investment-amount/:path*",
    "/level-partners/:path*",
    "/network-tree/:path*",
    "/order-history/:path*",
    "/profile/:path*",
    "/rank/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/support/:path*",
    "/transactions/:path*",
    "/users/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/auth/callback",
  ],
};
