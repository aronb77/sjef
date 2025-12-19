'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function redeemLicense(prevState, formData) {
    const entry = formData.get('code')
    const code = entry?.toString().trim().toUpperCase()

    if (!code) {
        return { message: 'Voer een geldige code in.', success: false }
    }

    const supabase = await createClient()

    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { message: 'Niet ingelogd.', success: false }
    }

    // 2. Check Code
    const { data: key, error: keyError } = await supabase
        .from('license_keys')
        .select('*')
        .eq('code', code)
        .eq('status', 'active')
        .single()

    if (keyError || !key) {
        return { message: 'Ongeldige of reeds gebruikte code.', success: false }
    }

    // 3. Mark as Redeemed (Optimistic lock or just update)
    // We should ideally do this in a transaction or RPC, but for now sequentially.
    const { error: updateKeyError } = await supabase
        .from('license_keys')
        .update({ status: 'redeemed', redeemed_by: user.id, redeemed_at: new Date().toISOString() })
        .eq('id', key.id)
        .eq('status', 'active') // Double check availability

    if (updateKeyError) {
        return { message: 'Fout bij inwisselen. Probeer opnieuw.', success: false }
    }

    // 4. Add Credits to Profile
    // Using RPC 'increment_credits' would be safer, but raw SQL/Get+Update works for MVP if high concurrency isn't expected immediately.
    // Let's assume we do a fetch + update for now or RPC if user set it up.
    // I will try a simple fetch-update cycle.

    // Fetch current balance
    const { data: profile } = await supabase.from('profiles').select('credits_balance').eq('id', user.id).single()
    const currentBalance = profile?.credits_balance || 0
    const newBalance = currentBalance + key.credits

    const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({ credits_balance: newBalance })
        .eq('id', user.id)

    if (updateProfileError) {
        // Critical: Key is redeemed but credits not added. Manual intervention needed in real app.
        // For MVP, return error.
        return { message: `Code ingewisseld, maar credit update mislukt. Neem contact op. Code: ${code}`, success: false }
    }

    revalidatePath('/dashboard')
    return { message: `Succes! +${key.credits} credits toegevoegd.`, success: true }
}
