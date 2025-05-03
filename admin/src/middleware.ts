// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware";


// Create a middleware function without withAuth first
export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const userRole = token?.role;
    const isVerified = token?.verified;
    const protectedRoutes = ["/home/cart", "/home/cart/checkout", "/home/profile", "/home/profile/orders"];

    console.log(path, "path 🟢")
    if (path == "/auth/signout") {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.next()
    }

    if (path.startsWith("/auth") && path !== "/auth/signout") {
      if (isLoggedIn && isVerified == "true") {
        // i want signout from next-auth
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
      // if(userRole !==  ){
      //   return NextResponse.redirect(new URL("/auth/login", req.url))
      // }
    }



    return NextResponse.next();
  },
  {
    callbacks: {


      authorized: ({ token }) => {


        return true;
      },
    },
  }
);

// Configure matcher to specify which routes to handle
export const config = {
  matcher: [
    // Match auth and admin routes, exclude api and static files
    "/auth/:path*",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}