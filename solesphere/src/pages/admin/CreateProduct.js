import React, { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import CreateProductForm from '../../components/forms/ProductForm'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from '../../config/config'

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
      const { data } = await axios.post(`${config.REACT_APP_API}/product/create-product`, formData)
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
      <div className='' >


      <div className='flex flex-row max-tablet:flex-col'>
            <div className='w-1/4 text-center p-0 max-tablet:w-full'>

            <AdminMenu />
          </div>
          <div className='w-3/4 m-4 flex bg-tertiary rounded-2xl justify-center max-tablet:w-auto'>
            <div className='p-2 w-2/3 flex flex-col max-tablet:w-auto'>
            <h3 className='text-4xl text-center font-bold mb-12 '>Create Product</h3>

              <CreateProductForm handleCreate={handleCreate} product={product}  setProduct={setProduct}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>)
}

export default CreateProduct