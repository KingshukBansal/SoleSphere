import React from 'react'


const CardTemplate = ({product}) => {
  return (
    <>
    <div className="card" style={{"width": "18rem"}}>
  <img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="card-img-top responsive" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text">{product.price}</p>


  </div>
</div>
      </>)
}

export default CardTemplate