import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function MediaCard({ name, id, price, discount, image, rating, description }) {

  return (
    <Link to={`/products/${id}`} style={{ color: "#575757", textDecoration: "none",borderRadius:"20px" }}>
      <Card className="card" sx={{ maxWidth: 400, height: 450 }}>
        <img className='cardimg' src={image} alt="" width={300} height={300} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <span className='prod_name'>{name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ height: "30px" }}>
            <span className='prod_price'>₹{price}</span>
            <span className='prod_disc'>  {discount}% off</span>
            <span className='prod_rating'>{rating}★</span>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}