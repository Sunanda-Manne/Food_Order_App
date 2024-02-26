import {React,useContext} from 'react'
import Modal from './UI/Modal.jsx';
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';


const requestConfig={
    method:'POST',
    headers: {
        'Content-Type' :'application/json'
    }
};



export default function Checkout() {
    const CartCtx=useContext(CartContext);
    const userProgressCtx =useContext(UserProgressContext);

    const{ data, isLoading,error,sendRequest }=useHttp('http://localhost:3000/orders', requestConfig);
    const totalPrice=CartCtx.items.reduce((totalPrice,item)=>
    totalPrice+(item.quantity*item.price),0);

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        CartCtx.clearCart();
    }

    function handleSubmit(e){
        e.preventDefault();
        const fd=new FormData(e.target);
        const customerData=Object.fromEntries(fd.entries());
        console.log(customerData);

        sendRequest(
            JSON.stringify({
                order:{
                   items:CartCtx.items,
                   customer:customerData 
                }
            })
        );
    }

    if(data && !error){
        return <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
            <h2>Success!!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you with more details via email within next few minutes</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }



  return (
    <Modal open={userProgressCtx.progress==="checkout"}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${totalPrice}</p>
            <Input label="Full Name" type="text" id="full-name"/>
            <Input label="E-Mail Address" type="email" id="email"></Input>
            <Input label="Street" type="text" id="street"/>
            <div className='="control-row'>
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
                </p>
        </form>
    </Modal>
  )
}
