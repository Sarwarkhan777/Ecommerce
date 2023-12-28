import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [logedUser, setLogedUser] = useState()
    const [cart, setCart] = useState(0)
    const [cartProducts, setCartProducts] = useState([])
    return (
        <UserContext.Provider value={{ user, setUser, logedUser, setLogedUser, cart, setCart, cartProducts, setCartProducts }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider