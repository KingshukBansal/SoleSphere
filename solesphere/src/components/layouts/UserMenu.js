import React from 'react'
import {Link} from 'react-router-dom';

const UserMenu = () => {
  return (
<>
<div className="flex flex-col list-group min-h-[100vh] bg-primary text-white font-bold text-xl rounded-2xl m-4 p-2 max-tablet:min-h-full">

  <Link to="/dashboard/user/profile" className="headerList m-4">Profile</Link >
  <Link to="/dashboard/user/orders" className="headerList m-4">Orders</Link >
</div>
</>  )
}

export default UserMenu