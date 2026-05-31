import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  // Redirect non-www to www
  if (host === 'sparklingtherapybd.com') {
    return NextResponse.redirect(
      `https://www.${host}${request.nextUrl.pathname}${request.nextUrl.search}`,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|svg|png|gif|eot|otf|ttf|woff2?|ico|webp|webmanifest)).*)',
    // Apply to root path
    '/',
  ],
};
