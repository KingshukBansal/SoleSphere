import React from 'react'
import {Link} from 'react-router-dom';

const AdminMenu = () => {
  return (
<>
<div className="container list-group" style={{minHeight:'100vh',backgroundColor:"#176B87",borderRadius:"0px",borderWidth:"0px"}}>

  <Link to="/dashboard/admin/createproduct" className="list-group-item " style={{backgroundColor:"#176B87",borderWidth:"0px"}}>Create Product</Link >
  <Link to="/dashboard/admin/createcategory" className="list-group-item ">Create Category</Link >
  <Link to="/dashboard/admin/createbrand" className='list-group-item' >Create Brand</Link>
  <Link to="/dashboard/admin/products" className="list-group-item ">Products</Link >
  <Link to='/dashboard/admin/orders' className='list-group-item'>Orders</Link>
  <Link to="/dashboard/admin/users" className="list-group-item ">Users</Link >
</div>
</>  )
}

export default AdminMenu