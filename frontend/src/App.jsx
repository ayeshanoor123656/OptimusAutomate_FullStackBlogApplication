import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CreatePost from "./CreatePost";
import Home from "./Home";
import EditPost from "./EditPost";
function App() {

    return (

        <BrowserRouter>

            <Routes>

    <Route
        path="/"
        element={<Register />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/dashboard"
        element={<Dashboard />}
    />

    <Route
        path="/create-post"
        element={<CreatePost />}
    />

    <Route
        path="/home"
        element={<Home />}
    />
    <Route
    path="/edit-post/:id"
    element={<EditPost />}
/>

</Routes>
        </BrowserRouter>

    );

}

export default App;