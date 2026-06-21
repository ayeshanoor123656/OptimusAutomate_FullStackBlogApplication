import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", ok: false });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await API.post("/auth/register", { username, email, password });
            setMessage({ text: response.data.message, ok: true });
            setUsername(""); setEmail(""); setPassword("");
        } catch (error) {
            setMessage({ text: error.response?.data?.message || "Something went wrong", ok: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="brand-dot" />
                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-sub">Start writing and sharing your ideas.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="field">
                        <label className="label">Username</label>
                        <input
                            type="text"
                            placeholder="yourname"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

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

                    {message.text && (
                        <p className={message.ok ? "msg-ok" : "msg-err"}>{message.text}</p>
                    )}

                    <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                        {loading ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">Sign in</Link>
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
                .auth-title {
                    font-size: 26px;
                    margin-bottom: 6px;
                }
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
                .msg-ok { font-size: 13px; color: var(--success); padding: 10px 14px; background: rgba(52,211,153,.1); border-radius: var(--r-sm); }
                .msg-err { font-size: 13px; color: var(--error); padding: 10px 14px; background: rgba(248,113,113,.1); border-radius: var(--r-sm); }
                .auth-footer { text-align: center; font-size: 14px; color: var(--text-dim); margin-top: 24px; }
                .auth-link { color: var(--violet-hi); }
                .auth-link:hover { text-decoration: underline; }
            `}</style>
        </div>
    );
}

export default Register;