"use client";

/* 
 * BlueprintLines.js
 * A subtle vertical guide line that runs the full height of the page.
 * Uses strict CSS positioning relative to the body.
 */

export default function BlueprintLines() {
    return (
        <div
            className="blueprint-overlay"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: -1, /* Behind content */
                overflow: 'hidden',
                height: '100%', /* Covers full height of relative parent (body) */
            }}
        >
            {/* The Vertical Guide Line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0, /* Stretches top to bottom */
                    left: '33%', /* 1/3 layout */
                    width: '1px',
                    borderLeft: '1px dashed rgba(26, 32, 44, 0.2)', /* #1A202C at 20% opacity */
                }}
            >
                {/* The Terminus Ring (Attached to bottom of line) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0, /* At the very end of the line */
                        left: '-12.5px', /* Center: - (width/2 + border/2) approx */
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '2px solid rgba(26, 32, 44, 0.2)',
                        backgroundColor: 'transparent',
                        transform: 'translateY(50%)' /* Half sticking out potentially, or flush? "vast aan het uiteinde" usually means end of line matches circle edge or center. Let's center it on the tip. */
                    }}
                />
            </div>
        </div>
    );
}
