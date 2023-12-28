import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCard({ loadUsers, products, name, id, price, discount, image, rating }) {
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8086/products/${id}`);
            loadUsers();
            handleCloseDialog();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Card className="card" sx={{ maxWidth: 400, height: 500 }}>
            <img className='editcardimg' src={image} alt="" width={300} height={300} />
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
            <CardActions>
                <Link to={`/editproducts/${id}`} style={{ color: "#575757" }}>
                    <Button className='ebtn_details' variant="contained" type="submit" >
                        Edit
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    className='dbtn_details'
                    color="error"
                    type="submit"
                    onClick={handleOpenDialog}
                >
                    Delete
                </Button>
            </CardActions>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do You Want to Delete the Product "}{name}?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete}>DELETE</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
