"use client";

import Link from 'next/link';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import './register.css';
import { signup } from '../auth/actions';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // Validation Logic
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    const showEmailError = touched.email && !isEmailValid && formData.email.length > 0;
    const showPasswordError = touched.password && !isPasswordValid && formData.password.length > 0;

    return (
        <div className="register-container">
            {/* LEFT COLUMN: BRANDING */}
            <div className="brand-column">
                <div className="brand-header">
                    <Link href="/" className="brand-logo">Sjef.</Link>
                </div>

                <div className="brand-content">
                    <h1>Start met 3 gratis offertes.</h1>
                    <p>Ervaar hoe Sjef werkt. Geen creditcard nodig, binnen 1 minuut geregeld.</p>
                </div>

                <div className="brand-footer">
                    <span>&copy; {new Date().getFullYear()} Sjef.</span>
                </div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div className="form-column">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2>Maak je account.</h2>
                        <p className="subtext">Vul je gegevens in om te starten.</p>
                    </div>



                    <form className="register-form">

                        {/* NAME */}
                        <div className="input-group">
                            <label htmlFor="name">Volledige Naam</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Jan de Vries"
                                    className="input-field"
                                    /* Removed controlled value for server action simplicity or keep it if needed for validation visual only, but server action needs name. kept value/onChange for validation logic */
                                    defaultValue={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.name.length > 2 && (
                                    <Check className="validation-icon valid" size={18} />
                                )}
                            </div>
                        </div>

                        {/* COMPANY */}
                        <div className="input-group">
                            <div className="label-row">
                                <label htmlFor="company">Bedrijfsnaam</label>
                                <span className="label-optional">(Optioneel)</span>
                            </div>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Jansen Bouw B.V."
                                className="input-field"
                                defaultValue={formData.company}
                                onChange={handleChange}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="input-group">
                            <label htmlFor="email">E-mailadres</label>
                            <div className="input-with-icon">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="jouw@email.nl"
                                    className={`input-field ${showEmailError ? 'error' : ''}`}
                                    defaultValue={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('email')}
                                    required
                                />
                                {isEmailValid && (
                                    <Check className="validation-icon valid" size={18} />
                                )}
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="input-group">
                            <label htmlFor="password">Wachtwoord</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Minimaal 6 tekens"
                                    className={`input-field ${showPasswordError ? 'error' : ''}`}
                                    defaultValue={formData.password}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('password')}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {showPasswordError && (
                                <p className="error-message">Kies een sterker wachtwoord (min. 6 tekens).</p>
                            )}
                        </div>

                        <button formAction={signup} className="btn-primary btn-full">
                            Account aanmaken
                        </button>

                        <p className="legal-text">
                            Door te starten ga je akkoord met de <a href="#">voorwaarden</a>.
                        </p>
                    </form>

                    <div className="form-footer">
                        <p>Heb je al een account? <Link href="/login" className="register-link">Log hier in</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
