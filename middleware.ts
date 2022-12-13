import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { verifyLineSignature } from "./middleware/verifyLineSignature"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/webhook")) {
    return await verifyLineSignature(request)
  }

  return NextResponse.next()
}
