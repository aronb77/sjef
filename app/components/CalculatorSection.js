"use client";

import { useState } from "react";
import Link from "next/link";
import "./CalculatorSection.css";

export default function CalculatorSection() {
    const [hourlyRate, setHourlyRate] = useState(55); // Default €55
    const [hoursPerWeek, setHoursPerWeek] = useState(4); // Default 4 hours admin

    // Constants
    const costSjefMonthly = 49;

    // Calculations
    // 4 weeks per month assumption for simple monthly calc
    const monthlyCostOwnTime = hourlyRate * hoursPerWeek * 4;
    const monthlySavings = monthlyCostOwnTime - costSjefMonthly;

    // Scale for Bar Chart (Normalize max to sensible value, e.g. €2000 cost)
    const maxScale = 2500;
    const barWidthOwn = Math.min(100, (monthlyCostOwnTime / maxScale) * 100);
    const barWidthSjef = Math.min(100, (costSjefMonthly / maxScale) * 100);

    // Dynamic Copy Logic
    const getMicroCopy = (savings) => {
        if (savings <= 200) return "Elke euro is er één. Begin met besparen.";
        if (savings <= 800) return "Dat is een flinke lease-auto rijden.";
        return "Dat is een mooie vakantie, elk jaar weer.";
    };

    return (
        <section id="calculator" className="calculator-section">
            <div className="calculator-wrapper">

                {/* Left Panel: Input */}
                <div className="calc-panel-input">
                    <h2 className="panel-title">Jouw situatie.</h2>

                    {/* Slider 1: Rate */}
                    <div className="input-group">
                        <div className="input-header">
                            <div>
                                <label className="input-label">Jouw Uurtarief</label>
                            </div>
                            <div className="input-value">€ {hourlyRate}</div>
                        </div>
                        <input
                            type="range"
                            min="25"
                            max="95"
                            step="5"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                        />
                    </div>

                    {/* Slider 2: Hours */}
                    <div className="input-group">
                        <div className="input-header">
                            <div>
                                <label className="input-label">Uren admin / week</label>
                                <span className="sub-label">Offertes, facturen, e-mail.</span>
                            </div>
                            <div className="input-value">{hoursPerWeek}u</div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="calc-panel-output">

                    <div className="chart-container">
                        <div className="chart-row">
                            <div className="chart-label">
                                <span>Kosten eigen tijd</span>
                                <span>€ {monthlyCostOwnTime}</span>
                            </div>
                            <div className="bar-bg">
                                <div className="bar-fill cost" style={{ width: `${barWidthOwn}%` }}></div>
                            </div>
                        </div>

                        <div className="chart-row">
                            <div className="chart-label">
                                <span>Kosten Sjef</span>
                                <span>€ {costSjefMonthly}</span>
                            </div>
                            <div className="bar-bg">
                                <div className="bar-fill sjef" style={{ width: `${barWidthSjef}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="savings-display">
                        <div className="savings-label">Extra winst per maand</div>
                        <div className="savings-amount">
                            € {monthlySavings > 0 ? monthlySavings.toLocaleString('nl-NL') : 0},-
                        </div>
                        <p className="dynamic-microcopy">
                            "{getMicroCopy(monthlySavings)}"
                        </p>
                        <Link href="/aanmelden" className="btn-calc-cta">
                            Pak die winst
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
