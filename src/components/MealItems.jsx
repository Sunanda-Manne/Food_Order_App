import React, { useContext } from 'react'
import Button from "./UI/Button.jsx"
import CartContext from "../store/CartContext"

export default function MealItems({meal}) {

    const cartCtx=useContext(CartContext);
    function addToCart(){
        cartCtx.addItem(meal);
    }

  return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`}alt={meal.name}></img>
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">${meal.price}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={addToCart}>Add to Cart</Button>
            </p>
        </article> 

    </li>
  )
}
