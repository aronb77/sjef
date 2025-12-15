"use client";

import { useRef, useState } from "react";

export default function MagneticButton({ children, className = "", onClick, style = {} }) {
    const btnRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3; // Magnet strength
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <button
            ref={btnRef}
            className={`btn ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Fast spring
            }}
        >
            {children}
        </button>
    );
}
