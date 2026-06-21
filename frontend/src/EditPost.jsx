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

    useEffect(() => { fetchPost(); }, []);

    const fetchPost = async () => {
        try {
            const response = await API.get("/posts/all");
            const post = response.data.find((p) => p._id === id);
            if (post) { setTitle(post.title); setContent(post.content); }
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
        } catch (error) {
            console.log(error);
        } finally {
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
            `}</style>
        </div>
    );
}

export default EditPost;