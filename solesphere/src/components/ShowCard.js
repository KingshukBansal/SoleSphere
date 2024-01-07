import React from 'react'
import CardTemplate from './CardTemplate'
import { Link } from 'react-router-dom'
const ShowCard = ({products}) => {
  return (
    <>
   <div class="container text-center">
  <div class="row row-cols-auto">
    {
        products.map((product)=>{
            return (
            <div class="col">
                <Link to={`/dashboard/admin/product/${product._id}` } style={{textDecoration:'none'}}>
                <CardTemplate product={product} />
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