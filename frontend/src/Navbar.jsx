import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/");  // ✅ go to landing page, not /login
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/home" className="navbar-brand">
                    <span className="brand-dot" />
                    Inkwell
                </Link>

                <div className="navbar-links">
                    {email ? (
                        <>
                            <Link to="/home" className="nav-link">Feed</Link>
                            <Link to="/create-post" className="nav-link">Write</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={handleLogout} className="btn-ghost nav-btn">
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Sign in</Link>
                            <Link to="/register" className="btn-primary nav-btn">Get started</Link>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(250,248,245,.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                }
                .navbar-inner {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 0 20px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 20px;
                    color: var(--heading);
                    letter-spacing: -.3px;
                }
                .brand-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--violet);
                }
                .navbar-links {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .nav-link {
                    font-size: 14px;
                    color: var(--text-dim);
                    padding: 6px 12px;
                    border-radius: var(--r-sm);
                    transition: color .15s;
                }
                .nav-link:hover { color: var(--heading); }
                .nav-btn {
                    margin-left: 8px;
                    padding: 7px 16px;
                    font-size: 14px;
                }
            `}</style>
        </nav>
    );
}

export default Navbar;