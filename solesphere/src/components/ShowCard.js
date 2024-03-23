import React from 'react'
import CardTemplate from './CardTemplate'
import { Link } from 'react-router-dom'
const ShowCard = ({products,admin}) => {
  return (
    <>
    {
        products.map((product,i)=>{
            return (
              admin===false?
            <div >
            
                 <Link to={`/product/${product._id}`} >
                 <CardTemplate product={product} admin={admin}/>
                 </Link>
            
            </div>
            :
            <div >
                <Link to={`/dashboard/admin/product/${product._id}` } >
                <CardTemplate product={product} admin={true}/>
                </Link>
            </div>
            )
        })
    }


  </>
  )
}

export default ShowCard