import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './libs/session';
import { redirect } from 'next/navigation';

const URLS_PUBLIC_ONLY: Record<string, boolean> = {
  '/': true,
  '/home': true,
  '/create-account': true,
  '/login': true,
  '/profile': false,
  '/github/start': true,
  '/github/complete': true,
  '/sms': true,
} as const;

const middleware = async (request: NextRequest) => {
  const isPublicRequest = URLS_PUBLIC_ONLY[request.nextUrl.pathname];

  const session = await getSession();

  if (!session.id) {
    if (!isPublicRequest) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else {
    if (isPublicRequest) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
