import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import UpdateProductForm from '../../components/forms/UpdateProductForm'
import { useNavigate } from 'react-router-dom'
const UpdateProduct = () => {
    const [product,setProduct] = useState({});
    const {id}= useParams();
    const Navigate = useNavigate();
    const getProduct = async(req,res)=>{
        try {
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/get-product/${id}`);
            if(data.success){

                setProduct(data.product);
            }

        } catch (error) {
            if(error.response&&error.response.status===400){
                toast.error("Product is not fetch");
                Navigate('/dashboard/admin/products')
            }
            else{
                console.log(error);
                toast.error("Product is not fetched");
            }
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('quantity', product.quantity);
      product.photo&&formData.append('photo', product.photo);
      formData.append('shipping', product.shipping);
      formData.append('description', product.description);
      const { data } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${product._id}`, formData)
      if (data.success) {
        toast.success("Product is updated")
    }
    } catch (error) {
        console.log(error);
        toast.error("Product is not updated")
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${product._id}`)
            if (data.success) {
                toast.success("Product is deleted")
                setProduct({})
                Navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error);
            toast.error("Product is not deleted")
        }
    }
    useEffect(()=>{

        getProduct();
    },[])
  return (
<>
<Layout title='Product'>
      <div className='container-fluid' style={{ minHeight: '100vh' }} >


        <div className='row'>
          <div className='col-md-3 text-center p-0'>

            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div className='card w-100 p-3'>
                {product && Object.keys(product).length > 0?<UpdateProductForm product={product} setProduct={setProduct} handleUpdate={handleUpdate} handleDelete={handleDelete}/>:""}
            </div>
          </div>
        </div>
      </div>
    </Layout>
</>  )
}

export default UpdateProduct