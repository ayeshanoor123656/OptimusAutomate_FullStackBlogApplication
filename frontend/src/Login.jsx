import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", email);
            window.location.href = "/dashboard";
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="brand-dot" />
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-sub">Sign in to continue writing.</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="field">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {message && <p className="msg-err">{message}</p>}

                    <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="auth-footer">
                    No account yet?{" "}
                    <Link to="/register" className="auth-link">Create one</Link>
                </p>
            </div>

            <style>{`
                .auth-shell {
                    min-height: 100svh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    background: var(--bg);
                }
                .auth-card {
                    width: 100%;
                    max-width: 420px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--r-lg);
                    padding: 40px 36px;
                }
                .auth-header { text-align: center; margin-bottom: 32px; }
                .brand-dot {
                    display: inline-block;
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: var(--violet);
                    margin-bottom: 16px;
                }
                .auth-title { font-size: 26px; margin-bottom: 6px; }
                .auth-sub { color: var(--text-dim); font-size: 14px; }
                .auth-form { display: flex; flex-direction: column; gap: 18px; }
                .field { display: flex; flex-direction: column; gap: 6px; }
                .label { font-size: 13px; font-weight: 500; color: var(--text); }
                .submit-btn {
                    width: 100%;
                    padding: 11px;
                    font-size: 15px;
                    margin-top: 4px;
                    border-radius: var(--r-sm);
                }
                .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
                .msg-err { font-size: 13px; color: var(--error); padding: 10px 14px; background: rgba(248,113,113,.1); border-radius: var(--r-sm); }
                .auth-footer { text-align: center; font-size: 14px; color: var(--text-dim); margin-top: 24px; }
                .auth-link { color: var(--violet-hi); }
                .auth-link:hover { text-decoration: underline; }
            `}</style>
        </div>
    );
}

export default Login;