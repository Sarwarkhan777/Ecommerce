import React from 'react'
import Navbar from '../Navbar'
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function Welcom() {
    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: "center" }}>Welcome To My CRUD App</h1>
            <div style={{display:"flex",justifyContent:"center"}}>
                <p>Please click here to View Users</p> 
                <NavLink to="/home" style={{ textDecoration: "none" }}>
                    <Button  type="submit" style={{ padding: "13px", width: "10%" }}>
                        User    
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}
