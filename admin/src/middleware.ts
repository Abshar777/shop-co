import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware";
import { Roles } from "./types/api";

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const userRole = token?.role;
    const isVerified = token?.verified;
    const isSuperAdminPage = path.startsWith("/admin/superAdmin");
    const isAdmin = token?.role === Roles.ADMIN;
    const isDeliveryBoy = token?.role === Roles.DELIVERY_BOY;

    console.log(path, "path 🟢")
    
    if (path == "/auth/signout") {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.next()
    }

    if (path.startsWith("/auth") && path !== "/auth/signout") {
      if (isLoggedIn && isVerified == "true") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next()
    }

    if (path.startsWith("/admin")) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
      console.log(token, "token")
      if (isLoggedIn && isVerified == "false") {
        return NextResponse.redirect(new URL("/auth/signout", req.url));
      }
      console.log(userRole, "userRole")
      if(isSuperAdminPage && !isAdmin){
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
     
        return true;
      },
    },

    cookies: {
      sessionToken: {
        name: `admin-session-token`
      }
    }
  }
);

export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}