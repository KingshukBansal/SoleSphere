import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import ShowCard from '../components/ShowCard';
import { useAuth } from '../context/auth';

import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
const CartPage = () => {
    const [cart,setCart] = useCart();
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const removeItem = (id) =>{
      try {
        let myCart = [...cart]
        let index = myCart.findIndex(item => item._id === id);
        myCart.splice(index,1);
        setCart(myCart);
      } catch (error) {
        console.log(error);
      }

    }
    const totalBill = () =>{
      try {
        let total = 0;
        cart.map((product)=>{
          total=total+ product.price;
        }
        )
        return (
          total.toLocaleString(
            'en-US',{
              style:"currency",
              currency:'USD'
            }
          )
        )
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <Layout title={'Cart'} >
            <div className="container">
                <div className="row">
                    {`Hello ${auth?.token && auth.user.name}!`
                    }
<br/>                    {
                        cart?.length > 1 ? `you have ${cart.length} items in your cart ${auth.token?"":"Login to checkout"}`:"You have empty cart"
                    }
                    <div className="row text-center">

                   <div className="col-md-6">
                    Products

                    <div className="row ">
                    {

                      cart.map((product)=>{
                        
                        return (
                        <>
                          <div className="col-md-3" >
                          <img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="card-img-top responsive" alt="..." />
                          </div>
                          <div className="col-md-9 "  style={{textAlign:'left'}}>
                            Name:{product.name}
                            <br/>
                            Description:{product.description}
                            <br/>
                            Price:{product.price}
                            <br />
                            <div className='btn btn-danger' onClick={(e)=>removeItem(product._id)}>Remove</div>
                          </div>
                        </>
                          )
                        })
                      }
                      </div>
                   </div>
                   <div className="col-md-6 text-center">
<h2>Cart Summary</h2>
<p> Total | Checkout | Payment</p>
<hr />
<h2>Total : {totalBill()}</h2>
{auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
                </div>
            )}
                   </div>

                    </div>

                    <hr />

                </div>
                
            </div>
    </Layout>
  )
}

export default CartPage