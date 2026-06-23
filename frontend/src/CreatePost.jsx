import { useState, useRef } from "react";
import API from "./api";
import Navbar from "./Navbar";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const styles = `
  .cp-wrapper {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .cp-header {
    margin-bottom: 32px;
  }

  .cp-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: 8px;
  }

  .cp-heading {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 32px;
    color: var(--heading);
    line-height: 1.2;
    margin: 0;
  }

  .cp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    overflow: hidden;
  }

  .cp-section {
    padding: 22px 26px;
    border-bottom: 1px solid var(--border);
  }

  .cp-section:last-child {
    border-bottom: none;
  }

  .cp-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 10px;
  }

  .cp-title-input {
    width: 100%;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    padding: 0 !important;
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 24px;
    color: var(--heading);
    background: transparent;
    caret-color: var(--violet);
    border-radius: 0 !important;
  }

  .cp-title-input::placeholder {
    color: var(--border);
  }

  .cp-cover-zone {
    border: 1.5px dashed var(--border);
    border-radius: var(--r);
    padding: 26px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: var(--surface2);
  }

  .cp-cover-zone:hover {
    border-color: var(--violet);
    background: var(--violet-lo);
  }

  .cp-cover-zone.has-image {
    border-style: solid;
    border-color: var(--violet);
    padding: 0;
    background: none;
    overflow: hidden;
  }

  .cp-cover-preview {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
    display: block;
    border-radius: calc(var(--r) - 2px);
  }

  .cp-cover-icon {
    width: 38px;
    height: 38px;
    border-radius: var(--r-sm);
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cp-cover-icon svg {
    width: 18px;
    height: 18px;
    stroke: var(--violet);
  }

  .cp-cover-text-main {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    display: block;
  }

  .cp-cover-text-sub {
    font-size: 12px;
    color: var(--text-dim);
    display: block;
    margin-top: 2px;
  }

  .cp-file-input { display: none; }

  .cp-editor-wrap .ql-toolbar.ql-snow {
    background: var(--surface2);
    border: none !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 10px 26px;
  }

  .cp-editor-wrap .ql-toolbar.ql-snow .ql-stroke {
    stroke: var(--text-dim);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-fill {
    fill: var(--text-dim);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow button:hover .ql-stroke,
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-active .ql-stroke {
    stroke: var(--violet-hi);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow button:hover .ql-fill,
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-active .ql-fill {
    fill: var(--violet-hi);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-picker-label {
    color: var(--text-dim);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-picker-label:hover {
    color: var(--violet-hi);
  }
  .cp-editor-wrap .ql-toolbar.ql-snow .ql-picker-options {
    background: var(--surface);
    border-color: var(--border) !important;
    border-radius: var(--r-sm);
    box-shadow: 0 4px 16px rgba(44,33,24,.08);
  }
  .cp-editor-wrap .ql-container.ql-snow {
    border: none !important;
    background: transparent;
  }
  .cp-editor-wrap .ql-editor {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: var(--text);
    padding: 22px 26px;
    min-height: 260px;
  }
  .cp-editor-wrap .ql-editor::before {
    color: var(--text-dim);
    font-style: normal;
    left: 26px;
  }
  .cp-editor-wrap .ql-editor p { margin-bottom: 0.4em; }
  .cp-editor-wrap .ql-editor h1,
  .cp-editor-wrap .ql-editor h2,
  .cp-editor-wrap .ql-editor h3 {
    font-family: 'DM Serif Display', Georgia, serif;
    color: var(--heading);
  }

  .cp-footer {
    padding: 16px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid var(--border);
    background: var(--surface2);
  }

  .cp-message {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 20px;
  }
  .cp-message.success { color: var(--success); }
  .cp-message.error   { color: var(--error); }

  .cp-submit {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--violet);
    color: #fff;
    padding: 10px 22px;
    border-radius: var(--r-sm);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.1s;
  }
  .cp-submit:hover:not(:disabled) { background: var(--violet-hi); }
  .cp-submit:active:not(:disabled) { transform: scale(0.98); }
  .cp-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .cp-submit svg { width: 15px; height: 15px; }

  @keyframes cp-spin { to { transform: rotate(360deg); } }
  .cp-spinning { animation: cp-spin 1s linear infinite; }
`;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function CreatePost() {
  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [image, setImage]     = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const token = localStorage.getItem("token");
      let imageUrl = "";
      if (image) {
        const res = await API.post("/upload", { image });
        imageUrl = res.data.imageUrl;
      }
      await API.post(
        "/posts/create",
        { title, content, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: "Post published.", type: "success" });
      setTitle(""); setContent(""); setImage(""); setPreview("");
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Couldn't publish. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="cp-wrapper">
        <div className="cp-header">
          <p className="cp-eyebrow">New post</p>
          <h1 className="cp-heading">Write something</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cp-card">

            {/* Title */}
            <div className="cp-section">
              <label className="cp-label">Title</label>
              <input
                className="cp-title-input"
                type="text"
                placeholder="Give your post a title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Cover image */}
            <div className="cp-section">
              <label className="cp-label">Cover image</label>
              <input
                ref={fileRef}
                className="cp-file-input"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              <div
                className={`cp-cover-zone${preview ? " has-image" : ""}`}
                onClick={() => fileRef.current.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileRef.current.click()}
                aria-label="Upload cover image"
              >
                {preview ? (
                  <img src={preview} alt="Cover preview" className="cp-cover-preview" />
                ) : (
                  <>
                    <div className="cp-cover-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div>
                      <span className="cp-cover-text-main">Click to upload a cover image</span>
                      <span className="cp-cover-text-sub">PNG, JPG, WEBP · optional</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="cp-editor-wrap">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="Start writing…"
              />
            </div>

            {/* Footer */}
            <div className="cp-footer">
              <p className={`cp-message${message.type ? ` ${message.type}` : ""}`}>
                {message.type === "success" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {message.type === "error" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
                {message.text}
              </p>

              <button type="submit" className="cp-submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="cp-spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                      <line x1="2" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="22" y2="12" />
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                    </svg>
                    Publishing…
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Publish post
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}