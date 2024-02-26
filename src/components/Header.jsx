import React, { useContext } from 'react'
import logo from "../assets/logo.jpg"
import Button from "./UI/Button.jsx"
import CartContext from "../store/CartContext.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx"

function Header(){
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const totalCartValue=cartCtx.items.reduce((totalNoOfItems,item)=>{
        return totalNoOfItems+item.quantity;
    },0)

    function handleShowCart(){
        userProgressCtx.showCart();

    }
  return (
    <header id="main-header">
        <div id="title">
            <img src={logo} alt="A restaurant"></img>
            <h1>Food Order Shop</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart {totalCartValue}</Button>
        </nav>

    </header>
  )
}

export default Header


