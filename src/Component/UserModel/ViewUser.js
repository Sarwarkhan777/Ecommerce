import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../CSS/ViewUser.css'
import Button from '@mui/material/Button';

export default function ViewUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  });

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8086/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="view-container">
      <h2 className="text-cente">User Details</h2>
      <hr />
      <div className="card">
        <ul>
          <li className="list-type">
            <strong>User Id:</strong> {user.id}
          </li>
          <li className="list-type">
            <strong>UserName:</strong> {user.username}
          </li>
          <li className="list-type">
            <strong>Email:</strong> {user.email}
          </li>
        </ul>
      </div>

      <Button variant="contained">
        <Link to={"/home"} style={{ textDecoration: "none", color: "#fff" }}>
          Back to Home
        </Link></Button>

    </div>
  );
}
