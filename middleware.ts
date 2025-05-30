import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionUser } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session-id")?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup", "/how-it-works", "/about"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // API routes that don't require authentication
  const publicApiRoutes = ["/api/cron/deliver", "/api/setup"]
  const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

  // If it's a public route or public API route, allow access
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next()
  }

  // For protected routes, check if user is authenticated
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify the session
  const user = await getSessionUser(sessionId)
  if (!user) {
    // Invalid session, redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("session-id")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
