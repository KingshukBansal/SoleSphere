import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'

const Orders = () => {
  return (
<Layout title='Orders-Dashboard'>
    <div className='container-fluid' style={{minHeight:'100vh' }} >

   
       <div className='row'>
           <div className='col-md-3 text-center p-0'>
       
       <UserMenu/>
       </div>

       <div className='col-md-9'>
           <div className='card w-75 p-3'>
                Orders
           </div>
       </div>
   </div>
   </div>
   </Layout>  )
}

export default Orders