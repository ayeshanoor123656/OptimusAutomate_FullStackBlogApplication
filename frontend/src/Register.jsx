import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/register",
                {
                    username,
                    email,
                    password
                }
            );

            setMessage(response.data.message);

            setUsername("");
            setEmail("");
            setPassword("");

        }
        catch(error){

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    };

    return (
        <div>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>
                        setUsername(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Register
                </button>

            </form>

            <p>{message}</p>

            <p>
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
}

export default Register;