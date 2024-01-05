import React from 'react'
import {Link} from 'react-router-dom';

const AdminMenu = () => {
  return (
<>
<div className="container list-group " style={{minHeight:'100vh'}}>

  <Link to="/dashboard/admin/createproduct" className="list-group-item ">Create Product</Link >
  <Link to="/dashboard/admin/createcategory" className="list-group-item ">Create Category</Link >
  <Link to="/dashboard/admin/products" className="list-group-item ">Products</Link >
  <Link to="/dashboard/admin/users" className="list-group-item ">Users</Link >
</div>
</>  )
}

export default AdminMenu