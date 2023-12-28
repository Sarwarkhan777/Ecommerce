import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Navbar from "../Navbar";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const { username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8086/user/${id}`, user);
    navigate("/home");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8086/user/${id}`);
    setUser(result.data);
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="">
        <h2 className="text-center">Edit User</h2>

        <form onSubmit={(e) => onSubmit(e)} className="login-form">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)}
          />
          <div className="mb-3">
            <input
              type={"text"}
              placeholder="Enter your e-mail address"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div style={{ margin: "10px 100px" }}>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                UPDATE
              </Button>
              <Button type="submit" variant="contained" color="error">
                <Link to="/home" style={{ textDecoration: "none", color: "#fff" }}>
                  Cancel
                </Link>
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
