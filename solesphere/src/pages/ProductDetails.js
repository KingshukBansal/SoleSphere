import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useParams,Link } from 'react-router-dom';
import axios from 'axios'
import ShowCard from '../components/ShowCard'
import { useCart } from '../context/cart'
import config from '../config/config';
const ProductDetails = () => {

  const [cart,setCart] =useCart();
  const [product,setProduct] = useState({});
  const [recomendedProducts,setRecomendedProducts] = useState([]);
  const params = useParams();
  const getProduct = async(req,res) =>{
    try {
      const {data} = await axios.get(`${config.REACT_APP_API}/product/get-product/${params.id}`)
      setProduct(data.product)
    } catch (error) {
      console.log(error);
    }
  }
  const getSimillarProducts = async(req,res) =>{
    try {
      const {data} = await axios.get(`${config.REACT_APP_API}/product/get-product-recommendation/${product.category._id}/${product._id}`)
      console.log(data);
       setRecomendedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(params?.id)getProduct();
  },[params?.id]);
  useEffect(()=>{
    if(product.category && product._id)getSimillarProducts();
  },[product])
  
  return (
    <Layout title={"Product Details"} description={"Here you will get all details of the product"}>

    <div className='flex flex-row p-3 max-tablet:flex-col max-tablet:justify-around'>
     { product&&<img src={`${config.REACT_APP_API}/product/get-photo/${product._id}`} className="max-h-[600px] max-w-[50%] overflow-hidden w-auto rounded-xl max-tablet:max-w-full" alt="..."/>}

      <div className="details bg-white rounded-xl ms-4 w-full p-4 max-tablet:ml-0 max-tablet:mt-4">
        <h2 className='font-bold'>Name:{product.name}</h2>
        <h2 className='font-bold text-wrap '>Description: { product.description}</h2>
         <h2 className='font-bold'>Category : {product.category?product.category.name:""}</h2>
         <h2 className="font-bold">Brand: {product.brand?product.brand.name:""}</h2>
         <h2 className='font-bold'>Available Sizes</h2>
         {product?.availableSizes?(product.availableSizes.map((s)=>{
          return(
<button className='btn bg-white border-2 m-2 font-normal'>US {s}</button>
          );
         })):""}
         <h2 className="font-bold">Price: {product.price}</h2>
         <h2 className='font-bold'>Discount: {product.discount}</h2>
         <Link onClick={(e)=>{setCart([...cart,product])
    localStorage.setItem('cart',JSON.stringify([...cart,product]))}} ><button className="btn  bg-green-500 sm:btn-sm md:btn-md lg:btn-lg p-2">Add To Cart</button></Link>
   
      </div>
    </div>
    <h1 className='w-full text-center font-bold text-3xl mt-4'>Recommended Products</h1>
      <div className="recomendation grid grid-cols-4 gap-y-2 gap-x-2 max-md:grid-cols-1 max-laptop:grid-cols-2 max-desktop:grid-cols-3 m-4 mb-0">
       <ShowCard products={recomendedProducts} admin={false} />
        
      </div>
    </Layout>
  )
}

export default ProductDetails