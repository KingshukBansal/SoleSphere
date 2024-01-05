import React from 'react'
import {Link} from 'react-router-dom';

const UserMenu = () => {
  return (
<>
<div className="container list-group " style={{minHeight:'100vh'}}>

  <Link to="/dashboard/user/profile" className="list-group-item ">Profile</Link >
  <Link to="/dashboard/user/orders" className="list-group-item ">Orders</Link >
</div>
</>  )
}

export default UserMenu