import React from 'react'
import Layout from '../components/layouts/Layout'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
<Layout>
    <div className="container">
        <h1 className="mt-5">Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist...</p>
        <Link to="/">Go Back</Link>
    </div>
</Layout>
    )
}

export default PageNotFound