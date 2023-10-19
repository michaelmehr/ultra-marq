import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

export async function GET(req) {
    const reqUrl = new URL(req.url)
    const code = reqUrl.get('code')
    
    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(reqUrl.origin)
}