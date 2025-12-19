"use client";

import React from 'react';
import Image from 'next/image';
import { Shield, Brain, Database, CreditCard, Lock, CheckCircle2, Server, Globe } from 'lucide-react';
import './security.css';

export default function SecurityPage() {
    return (
        <main className="security-page">

            {/* SECTION 1: HERO (The Guarantee) */}
            <section className="security-hero">
                <div className="absolute top-0 right-0 p-4 animate-pulse">
                    <div className="flex items-center gap-2 bg-black/50 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10B981]"></div>
                        <span className="text-xs font-mono text-emerald-500 tracking-wider">SYSTEM SECURE</span>
                    </div>
                </div>
                <div className="security-container">
                    <div className="shield-image-wrapper">
                        <Image
                            src="/security_shield_wireframe.png"
                            alt="Security Shield"
                            width={200}
                            height={200}
                            className="shield-image"
                            priority
                        />
                    </div>

                    <h1 className="security-title">
                        Jouw data. <br />
                        <span>Jouw eigendom.</span>
                    </h1>

                    <p className="security-subtitle">
                        Wat jij inspreekt, blijft van jou. Wij kijken niet mee, wij luisteren niet mee,
                        en we verkopen niets door.
                    </p>

                    <div className="security-usps">
                        <div className="usp-badge">
                            <Lock size={16} className="text-emerald-500" />
                            Versleutelde opslag
                        </div>
                        <div className="usp-badge">
                            <Globe size={16} className="text-emerald-500" />
                            Eigen 🇪🇺 Servers (NL)
                        </div>
                        <div className="usp-badge">
                            <Brain size={16} className="text-emerald-500" />
                            Geen publieke AI training
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: THE PARTNERS (The Tech Stack) */}
            <section className="partners-section">
                <div className="security-container">
                    <div className="partners-grid">

                        {/* Card 1: Gemini */}
                        <div className="partner-card">
                            <Brain className="partner-icon" size={40} />
                            <h3>Het Brein</h3>
                            <p className="text-sm text-emerald-500 mb-2 font-mono">GOOGLE GEMINI ENTERPRISE</p>
                            <p>
                                We gebruiken de zakelijke licentie van Gemini. Dit betekent dat jouw offertes
                                nooit worden gebruikt om deze AI te trainen. Je data blijft privé.
                            </p>
                        </div>

                        {/* Card 2: Supabase */}
                        <div className="partner-card">
                            <Database className="partner-icon" size={40} />
                            <h3>De Kluis</h3>
                            <p className="text-sm text-emerald-500 mb-2 font-mono">SUPABASE (AWS FRANKFURT/AMS)</p>
                            <p>
                                Jouw klantenbestand en offertes staan veilig op servers in Europa.
                                Beveiligd volgens de strengste bank-standaarden.
                            </p>
                        </div>

                        {/* Card 3: Stripe */}
                        <div className="partner-card">
                            <CreditCard className="partner-icon" size={40} />
                            <h3>De Kassa</h3>
                            <p className="text-sm text-emerald-500 mb-2 font-mono">STRIPE PAYMENTS</p>
                            <p>
                                Betalingen lopen via Stripe. Wij krijgen jouw creditcardgegevens nooit te zien
                                en slaan deze niet op.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 3: NO-TRAIN POLICY */}
            <section className="no-train-section">
                <div className="security-container">

                    <div className="switch-graphic">
                        <span className="switch-label">AI TRAINING</span>
                        {/* Visual Toggle Switch (OFF state) */}
                        <div className="relative w-12 h-6 bg-gray-800 border border-gray-600 rounded-full flex items-center p-1 toggle-disabled">
                            <div className="w-4 h-4 bg-gray-500 rounded-full shadow-md"></div>
                        </div>
                        <span className="switch-label text-red-500">OFF</span>
                    </div>

                    <h2 className="no-train-title">Geen Pottenkijkers.</h2>
                    <p className="no-train-text">
                        Sjef leert niet van jouw offertes om slimmer te worden voor je concurrent.
                        Jouw kennis blijft jouw bedrijfsgeheim.
                    </p>
                </div>
            </section>

            {/* SECTION 4: USER CONTROL */}
            <section className="control-section">
                <div className="security-container">
                    <h2 className="security-title" style={{ fontSize: '2.5rem' }}>
                        Jij hebt de sleutel.
                    </h2>

                    <div className="control-list">
                        <div className="control-item">
                            <CheckCircle2 className="check-icon" />
                            Download al je data op elk moment.
                        </div>
                        <div className="control-item">
                            <CheckCircle2 className="check-icon" />
                            Verwijder je account en alles is écht weg.
                        </div>
                        <div className="control-item">
                            <CheckCircle2 className="check-icon" />
                            Exporteer je offertes naar PDF en Excel.
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
