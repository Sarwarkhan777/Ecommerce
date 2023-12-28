import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar';
import '../../CSS/Products.css';
import axios from "axios";
import EditCard from './EditCard';

export default function EditProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8086/products");
    setProducts(result.data);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='editproduct_items'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((prod, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <EditCard loadUsers={loadUsers} products={products} id={prod.id} name={prod.name} price={prod.price} discount={prod.discount} rating={prod.rating} image={prod.image} description={prod.description} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  );
}
