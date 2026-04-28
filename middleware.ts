import { NextRequest, NextResponse } from "next/server";

import { getAdminHost } from "@/lib/admin-runtime";

const ADMIN_COOKIE = "laikao_admin_session";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAdminApiPath(pathname: string) {
  return pathname === "/api/admin" || pathname.startsWith("/api/admin/");
}

function isAllowedAnonymousPath(pathname: string) {
  return pathname === "/admin/login" || pathname === "/api/admin/auth/login";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const hasAdminSession = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
  const isAdminSubdomain = host === getAdminHost();

  if ((isAdminPath(pathname) || isAdminApiPath(pathname)) && !isAllowedAnonymousPath(pathname) && !hasAdminSession) {
    if (isAdminApiPath(pathname)) {
      return NextResponse.json({ message: "Nao autenticado." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminSubdomain && pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/"]
};
