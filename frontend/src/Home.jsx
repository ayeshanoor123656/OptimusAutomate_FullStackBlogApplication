import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Home() {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [commentText, setCommentText] = useState("");

    useEffect(() => {

        fetchPosts();

    }, []);

    const fetchPosts = async () => {

        try {

            const response = await API.get(
                "/posts/all"
            );

            setPosts(response.data);

            response.data.forEach(post => {
                fetchComments(post._id);
            });

        }
        catch (error) {

            console.log(error);

        }

    };

    const fetchComments = async (postId) => {

        try {

            const response = await API.get(
                `/comments/${postId}`
            );

            setComments(prev => ({
                ...prev,
                [postId]: response.data
            }));

        }
        catch (error) {

            console.log(error);

        }

    };

    const addComment = async (postId) => {

        try {

            const token =
                localStorage.getItem("token");

            await API.post(
                "/comments/create",
                {
                    text: commentText,
                    postId
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setCommentText("");

            fetchComments(postId);

        }
        catch (error) {

            console.log(error);

        }

    };

    const deletePost = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await API.delete(
                `/posts/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchPosts();

        }
        catch (error) {

            console.log(error);

        }

    };

    const likePost = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await API.put(
                `/posts/like/${id}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchPosts();

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <h1>All Blog Posts</h1>

            {
                posts.length === 0
                ?
                <p>No Posts Available</p>
                :
                posts.map((post) => (

                    <div
                        key={post._id}
                        style={{
                            border: "1px solid gray",
                            padding: "15px",
                            marginBottom: "15px"
                        }}
                    >

                        <h2>
    {post.title}
</h2>

{
    post.image &&
    (
        <img
            src={post.image}
            alt="Blog"
            width="300"
        />
    )
}

                        <div
    dangerouslySetInnerHTML={{
        __html: post.content
    }}
></div>

                        <p>
                            ❤️ {post.likes?.length || 0} Likes
                        </p>

                        <small>
                            Author: {post.author?.username}
                        </small>

                        <br />
                        <br />

                        <Link
                            to={`/edit-post/${post._id}`}
                        >
                            Edit
                        </Link>

                        {" "}

                        <button
                            onClick={() =>
                                likePost(post._id)
                            }
                        >
                            ❤️ Like
                        </button>

                        {" "}

                        <button
                            onClick={() =>
                                deletePost(post._id)
                            }
                        >
                            Delete Post
                        </button>

                        <hr />

                        <h4>Comments</h4>

                        {
                            comments[post._id]?.map(
                                comment => (

                                    <div
                                        key={comment._id}
                                    >

                                        <b>
                                            {
                                                comment.author
                                                    ?.username
                                            }
                                        </b>

                                        : {comment.text}

                                    </div>

                                )
                            )
                        }

                        <br />

                        <input
                            type="text"
                            placeholder="Write a comment"
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={() =>
                                addComment(post._id)
                            }
                        >
                            Add Comment
                        </button>

                    </div>

                ))
            }

        </div>

    );

}

export default Home;