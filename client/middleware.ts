import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

// Define routes and their allowed roles
const roleBasedRoutes: { [key: string]: string[] } = {
  "/admin": ["ADMIN"],
  // "/customer": ["CUSTOMER"], add /customer to config
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value as string;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // console.log("Decoded token:", payload);

    const userRole = payload.role;
    const path = request.nextUrl.pathname;

    const allowedRoles = roleBasedRoutes[path];

    if (allowedRoles && !allowedRoles.includes(userRole as string)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // Allow the request to proceed
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
