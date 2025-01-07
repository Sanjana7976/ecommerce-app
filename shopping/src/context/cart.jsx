import { useState,createContext,useContext,useEffect } from "react";

const CartContext=createContext();
const CartProvider=({children})=>{
    const [cart,setCart]=useState([])
   useEffect(()=>{
    let existingcartitem=localStorage.getItem('cart')
    if(existingcartitem) setCart(JSON.parse(existingcartitem))
   },[])
    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}
// create custom hook
const useCart=()=>useContext(CartContext)
export {useCart,CartProvider}