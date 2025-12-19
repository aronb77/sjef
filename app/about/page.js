import Link from 'next/link';
import './about.css';

export default function MeetSjef() {
    return (
        <div className="meet-sjef-container">

            {/* SECTIE 1: DE HERO (The Introduction) */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">IK BEN SJEF.</h1>
                    <p className="hero-subtext mono">
                        Geen koffiepauzes. Geen 9-tot-5 mentaliteit. Jouw nieuwe stille vennoot.
                    </p>
                </div>
            </section>

            {/* SECTIE 2: HET MANIFEST (The Code) */}
            <section className="manifest-section">
                <div className="manifest-container">
                    <h2 className="section-title mono">&lt;MIJN PROGRAMMERING /&gt;</h2>
                    <p className="manifest-text">
                        Ik ben gebouwd voor één doel: De avond terugveroveren. Terwijl jij op de steiger staat, doe ik de administratie.
                        Ik luister naar je stem, begrijp je vakjargon en vertaal jouw vakmanschap naar papierwerk dat staat als een huis.
                        Ik klaag niet over overwerk en ik maak geen rekenfouten.
                    </p>
                </div>
            </section>

            {/* SECTIE 3: DE SPECIFICATIES (The Machine Data) */}
            <section className="specs-section">
                <div className="specs-grid mono">
                    <div className="spec-card">
                        <span className="spec-label">OUTPUT</span>
                        <div className="spec-value">RAZOR-SHARP PDF'S</div>
                    </div>
                    <div className="spec-card">
                        <span className="spec-label">FUEL</span>
                        <div className="spec-value">SPRAAK & DATA</div>
                    </div>
                    <div className="spec-card">
                        <span className="spec-label">MEMORY</span>
                        <div className="spec-value">ONEINDIG (CLOUD)</div>
                    </div>
                    <div className="spec-card">
                        <span className="spec-label">UPTIME</span>
                        <div className="spec-value">24/7/365</div>
                    </div>
                    <div className="spec-card">
                        <span className="spec-label">LOCATIE</span>
                        <div className="spec-value">IN JE BROEKZAK</div>
                    </div>
                </div>
            </section>

            {/* SECTIE 4: DE EVOLUTIE (The Timeline) */}
            <section className="timeline-section">
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-label mono">VERLEDEN</div>
                        <p className="timeline-text">Administratie was chaos. Bonnetjes in het dashboardkastje. Uren typen op zondagavond.</p>
                    </div>
                    <div className="timeline-item active">
                        <div className="timeline-dot"></div>
                        <div className="timeline-label mono">HEDEN</div>
                        <p className="timeline-text">Sjef luistert mee. Eén druk op de knop. Geregeld voor je thuis bent.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-label mono">TOEKOMST</div>
                        <p className="timeline-text">Jij bouwt. Ik regel de rest.</p>
                    </div>
                </div>
            </section>

            {/* SECTIE 5: DE BELOFTE (Closing Statement) */}
            <section className="promise-section">
                <div className="promise-content">
                    <span className="promise-quote">"IK BEN HET GEREEDSCHAP<br />DAT NOOIT BOT WORDT."</span>
                    <Link href="/register" className="btn-sjef-primary">
                        HUUR SJEF IN
                    </Link>
                </div>
            </section>

        </div>
    );
}
