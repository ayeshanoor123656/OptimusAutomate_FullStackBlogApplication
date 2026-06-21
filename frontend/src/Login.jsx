import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            setMessage("Login Successful");

            window.location.href = "/dashboard";

        }
        catch(error){

            setMessage(
                error.response?.data?.message ||
                "Login Failed"
            );

        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

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
                    Login
                </button>

            </form>

            <p>{message}</p>

            <p>
                Don't have an account?
                <Link to="/"> Register</Link>
            </p>

        </div>
    );
}

export default Login;