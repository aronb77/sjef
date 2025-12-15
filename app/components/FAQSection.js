"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import MagneticButton from "./MagneticButton"; // Keeping the CTA button if needed, but reducing emphasis
import "./FAQSection.css";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "Zit ik aan een contract vast?",
            a: "Nee. Je kunt elke maand opzeggen. Geen kleine lettertjes."
        },
        {
            q: "Werkt het ook met dialect of accent?",
            a: "Ja. Sjef snapt plat Amsterdams, Brabants, Limburgs en zelfs bouwplaats-jargon. Probeer het maar."
        },
        {
            q: "Kan ik mijn eigen logo toevoegen?",
            a: "Ja, als je kiest voor het 'Aannemer' pakket. Dan staan jouw logo en kleuren op elke PDF."
        },
        {
            q: "Wat als mijn credits op zijn?",
            a: "Dan koop je online simpel een los bundeltje bij. Je werk komt nooit stil te liggen."
        },
        {
            q: "Is mijn data veilig?",
            a: "Zeker. Wij delen niets met anderen. Jouw klanten zijn van jou."
        }
    ];

    return (
        <section className="faq-section">
            <div className="container">
                <h2 className="faq-title">Goed om te weten.</h2>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button className="faq-question" onClick={() => toggle(index)}>
                                {faq.q}
                                <div className="faq-icon-wrapper">
                                    <Plus className="faq-icon" size={20} />
                                </div>
                            </button>
                            <div className="faq-answer">
                                <div className="faq-answer-content">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
