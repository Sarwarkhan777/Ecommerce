import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Navbar from "../Navbar";
import Alert from '@mui/material/Alert';

export default function AddProducts() {
    let navigate = useNavigate();

    const [error, setError] = useState()
    const [alert, setAlert] = useState(false);
    const [user, setUser] = useState({
        category: "",
        description: "",
        discount: "",
        image: "",
        name: "",
        price: "",
        rating: "",
        size: ""
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
            const response = await axios.post("http://localhost:8086/products", user);
            console.log(response.status)
            if (response.status === 200) {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                    navigate("/products");
                }, 1000);
            }
        } catch (error) {
            console.error("Server error:", error.response.data);
            setError(error.response.data)
        }
    };

    return (
        <React.Fragment>
            {alert && <Alert style={{backgroundColor:"#00a516",position:"fixed",top:"11%",right:"42%",zIndex:20}} variant="filled"  >
                Product added Successfully
            </Alert>}
            <Navbar />
            <div className="container addcontainer">
                <h2 className="text-center">Add Products</h2>

                <form onSubmit={onSubmit} className="registration-form addform">
                    <input
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        onChange={onInputChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        onChange={onInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter category"
                        name="category"
                        onChange={onInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter image"
                        name="image"
                        onChange={onInputChange}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Enter discount"
                        name="discount"
                        onChange={onInputChange}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Enter rating"
                        name="rating"
                        onChange={onInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter size"
                        name="size"
                        onChange={onInputChange}
                        required
                    />
                    <textarea name="description" id="discription" cols="44" rows="2"
                        onChange={onInputChange} placeholder="Enter description" required>
                    </textarea>
                    <div className="error">
                        {error && <span >{error}</span>}
                    </div>
                    <Button variant="contained" type="submit" className="btn-submit" style={{ padding: "10px", width: "90%" }}>
                        Add
                    </Button>
                </form>
            </div>
        </React.Fragment>
    );
}
