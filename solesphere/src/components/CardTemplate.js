import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'

const CardTemplate = ({product,admin}) => {
     const [cart,setCart] =useCart();
  return (
    <>
 {   
    !admin?
<div className={`min-w-[220px] w-[96%] h-96 max-h-[374px] bg-tertiary shadow-xl flex flex-col max-tablet:flex-row max-tablet:w-auto max-tablet:m-2 rounded-lg max-tablet:h-40`}>
  <div className='flex self-center h-3/5  bg-tertiary rounded-t-lg overflow-hidden max-tablet:h-full max-tablet:rounded-s-lg max-tablet:rounded-r-none max-tablet:min-w-[170px]'><img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="h-fit self-center overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center" alt="..." /></div>
  <div className="self-left flex flex-col m-2 mt-4 max-tablet:self-center max-tablet:w-full">
    <h5 className="text-left ms-1 mb-0 font-semibold text-lg ">{product.name}</h5>
    <p className="text-left m-1 truncate-ellipsis">{product.description}</p>
    <p className="text-left m-1 text-sm" >&#8377;{product.price}&nbsp; &nbsp;<span className='text-green-800'>{product.discount}% off</span> </p>
    <div className="flex flex-row justify-around m-1 w-auto max-tablet:justify-end">

    <Link to={`/product/${product._id}`} className='max-tablet:hidden'><button className="btn  bg-yellow-500 sm:btn-sm md:btn-md lg:btn-lg p-2 max-tablet:hidden">More Details</button>
</Link>
    <Link onClick={(e)=>{setCart([...cart,product])
    localStorage.setItem('cart',JSON.stringify([...cart,product]))}} ><button className="btn  bg-green-500 sm:btn-sm md:btn-md lg:btn-lg p-2">Add To Cart</button></Link>
    </div>
  </div>
  </div>
    :
<div className={`min-w-[220px] w-[96%] h-96 max-h-[374px] bg-tertiary shadow-xl flex flex-col max-tablet:flex-row max-tablet:w-auto max-tablet:m-2 rounded-lg max-tablet:h-40`}>
  <div className='flex self-center h-3/5  bg-tertiary rounded-t-lg overflow-hidden max-tablet:h-full max-tablet:rounded-s-lg max-tablet:rounded-r-none max-tablet:min-w-[170px]'><img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="h-fit self-center overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center" alt="..." /></div>
  <div className="self-left flex flex-col m-2 mt-4 max-tablet:self-center max-tablet:w-full">
    <h5 className="text-left ms-1 mb-0 font-semibold text-lg ">{product.name}</h5>
    <p className="text-left m-1 text-nowrap truncate max-tablet:text-wrap">{product.description}</p>
    <p className="text-left m-1 text-sm" >&#8377;{product.price}&nbsp; &nbsp;<span className='text-green-800'>{product.discount}% off</span> </p>
  </div>
  </div>
}
      </>)
}

export default CardTemplate