"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { STRIPE_PLANS } from "../../lib/stripe-config";
import "./CompactPricing.css";

export default function CompactPricing() {
    const [loading, setLoading] = useState(null);

    const handleCheckout = async (planKey) => {
        const plan = STRIPE_PLANS[planKey];
        if (!plan) return;

        setLoading(planKey);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    mode: plan.mode
                }),
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg || 'Checkout failed');
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Kon de betaling niet starten.');
            setLoading(null);
        }
    };

    const PlanCard = ({ planKey, plan, featured = false }) => (
        <div
            className={`cp-card ${featured ? 'featured' : ''}`}
            onClick={() => !loading && handleCheckout(planKey)}
        >
            {loading === planKey && (
                <div className="cp-loading-overlay">
                    <Loader2 className="animate-spin text-orange-500" size={20} />
                </div>
            )}

            {featured && <span className="cp-badge">Populair</span>}

            <div className="cp-card-header">
                <span className="cp-plan-name">{plan.name}</span>
                <span className="cp-plan-price">{plan.price}</span>
            </div>

            <div className="cp-credits">{plan.credits} Credits</div>
            <div className="cp-sub">
                {plan.mode === 'subscription' ? '/ maand' : 'eenmalig'}
            </div>
        </div>
    );

    return (
        <section className="compact-pricing-container">
            <div className="cp-header">
                <div>
                    <h3 className="cp-title">Credits opwaarderen</h3>
                    <p className="cp-subtitle">Direct aan de slag. Geen abonnement nodig.</p>
                </div>
            </div>

            <div className="cp-grid-container">
                {/* ONE-TIME ONLY */}
                <div>
                    <div className="cp-row">
                        <PlanCard planKey="nood" plan={STRIPE_PLANS.nood} />
                        <PlanCard planKey="tank" plan={STRIPE_PLANS.tank} />
                        <PlanCard planKey="voorraad" plan={STRIPE_PLANS.voorraad} featured={true} />
                    </div>
                </div>
            </div>
        </section>
    );
}
