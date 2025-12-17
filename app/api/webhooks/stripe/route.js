
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Create a Supabase client with the Service Role Key for admin privileges
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper to generate a code: SJEF-XXXX-XXXX
function generateLicenseKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part1 = Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    const part2 = Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `SJEF-${part1}-${part2}`;
}

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // 1. Identify User and Product
        const customerEmail = session.customer_details?.email;
        const amountTotal = session.amount_total; // In cents

        // Simple logic: Map price amount to credits (You could also use metadata from Stripe Price/Product)
        // Example: 1900 = 60 credits, 2900 = 80 credits, etc.
        // For now, let's assume a default or calculate. 
        // Ideally, pass 'credits' in the Stripe Session metadata metadata: { credits: '80' }

        let credits = 0;

        // Fallback logic if metadata isn't set, based on your pricing:
        if (amountTotal === 1900) credits = 60; // Starter
        else if (amountTotal === 2900) credits = 80; // Vakman
        else if (amountTotal === 5900) credits = 250; // Aannemer
        else if (amountTotal === 500) credits = 10; // Noodrantsoen
        else if (amountTotal === 1900 && !credits) credits = 45; // Tankbeurt (conflict with Starter? Best to use Stripe metadata or Product IDs)
        else if (amountTotal === 3900) credits = 100; // De Voorraad
        else credits = 60; // Default fallback

        // Override if metadata exists
        if (session.metadata?.credits) {
            credits = parseInt(session.metadata.credits);
        }

        console.log(`Processing order for ${customerEmail}. Amount: ${amountTotal}. Credits: ${credits}`);

        // 2. Generate License Key
        const licenseCode = generateLicenseKey();

        // 3. Insert into Supabase
        // Table: license_keys (code, credits, status, created_at, email)
        const { error: dbError } = await supabase
            .from('license_keys')
            .insert({
                code: licenseCode,
                credits: credits,
                status: 'active',
                email: customerEmail // Optional: bind it to email immediately
            });

        if (dbError) {
            console.error('Supabase error:', dbError);
            return new NextResponse('Database Error', { status: 500 });
        }

        // 4. Send Email via Resend
        try {
            const { data, error } = await resend.emails.send({
                from: 'Sjef <noreply@sjef.ai>', // Make sure you verified this domain in Resend
                to: [customerEmail],
                subject: 'Jouw Sjef Licentiecode 🚀',
                html: `
                <div style="font-family: sans-serif; color: #0F172A; padding: 20px;">
                    <h1 style="color: #F97316;">Bedankt voor je bestelling!</h1>
                    <p>Hier is je licentiecode voor <strong>${credits} credits</strong>:</p>
                    <div style="background: #F1F5F9; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 24px; letter-spacing: 2px; text-align: center; margin: 20px 0;">
                        ${licenseCode}
                    </div>
                    <p>Ga naar je dashboard om deze code te activeren (binnenkort beschikbaar) of bewaar hem goed.</p>
                    <p>Succes,<br>Team Sjef.</p>
                </div>
            `,
            });

            if (error) {
                console.error('Resend error:', error);
            }
        } catch (emailErr) {
            console.error('Email sending failed:', emailErr);
        }

        return new NextResponse('Success', { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
}
