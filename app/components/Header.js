"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import "./Header.css";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            {/* Logo */}
            <Link href="/" className="header-logo">
                Sjef.
            </Link>

            {/* Navigation (Centered) */}
            <nav className="header-nav">
                <Link href="#hoe-het-werkt" className="nav-link">
                    Hoe het werkt
                </Link>
                <Link href="#prijzen" className="nav-link">
                    Prijzen
                </Link>
                <Link href="#contact" className="nav-link">
                    Hulp nodig?
                </Link>
            </nav>

            {/* Actions (Right) */}
            <div className="header-actions">
                <Link href="/login" className="nav-link" style={{ marginRight: '1.5rem', fontSize: '0.95rem' }}>
                    Inloggen
                </Link>

                <Link href="/register" className="header-cta">
                    Probeer Sjef gratis
                </Link>
            </div>
        </header>
    );
}
