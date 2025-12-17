"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { STRIPE_PRICES } from "@/lib/stripe-config";

export default function BuyCreditsButton() {
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            // Default to 'tankbeurt' for Quick Buy, or make it open a modal in future.
            // For now: Quick Buy Tankbeurt (Most common)
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: STRIPE_PRICES.tankbeurt }),
            });

            if (!response.ok) throw new Error('Checkout failed');

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert('Kan de kassa niet openen.');
            setLoading(false);
        }
    };

    return (
        <button
            className="btn-action-secondary"
            onClick={handleBuy}
            disabled={loading}
        >
            {loading ? (
                <Loader2 className="animate-spin" size={18} style={{ marginRight: '0.5rem' }} />
            ) : (
                <CreditCard size={18} style={{ marginRight: '0.5rem' }} />
            )}
            Credits Kopen
        </button>
    );
}
