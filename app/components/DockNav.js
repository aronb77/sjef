"use client";

import { Home, Tag, Info, Shield, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./DockNav.css";

export default function DockNav() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            // Show dock when scrolled down > 100px (Header disappears on mobile ~100px)
            const shouldShow = window.scrollY > 100;
            setIsVisible(shouldShow);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const tools = [
        { icon: <Home size={22} />, label: "Home", href: "/" },
        { icon: <Tag size={22} />, label: "Prijzen", href: "#prijzen" },
        { icon: <Info size={22} />, label: "About", href: "/about" },
        { icon: <Shield size={22} />, label: "Veiligheid", href: "/security" },
        { icon: <LogIn size={22} />, label: "Login", href: "/login" },
    ];

    return (
        <nav className={`dock-nav ${isVisible ? "visible" : ""}`}>
            {tools.map((tool, index) => (
                <Link
                    key={index}
                    href={tool.href}
                    className={`dock-btn ${activeTab === tool.href ? "active" : ""}`}
                    onClick={() => setActiveTab(tool.href)}
                >
                    {tool.icon}
                    {/* Optional: Tooltip if needed, but keeping it icon-only as requested */}
                </Link>
            ))}
        </nav>
    );
}
