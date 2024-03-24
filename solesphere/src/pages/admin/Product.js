import React from 'react'

import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import ShowCard from '../../components/ShowCard'
import config from '../../config/config'

const Product = () => {

  const [products,setProducts] =useState([]);

  const getAllProducts = async (req,res) => {
    try {
      const {data} = await axios.get(`${config.REACT_APP_API}/product/all-products`);
      if(data.success){
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Products are not fetched");
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  return (
    <Layout title='Products'>
      <div className='container-fluid' style={{ minHeight: '100vh' }} >


      <div className='flex flex-row max-tablet:flex-col'>
      <div className='w-1/4 text-center p-0 max-tablet:w-full'>

            <AdminMenu />
          </div>

          <div className='w-3/4 m-4 flex rounded-2xl justify-center  max-tablet:w-auto'>
            <div className='p-5 flex flex-col items-center max-tablet:w-auto'>
              
            <h1 className="text-4xl font-bold mb-12">ALL PRODUCTS</h1>
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 max-md:grid-cols-1 max-laptop:grid-cols-2 max-desktop:grid-cols-3">
            {products ? (
              <ShowCard products={products} admin={true} />
            ) : (
              <div></div>
            )}
          </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>  )
}

export default Product