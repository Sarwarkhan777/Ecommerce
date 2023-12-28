import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Stack from '@mui/material/Stack';
import Navbar from '../Navbar';
import UserContext from '../context/UserContext';
import Alert from '@mui/material/Alert';

import '../../CSS/EditProducts.css'
export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);

    const { id } = useParams();
    const { cart, setCart, cartProducts, setCartProducts } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8086/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const addToCart = () => {
        const curCartProd = cartProducts.find((prod) => prod.id === product.id);
        console.log(product.id)
        console.log(curCartProd?.id)
        console.log(cartProducts)

        if (product.id && product.id !== curCartProd?.id) {
            setCartProducts([...cartProducts, product]);
            setCart(cart + 1);
            setAlert(false)
        } else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1000);
        }
    };

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <React.Fragment>
            <Navbar />
            {alert && <Alert style={{ backgroundColor: "#FF0000", position: "fixed", top: "11%", right: "42%", zIndex: 20 }} variant="filled" severity="warning" >
                Product Already In Cart
            </Alert>}
            <Paper
                sx={{
                    p: 5,
                    margin: 'auto',
                    maxWidth: 1000,
                    height: 'auto',
                    flexGrow: 1,
                }}
                className='ProductDetails'
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <ButtonBase sx={{ width: '100%', height: 'auto' }}>
                            <Img className='prodimg' alt="complex" src={product.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={8}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" >
                                    <div className='product_item'>
                                        <div className='product_list prodname'>{product.name}</div>
                                        <div className='product_list prodprice'>₹{product.price}<span className='product_list proddiscount'>{product.discount}% off</span></div>
                                        <div className='product_list prodrating'>{product.rating} ★</div>
                                    </div>
                                    <div className='product_item'>
                                        <div className='product_list prodcategory'>Category: {product.category}</div>
                                        <div className='product_list proddescrip'>{product.description}</div>
                                    </div>
                                    <div className='buttons'>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" style={{ backgroundColor: "red" }} onClick={addToCart}>
                                                <FontAwesomeIcon icon={faShoppingCart} /> <span className='editbtn_products'>Add to cart</span>
                                            </Button>
                                            <Button variant="contained" className="button">
                                                <span className='editbtn_products'>Buy now</span>
                                            </Button>

                                        </Stack>
                                    </div>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
