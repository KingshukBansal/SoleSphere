// ... (your imports)
import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/auth";
import config from "../../config/config";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/order/user/order`
      );
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
    <Layout title="Orders-Dashboard">
      <div>
        <div className="flex flex-row max-tablet:flex-col">
          <div className="w-1/4 text-center p-0 max-tablet:w-full">
            <UserMenu />
          </div>

          <div className="w-3/4 m-4 flex bg-tertiary rounded-2xl justify-center  max-tablet:w-auto">
            <div className="p-2 w-full flex flex-col items-center max-tablet:w-full">
              {auth?.token
                ? orders &&
                  orders.map((o, i) => {
                    return (
                      <div className="w-full rounded-2xl overflow-x-auto ">
                        <table className="table w-full mt-2 ">
                          <thead className="bg-primary overflow-hidden rounded-2xl font-bold text-sm">
                            <td>#</td>
                            <td>Order id</td>
                            <td>Status</td>
                            <td>Payment</td>
                            <td>Date</td>
                            <td>Quantity</td>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{i + 1}</td>
                              <td>{o?._id}</td>
                              <td>{o?.status}</td>
                              <td>{o?.payment[0]?.transaction?.amount}</td>
                              <td>{moment(o?.createAt).fromNow()}</td>
                              <td>{o?.products.length}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div >
                          {o &&
                            o?.products.map((product) => {
                              return (
                                <div >
                                  <div className="flex flex-row p-4 mx-2 max-tablet:flex-col">
                                    <div className="flex self-center w-1/4 max-h-[170px] bg-tertiary rounded-lg overflow-hidden max-tablet:rounded-lg max-tablet:min-w-[170px]">
                                      <img
                                        src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`}
                                        className="h-fit self-center overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center"
                                        alt="..."
                                      />
                                    </div>

                                    <div className="w-3/4 text-xl text-left m-4 max-tablet:text-lg max-tablet:m-1">
                                      <div className="font-bold inline-block">
                                        Name:
                                      </div>
                                      {product.name}
                                      <br />
                                      <div className="font-bold inline-block">
                                        Description:
                                      </div>
                                      {product.description}
                                      <br />
                                      <div className="font-bold inline-block">
                                        Price:
                                      </div>
                                      {product.price}
                                      <br />
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                : "No order available"}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
