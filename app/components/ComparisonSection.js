"use client";

import { X, Check, Hourglass, Zap } from "lucide-react";
import "./ComparisonSection.css";

export default function ComparisonSection() {
    return (
        <section className="comparison-section">
            <div className="container">
                <div className="comparison-grid">

                    {/* LEFT: Old Way */}
                    <div className="comparison-card old-way">
                        <Hourglass size={48} className="comp-icon" strokeWidth={1.5} />
                        <h3 className="comp-header">Zelf doen in de avond</h3>

                        <ul className="comp-list">
                            <li className="comp-item">
                                <X size={20} className="status-icon cross" />
                                <span>Notities ontcijferen na werk</span>
                            </li>
                            <li className="comp-item">
                                <X size={20} className="status-icon cross" />
                                <span>Typen op laptop of telefoon</span>
                            </li>
                            <li className="comp-item">
                                <X size={20} className="status-icon cross" />
                                <span>Foto's en bonnetjes zoeken</span>
                            </li>
                            <li className="comp-item">
                                <X size={20} className="status-icon cross" />
                                <span>Vaak te laat verstuurd</span>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT: Sjef Way */}
                    <div className="comparison-card sjef-way">
                        <Zap size={48} className="comp-icon" strokeWidth={2} fill="rgba(249, 115, 22, 0.1)" />
                        <h3 className="comp-header">Sjef regelt het direct</h3>

                        <ul className="comp-list">
                            <li className="comp-item">
                                <Check size={20} className="status-icon check" strokeWidth={3} />
                                <span>Inspereken in de bus/auto</span>
                            </li>
                            <li className="comp-item">
                                <Check size={20} className="status-icon check" strokeWidth={3} />
                                <span>Direct een PDF in je mail</span>
                            </li>
                            <li className="comp-item">
                                <Check size={20} className="status-icon check" strokeWidth={3} />
                                <span>Alles op één plek bewaard</span>
                            </li>
                            <li className="comp-item">
                                <Check size={20} className="status-icon check" strokeWidth={3} />
                                <span>Meer tijd voor thuis</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
