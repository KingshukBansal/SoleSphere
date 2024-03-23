import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'

import {useAuth} from '../../context/auth';
import { json } from 'react-router-dom';
const Dashboard = () => {
    const [auth,setAuth] = useAuth();
  return (
    <Layout title='Dashboard'>
     <div className='container-fluid' style={{minHeight:'100vh' }} >

    
        <div className='flex flex-row'>
            <div className='w-1/4 text-center p-0 '>
        
        <AdminMenu/>
        </div>

        <div className='w-3/4 m-4 p-4 bg-tertiary rounded-2xl'>
            <div className='p-3 text-2xl'>
                <h3>Admin Name: {auth?.user?.name}</h3>
                <h3>Admin Email: {auth?.user?.email}</h3>
                <h3>Admin Phone: {auth?.user?.phone}</h3>
                <h3>Admin Address: {auth?.user?.address}</h3>
            </div>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Dashboard
