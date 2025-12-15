"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import "./PricingSection.css";

export default function PricingSection() {
    return (
        <section id="prijzen" className="pricing-section">
            <div className="container">
                <h2 className="pricing-title">Kies je kracht.</h2>
                <p className="pricing-subtitle">
                    Supersnel offertes maken. Geen gedoe. Maandelijks opzegbaar.
                </p>

                <div className="pricing-grid">

                    {/* Card 1: Starter */}
                    <div className="pricing-card">
                        <div className="plan-header">
                            <h3 className="plan-name">Sjef Starter</h3>
                            <div className="plan-price">19<span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">60 Credits</span>
                            <span className="metric-label">Goed voor ± 30 offertes</span>
                        </div>

                        <div className="plan-target">Voor de bijklusser</div>

                        <ul className="plan-features">
                            <li className="feature-item"><Check size={18} className="check-icon" /> Spraak naar Offerte (PDF)</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Standaard Layout</li>
                        </ul>

                        <Link href="/aanmelden?plan=starter" className="btn-price default">
                            Kies Starter
                        </Link>
                    </div>

                    {/* Card 2: Vakman (HERO) */}
                    <div className="pricing-card hero">
                        <div className="hero-badge">Meest Gekozen</div>

                        <div className="plan-header">
                            <h3 className="plan-name">Sjef Vakman</h3>
                            <div className="plan-price">49<span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">160 Credits</span>
                            <span className="metric-label">Goed voor ± 80 offertes</span>
                        </div>

                        <div className="plan-target">Voor de fulltime pro</div>

                        <ul className="plan-features">
                            <li className="feature-item"><Check size={18} className="check-icon" /> Spraak naar Offerte (PDF)</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Standaard Layout</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Prioriteit verwerking</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Geen watermerk</li>
                        </ul>

                        <Link href="/aanmelden?plan=pro" className="btn-price hero-btn">
                            Kies Vakman
                        </Link>
                    </div>

                    {/* Card 3: Aannemer */}
                    <div className="pricing-card">
                        <div className="plan-header">
                            <h3 className="plan-name">Sjef Aannemer</h3>
                            <div className="plan-price">99<span className="plan-period">/mnd</span></div>
                        </div>

                        <div className="plan-metrics">
                            <span className="metric-value">350 Credits</span>
                            <span className="metric-label">Goed voor ± 175 offertes</span>
                        </div>

                        <div className="plan-target">Voor het serieuze bedrijf</div>

                        <ul className="plan-features">
                            <li className="feature-item"><Check size={18} className="check-icon" /> Spraak naar Offerte (PDF)</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Eigen Logo & Huisstijl</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Geen watermerk</li>
                            <li className="feature-item"><Check size={18} className="check-icon" /> Premium Support</li>
                        </ul>

                        <Link href="/aanmelden?plan=baas" className="btn-price default">
                            Kies Aannemer
                        </Link>
                    </div>

                </div>

                <div className="pricing-footer">
                    Credits op? Je tankt ze simpel bij in de app.
                </div>
            </div>
        </section>
    );
}
