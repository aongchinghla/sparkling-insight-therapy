import { NextRequest, NextResponse } from 'next/server';

/**
 * Edge Middleware: www → non-www canonical redirect
 *
 * Google Search Console was flagging pages as "Page with redirect" because
 * Googlebot was discovering or submitting URLs on www.sparklingtherapybd.com,
 * which then got 301-redirected to sparklingtherapybd.com.
 *
 * This middleware enforces the redirect at the Edge (before Next.js routing)
 * for the fastest possible response to crawlers, and also adds a
 * `Link` header pointing to the canonical non-www URL on every response
 * to give Google an additional signal at the HTTP layer.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname, search } = request.nextUrl;

  // Redirect www → non-www with a 301 (permanent)
  if (host.startsWith('www.')) {
    const canonicalHost = host.replace(/^www\./, '');
    const url = `https://${canonicalHost}${pathname}${search}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Pass through — attach a Link canonical header so Googlebot
  // sees the canonical URL at the HTTP response level as well.
  const response = NextResponse.next();

  const cleanPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const canonicalUrl = cleanPath === '/' ? 'https://sparklingtherapybd.com' : `https://sparklingtherapybd.com${cleanPath}`;
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);

  return response;
}

export const config = {
  // Run on all routes except static assets, images, and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf|map)).*)',
  ],
};
