import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import {useAuth} from '../../context/auth';
const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title='Dashboard'>
    <div className='container-fluid' style={{minHeight:'100vh' }} >

   
       <div className='row'>
           <div className='col-md-3 text-center p-0'>
       
       <UserMenu/>
       </div>

       <div className='col-md-9'>
           <div className='card w-75 p-3'>
               <h3>Name: {auth?.user?.name}</h3>
               <h3>Email: {auth?.user?.email}</h3>
               <h3>Phone: {auth?.user?.phone}</h3>
           </div>
       </div>
   </div>
   </div>
   </Layout> )
}

export default Dashboard