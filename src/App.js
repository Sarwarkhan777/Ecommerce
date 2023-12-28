import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./Component/UserModel/Register";
import EditUser from "./Component/UserModel/EditUser";
import ViewUser from "./Component/UserModel/ViewUser";
import Login from "./Component/UserModel/Login";
import Home from "./Component/UserModel/Home";
import Welcom from "./Component/UserModel/Welcom";
import Products from "./Component/ProductModel/Products";
import ProductDetails from "./Component/ProductModel/ProductDetails";
import AddProducts from "./Component/ProductModel/AddProducts";
import AddminLogin from "./Component/ProductModel/AdminLogin";
import EditAdminLogin from "./Component/ProductModel/EditAdminLogin";
import EditProducts from "./Component/ProductModel/EditProducts";
import EditProductForm from "./Component/ProductModel/EditProductForm";
import Cart from "./Component/ProductModel/Cart";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" user element={<Products />} />
          <Route exact path="/products" user element={<Products />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" user element={<Home />} />
          <Route exact path="/welcome" user element={<Welcom />} />
          <Route exact path="/register" element={<AddUser />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/editproducts/:id" element={<EditProductForm />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/addminlogin" user element={<AddminLogin />} />
          <Route exact path="/editadminlogin" user element={<EditAdminLogin />} />
          <Route exact path="/addproducts" user element={<AddProducts />} />
          <Route exact path="/editproducts" user element={<EditProducts />} />
          <Route exact path="/products/:id" user element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
