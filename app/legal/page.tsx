"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import './legal.css';

function LegalContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('terms');

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam === 'privacy') {
            setActiveTab('privacy');
        } else {
            setActiveTab('terms');
        }
    }, [searchParams]);

    return (
        <div className="legal-container">
            {/* Header */}
            <header className="legal-header">
                <h1 className="legal-title">Spelregels & Privacy.</h1>
            </header>

            {/* Tab Navigation */}
            <nav className="legal-tabs">
                <button
                    className={`legal-tab ${activeTab === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveTab('terms')}
                >
                    Algemene Voorwaarden
                </button>
                <button
                    className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('privacy')}
                >
                    Privacybeleid
                </button>
            </nav>

            {/* Content */}
            <div className="legal-content">

                {/* TAB 1: ALGEMENE VOORWAARDEN */}
                {activeTab === 'terms' && (
                    <div className="tab-pane">
                        <p className="legal-intro">
                            Sjef is een product van Vossen Design. Door Sjef te gebruiken, ga je akkoord met deze afspraken.
                            We hebben geprobeerd ze in normaal Nederlands te schrijven.
                        </p>

                        <div className="legal-article">
                            <h3 className="article-title">Artikel 1: De Dienst (Wat doet Sjef?)</h3>
                            <p className="article-text">
                                Sjef is een AI-hulp die spraak omzet in offertes.
                            </p>
                            <div className="legal-disclaimer">
                                <strong>Disclaimer:</strong> Jij (de gebruiker) bent de vakman. Sjef is een tool.
                                Jij blijft altijd verantwoordelijk voor de inhoud, de prijzen en het versturen van de offerte.
                                Check altijd de output voordat je hem naar je klant stuurt. Sjef is niet aansprakelijk voor
                                rekenfouten of verkeerd begrepen zinnen.
                            </div>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">Artikel 2: Abonnementen & Credits</h3>
                            <p className="article-text">
                                <strong>Abonnementen:</strong> Je betaalt vooruit per maand. Je kunt elke maand opzeggen.
                                Je houdt toegang tot het einde van je periode.
                            </p>
                            <p className="article-text">
                                <strong>Credits:</strong> Credits zijn virtuele munten om de AI te betalen.
                            </p>
                            <p className="article-text">
                                <strong>Geen Refund:</strong> Gekochte credits of deels gebruikte maandabonnementen worden
                                niet terugbetaald, tenzij de wet ons daartoe dwingt.
                            </p>
                            <p className="article-text">
                                <strong>Prijzen:</strong> We mogen prijzen aanpassen, maar we laten dat op tijd weten.
                            </p>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">Artikel 3: Gebruik</h3>
                            <p className="article-text">
                                Je mag je account niet delen met de halve stad. Eén licentie = één gebruiker.
                            </p>
                            <p className="article-text">
                                Misbruik (bot-verkeer, hacken) leidt tot een directe ban zonder geld terug.
                            </p>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">Artikel 4: Aansprakelijkheid</h3>
                            <p className="article-text">
                                Wij doen ons best om Sjef 24/7 in de lucht te houden ("Inspanningsverplichting"),
                                maar garanderen geen 100% uptime.
                            </p>
                            <p className="article-text">
                                Wij zijn niet aansprakelijk voor gederfde winst of gevolgschade als de site er even uit ligt.
                            </p>
                        </div>
                    </div>
                )}

                {/* TAB 2: PRIVACYBELEID */}
                {activeTab === 'privacy' && (
                    <div className="tab-pane">
                        <p className="legal-intro">
                            Je vertrouwt ons met je stem en je klantgegevens. Dat nemen we serieus.
                            Hier lees je wat we ermee doen.
                        </p>

                        <div className="legal-article">
                            <h3 className="article-title">1. Welke data verzamelen we?</h3>
                            <ul className="legal-list">
                                <li><strong>Je Account:</strong> Naam, e-mail, bedrijfsnaam (voor op de factuur).</li>
                                <li><strong>Je Input:</strong> De audio-opnames die je uploadt en de teksten die daaruit komen.</li>
                                <li><strong>Je Klanten:</strong> De namen/adressen die jij in spreekt voor de offerte.</li>
                            </ul>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">2. Wie ziet jouw data? (Sub-verwerkers)</h3>
                            <p className="article-text">
                                Wij verkopen je data nooit door. We werken wel samen met veilige partners om de dienst te leveren:
                            </p>
                            <ul className="legal-list">
                                <li><strong>Supabase:</strong> Hier staat onze database (veilig versleuteld).</li>
                                <li><strong>Gemini:</strong> De hersenen van Sjef. We sturen jouw tekst/audio naar Gemini om de offerte te maken. Let op: Wij hebben ingesteld dat jouw data NIET wordt gebruikt om hun publieke modellen te trainen. (Enterprise privacy standards).</li>
                                <li><strong>Stripe:</strong> Voor de betalingen. Wij zien jouw creditcardnummer nooit zelf.</li>
                            </ul>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">3. Waar blijft de data?</h3>
                            <p className="article-text">
                                Onze eigen servers staan in Nederland.
                            </p>
                            <p className="article-text">
                                We bewaren je offertes zolang je klant bent, zodat je je historie hebt.
                            </p>
                            <p className="article-text">
                                Audio-bestanden worden na verwerking verwijderd (of na X dagen) om opslag en privacy te sparen.
                            </p>
                        </div>

                        <div className="legal-article">
                            <h3 className="article-title">4. Jouw Rechten</h3>
                            <p className="article-text">
                                Je mag altijd vragen wat we van je weten.
                            </p>
                            <p className="article-text">
                                Je mag ons vragen je account + alle data te verwijderen ("Recht om vergeten te worden").
                                Stuur een mailtje naar info@sjef.ai.
                            </p>
                        </div>
                    </div>
                )}

            </div>

            {/* Local Footer for Legal Page context */}
            <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-soft)' }}>
                <p>Overige vragen? Mail ons op info@sjef.ai.</p>
            </div>

        </div>
    );
}

export default function LegalPage() {
    return (
        <main className="legal-page">
            <Suspense fallback={<div>Loading...</div>}>
                <LegalContent />
            </Suspense>
        </main>
    );
}
