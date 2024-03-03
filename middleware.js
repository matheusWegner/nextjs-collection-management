import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request) {
        if (request.nextUrl.pathname.startsWith("/dashborad")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            } 
        },
    }
)

export const config = { matcher: ["/collection", "/perfil"] }