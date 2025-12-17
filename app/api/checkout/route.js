
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { priceId, quantity = 1 } = body;

        if (!priceId) {
            return new NextResponse('Missing priceId', { status: 400 });
        }

        const origin = req.headers.get('origin') || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            mode: 'payment', // Change to 'subscription' if these are recurring plans
            payment_method_types: ['card', 'ideal'], // Enable iDEAL for NL
            line_items: [
                {
                    price: priceId,
                    quantity: quantity,
                },
            ],
            metadata: {
                product_type: 'license_voucher', // Flag for webhook
            },
            success_url: `${origin}/dashboard?success=true`,
            cancel_url: `${origin}/#pricing?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_CHECKOUT]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
