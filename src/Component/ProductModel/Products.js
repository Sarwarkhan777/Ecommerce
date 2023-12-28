import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar';
import Card from './Card.js';
import '../../CSS/Products.css';
import axios from "axios";
import UserContext from '../context/UserContext';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [filterproducts, setFilterproducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:8086/products");
      setProducts(result.data);
      setFilterproducts(result.data); 
    };
    loadUsers(); 
  }, []);
  
  useEffect(() => {
    if (user != null) {
      const filteredProducts = products.filter((prod) =>
        prod.category.toLowerCase().includes(user.toLowerCase())
        );
        setFilterproducts(filteredProducts);
        setSearchQuery(user)
      }
      console.log(user)
  }, [user, products]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilterproducts(products);
    } else {
      const filteredProducts = products.filter((prod) =>
        prod.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterproducts(filteredProducts);
    }
  }, [searchQuery, products]);

  return (
    <React.Fragment>
      <Navbar />
      <div className='product_items'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filterproducts.map((prod, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  id={prod.id}
                  name={prod.name}
                  price={prod.price}
                  discount={prod.discount}
                  rating={prod.rating}
                  image={prod.image}
                  description={prod.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  );
}
