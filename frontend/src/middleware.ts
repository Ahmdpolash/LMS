import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
const AuthRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies?.get("accessToken")?.value;

  // Public routes — skip middleware

  if (!token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  let decodedData = null;

  if (token) {
    decodedData = jwtDecode(token) as any;
  }

  const role = decodedData?.role;

  // Protect admin routes
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url)); // or show 403
  }

  // Allow access to dashboard/course-access for both roles
  return NextResponse.next();

  // return NextResponse.next();
  //   return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/course-access/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
