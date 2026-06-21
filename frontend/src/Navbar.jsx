import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login");

    };

    return (

        <div
            style={{
                padding: "15px",
                borderBottom: "1px solid gray",
                marginBottom: "20px"
            }}
        >

            <Link to="/home">
                Home
            </Link>

            {" | "}

            <Link to="/create-post">
                Create Post
            </Link>

            {" | "}

            <Link to="/dashboard">
                Dashboard
            </Link>

            {" | "}

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );
}

export default Navbar;