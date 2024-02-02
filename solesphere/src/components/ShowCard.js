import React from 'react'
import CardTemplate from './CardTemplate'
import { Link } from 'react-router-dom'
const ShowCard = ({products,admin}) => {
  return (
    <>
   <div class="container text-center">
  <div class="row row-cols-auto">
    {
        products.map((product)=>{
            return (
              admin===false?
            <div class="col">
            
                 <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
                 <CardTemplate product={product} admin={admin}/>
                 </Link>
            
            </div>
            :
            <div class="col">
                <Link to={`/dashboard/admin/product/${product._id}` } style={{textDecoration:'none'}}>
                <CardTemplate product={product} admin={true}/>
                </Link>
            </div>
            )
        })
    }

  </div>
</div>
  </>
  )
}

export default ShowCard