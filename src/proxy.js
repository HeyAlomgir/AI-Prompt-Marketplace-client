import { NextResponse } from 'next/server'

import { headers } from 'next/headers'
import { auth } from './lib/auth';


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
      console.log("Proxy Running:", request.nextUrl.pathname);
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {

        return NextResponse.redirect(new URL('/signin', request.url))
    }
}



export const config = {
    matcher: [
        '/creators',
        '/prompts/:path'
        
    ],
}