import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication data (localStorage, sessionStorage, etc.)
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");

        // Redirect to the login page or home page
        navigate("/login"); // Update to your desired redirect path
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Logging you out...</p>
        </div>
    );
};

export default Logout;
