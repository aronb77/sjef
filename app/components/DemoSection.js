"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Check, FileText, Loader2 } from "lucide-react";
import "./DemoSection.css";

export default function DemoSection() {
    const [status, setStatus] = useState("idle"); // idle, playing, processing, done
    const [progress, setProgress] = useState(0);

    const handlePlay = () => {
        setStatus("playing");
        setTimeout(() => {
            setStatus("processing");
            // Start progress bar
            setTimeout(() => setProgress(100), 100);

            setTimeout(() => {
                setStatus("done");
            }, 2500); // Wait for progress
        }, 3000); // Creating audio duration
    };

    return (
        <section className="section demo-section">
            <div className="container">
                <h2 className="demo-title">Zie hoe het werkt.</h2>

                <div className="demo-container">

                    {status === "idle" && (
                        <div className="audio-player-wrapper">
                            <button className="play-button" onClick={handlePlay}>
                                <Play fill="white" size={32} />
                            </button>
                            <p className="audio-label">Klik om te luisteren</p>
                            <p className="hero-subtitle" style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                                "Hé Sjef, maak een factuur voor Jansen. 12 uur werk, 200 materiaal."
                            </p>
                        </div>
                    )}

                    {status === "playing" && (
                        <div className="audio-player-wrapper">
                            <div className="audio-visualizer">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="visualizer-bar"
                                        style={{
                                            height: `${Math.random() * 40 + 10}px`,
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <p className="audio-label">Sjef luistert...</p>
                        </div>
                    )}

                    {status === "processing" && (
                        <div className="processing-state">
                            <div className="success-badge" style={{ background: 'var(--color-bg-soft)', color: 'var(--color-text-soft)' }}>
                                <Loader2 size={16} className="spin" /> Gegevens verwerken...
                            </div>
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {status === "done" && (
                        <div className="invoice-result">
                            <div className="success-badge">
                                <Check size={16} /> Factuur Klaar
                            </div>
                            <div className="invoice-card">
                                <div className="invoice-header">
                                    <div style={{ fontWeight: 800 }}>FACTUUR #2024-089</div>
                                    <div style={{ color: 'var(--color-text-soft)' }}>Dhr. Jansen</div>
                                </div>
                                <div className="invoice-item">
                                    <span>Arbeid (12u x €55)</span>
                                    <span>€ 660,00</span>
                                </div>
                                <div className="invoice-item">
                                    <span>Materiaal</span>
                                    <span>€ 200,00</span>
                                </div>
                                <div className="invoice-item" style={{ color: 'var(--color-text-soft)', fontSize: '0.8rem' }}>
                                    <span>BTW (21%)</span>
                                    <span>€ 180,60</span>
                                </div>
                                <div className="invoice-total">
                                    <span>Totaal</span>
                                    <span>€ 1.040,60</span>
                                </div>
                            </div>
                            <button
                                className="btn"
                                style={{ marginTop: '2rem', color: 'var(--color-primary)', background: 'transparent' }}
                                onClick={() => setStatus('idle')}
                            >
                                Opnieuw afspelen
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
