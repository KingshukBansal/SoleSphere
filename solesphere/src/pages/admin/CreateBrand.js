import React, { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import BrandForm from '../../components/forms/BrandForm'
import { Modal } from 'antd'
import config from '../../config/config'
const CreateBrand = () => {

  const [brand, setbrand] = useState([]);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [prevbrand, setPrevbrand] = useState({});
  const [updateName, setUpdateName] = useState('');
  const [deleteBrand, setDeleteBrand] = useState({});
  const getAllBrands = async (req, res) => {
    try {
      const { data } = await axios.get(`${config.REACT_APP_API}/brand/all-brands`);
      
     if (data.success) {
        setbrand(data.brands);

      }
    } catch (error) {
      console.log(error);
      toast.error("brands is not fetched");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${config.REACT_APP_API}/brand/create-brand`, { name: value });
      if (data.success) {

        toast.success(`${data.brand.name} is created successfully`)
        getAllBrands();
        setValue('');
      }
      else {
        toast.error(`${data.brand.name} is not created successfully`)
      }
    } catch (error) {
      console.log(error);
      toast.error("New brand is not created");
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.put(`${config.REACT_APP_API}/brand/update-brand/${prevbrand._id}`, { name: updateName });
      if (data.success) {
        toast.success(`${prevbrand.name} is get converted to ${data.brand.name} successfully`)
        getAllBrands();

      }



    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      }
      else {

        toast.error(`${updateName} is not get updated`)
      }


    }
    setPrevbrand({});
    setUpdateName('');
    setVisible(false);
  }
  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(`${config.REACT_APP_API}brand/delete-brand/${deleteBrand._id}`)
      if (data.success) {
        toast.success(`${data.brand.name} got deleted successfully`);
        getAllBrands();
      }

    } catch (error) {
      console.log(error);
      toast.error('brand not deleted successfully');
    }
    setDeleteBrand({});

  }
  useEffect(() => {
    getAllBrands();
  }, [])

  useEffect(() => {
    if (deleteBrand._id) {
      handleDelete();
    }
  }, [deleteBrand]);
  return (
    <Layout title='Create Categroies'>
      <div  >

<div className='flex flex-row max-tablet:flex-col'>
      <div className='w-1/4 text-center p-0 max-tablet:w-full'>

            <AdminMenu />
          </div>

          <div className='w-3/4 m-4 flex bg-tertiary rounded-2xl justify-center  max-tablet:w-auto'>
            <div className='p-2 w-2/3 flex flex-col items-center max-tablet:w-auto'>
              <h3 className='text-4xl font-bold mb-12 '>Manage Brand</h3>
              <BrandForm handleSubmit={handleSubmit} value={value} setValue={setValue} />

     

              <table className=" w-full bg-white rounded-2xl p-4 overflow-hidden max-tablet:rounded-lg ">
                <thead className='rounded-2xl'>
                  <tr className=' bg-primary text-xl text-black rounded-2xl'>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brand.map((c, index) => (
                    <tr className='p-2 border'>
                      <th scope="row" className='max-tablet:px-2'>{index + 1}</th>
                      <td className='p-2 ' key={c._id}>{c.name}</td>
                      <td className='p-2 flex flex-row justify-around'><button type="button" className="btn btn-primary hover:scale-[1.1] w-1/3" onClick={() => { setVisible(true); setPrevbrand(c); }} >Edit</button>
                        <button type="button" onClick={() => { setDeleteBrand(c) }} class="btn btn-dange bg-red-400 hover:bg-red-500 hover:scale-[1.1] w-1/3">Delete</button>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} open={visible} >
            <BrandForm handleSubmit={handleUpdate} value={updateName} setValue={setUpdateName} />
          </Modal>
        </div>
      </div>
    </Layout>)
}

export default CreateBrand