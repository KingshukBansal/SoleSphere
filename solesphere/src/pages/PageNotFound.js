import React from 'react'
import Layout from '../components/layouts/Layout'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
const PageNotFound = () => {
  return (
      <Layout>
    <div className="flex flex-col font-bold text-5xl p-4 text-center">
        <p className="mt-5">Page Not Found</p>
        <p className="">The page you are looking for does not exist...</p>
        <Link className='text-blue-600' to="/">Go Back</Link>
    </div>
</Layout>
    )
}

export default PageNotFound