import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Register() {
  let navigate = useNavigate();

  const [error, setError] = useState()
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });


  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:8086/user", user);
      navigate("/login");
      setError(response.data)
    } catch (error) {
      console.error("Server error:", error.response.data);
      setError(error.response.data)
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">REGISTER</h2>

      <form onSubmit={onSubmit} className="registration-form">
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter email"
          name="email"
          onChange={onInputChange}
          required
        />
        <br /> 
        <div className="error">
          {error && <span >{error}</span>}
        </div>
        <Button variant="contained" type="submit" className="btn-submit" style={{ padding: "10px", width: "90%" }}>
          REGISTER
        </Button>
      </form>
      <div className="haveaccount">
        <span>Already have an account? </span>
        <Link to="/login" style={{ color: "#575757" }}>
          LOGIN
        </Link>
      </div>
    </div>
  );
}
