import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import ShowCard from '../components/ShowCard'
const ProductDetails = () => {
  const [product,setProduct] = useState({});
  const [recomendedProducts,setRecomendedProducts] = useState([]);
  const params = useParams();
  const getProduct = async(req,res) =>{
    try {
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.id}`)
      setProduct(data.product)
    } catch (error) {
      console.log(error);
    }
  }
  const getSimillarProducts = async(req,res) =>{
    try {
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product-recommendation/${product.category._id}/${product._id}`)
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

    <div className='row container p-3'>
     { product&&<img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="card-img-top responsive img-fluid" alt="..." style={{width:'600px'}}/>}

      <div className="details">
        <h2>Name:{product.name}</h2>
        <h2>Description: { product.description}</h2>
         <h2>Category : {product.category?product.category.name:""}</h2>
      </div>
      <div className="recomendation">
       <ShowCard products={recomendedProducts} admin={false} />
        
      </div>
    </div>
    </Layout>
  )
}

export default ProductDetails