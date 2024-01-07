import React, { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryFrom from '../../components/forms/CategoryForm'
import { Modal } from 'antd'
const CreateCategory = () => {

  const [category, setCategory] = useState([]);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [prevCategory, setPrevCategory] = useState({});
  const [updateName, setUpdateName] = useState('');
  const [deleteCategory, setDeleteCategory] = useState({});
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/all-categories');
      if (data.success) {
        setCategory(data.categories);

      }
    } catch (error) {
      console.log(error);
      toast.error("Categories is not fetched");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name: value });
      if (data.success) {

        toast.success(`${data.category.name} is created successfully`)
        getAllCategories();
        setValue('');
      }
      else {
        toast.error(`${data.category.name} is not created successfully`)
      }
    } catch (error) {
      console.log(error);
      toast.error("New Category is not created");
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${prevCategory._id}`, { name: updateName });
      if (data.success) {
        toast.success(`${prevCategory.name} is get converted to ${data.category.name} successfully`)
        getAllCategories();

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
    setPrevCategory({});
    setUpdateName('');
    setVisible(false);
  }
  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${deleteCategory._id}`)
      if (data.success) {
        toast.success(`${data.category.name} got deleted successfully`);
        getAllCategories();
      }

    } catch (error) {
      console.log(error);
      toast.error('category not deleted successfully');
    }
    setDeleteCategory({});

  }
  useEffect(() => {
    getAllCategories();
  }, [])

  useEffect(() => {
    if (deleteCategory._id) {
      handleDelete();
    }
  }, [deleteCategory]);
  return (
    <Layout title='Create Categroies'>
      <div className='container-fluid' style={{ minHeight: '100vh' }} >


        <div className='row'>
          <div className='col-md-3 text-center p-0'>

            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h3>Manage Category</h3>
              <hr />
              <CategoryFrom handleSubmit={handleSubmit} value={value} setValue={setValue} />

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
                  {category.map((c, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td key={c._id}>{c.name}</td>
                      <td><button type="button" onClick={() => { setVisible(true); setPrevCategory(c); }} class="btn btn-primary">Edit</button>
                        <button type="button" onClick={() => { setDeleteCategory(c) }} class="btn btn-danger ms-2">Delete</button>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} open={visible} >
            <CategoryFrom handleSubmit={handleUpdate} value={updateName} setValue={setUpdateName} />
          </Modal>
        </div>
      </div>
    </Layout>)
}

export default CreateCategory