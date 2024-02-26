import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem.jsx";
import Button from "./UI/Button.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx";
import React, { useContext } from 'react'

export default function Cart(){
    const CartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const totalPrice=CartCtx.items.reduce((totalPrice,item)=>
    {return totalPrice+item.quantity*item.price},0)

  
    function handleClose(){
        userProgressCtx.hideCart();
    }

    function handleCheckout(){
        userProgressCtx.showCheckout();
        console.log(userProgressCtx.progress);
    }
  return (
   <Modal className="cart" open={userProgressCtx.progress==='cart'} onClose={userProgressCtx.progress==="cart"?handleClose:null}>
    <h2>Your Cart</h2>
    <ul>  
        {CartCtx.items.map((item)=>(
            <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} Increase={()=>CartCtx.addItem(item)} Decrease={()=>CartCtx.removeItem(item.id)}/>
            ))}
    </ul>
    <p className="class-total">${totalPrice}</p>
    <p className="modal-actions">
        <Button textOnly onClick={handleClose}>Close</Button>
        <Button onClick={handleCheckout}>Go to Checkout</Button>
    </p>
   </Modal>
  )
}

