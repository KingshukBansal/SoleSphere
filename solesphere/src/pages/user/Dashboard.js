import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import {useAuth} from '../../context/auth';
const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title='Dashboard'>
    <div className='container-fluid' style={{minHeight:'100vh' }} >

   
       <div className='flex flex-row'>
           <div className='w-1/4 text-center p-0'>
       
       <UserMenu/>
       </div>

       <div className='w-3/4 m-4 p-4 bg-tertiary rounded-2xl'>
            <div className='p-3 text-2xl'>
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