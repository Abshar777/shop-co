
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {

        const token = req.nextauth.token;
        const isLoggedIn = !!token;
        const userRole = token?.role;
        const protectedRoutes = ["/home/cart", "/home/cart/checkout", "/home/profile", "/home/profile/orders"];
        console.log(req.nextUrl.pathname, isLoggedIn, protectedRoutes.includes(req.nextUrl.pathname))
        if (!isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
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


export const config = {
    matcher: ["/home/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};