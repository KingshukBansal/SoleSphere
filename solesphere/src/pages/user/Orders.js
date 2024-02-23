// ... (your imports)
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import UserMenu from '../../components/layouts/UserMenu';
import { useAuth } from '../../context/auth';
import config from '../../config/config';
import axios from 'axios';
import moment from 'moment'

const Orders = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
  
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${config.REACT_APP_API}/order/user/order`);
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) {
        getOrders();

        console.log(orders);
      }
    }, [auth?.token]);
  
    return (
      <Layout title='Orders-Dashboard'>
        <div className='container-fluid' style={{ minHeight: '100vh' }}>
          <div className='row'>
            <div className='col-md-3 text-center p-0'>
              <UserMenu />
            </div>
  
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                {
                   auth?.token ? orders && orders.map((o,i)=>{
                        return (
                            <div className="border shadow">

<table className='table'>
    <thead>
        <td>#</td>
        <td>order id</td>
        <td>status</td>
        <td>Payment</td>
        <td>Date</td>
        <td>Quantity</td>

    </thead>
    <tbody>
        <tr>
            <td>{i+1}</td>
            <td>{o?._id}</td>
            <td>{o?.status}</td>
            <td>{o?.payment[0]?.transaction?.amount}</td>
            <td>{moment(o?.createAt).fromNow()}</td>
            <td>{o?.products.length}</td>
        </tr>
    </tbody>

</table>
<div>
{

o && o?.products.map((product)=>{
  
  return (
  <>
  <div className="row">

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
    </div>
  </div>
  </>
    )
  })
                }
</div>
                            </div>
                        )
                        })
                        :
                        "No order available"
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Orders;
  