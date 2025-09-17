// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Agar root (/) ga kelsa → onboarding/step-one ga yo‘naltir
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/onboarding/step-one", req.url));
  }

  return NextResponse.next();
}
