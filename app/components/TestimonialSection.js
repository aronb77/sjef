"use client";

import { MessageCircle } from "lucide-react";
import "./TestimonialSection.css";

const reports = [
    {
        id: 1,
        name: "Dave, Stukadoor",
        time: "17:43",
        text: "Eerste keer dat ik voor 18:00 thuis ben zonder dat ik nog administratie moet doen. Vrouw ook blij."
    },
    {
        id: 2,
        name: "M. van Vliet, Aannemer",
        time: "09:12",
        text: "Dacht eerst dat het onzin was. Maar die offertes zien er strakker uit dan wat ik zelf in Word zat te klooien. Blijvertje."
    },
    {
        id: 3,
        name: "Sander, Installatietechniek",
        time: "14:20",
        text: "Net tijdens de lunch in de bus 3 offertes ingesproken. Liggen nu al bij de klant. Topding."
    },
    {
        id: 4,
        name: "Klusbedrijf H.J.",
        time: "20:05",
        text: "Ik haat typen op zo'n schermpje. Dit werkt gewoon."
    }
];

export default function TestimonialSection() {
    return (
        <section className="testimonial-section">
            <div className="container">
                <div className="testimonial-header">
                    <h2 className="testimonial-title">Recht uit de praktijk.</h2>
                    <p className="testimonial-subtitle">
                        Geen marketingpraat. Dit zeggen de vakmannen.
                    </p>
                </div>

                <div className="masonry-grid">
                    {reports.map((report) => (
                        <div key={report.id} className="report-card">
                            <div className="report-meta">
                                <div className="meta-info">
                                    {report.name} <br />
                                    <span style={{ opacity: 0.6 }}>{report.time}</span>
                                </div>
                                <MessageCircle size={20} className="meta-icon" />
                            </div>
                            <p className="report-text">
                                "{report.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
