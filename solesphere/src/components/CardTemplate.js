import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'

const CardTemplate = ({product,admin}) => {
     const [cart,setCart] =useCart();
  return (
    <>
 {   
    !admin?
  <div className="card" style={{"width": "18rem"}}>
  <img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="card-img-top responsive" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text">{product.price}</p>
    <Link to={`/product/${product._id}`} className="btn btn-primary me-1">More Details</Link>
    <Link className="btn btn-primary ms-1" onClick={(e)=>{setCart([...cart,product])
    localStorage.setItem('cart',JSON.stringify([...cart,product]))}}>Add to Cart</Link>
  </div>
  </div>
    :
    <div className="card" style={{"width": "18rem"}}>
  <img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="card-img-top responsive" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text">{product.price}</p>

  </div>
</div>
}
      </>)
}

export default CardTemplate