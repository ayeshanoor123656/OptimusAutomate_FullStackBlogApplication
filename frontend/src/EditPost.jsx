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

    useEffect(() => {

        fetchPost();

    }, []);

    const fetchPost = async () => {

        const response =
            await API.get("/posts/all");

        const post =
            response.data.find(
                p => p._id === id
            );

        if (post) {

            setTitle(post.title);
            setContent(post.content);

        }

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await API.put(
                `/posts/${id}`,
                {
                    title,
                    content
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            navigate("/home");

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <h1>Edit Post</h1>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    value={title}
                    onChange={(e)=>
                        setTitle(e.target.value)
                    }
                />

                <br />
                <br />

                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                />

                <br />
                <br />

                <button type="submit">
                    Update Post
                </button>

            </form>

        </div>

    );

}

export default EditPost;