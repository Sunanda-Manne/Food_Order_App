import {createContext,useReducer} from 'react';

const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}

});

function cartReducer(state,action){
    if(action.type==="ADD_ITEM"){
        const itemIndex=state.items.findIndex((item)=>action.item.id===item.id);
        const updatedItems=[...state.items];
        if (itemIndex>-1){
            const existingItem=state.items[itemIndex]
            const updatedItem={...existingItem,quantity:existingItem.quantity+1};
            updatedItems[itemIndex]=updatedItem;
        }
        else{
            updatedItems.push({...action.item,quantity:1})
        }
        return {...state,items:updatedItems}

    }
    

    if(action.type==="REMOVE_ITEM"){
        const itemIndex=state.items.findIndex((item)=>item.id===action.id);
        if (itemIndex === -1) {
            return state;}
        const existingItem=state.items[itemIndex];
        const updatedItems=[...state.items];
        if (existingItem.quantity===1){
            updatedItems.splice(itemIndex,1)
        }
        else{
            const updatedItem={...existingItem,quantity:existingItem.quantity-1};
            updatedItems[existingItem]=updatedItem;
        }
        return {...state,items:updatedItems};

    }

    if(action.type==="CLEAR_CART"){
        return {...state,items:[]}
    }
    return state

}
export function CartContextProvider({children}){
    const[cart,dispatchCartAction]=useReducer(cartReducer,{items:[]});
    

    function addItem(item){
        dispatchCartAction({type:"ADD_ITEM",item})
    }

    function removeItem(id){
        dispatchCartAction({type:"REMOVE_ITEM",id})

    }

    function clearCart(){
        dispatchCartAction({type:"CLEAR_CART"})
    }

    const cartContext={
        items:cart.items,
        addItem,
        removeItem,
        clearCart
    }
    
    console.log(cartContext);

    return(
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}

export default CartContext;