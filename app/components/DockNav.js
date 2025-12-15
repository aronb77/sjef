"use client";

import { Home, Calculator, Receipt, Mail, Hammer } from "lucide-react";
import { useEffect, useState } from "react";

export default function DockNav() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const tools = [
        { icon: <Home size={24} />, label: "Home", href: "#" },
        { icon: <Calculator size={24} />, label: "Reken", href: "#calculator" },
        { icon: <Receipt size={24} />, label: "Prijzen", href: "#pricing" },
        { icon: <Hammer size={24} />, label: "Demo", href: "#demo" },
        { icon: <Mail size={24} />, label: "Contact", href: "#contact" },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                zIndex: 1000,
                alignItems: 'flex-end',
            }}
            className="dock-nav"
        >
            {tools.map((tool, index) => (
                <button
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: hoveredIndex === index ? 'var(--color-primary)' : 'var(--color-bg-soft)',
                        color: hoveredIndex === index ? 'white' : 'var(--color-text)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transform: hoveredIndex === index ? 'scale(1.2) translateY(-10px)' : 'scale(1)',
                        position: 'relative'
                    }}
                    title={tool.label}
                >
                    {tool.icon}
                    {hoveredIndex === index && (
                        <span style={{
                            position: 'absolute',
                            top: '-35px',
                            background: '#1f2937',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            whiteSpace: 'nowrap'
                        }}>
                            {tool.label}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}
