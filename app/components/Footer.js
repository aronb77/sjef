"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            {/* Background Element: Blueprint Line */}
            <div className="footer-blueprint-line">
                <div className="footer-blueprint-ring"></div>
            </div>

            <div className="footer-container">
                <div className="footer-grid">

                    {/* COL 1: HET MERK */}
                    <div className="footer-col">
                        <Link href="/" className="footer-logo">
                            Sjef.
                        </Link>
                        <p className="footer-tagline">
                            De slimste collega voor de bouw.
                        </p>
                        <div className="status-indicator">
                            <span className="status-dot"></span>
                            Alle systemen operationeel.
                        </div>
                    </div>

                    {/* COL 2: PRODUCT */}
                    <div className="footer-col">
                        <h4 className="footer-header">Sjef</h4>
                        <ul className="footer-list">
                            <li className="footer-item"><Link href="#prijzen" className="footer-link">Prijzen</Link></li>
                            <li className="footer-item"><Link href="#hoe-het-werkt" className="footer-link">Hoe het werkt</Link></li>
                            <li className="footer-item"><Link href="/login" className="footer-link">Inloggen</Link></li>
                            <li className="footer-item"><Link href="/register" className="footer-link">Registreren</Link></li>
                        </ul>
                    </div>

                    {/* COL 3: LEGAL */}
                    <div className="footer-col">
                        <h4 className="footer-header">Juridisch</h4>
                        <ul className="footer-list">
                            <li className="footer-item"><Link href="/algemene-voorwaarden" className="footer-link">Algemene Voorwaarden</Link></li>
                            <li className="footer-item"><Link href="/privacy" className="footer-link">Privacy Beleid</Link></li>
                            <li className="footer-item"><Link href="/cookies" className="footer-link">Cookies</Link></li>
                        </ul>
                    </div>

                    {/* COL 4: CONTACT */}
                    <div className="footer-col">
                        <h4 className="footer-header">Hulp nodig?</h4>
                        <div className="contact-info">
                            WhatsApp ons: 06-16112426<br />
                            Info@sjef.ai
                        </div>
                        <a href="https://wa.me/31616112426" target="_blank" rel="noopener noreferrer" className="btn-chat">
                            <MessageCircle size={18} />
                            Start Chat
                        </a>
                    </div>

                </div>

                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} Sjef AI. Gemaakt in Nederland 🇳🇱.
                </div>
            </div>
        </footer>
    );
}
