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
      <div  >

      <div className='flex flex-row max-tablet:flex-col'>
            <div className='w-1/4 text-center p-0 max-tablet:w-full'>

            <AdminMenu />
          </div>

          <div className='w-3/4 m-4 flex bg-tertiary rounded-2xl justify-center  max-tablet:w-auto'>
            <div className='p-2 w-2/3 flex flex-col items-center max-tablet:w-auto'>
              <h3 className='text-4xl font-bold mb-12 '>Manage Category</h3>
              <CategoryFrom handleSubmit={handleSubmit} value={value} setValue={setValue} />

              <table className=" w-full bg-white rounded-2xl p-4 overflow-hidden max-tablet:rounded-lg ">
                <thead className='rounded-2xl'>
                  <tr className=' bg-primary text-xl text-black rounded-2xl'>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c, index) => (
                    <tr className='p-2 border'>
                      <th scope="row" className='max-tablet:px-2'>{index + 1}</th>
                      <td className='p-2 ' key={c._id}>{c.name}</td>
                      <td className='p-2 flex flex-row justify-around'><button type="button" className="btn btn-primary hover:scale-[1.1] w-1/3" onClick={() => { setVisible(true); setPrevCategory(c); }}>Edit</button>
                        <button type="button" onClick={() => { setDeleteCategory(c) }} class="btn btn-dange bg-red-400 hover:bg-red-500 hover:scale-[1.1] w-1/3">Delete</button>
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