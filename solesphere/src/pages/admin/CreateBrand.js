import React, { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import BrandForm from '../../components/forms/BrandForm'
import { Modal } from 'antd'
const CreateBrand = () => {

  const [brand, setbrand] = useState([]);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [prevbrand, setPrevbrand] = useState({});
  const [updateName, setUpdateName] = useState('');
  const [deleteBrand, setDeleteBrand] = useState({});
  const getAllBrands = async (req, res) => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/brand/all-brands');
      
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
      const { data } = await axios.post('http://localhost:8080/api/v1/brand/create-brand', { name: value });
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

      const { data } = await axios.put(`http://localhost:8080/api/v1/brand/update-brand/${prevbrand._id}`, { name: updateName });
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
      const { data } = await axios.delete(`http://localhost:8080/api/v1/brand/delete-brand/${deleteBrand._id}`)
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
      <div className='container-fluid' style={{ minHeight: '100vh' }} >


        <div className='row'>
          <div className='col-md-3 text-center p-0'>

            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h3>Manage brand</h3>
              <hr />
              <BrandForm handleSubmit={handleSubmit} value={value} setValue={setValue} />

              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brand.map((c, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td key={c._id}>{c.name}</td>
                      <td><button type="button" onClick={() => { setVisible(true); setPrevbrand(c); }} class="btn btn-primary">Edit</button>
                        <button type="button" onClick={() => { setDeleteBrand(c) }} class="btn btn-danger ms-2">Delete</button>
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