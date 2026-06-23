import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";
import Navbar from "./Navbar";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    // Decode JWT to get logged-in user's ID
    const currentUserId = JSON.parse(
        atob(localStorage.getItem("token")?.split(".")[1] || "e30=")
    )?.id || null;

    useEffect(() => { fetchPost(); }, []);

    const fetchPost = async () => {
        try {
            const response = await API.get("/posts/all");
            const post = response.data.find((p) => p._id === id);

            if (!post) {
                setError("Post not found.");
                return;
            }

            // ✅ Block access if this post doesn't belong to the current user
            if (post.author?._id !== currentUserId) {
                setError("You can only edit your own posts.");
                return;
            }

            setTitle(post.title);
            setContent(post.content);
        } catch (err) {
            setError("Failed to load post.");
        } finally {
            setFetching(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await API.put(
                `/posts/${id}`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save changes.");
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div>
                <Navbar />
                <div className="page" style={{ textAlign: "center", paddingTop: 80, color: "var(--text-dim)" }}>
                    Loading post…
                </div>
            </div>
        );
    }

    // ✅ Show a clear error screen instead of an editable form
    if (error) {
        return (
            <div>
                <Navbar />
                <div className="page">
                    <div className="edit-error-state">
                        <span className="edit-error-icon">⊘</span>
                        <p className="edit-error-msg">{error}</p>
                        <button className="btn-ghost" onClick={() => navigate("/home")}>
                            Back to home
                        </button>
                    </div>
                </div>
                <style>{errorStyles}</style>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="page">
                <div className="edit-header">
                    <h1 className="edit-title">Edit post</h1>
                    <p className="edit-sub">Revise and update your writing.</p>
                </div>

                <form onSubmit={handleUpdate} className="edit-form">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="title-input"
                        placeholder="Post title"
                        required
                    />

                    <div className="editor-wrap">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                        />
                    </div>

                    <div className="edit-actions">
                        <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => navigate("/home")}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Saving…" : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .edit-header {
                    padding: 48px 0 32px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 36px;
                }
                .edit-title { font-size: clamp(26px, 3.5vw, 36px); margin-bottom: 6px; }
                .edit-sub { color: var(--text-dim); font-size: 15px; }
                .edit-form { display: flex; flex-direction: column; gap: 24px; }

                .title-input {
                    font-family: 'DM Serif Display', Georgia, serif;
                    font-size: 22px;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid var(--border);
                    border-radius: 0;
                    padding: 12px 0;
                    color: var(--heading);
                }
                .title-input:focus { border-color: var(--violet); box-shadow: none; }
                .title-input::placeholder { color: var(--text-dim); }

                .editor-wrap .ql-toolbar {
                    background: var(--surface2);
                    border-color: var(--border) !important;
                    border-radius: var(--r-sm) var(--r-sm) 0 0;
                }
                .editor-wrap .ql-container {
                    background: var(--surface);
                    border-color: var(--border) !important;
                    border-radius: 0 0 var(--r-sm) var(--r-sm);
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    color: var(--text);
                    min-height: 300px;
                }
                .editor-wrap .ql-editor { min-height: 300px; }
                .editor-wrap .ql-editor.ql-blank::before { color: var(--text-dim); font-style: normal; }
                .editor-wrap .ql-stroke { stroke: var(--text-dim) !important; }
                .editor-wrap .ql-fill { fill: var(--text-dim) !important; }
                .editor-wrap .ql-picker { color: var(--text-dim) !important; }
                .editor-wrap .ql-active .ql-stroke { stroke: var(--violet-hi) !important; }

                .edit-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    padding-top: 8px;
                }
                .edit-actions .btn-primary,
                .edit-actions .btn-ghost {
                    padding: 11px 24px;
                    font-size: 15px;
                    border-radius: var(--r-sm);
                }

                ${errorStyles}
            `}</style>
        </div>
    );
}

const errorStyles = `
    .edit-error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        padding: 80px 20px;
        text-align: center;
    }
    .edit-error-icon {
        font-size: 32px;
        color: var(--error);
        line-height: 1;
    }
    .edit-error-msg {
        font-size: 15px;
        color: var(--text-dim);
    }
    .edit-error-state .btn-ghost {
        padding: 10px 22px;
        font-size: 14px;
        border-radius: var(--r-sm);
    }
`;

export default EditPost;