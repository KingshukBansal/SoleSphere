import {useState,useContext, createContext, useEffect} from 'react';
const CartContext = createContext();

 const CartProvider = ({children}) => {
    useEffect(()=>{
        let existingCartProducts = localStorage.getItem('cart');
        if(existingCartProducts) setCart(JSON.parse(existingCartProducts));
    },[])
    const [cart,setCart] = useState([]);

    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
    

}
const useCart= () => useContext(CartContext);


export {CartProvider,useCart};