"use client";

import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { STRIPE_PLANS } from "../../lib/stripe-config";
import "./PricingSection.css";

export default function PricingSection() {
    const [loading, setLoading] = useState(null); // priceId or true

    const handleCheckout = async (planKey) => {
        const plan = STRIPE_PLANS[planKey];
        if (!plan) return;

        setLoading(plan.priceId);

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
            alert(error instanceof Error ? error.message : 'Er ging iets mis met het afrekenen.');
            setLoading(null);
        }
    };

    const ButtonContent = ({ text, id }) => (
        <>
            {loading === id ? <Loader2 className="animate-spin" size={20} /> : text}
        </>
    );

    return (
        <section id="prijzen" className="pricing-section">
            <div className="container">
                <header className="pricing-header">
                    <h2 className="pricing-title">Kies je kracht.</h2>
                    <p className="pricing-subtitle">
                        Spreek in, ontvang offerte. Maandelijks opzegbaar.
                    </p>
                </header>

                {/* ROW 1: SUBSCRIPTIONS */}
                <div className="pricing-grid subscriptions">
                    {/* Card 1: Starter */}
                    <div className="pricing-card starter">
                        <div className="plan-header">
                            <h3 className="plan-name">{STRIPE_PLANS.starter.name}</h3>
                            <div className="plan-price">{STRIPE_PLANS.starter.price} <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">{STRIPE_PLANS.starter.credits} Credits</span>
                            <span className="metric-sub">Goed voor ± 30 offertes</span>
                        </div>

                        <div className="plan-target">De bijklusser.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout('starter')}
                                className="btn-price default"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Starter" id={STRIPE_PLANS.starter.priceId} />
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Pro (Vakman) - Highlight */}
                    <div className="pricing-card pro">
                        <div className="hero-badge">Meest Gekozen</div>
                        <div className="plan-header">
                            <h3 className="plan-name">{STRIPE_PLANS.pro.name}</h3>
                            <div className="plan-price">{STRIPE_PLANS.pro.price} <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">{STRIPE_PLANS.pro.credits} Credits</span>
                            <span className="metric-sub">Goed voor ± 40 offertes</span>
                        </div>

                        <div className="plan-target">De fulltime pro.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout('pro')}
                                className="btn-price hero-btn"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Vakman" id={STRIPE_PLANS.pro.priceId} />
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Baas (Aannemer) */}
                    <div className="pricing-card baas">
                        <div className="plan-header">
                            <h3 className="plan-name">{STRIPE_PLANS.baas.name}</h3>
                            <div className="plan-price">{STRIPE_PLANS.baas.price} <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">{STRIPE_PLANS.baas.credits} Credits</span>
                            <span className="metric-sub">Goed voor ± 125 offertes</span>
                        </div>

                        <div className="plan-target">Het serieuze bedrijf.</div>
                        <div className="plan-extra">Inclusief eigen logo op PDF.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout('baas')}
                                className="btn-price dark-btn"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Aannemer" id={STRIPE_PLANS.baas.priceId} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ROW 2: LOSE BUNDELS (Add-ons) */}
                <div className="bundles-section">
                    <h3 className="bundles-title">Credits op? Tank bij.</h3>
                    <div className="bundles-grid">
                        {/* BUNDEL A (Nood) */}
                        <div className="bundle-card" onClick={() => handleCheckout('nood')} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">{STRIPE_PLANS.nood.name}</h4>
                                <div className="bundle-sub">± 5 offertes</div>
                            </div>
                            <div className="bundle-credits">{STRIPE_PLANS.nood.credits} Cr.</div>
                            <div className="bundle-price">{STRIPE_PLANS.nood.price}</div>
                        </div>

                        {/* BUNDEL B (Tank) */}
                        <div className="bundle-card highlight" onClick={() => handleCheckout('tank')} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">{STRIPE_PLANS.tank.name}</h4>
                                <div className="bundle-sub">± 22 offertes</div>
                            </div>
                            <div className="bundle-credits">{STRIPE_PLANS.tank.credits} Cr.</div>
                            <div className="bundle-price">{STRIPE_PLANS.tank.price}</div>
                        </div>

                        {/* BUNDEL C (Voorraad) */}
                        <div className="bundle-card" onClick={() => handleCheckout('voorraad')} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">{STRIPE_PLANS.voorraad.name}</h4>
                                <div className="bundle-sub">± 50 offertes</div>
                            </div>
                            <div className="bundle-credits">{STRIPE_PLANS.voorraad.credits} Cr.</div>
                            <div className="bundle-price">{STRIPE_PLANS.voorraad.price}</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
