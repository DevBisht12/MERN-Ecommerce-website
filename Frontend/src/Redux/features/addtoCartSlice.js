import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItem:JSON.parse(localStorage.getItem('cartItem'))||[]
}

export const addToCartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addtoCart:(state,action)=>{
            const item=state.cartItem.find(item=>item.product===action.payload.product)
            if(!item){
                state.cartItem.push(action.payload)
                localStorage.setItem('cartItem',JSON.stringify(state.cartItem))
            }
            
        },
        updateCartItem:(state,action)=>{
            const Item=state.cartItem.find(item=>item.product===action.payload.Product)
            if(Item){
                Item.quantity=action.payload.quantity
                localStorage.setItem('cartItem',JSON.stringify(state.cartItem))
            }

        },
        removeFromCart:(state,action)=>{
            state.cartItem=state.cartItem.filter(item=>item.product!==action.payload.Product)
            localStorage.setItem('cartItem',JSON.stringify(state.cartItem))
        },
        clearCart:(state,action)=>{
            state.cartItem=[]
            localStorage.removeItem('cartItem')
        }


    }

})

export const {addtoCart,updateCartItem,removeFromCart,clearCart} = addToCartSlice.actions

export default addToCartSlice.reducer
