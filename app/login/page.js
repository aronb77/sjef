import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import './login.css';
import { login } from '../auth/actions';

export default function LoginPage({ searchParams }) {
    return (
        <div className="login-container">
            {/* LEFT COLUMN: BRANDING */}
            <div className="brand-column">
                <div className="brand-header">
                    <Link href="/" className="brand-logo">Sjef.</Link>
                </div>

                <div className="brand-content">
                    <h1>Jouw kantoor, eindelijk geregeld.</h1>
                    <p>Beheer je credits, bekijk je historie en stroomlijn je administratie.</p>
                </div>

                <div className="brand-footer">
                    {/* Optional: Copyright or tagline */}
                    <span>&copy; {new Date().getFullYear()} Sjef.</span>
                </div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div className="form-column">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2>Welkom terug.</h2>
                        <p className="subtext">Log in met je e-mailadres en wachtwoord.</p>

                        {/* ALERTS */}
                        {searchParams?.verified === 'true' && (
                            <div className="alert alert-success">
                                <span className="alert-icon">✓</span>
                                <div className="alert-content">
                                    <strong>Je e-mail is bevestigd!</strong>
                                    <p>Log in om te starten.</p>
                                </div>
                            </div>
                        )}

                        {searchParams?.error === 'verification_failed' && (
                            <div className="alert alert-error">
                                <span className="alert-icon">!</span>
                                <div className="alert-content">
                                    <strong>Er ging iets mis.</strong>
                                    <p>De link is ongeldig of verlopen. Probeer het opnieuw.</p>
                                </div>
                            </div>
                        )}

                    </div>



                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">E-mailadres</label>
                            <input
                                type="email"
                                id="email"
                                name="email" /* Added name attribute */
                                placeholder="jouw@email.nl"
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Wachtwoord</label>
                            <div className="password-input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password" /* Added name attribute */
                                    placeholder="••••••••"
                                    className="input-field"
                                    required
                                />
                                <button type="button" className="password-toggle" aria-label="Toggle password visibility">
                                    <Eye className="icon-eye" size={20} />
                                </button>
                            </div>
                            <Link href="/forgot-password" className="forgot-link">Wachtwoord vergeten?</Link>
                        </div>

                        <button formAction={login} className="btn-primary btn-full">
                            Inloggen
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>Nog geen account? <Link href="/register" className="register-link">Maak er hier een aan</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
