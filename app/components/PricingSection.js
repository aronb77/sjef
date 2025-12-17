"use client";

import Link from "next/link";
import { Check, Loader2 } from "lucide-react"; // Added Loader
import { useState } from "react";
import { STRIPE_PRICES } from "@/lib/stripe-config";
import "./PricingSection.css";

export default function PricingSection() {
    const [loading, setLoading] = useState(null); // priceId or true

    const handleCheckout = async (priceId) => {
        if (!priceId) return;
        setLoading(priceId);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            if (!response.ok) throw new Error('Checkout failed');

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert('Er ging iets mis met het afrekenen. Probeer het later opnieuw.');
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
                            <h3 className="plan-name">Starter</h3>
                            <div className="plan-price">€ 19 <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">60 Credits</span>
                            <span className="metric-sub">Goed voor ± 30 offertes</span>
                        </div>

                        <div className="plan-target">De bijklusser.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout(STRIPE_PRICES.starter)}
                                className="btn-price default"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Starter" id={STRIPE_PRICES.starter} />
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Pro (Vakman) - Highlight */}
                    <div className="pricing-card pro">
                        <div className="hero-badge">Meest Gekozen</div>
                        <div className="plan-header">
                            <h3 className="plan-name">Vakman</h3>
                            <div className="plan-price">€ 29 <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">80 Credits</span>
                            <span className="metric-sub">Goed voor ± 40 offertes</span>
                        </div>

                        <div className="plan-target">De fulltime pro.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout(STRIPE_PRICES.vakman)}
                                className="btn-price hero-btn"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Vakman" id={STRIPE_PRICES.vakman} />
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Baas (Aannemer) */}
                    <div className="pricing-card baas">
                        <div className="plan-header">
                            <h3 className="plan-name">Aannemer</h3>
                            <div className="plan-price">€ 59 <span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">250 Credits</span>
                            <span className="metric-sub">Goed voor ± 125 offertes</span>
                        </div>

                        <div className="plan-target">Het serieuze bedrijf.</div>
                        <div className="plan-extra">Inclusief eigen logo op PDF.</div>

                        <div className="plan-button-wrapper">
                            <button
                                onClick={() => handleCheckout(STRIPE_PRICES.aannemer)}
                                className="btn-price dark-btn"
                                disabled={!!loading}
                            >
                                <ButtonContent text="Kies Aannemer" id={STRIPE_PRICES.aannemer} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIJ 2: LOSSE BUNDELS (Credits op? Tank bij) */}
                <div className="bundles-section">
                    <h3 className="bundles-title">Credits op? Tank bij.</h3>
                    <div className="bundles-grid">
                        {/* BUNDEL A (Onder Starter) */}
                        <div className="bundle-card" onClick={() => handleCheckout(STRIPE_PRICES.noodrantsoen)} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">Noodrantsoen</h4>
                                <div className="bundle-sub">± 5 offertes</div>
                            </div>
                            <div className="bundle-credits">10 Cr.</div>
                            <div className="bundle-price">€ 5,-</div>
                        </div>

                        {/* BUNDEL B (Onder Pro) */}
                        <div className="bundle-card highlight" onClick={() => handleCheckout(STRIPE_PRICES.tankbeurt)} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">Tankbeurt</h4>
                                <div className="bundle-sub">± 22 offertes</div>
                            </div>
                            <div className="bundle-credits">45 Cr.</div>
                            <div className="bundle-price">€ 19,-</div>
                        </div>

                        {/* BUNDEL C (Onder Baas) */}
                        <div className="bundle-card" onClick={() => handleCheckout(STRIPE_PRICES.voorraad)} role="button" style={{ cursor: 'pointer' }}>
                            <div className="bundle-info">
                                <h4 className="bundle-name">De Voorraad</h4>
                                <div className="bundle-sub">± 50 offertes</div>
                            </div>
                            <div className="bundle-credits">100 Cr.</div>
                            <div className="bundle-price">€ 39,-</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
