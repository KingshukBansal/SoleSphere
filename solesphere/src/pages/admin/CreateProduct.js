import React, { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import CreateProductForm from '../../components/forms/ProductForm'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'


const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    brand:'',
    sizes:[],
    discount:'',
    quantity: '',
    photo: '',
    shipping: '',
    description: '',
  })
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      console.log('Product before FormData:', product);

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('brand',product.brand);
      formData.append('availableSizes',JSON.stringify(product.sizes));
      formData.append('discount',product.discount);
      formData.append('quantity', product.quantity);
      formData.append('photo', product.photo);
      formData.append('shipping', product.shipping);
      formData.append('description', product.description);

      
      console.log('FormData:', formData.name);
      const { data } = await axios.post('http://localhost:8080/api/v1/product/create-product', formData)
      if (data.success) {
        toast.success("Product is created")
        setProduct({
          name: '',
    price: '',
    category: '',
    brand:'',
    sizes:[],
    discount:'',
    quantity: '',
    photo: '',
    shipping: '',
    description: '',
        })
      }
    } catch (error) {
      console.log(error);
      toast.error("Product is not created")
    }
  }

  
  return (
    <Layout title='Create Products'>
      <div className='container-fluid' style={{ minHeight: '100vh' }} >


        <div className='row'>
          <div className='col-md-3 text-center p-0'>

            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <CreateProductForm handleCreate={handleCreate} product={product}  setProduct={setProduct}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>)
}

export default CreateProduct