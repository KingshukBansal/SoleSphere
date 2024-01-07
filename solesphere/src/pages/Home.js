import React from 'react'
import Layout from '../components/layouts/Layout'
import { useAuth } from '../context/auth';

const Home = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout>Home
   <pre>{JSON.stringify(auth,null,4)}</pre>
      
    </Layout>
  )
}

export default Home