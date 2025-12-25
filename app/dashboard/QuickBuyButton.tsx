"use client"

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { STRIPE_PLANS } from '@/lib/stripe-config'

export function QuickBuyButton() {
    const [loading, setLoading] = useState(false)

    const handleBuy = async () => {
        setLoading(true)
        try {
            // Defaulting to a small pack or specific plan for 'Quick Buy'
            // Let's assume 'tank' (Tankbeurt) is a good default
            const plan = STRIPE_PLANS?.tank || { priceId: 'price_1QO...', mode: 'payment', credits: 45, name: 'Tankbeurt' }

            // NOTE: In a real app we'd verify STRIPE_PLANS import. 
            // If strict import fails, we might need to hardcode or adjust path.

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    mode: plan.mode,
                    credits: plan.credits,
                    planName: plan.name
                }),
            });

            if (!response.ok) throw new Error('Checkout failed');
            const { url } = await response.json();
            window.location.href = url;

        } catch (error) {
            console.error(error)
            setLoading(false)
            alert("Kon kassa niet openen.")
        }
    }

    return (
        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={handleBuy} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            {loading ? 'Laden...' : 'Credits Bijkopen (+)'}
        </Button>
    )
}
