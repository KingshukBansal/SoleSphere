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
        try {      setProducts();
            const {data} = await axios.get(`${config.REACT_APP_API}/product/getProductsFromCategory/${category}`);
                 setProducts(data.products);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProductsFromCategory();
    },[category])
  return (
<Layout title={`Products-${category}`}>
<div className="flex flex-col">

      <div className='font-bold text-center text-4xl m-4 max-tablet:text-2xl'> ALL PRODUCTS - {category.toUpperCase()}</div>

      <div className="grid grid-cols-4 gap-y-2 gap-x-2 max-md:grid-cols-1 max-laptop:grid-cols-2 max-desktop:grid-cols-3 m-4">
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