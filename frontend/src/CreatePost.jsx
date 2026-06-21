import { useState } from "react";
import API from "./api";
import Navbar from "./Navbar";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    const handleImage = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {

            setImage(reader.result);

        };

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            let imageUrl = "";

            if (image) {

                const uploadResponse =
                    await API.post(
                        "/upload",
                        {
                            image
                        }
                    );

                imageUrl =
                    uploadResponse.data.imageUrl;

            }

            await API.post(
                "/posts/create",
                {
                    title,
                    content,
                    image: imageUrl
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Post created successfully"
            );

            setTitle("");
            setContent("");
            setImage("");

        }
        catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Error creating post"
            );

        }

    };

    return (

        <div>

            <Navbar />

            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
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
                    Create Post
                </button>

            </form>

            <p>{message}</p>

        </div>

    );

}

export default CreatePost;