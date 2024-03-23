import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
const Users = () => {

  return (
    <Layout title='All Users'>
    <div className='container-fluid' style={{minHeight:'100vh' }} >

    <div className='flex flex-row'>
            <div className='w-1/4 text-center p-0 '>
       
       <AdminMenu/>
       </div>

       <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Users</h3>
              </div>
       </div>
   </div>
   </div>
   </Layout>
  )
}

export default Users