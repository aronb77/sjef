import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../auth/actions'
import { FileText, Calendar, Clock, Sparkles, Mic, CreditCard } from 'lucide-react' // Import icons
import BuyCreditsButton from './BuyCreditsButton'
import RedeemForm from './RedeemForm'
import CompactPricing from './CompactPricing'
import './Dashboard.css'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits_balance')
        .eq('id', user.id)
        .single()

    const credits = profile?.credits_balance ?? 0
    const creditsEstimate = Math.floor(credits / 2); // "Genoeg voor ± X offertes" (Example logic: 2 credits per quote)

    // Donut Chart Logic
    const maxCredits = 250; // Visual max
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((credits / maxCredits) * circumference);

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0F172A' }}>Dashboard</h1>
                    <p style={{ color: '#64748B' }}>Welkom terug, {user.email?.split('@')[0]}</p>
                </div>

                <div className="user-profile">
                    <span className="user-badge">PRO</span>
                    <div className="user-avatar" title={user.email}>
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <form action={logout}>
                        <button type="submit" style={{ fontSize: '0.8rem', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                            Uitloggen
                        </button>
                    </form>
                </div>
            </header>

            {/* Bento Grid */}
            <div className="bento-grid">

                {/* WIDGET 1: FUEL GAUGE */}
                <div className="widget-card widget-fuel">
                    <div className="fuel-chart-container">
                        <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
                            {/* Track (Blue) */}
                            <circle
                                cx="110" cy="110" r={radius}
                                fill="none"
                                stroke="#E0E7FF" /* Light Tech Blue */
                                strokeWidth="20"
                            />
                            {/* Value (Orange) - If you wanted "Vol: Tech Blue", usually means the bar is blue? 
                               Request says: "Vol: Tech Blue. Huidig niveau: Safety Orange." 
                               I will interpret as: Background = Blue-ish/Empty, Value = Orange.
                            */}
                            <circle
                                cx="110" cy="110" r={radius}
                                fill="none"
                                stroke="#F97316" /* Safety Orange */
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset > 0 ? offset : 0}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="fuel-value">
                            <span className="fuel-number">{credits}</span>
                            <span className="fuel-label">Credits over</span>
                        </div>
                    </div>
                    <p className="fuel-micro">Genoeg voor ± {creditsEstimate} offertes.</p>
                </div>

                {/* WIDGET 2: PRODUCTION */}
                <div className="widget-card widget-production">
                    <div className="stats-row">
                        <div className="stat-item">
                            <div className="stat-icon"><FileText size={20} /></div>
                            <div className="stat-content">
                                <span className="stat-value">48</span>
                                <span className="stat-label">Totaal</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><Calendar size={20} /></div>
                            <div className="stat-content">
                                <span className="stat-value">12</span>
                                <span className="stat-label">Dez. maand</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><Clock size={20} /></div>
                            <div className="stat-content">
                                <span className="stat-value green">6,5u</span>
                                <span className="stat-label">Bespaard</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WIDGET 3: RUNWAY */}
                <div className="widget-card widget-runway">
                    <div className="runway-icon">🤖</div>
                    <p className="runway-text">
                        Lekker bezig, Jan. Met dit tempo red je het makkelijk tot het einde van de maand.
                    </p>
                </div>

                {/* WIDGET 4: RECENT ACTIVITY */}
                <div className="widget-card widget-activity">
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#0F172A' }}>Recente Activiteit</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-info">
                                <span className="activity-name">Offerte Jansen</span>
                                <span className="activity-time">Vandaag, 14:00</span>
                            </div>
                            <span className="activity-amount negative">-2 cr</span>
                        </div>
                        <div className="activity-item">
                            <div className="activity-info">
                                <span className="activity-name">Offerte Dakraam</span>
                                <span className="activity-time">Gisteren</span>
                            </div>
                            <span className="activity-amount negative">-2 cr</span>
                        </div>
                        <div className="activity-item">
                            <div className="activity-info">
                                <span className="activity-name">Bundel Tankbeurt</span>
                                <span className="activity-time">12 okt</span>
                            </div>
                            <span className="activity-amount positive">+45 cr</span>
                        </div>
                    </div>
                </div>



                {/* WIDGET 5: QUICK ACTIONS */}
                <div className="widget-card widget-actions">
                    <div className="action-buttons-row">


                        <button className="btn-action-primary">
                            <Mic size={20} />
                            Offerte Inspreken
                        </button>
                    </div>

                    <RedeemForm />
                </div>

            </div>

            <CompactPricing />
        </div>
    )
}
