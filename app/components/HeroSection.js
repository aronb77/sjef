"use client";

import Link from "next/link";
import "./HeroSection.css";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Sjef regelt de kantoortroep.
                </h1>
                <p className="hero-subtitle">
                    Sovereign AI voor de moderne vakman. Spreek in, krijg PDF, klaar.
                </p>

                <div className="hero-actions">
                    <Link href="#start" className="btn-primary">
                        Start met Sjef
                    </Link>
                    <Link href="#demo" className="btn-secondary">
                        Bekijk de demo
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* 
Legacy Code for Reference (iPhone Animation):
... [Previous code omitted for brevity but safely removed]
*/
