import React from 'react'

export default function CartItem({name,price,quantity,Increase,Decrease}) {
    const total=price*quantity;
  return (
    <li className="cart-item">
        <p>
            {name}-${total}

        </p>
        <p className='="cart=item-actions'>
            <button onClick={Increase}>+</button>
            <span>{quantity}</span>
            <button onClick={Decrease}>-</button>
        </p>
    </li>
  )
}
