// middleware.js

import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';  // Import the getSession function

export async function middleware(req) {
  // Check the session on each request
  const session = await getSession({ req });

  // If there is no session (i.e., the user is not authenticated), redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If there is a session, proceed with the request
  return NextResponse.next();
}

// This middleware will run on any route under /protected
export const config = {
  matcher: ['/protected/:path*',],
};
