import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/products", "/orders", "/checkout"];
const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const jwt = request.cookies.get("jwt")?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  if (isPrivate) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (isAuth && jwt) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
