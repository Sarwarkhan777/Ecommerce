import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Navbar from "../Navbar";
import Alert from '@mui/material/Alert';

export default function EditProductForm() {
    let navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState()
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
    const { name, price, category, description, discount, image, rating, size } = user;
    const { id } = useParams();

    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [id]);
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8086/products/${id}`);
        setUser(result.data);
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
                }, 2000);
            }
        } catch (error) {
            console.error("Server error:", error.response.data);
            setError(error.response.data)
        }
    };

    return (
        <React.Fragment>
            {alert && <Alert style={{backgroundColor:"#00a516",position:"fixed",top:"11%",right:"42%",zIndex:1}} variant="filled"  >
                Product  Updated Successfully
            </Alert>}
            <Navbar />
            <div className="container addcontainer">
                <h2 className="text-center">Edit Product</h2>

                <form onSubmit={onSubmit} className="registration-form addform">
                    <input
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        onChange={onInputChange}
                        required
                        value={name}
                    />
                    <input
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        onChange={onInputChange}
                        value={price}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter category"
                        name="category"
                        onChange={onInputChange}
                        required
                        value={category}
                    />
                    <input
                        type="text"
                        placeholder="Enter image"
                        name="image"
                        onChange={onInputChange}
                        required
                        value={image}

                    />

                    <input
                        type="number"
                        placeholder="Enter discount"
                        name="discount"
                        onChange={onInputChange}
                        required
                        value={discount}

                    />

                    <input
                        type="number"
                        placeholder="Enter rating"
                        name="rating"
                        onChange={onInputChange}
                        required
                        value={rating}

                    />
                    <input
                        type="text"
                        placeholder="Enter size"
                        name="size"
                        onChange={onInputChange}
                        required
                        value={size}

                    />
                    <textarea name="description" id="discription" cols="44" rows="2"
                        onChange={onInputChange}
                        placeholder="Enter description"
                        value={description}
                    >
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
