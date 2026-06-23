import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [commentText, setCommentText] = useState({});
    const [openComments, setOpenComments] = useState({});
    const [loading, setLoading] = useState(true);

    const currentUserId = JSON.parse(
        atob(localStorage.getItem("token")?.split(".")[1] || "e30=")
    )?.id || null;

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        try {
            const response = await API.get("/posts/all");
            setPosts(response.data);
            response.data.forEach(post => fetchComments(post._id));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await API.get(`/comments/${postId}`);
            setComments(prev => ({ ...prev, [postId]: response.data }));
        } catch (error) { console.log(error); }
    };

    const addComment = async (postId) => {
        const text = commentText[postId] || "";
        if (!text.trim()) return;
        try {
            const token = localStorage.getItem("token");
            await API.post("/comments/create", { text, postId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCommentText(prev => ({ ...prev, [postId]: "" }));
            fetchComments(postId);
        } catch (error) { console.log(error); }
    };

    const deletePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchPosts();
        } catch (error) { console.log(error); }
    };

    const likePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await API.put(`/posts/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            fetchPosts();
        } catch (error) { console.log(error); }
    };

    const toggleComments = (postId) => {
        setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div>
            <Navbar />

            <div className="page-wide">
                <div className="feed-header">
                    <h1 className="feed-title">Latest stories</h1>
                    <p className="feed-sub">Ideas, perspectives, and writing from the community.</p>
                </div>

                {loading ? (
                    <div className="feed-loading">
                        {[1,2,3].map(i => <div key={i} className="skeleton-card" />)}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">✦</span>
                        <p className="empty-text">No posts yet. Be the first to write something.</p>
                        <Link to="/create-post" className="btn-primary empty-btn">Write a post</Link>
                    </div>
                ) : (
                    <div className="feed">
                        {posts.map((post) => (
                            <article key={post._id} className="post-card">

                                {/* ✅ Cover image — fixed smaller height */}
                                {post.image && (
                                    <div className="post-img-wrap">
                                        <img src={post.image} alt={post.title} className="post-img" />
                                    </div>
                                )}

                                <div className="post-body">
                                    <div className="post-meta-top">
                                        <span className="post-author">
                                            <span className="author-avatar">
                                                {post.author?.username?.[0]?.toUpperCase() || "?"}
                                            </span>
                                            {post.author?.username}
                                        </span>
                                    </div>

                                    <h2 className="post-title">{post.title}</h2>

                                    <div
                                        className="post-content"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />

                                    <div className="post-actions">
                                        <button onClick={() => likePost(post._id)} className="action-btn action-like">
                                            <span className="action-icon">♥</span>
                                            <span>{post.likes?.length || 0}</span>
                                        </button>

                                        <button onClick={() => toggleComments(post._id)} className="action-btn">
                                            <span className="action-icon">◎</span>
                                            <span>{comments[post._id]?.length || 0}</span>
                                        </button>

                                        {currentUserId === post.author?._id && (
                                            <div className="post-actions-right">
                                                <Link to={`/edit-post/${post._id}`} className="btn-ghost post-edit-btn">
                                                    Edit
                                                </Link>
                                                <button onClick={() => deletePost(post._id)} className="btn-danger">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {openComments[post._id] && (
                                        <div className="comments-panel">
                                            <div className="comments-list">
                                                {comments[post._id]?.length === 0 && (
                                                    <p className="no-comments">No comments yet.</p>
                                                )}
                                                {comments[post._id]?.map(comment => (
                                                    <div key={comment._id} className="comment">
                                                        <span className="comment-author">{comment.author?.username}</span>
                                                        <span className="comment-text">{comment.text}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="comment-input-row">
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment…"
                                                    value={commentText[post._id] || ""}
                                                    onChange={(e) =>
                                                        setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))
                                                    }
                                                    onKeyDown={(e) => e.key === "Enter" && addComment(post._id)}
                                                    className="comment-input"
                                                />
                                                <button onClick={() => addComment(post._id)} className="btn-primary comment-submit">
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .feed-header {
                    padding: 56px 0 40px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 40px;
                }
                .feed-title { font-size: clamp(28px, 4vw, 42px); margin-bottom: 8px; }
                .feed-sub { color: var(--text-dim); font-size: 15px; }

                .feed { display: flex; flex-direction: column; gap: 0; }

                .post-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--r-lg);
                    overflow: hidden;
                    margin-bottom: 20px;
                    transition: border-color .2s;
                }
                .post-card:hover { border-color: rgba(192,132,160,.35); }

                .post-img-wrap {
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    background: var(--surface2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .post-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    display: block;
                }

                .post-body { padding: 24px 28px 20px; }

                .post-meta-top { display: flex; align-items: center; margin-bottom: 12px; }
                .post-author {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 13px; color: var(--text-dim);
                }
                .author-avatar {
                    width: 26px; height: 26px;
                    border-radius: 50%;
                    background: var(--violet-lo);
                    border: 1px solid rgba(192,132,160,.3);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 11px; font-weight: 600; color: var(--violet-hi);
                }

                .post-title { font-size: clamp(18px, 2.5vw, 22px); margin-bottom: 12px; line-height: 1.3; }

                .post-content {
                    font-size: 15px; color: var(--text); line-height: 1.75; margin-bottom: 20px;
                    overflow: hidden; display: -webkit-box;
                    -webkit-line-clamp: 3; -webkit-box-orient: vertical;
                }
                .post-content p { margin: 0 0 10px; }
                .post-content h1,.post-content h2,.post-content h3 { margin: 16px 0 8px; }

                .post-actions {
                    display: flex; align-items: center; gap: 6px;
                    padding-top: 16px; border-top: 1px solid var(--border);
                }
                .post-actions-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }

                .action-btn {
                    display: flex; align-items: center; gap: 6px;
                    background: transparent; border: 1px solid transparent;
                    color: var(--text-dim); font-size: 13px;
                    padding: 6px 12px; border-radius: var(--r-sm); transition: all .15s;
                }
                .action-btn:hover { background: var(--surface2); color: var(--text); }
                .action-like:hover { color: var(--violet-hi); }
                .action-icon { font-size: 15px; line-height: 1; }

                .post-edit-btn { display: inline-flex; align-items: center; padding: 6px 14px; font-size: 13px; border-radius: var(--r-sm); }

                .comments-panel { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }
                .comments-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
                .no-comments { font-size: 13px; color: var(--text-dim); }
                .comment {
                    display: flex; gap: 8px; font-size: 14px;
                    background: var(--surface2); padding: 10px 14px; border-radius: var(--r-sm);
                }
                .comment-author { font-weight: 500; color: var(--heading); white-space: nowrap; }
                .comment-text { color: var(--text); }

                .comment-input-row { display: flex; gap: 8px; align-items: center; }
                .comment-input { flex: 1; font-size: 14px; padding: 9px 12px; }
                .comment-submit { padding: 9px 18px; font-size: 14px; border-radius: var(--r-sm); white-space: nowrap; }

                .feed-loading { display: flex; flex-direction: column; gap: 20px; }
                .skeleton-card {
                    height: 200px; background: var(--surface);
                    border: 1px solid var(--border); border-radius: var(--r-lg);
                    animation: pulse 1.4s ease-in-out infinite;
                }
                @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

                .empty-state {
                    display: flex; flex-direction: column; align-items: center;
                    gap: 14px; padding: 80px 20px; text-align: center;
                }
                .empty-icon { font-size: 28px; color: var(--violet); }
                .empty-text { color: var(--text-dim); font-size: 15px; }
                .empty-btn { padding: 10px 24px; font-size: 14px; border-radius: var(--r-sm); }
            `}</style>
        </div>
    );
}

export default Home;