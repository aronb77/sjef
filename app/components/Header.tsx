"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import "./Header.css";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock Auth State - change to true to test "Logged In" view
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    // Handle Scroll for Glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "Prijzen", href: "/#prijzen" },
        { name: "Over Ons", href: "/about" },
        { name: "Veiligheid", href: "/security" },
    ];

    return (
        <header className={`header ${scrolled ? "glass-effect" : ""}`}>
            <div className="header-container">

                {/* 1. LEFT: The Brand */}
                <Link href="/" className="header-brand">
                    Sjef<span className="text-orange-500">.</span>
                </Link>

                {/* 2. CENTER: Desktop Navigation */}
                <nav className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* 3. RIGHT: Action Area */}
                <div className="header-actions">
                    {isLoggedIn ? (
                        /* Scenario B: Logged In */
                        <Link href="/dashboard" className="btn-dashboard">
                            <User size={18} />
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        /* Scenario A: Guest */
                        <>
                            <Link href="/login" className="nav-link hide-mobile">
                                Inloggen
                            </Link>
                            <Link href="/register" className="btn-primary">
                                Start Gratis
                            </Link>
                        </>
                    )}

                    {/* Mobile Hamburger */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="mobile-menu"
                    >
                        <div className="mobile-menu-container">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="mobile-link"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mobile-actions">
                                <Link href="/login" className="mobile-link text-gray-400">
                                    Inloggen
                                </Link>
                                {/* Mobile-only extra CTA if needed */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
