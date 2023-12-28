import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../CSS/Login.css'
import Button from '@mui/material/Button';
import UserContext from "../context/UserContext";

export default function Login() {
    const [error, setError] = useState("");
    const { setLogedUser } = useContext(UserContext);
    const [loginForm, setLoginginForm] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setLoginginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8086/login", loginForm);

            if (response.data === "Success") {
                const loggedInUser = loginForm.username;
                sessionStorage.setItem('loggedInUser', loggedInUser);
                setLogedUser(loggedInUser);
                navigate("/products");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data);
                setError(error.response.data);
            } else {
                console.error("Error during login:", error);
            }
        }
    };

    return (
        <div>
            <div className="container">
                <h2 className="text-center">LOGIN</h2><br />
                <form onSubmit={onSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={onInputChange}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={onInputChange}
                        required
                    />
                    <br />
                    <div className="error">
                        {error && <span >{error}</span>}
                    </div>
                    <Button variant="contained" type="submit" className="btn-submit"
                        style={{ padding: "10px", width: "90%" }}>
                        LOGIN
                    </Button>
                </form>
                <div className="haveaccount">
                    <span>Don't have an account? </span>
                    <Link to="/register" style={{ color: "#575757" }}>
                        REGISTER
                    </Link>
                </div>
            </div>
        </div>
    );
}
