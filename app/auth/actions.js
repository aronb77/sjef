'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function login(formData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=true')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

import { headers } from 'next/headers'

export async function signup(formData) {
    const origin = headers().get('origin')
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp({
        ...data,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        redirect('/register?error=true')
    }

    // revalidatePath('/', 'layout') // Not needed if redirecting to a static-ish page
    redirect(`/auth/verify?email=${encodeURIComponent(data.email)}`)
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
