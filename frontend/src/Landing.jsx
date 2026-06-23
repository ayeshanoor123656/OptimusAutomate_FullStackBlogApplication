import { Link } from "react-router-dom";

const SAMPLE_POSTS = [
    {
        title: "The quiet power of writing slowly",
        author: "Mara S.",
        excerpt: "In a world of hot takes and instant reactions, there is something radical about sitting with a thought long enough to actually understand it.",
        tag: "Craft",
    },
    {
        title: "What I learned building in public for a year",
        author: "Dev R.",
        excerpt: "Shipping openly changed how I think, how I write, and — unexpectedly — who I became as a builder.",
        tag: "Reflection",
    },
    {
        title: "On the art of the perfect paragraph",
        author: "Leila K.",
        excerpt: "Every great essay is held together by a handful of sentences that do disproportionate work. Here's how to find yours.",
        tag: "Writing",
    },
];

function Landing() {
    return (
        <div className="landing">

            {/* ── Nav ── */}
            <nav className="l-nav">
                <div className="l-nav-inner">
                    <span className="l-brand">
                        <span className="l-dot" />
                        Inkwell
                    </span>
                    <div className="l-nav-links">
                        <Link to="/login" className="l-nav-link">Sign in</Link>
                        <Link to="/register" className="l-cta-sm">Start writing</Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="l-hero">
                <div className="l-hero-inner">
                    <p className="l-eyebrow">A place for real writing</p>
                    <h1 className="l-hero-heading">
                        Your ideas deserve<br />
                        <em>a proper home.</em>
                    </h1>
                    <p className="l-hero-sub">
                        Inkwell is a distraction-free space to write, share, and discover stories that actually say something.
                    </p>
                    <div className="l-hero-actions">
                        {/* ✅ Removed "Read the feed →" link — feed requires login */}
                        <Link to="/register" className="btn-primary l-hero-btn">Create your account</Link>
                        <Link to="/login" className="l-hero-secondary">Sign in →</Link>
                    </div>
                </div>

                <div className="l-hero-deco" aria-hidden="true">
                    <div className="deco-ring deco-ring-1" />
                    <div className="deco-ring deco-ring-2" />
                    <div className="deco-pulse" />
                </div>
            </section>

            {/* ── Sample posts ── */}
            <section className="l-section">
                <div className="l-container">
                    <p className="l-section-label">From the community</p>
                    <h2 className="l-section-heading">Stories worth your time</h2>

                    <div className="l-posts">
                        {SAMPLE_POSTS.map((post, i) => (
                            <div key={i} className="l-post-card">
                                <span className="l-post-tag">{post.tag}</span>
                                <h3 className="l-post-title">{post.title}</h3>
                                <p className="l-post-excerpt">{post.excerpt}</p>
                                <span className="l-post-author">— {post.author}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="l-section l-section--alt">
                <div className="l-container">
                    <p className="l-section-label">Why Inkwell</p>
                    <h2 className="l-section-heading">Built for writers, not algorithms</h2>

                    <div className="l-features">
                        {[
                            { icon: "✦", title: "Rich editor", desc: "A full formatting toolkit — headings, lists, emphasis — without the clutter." },
                            { icon: "◈", title: "Cover images", desc: "Upload a photo that sets the mood before a single word is read." },
                            { icon: "◎", title: "Comments & likes", desc: "Real reactions from real readers. No follower counts, no vanity metrics." },
                            { icon: "⬡", title: "Your feed", desc: "A chronological stream of everything the community is publishing." },
                        ].map((f, i) => (
                            <div key={i} className="l-feature">
                                <span className="l-feature-icon">{f.icon}</span>
                                <h3 className="l-feature-title">{f.title}</h3>
                                <p className="l-feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="l-cta-section">
                <div className="l-container l-cta-inner">
                    <h2 className="l-cta-heading">The blank page is waiting.</h2>
                    <p className="l-cta-sub">Join Inkwell and start writing today — free, forever.</p>
                    <Link to="/register" className="btn-primary l-hero-btn">Get started free</Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="l-footer">
                <div className="l-container l-footer-inner">
                    <span className="l-brand">
                        <span className="l-dot" />
                        Inkwell
                    </span>
                    <p className="l-footer-copy">© {new Date().getFullYear()} Inkwell. A place for honest writing.</p>
                </div>
            </footer>

            <style>{`
                .landing {
                    background: var(--bg);
                    min-height: 100svh;
                }

                /* Nav — ✅ fixed to match --bg, not the old dark theme */
                .l-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(250,248,245,.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                }
                .l-nav-inner {
                    max-width: 1000px; margin: 0 auto; padding: 0 24px;
                    height: 58px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .l-brand {
                    display: flex; align-items: center; gap: 8px;
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 20px; color: var(--heading);
                }
                .l-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: var(--violet);
                    display: inline-block;
                }
                .l-nav-links { display: flex; align-items: center; gap: 8px; }
                .l-nav-link {
                    font-size: 14px; color: var(--text-dim); padding: 6px 12px;
                    border-radius: var(--r-sm); transition: color .15s;
                }
                .l-nav-link:hover { color: var(--heading); }
                .l-cta-sm {
                    font-size: 14px; font-weight: 500;
                    background: var(--violet); color: #fff;
                    padding: 7px 18px; border-radius: var(--r-sm);
                    transition: background .2s;
                }
                .l-cta-sm:hover { background: var(--violet-hi); }

                /* Hero */
                .l-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 100px 24px 120px;
                    text-align: center;
                    border-bottom: 1px solid var(--border);
                }
                .l-hero-inner { position: relative; z-index: 2; max-width: 680px; margin: 0 auto; }
                .l-eyebrow {
                    font-size: 12px; font-weight: 500;
                    letter-spacing: .1em; text-transform: uppercase;
                    color: var(--violet-hi); margin-bottom: 20px;
                }
                .l-hero-heading {
                    font-size: clamp(36px, 6vw, 64px);
                    line-height: 1.1; margin-bottom: 20px;
                    color: var(--heading);
                }
                .l-hero-heading em {
                    font-style: italic;
                    color: var(--violet-hi);
                }
                .l-hero-sub {
                    font-size: clamp(15px, 1.8vw, 18px);
                    color: var(--text-dim); max-width: 480px;
                    margin: 0 auto 36px; line-height: 1.7;
                }
                .l-hero-actions {
                    display: flex; align-items: center; justify-content: center;
                    gap: 20px; flex-wrap: wrap;
                }
                .l-hero-btn { padding: 13px 32px; font-size: 15px; border-radius: var(--r-sm); }
                .l-hero-secondary {
                    font-size: 15px; color: var(--text-dim);
                    transition: color .15s;
                }
                .l-hero-secondary:hover { color: var(--violet-hi); }

                /* Deco rings */
                .l-hero-deco {
                    position: absolute; inset: 0; pointer-events: none;
                    display: flex; align-items: center; justify-content: center;
                }
                .deco-ring {
                    position: absolute; border-radius: 50%;
                    border: 1px solid rgba(192,132,160,.15);
                }
                .deco-ring-1 { width: 500px; height: 500px; }
                .deco-ring-2 { width: 780px; height: 780px; border-color: rgba(192,132,160,.07); }
                .deco-pulse {
                    position: absolute;
                    width: 180px; height: 180px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(192,132,160,.15) 0%, transparent 70%);
                }

                /* Sections */
                .l-section { padding: 80px 24px; border-bottom: 1px solid var(--border); }
                .l-section--alt { background: var(--surface); }
                .l-container { max-width: 1000px; margin: 0 auto; }
                .l-section-label {
                    font-size: 12px; font-weight: 500;
                    letter-spacing: .1em; text-transform: uppercase;
                    color: var(--violet-hi); margin-bottom: 12px;
                }
                .l-section-heading {
                    font-size: clamp(24px, 3.5vw, 36px);
                    margin-bottom: 48px; max-width: 520px;
                }

                /* Sample posts */
                .l-posts {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 20px;
                }
                .l-post-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--r-lg);
                    padding: 28px 24px;
                    display: flex; flex-direction: column; gap: 12px;
                    transition: border-color .2s, transform .15s;
                }
                .l-post-card:hover { border-color: rgba(192,132,160,.4); transform: translateY(-2px); }
                .l-post-tag {
                    font-size: 11px; font-weight: 500;
                    letter-spacing: .08em; text-transform: uppercase;
                    color: var(--violet-hi);
                    background: var(--violet-lo);
                    padding: 3px 10px; border-radius: 20px;
                    align-self: flex-start;
                }
                .l-post-title {
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 18px; color: var(--heading); line-height: 1.3;
                }
                .l-post-excerpt { font-size: 14px; color: var(--text-dim); line-height: 1.65; }
                .l-post-author { font-size: 13px; color: var(--text-dim); margin-top: auto; }

                /* Features */
                .l-features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 32px;
                }
                .l-feature { display: flex; flex-direction: column; gap: 10px; }
                .l-feature-icon { font-size: 22px; color: var(--violet-hi); }
                .l-feature-title {
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 17px; color: var(--heading);
                }
                .l-feature-desc { font-size: 14px; color: var(--text-dim); line-height: 1.65; }

                /* CTA */
                .l-cta-section { padding: 100px 24px; border-bottom: 1px solid var(--border); }
                .l-cta-inner { text-align: center; }
                .l-cta-heading { font-size: clamp(28px, 4.5vw, 48px); margin-bottom: 14px; }
                .l-cta-sub { color: var(--text-dim); font-size: 16px; margin-bottom: 36px; }

                /* Footer */
                .l-footer { padding: 32px 24px; border-top: 1px solid var(--border); }
                .l-footer-inner {
                    display: flex; align-items: center;
                    justify-content: space-between; flex-wrap: wrap; gap: 12px;
                }
                .l-footer-copy { font-size: 13px; color: var(--text-dim); }
            `}</style>
        </div>
    );
}

export default Landing;