import React from 'react'

import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import ShowCard from '../../components/ShowCard'


const Product = () => {

  const [products,setProducts] =useState([]);

  const getAllProducts = async (req,res) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/product/all-products');
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


        <div className='row'>
          <div className='col-md-3 text-center p-0'>

            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div className='card w-100 p-3'>
              <ShowCard products={products} />
            </div>
          </div>
        </div>
      </div>
    </Layout>  )
}

export default Product