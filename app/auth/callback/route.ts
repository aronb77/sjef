import { createClient } from '../../../utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    // Determine the actual origin (handle proxies/production)
    const protocol = request.headers.get('x-forwarded-proto') || requestUrl.protocol;
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || requestUrl.host;
    const origin = `${protocol}://${host}`;

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${origin}/login?verified=true`)
        }
    }

    return NextResponse.redirect(`${origin}/login?error=verification_failed`)
}
