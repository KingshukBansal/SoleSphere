import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useParams } from 'react-router-dom'
import config from '../config/config'
import axios from 'axios'
import ShowCard from '../components/ShowCard'
const CategoryProduct = () => {
    const category = useParams().slug;
    const [products,setProducts]= useState();

    const getProductsFromCategory = async(req,res) =>{
        try {
            const {data} = await axios.get(`${config.REACT_APP_API}/product/getProductsFromCategory/${category}`);
                 setProducts(data.products);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProductsFromCategory();
    },[])
  return (
<Layout title={`Products-${category}`}>
      <div className="container">
      <h1 className='text-center'>ALL PRODUCTS - {category.toUpperCase()}</h1>
          <div className="d-flex flex-wrap">
            {products? 
            <ShowCard products={products} admin = {false} />:
            <div></div>
            }
          </div>
      </div>
</Layout>
  )
}

export default CategoryProduct