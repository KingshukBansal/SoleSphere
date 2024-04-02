import React from 'react'
import {Link} from 'react-router-dom';

const AdminMenu = () => {
  return (
<>
<div className="flex flex-col list-group min-h-[100vh] bg-primary text-white font-bold text-xl rounded-2xl m-4 p-2 max-tablet:min-h-full">

  <Link to="/dashboard/admin/createproduct" className="headerList m-4" >Create Product</Link >
  <Link to="/dashboard/admin/createcategory" className="headerList m-4">Create Category</Link >
  <Link to="/dashboard/admin/createbrand" className='headerList m-4' >Create Brand</Link>
  <Link to="/dashboard/admin/products" className="headerList m-4">Products</Link >
  <Link to='/dashboard/admin/orders' className='headerList m-4'>Orders</Link>
  {/* <Link to="/dashboard/admin/users" className=" headerList m-4">Users</Link > */}
</div>
</>  )
}

export default AdminMenu