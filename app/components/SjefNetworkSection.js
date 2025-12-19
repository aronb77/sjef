"use client";

import Link from "next/link";
import { Camera, Mic, FileText, Cloud, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./SjefNetworkSection.css";

export default function SjefNetworkSection() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    // Parallax transform style - Subtle 3D rotation
    const parallaxStyle = {
        transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`,
    };

    // Parallax translation for nodes - Depth effect
    const nodeParallaxStyle = (depth = 1) => ({
        transform: `translate(${mousePos.x * 20 * depth}px, ${mousePos.y * 20 * depth}px)`,
    });

    return (
        <section
            id="features"
            className={`sjef-network-section animate-on-scroll ${inView ? "in-view" : ""}`}
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            <div className="network-container">

                {/* DOEL: Visual (Linked nodes) */}
                <div className="network-visual">
                    <div className="network-diagram" style={parallaxStyle}>
                        {/* Central Hub */}
                        <div className="hub">
                            <Brain />
                        </div>

                        {/* Connection Lines (SVG Overlay) */}
                        {/* 
                           ViewBox matches the CSS dimensions roughly (600x600).
                           Hub center is 300,300.
                           Node positions correspond to the CSS percentages approx.
                        */}
                        <svg viewBox="0 0 600 600" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                            <defs>
                                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#F97316" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Line 1: Camera (Top Left 15% 20% -> ~90, 120) to Center (300,300) */}
                            <path d="M120 150 L300 300" stroke="#F97316" strokeWidth="2" className="connector-base" />
                            <path d="M120 150 L300 300" stroke="#F97316" strokeWidth="4" className="connector-beam" />

                            {/* Line 2: Mic (Bottom Left 15% 80% -> ~90, 480) */}
                            <path d="M120 450 L300 300" stroke="#F97316" strokeWidth="2" className="connector-base" />
                            <path d="M120 450 L300 300" stroke="#F97316" strokeWidth="4" className="connector-beam" style={{ animationDelay: '2s' }} />

                            {/* Line 3: PDF (Top Right 85% 20% -> ~510, 120) */}
                            <path d="M300 300 L480 150" stroke="#F97316" strokeWidth="2" className="connector-base" />
                            <path d="M300 300 L480 150" stroke="#F97316" strokeWidth="4" className="connector-beam" style={{ animationDelay: '1.8s' }} />

                            {/* Line 4: Cloud (Bottom Right 85% 80% -> ~510, 480) */}
                            <path d="M300 300 L480 450" stroke="#F97316" strokeWidth="2" className="connector-base" />
                            <path d="M300 300 L480 450" stroke="#F97316" strokeWidth="4" className="connector-beam" style={{ animationDelay: '2.2s' }} />
                        </svg>

                        {/* Input Nodes 
                            Positions are relatively positioned via CSS. 
                            We simply apply parallax styles on top.
                        */}

                        <div className="node input-1" style={nodeParallaxStyle(1.2)}>
                            <Camera size={24} />
                        </div>
                        <div className="node input-2" style={nodeParallaxStyle(1.1)}>
                            <Mic size={24} />
                        </div>

                        {/* Output Nodes */}
                        <div className="node output-1" style={nodeParallaxStyle(1.3)}>
                            <FileText size={24} />
                        </div>
                        <div className="node output-2" style={nodeParallaxStyle(1.2)}>
                            <Cloud size={24} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="network-content">
                    <span className="section-label">Het Sjef Netwerk</span>
                    <h2 className="network-title">
                        Gebouwd voor de échte praktijk.
                    </h2>
                    <h3 className="network-subtitle">
                        Geen gedoe in de cloud, maar grip op je klus.
                    </h3>
                    <p className="network-description">
                        Sjef transformeert jouw chaos—ingesproken memo's, foto's van bonnetjes—direct in bruikbare documenten.
                        Hij structureert alles automatisch en koppelt het aan je favoriete boekhoudpakket.
                        Zo heb jij je handen vrij voor het vakwerk.
                    </p>
                    <Link href="#techniek" className="btn-tech">
                        Zie hoe het werkt
                    </Link>
                </div>

            </div>
        </section>
    );
}
