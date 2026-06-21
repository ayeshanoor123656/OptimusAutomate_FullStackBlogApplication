import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard() {
    const email = localStorage.getItem("userEmail");
    const handle = email?.split("@")[0] || "writer";

    return (
        <div>
            <Navbar />

            <div className="page">
                <div className="dash-hero">
                    <p className="dash-eyebrow">Your workspace</p>
                    <h1 className="dash-heading">Good to see you, {handle}.</h1>
                    <p className="dash-sub">
                        Signed in as <span className="dash-email">{email}</span>
                    </p>
                </div>

                <div className="dash-grid">
                    <Link to="/create-post" className="dash-card dash-card--primary">
                        <div className="dash-card-icon">✦</div>
                        <h3 className="dash-card-title">New post</h3>
                        <p className="dash-card-desc">Start writing something new.</p>
                    </Link>

                    <Link to="/home" className="dash-card">
                        <div className="dash-card-icon">◈</div>
                        <h3 className="dash-card-title">Browse feed</h3>
                        <p className="dash-card-desc">Read what others have published.</p>
                    </Link>
                </div>
            </div>

            <style>{`
                .dash-hero {
                    padding: 60px 0 48px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 40px;
                }
                .dash-eyebrow {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    color: var(--violet-hi);
                    margin-bottom: 12px;
                }
                .dash-heading { font-size: clamp(28px, 4vw, 40px); margin-bottom: 12px; }
                .dash-sub { color: var(--text-dim); font-size: 15px; }
                .dash-email {
                    color: var(--text);
                    background: var(--surface2);
                    padding: 2px 8px;
                    border-radius: var(--r-sm);
                    font-size: 13px;
                    font-family: monospace;
                }
                .dash-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 16px;
                }
                .dash-card {
                    display: block;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--r-lg);
                    padding: 28px 24px;
                    transition: border-color .2s, transform .15s;
                    cursor: pointer;
                }
                .dash-card:hover {
                    border-color: var(--violet);
                    transform: translateY(-2px);
                }
                .dash-card--primary {
                    border-color: rgba(124,58,237,.4);
                    background: rgba(124,58,237,.06);
                }
                .dash-card--primary:hover { border-color: var(--violet-hi); }
                .dash-card-icon {
                    font-size: 20px;
                    color: var(--violet-hi);
                    margin-bottom: 16px;
                }
                .dash-card-title {
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 18px;
                    margin-bottom: 6px;
                    color: var(--heading);
                }
                .dash-card-desc { font-size: 14px; color: var(--text-dim); }
            `}</style>
        </div>
    );
}

export default Dashboard;