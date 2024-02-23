import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import config from "../../config/config";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import {toast} from 'react-toastify'
const AdminOrder = () => {
  const [auth, setAuth] = useAuth();
  const [order, setOrder] = useState([]);
  const [status,setStatus] = useState([])
  const [selectedStatus, setSelectedStatus] = useState({});
  const items = [
    {
      label: "Not processed",
      key: "1"
    },
    {
      label: "processing",
      key: "2",
    },
    {
      label: "Shipped",
      key: "3",
 
    },
    {
      label: "delivered",
      key: "4",
 
    },
    {
      label: "cancelled",
      key: "5",
 
    },
  ];
 const handleUpdate=async()=>{
  try{
    const {data} = await axios.put(`${config.REACT_APP_API}/order/admin/changeOrderStatus`,status);
    toast.success("Order Updated Successfully");
    window.location.reload();


  }catch(error){
    console.error(error)
  }
 };
 const handleMenuClick = (e, id) => {
  const updatedStatus = items[e.key - 1].label;

  setStatus((prevStatus) => {
    const index = prevStatus.findIndex((item) => item.order_id === id);

    if (index !== -1) {
      prevStatus[index] = { order_id: id, status: updatedStatus };
    } else {
      prevStatus.push({ order_id: id, status: updatedStatus });
    }

    return [...prevStatus];
  });

  // Update selectedStatus directly using order ID as key
  setSelectedStatus((prevSelectedStatus) => ({
    ...prevSelectedStatus,
    [id]: updatedStatus,
  }));
}; 
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/order/admin/get-all-orders`
      );
      if (data.success) setOrder(data.orders);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);
  return (
    <Layout title="Dashboard">
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-md-3 text-center p-0">
            <AdminMenu />
          </div>

          <div className="col-md-9 mt-4">
            <div className="card w-100 p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>order id</th>
                    <th>order status</th>
                    <th>buyer</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Payment</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order &&
                    order.map((o, i) => {
                      return (
                        <tr key={o?._id}>
                          <td>{i + 1}</td>
                          <td>{o?._id}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.products.length}</td>
                          <td>{o?.payment[0]?.transaction?.amount}</td>
                          <td>
                            <Dropdown menu={{items,onClick:(e)=>handleMenuClick(e,o?._id)}} >
                              <Button>
                                <Space>
                                {selectedStatus[o?._id] || o?.status}                                 
                                 <DownOutlined />
                                </Space>
                              </Button>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <button className="btn btn-primary" onClick={(e)=>handleUpdate()}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
