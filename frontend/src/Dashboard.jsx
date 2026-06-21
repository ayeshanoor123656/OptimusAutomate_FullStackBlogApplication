import Navbar from "./Navbar";

function Dashboard() {

    const email =
        localStorage.getItem("userEmail");

    return (

        <div>

            <Navbar />

            <h1>Dashboard</h1>

            <h3>
                Welcome {email}
            </h3>

        </div>

    );

}

export default Dashboard;