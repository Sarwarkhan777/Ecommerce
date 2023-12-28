import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar"
import '../../CSS/Home.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8086/user");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    const user = users.find(ids => {
      return ids.id === id;
    })
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(`Do You Want to Delete the User ${user.username}`);
    console.log(user)
    if (confirmDelete) {
      await axios.delete(`http://localhost:8086/user/${id}`);
      loadUsers();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="container-item">
          <table className="table">
            <thead >
              <tr className="thead">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            {<tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1} </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Stack direction="row" spacing={2}>

                      <Button variant="contained" type="submit" >
                        <Link to={`/viewuser/${user.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                          View
                        </Link>
                      </Button>

                      <Button variant="contained" type="submit" >
                        <Link to={`/edituser/${user.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                          Edit
                        </Link>
                      </Button>

                      <Button variant="contained" color="error" type="submit" onClick={() => deleteUser(user.id)}>
                        Delete
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
      </div>
    </div>
  );
}
