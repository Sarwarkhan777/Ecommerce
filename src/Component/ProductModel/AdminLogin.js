import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import '../../CSS/Login.css'
import Button from '@mui/material/Button';
import Navbar from "../Navbar";

export default function AddminLogin() {
    const [error, setError] = useState("")
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
            const response = await axios.post("http://localhost:8086/adminlogin", loginForm
            );

            if (response.data === "Success") {
                navigate("/addproducts");
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
        <React.Fragment>
            <Navbar />
            <div className="container">
            <h2 className="text-center">PRODUCT OWNER LOGIN</h2><br />
                <form onSubmit={onSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={onInputChange}
                        required />
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
                    <Button variant="contained" type="submit" className="btn-submit" style={{ padding: "10px", width: "90%" }}>
                        LOGIN
                    </Button>
                </form>
            </div>
        </React.Fragment>
    )
}
