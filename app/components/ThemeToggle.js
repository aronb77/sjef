"use client";

import { useEffect, useState } from "react";
import { HardHat, Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [isConstructionMode, setIsConstructionMode] = useState(false);
    const [isNoteVisible, setIsNoteVisible] = useState(false);

    useEffect(() => {
        // Check time for 'Night Mode' Easter Egg
        const hour = new Date().getHours();
        if (hour >= 20 || hour < 6) {
            setIsConstructionMode(true);
            setIsNoteVisible(true);
            setTimeout(() => setIsNoteVisible(false), 5000); // Hide note after 5s
        }
    }, []);

    useEffect(() => {
        if (isConstructionMode) {
            document.documentElement.classList.add("theme-construction");
        } else {
            document.documentElement.classList.remove("theme-construction");
        }
    }, [isConstructionMode]);

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>

            {isNoteVisible && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    boxShadow: 'var(--shadow-md)',
                    animation: 'fadeIn 0.5s ease-out',
                    whiteSpace: 'nowrap',
                    zIndex: 2000
                }}>
                    🌙 Avondklok: Automatische Bouwplaats Modus aan.
                </div>
            )}

            <button
                onClick={() => setIsConstructionMode(!isConstructionMode)}
                style={{
                    background: 'transparent',
                    border: '1px solid #E2E8F0',
                    padding: '8px 12px',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#4A5568',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem'
                }}
                className="header-theme-toggle"
            >
                {isConstructionMode ? (
                    <>
                        <HardHat size={16} /> Bouwplaats
                    </>
                ) : (
                    <>
                        <Sun size={16} /> Kantoor
                    </>
                )}
            </button>
        </div>
    );
}
