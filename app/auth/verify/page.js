import Link from 'next/link';
import { Mail } from 'lucide-react';
import './verify.css';

export default async function VerifyPage({ searchParams }) {
    const { email } = await searchParams;
    const displayEmail = email || 'jouw@email.nl';

    return (
        <div className="verify-container">
            {/* LEFT COLUMN: BRANDING */}
            <div className="brand-column">
                <div className="brand-header">
                    <Link href="/" className="brand-logo">Sjef.</Link>
                </div>

                <div className="brand-content">
                    <h1>Bijna binnen.</h1>
                    <p>Nog één beveiligings-check en we kunnen aan de slag.</p>
                </div>

                <div className="brand-footer">
                    <span>&copy; {new Date().getFullYear()} Sjef.</span>
                </div>
            </div>

            {/* RIGHT COLUMN: STATUS CARD */}
            <div className="status-column">
                <div className="status-card">
                    <div className="status-icon-wrapper">
                        <Mail size={40} strokeWidth={1.5} />
                    </div>

                    <h2 className="status-title">Check je mail.</h2>
                    <p className="status-sub">We hebben een bevestigingslink gestuurd naar:</p>

                    <div className="email-display">
                        {displayEmail}
                    </div>

                    <p className="verify-instruction">
                        Klik op de link in de mail om je account te activeren. Daarna word je automatisch ingelogd.
                    </p>

                    <div className="action-buttons">
                        {/* In a real app, this would trigger a resend action */}
                        <button className="btn-resend">
                            Geen mail ontvangen? Stuur opnieuw.
                        </button>

                        <Link href="/login" className="btn-back">
                            Terug naar inloggen
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
