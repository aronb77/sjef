"use client";

import { useEffect, useRef, useState } from "react";

export default function BlueprintLines() {
    const [isVisible, setIsVisible] = useState(false);
    const svgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }

        return () => {
            if (svgRef.current) observer.unobserve(svgRef.current);
        };
    }, []);

    return (
        <div
            ref={svgRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden'
            }}
            className="blueprint-overlay"
        >
            <svg
                width="100%"
                height="100%"
                style={{ opacity: 0.3 }}
            >
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
                    </pattern>
                </defs>

                {/* Background Grid (Always there but subtle) */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Animated Connecting Lines */}
                <path
                    d="M 100,0 L 100,500 L 400,500"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset={isVisible ? 0 : 1000}
                    style={{ transition: 'stroke-dashoffset 3s ease-in-out' }}
                />

                <circle
                    cx="400"
                    cy="500"
                    r="4"
                    fill="var(--color-primary)"
                    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s 3s' }}
                />

                <path
                    d="M 900,200 L 900,800 L 500,800"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset={isVisible ? 0 : 1000}
                    style={{ transition: 'stroke-dashoffset 4s ease-in-out 1s' }}
                />

            </svg>
        </div>
    );
}
