import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import ShowCard from "../components/ShowCard";
import { useAuth } from "../context/auth";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import config from "../config/config";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const removeItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };
  const totalBill = () => {
    try {
      let total = 0;
      cart.map((product) => {
        total = total + product.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${config.REACT_APP_API}/product/braintree/payment/`,
        { cart, nonce }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  return (
    <Layout title={"Cart"}>
      <div className="w-full p-4">
        <div className="flex flex-col">
          <div className="font-bold text-5xl w-2/3 self-center my-1 max-tablet:w-full max-tablet:text-2xl">
          {`Hello ${auth?.token && auth.user.name}!`}
          <br />{" "}
          </div>
          <div className="font-bold text-2xl w-2/3 self-center my-1 max-tablet:w-full max-tablet:text-lg">

          {cart?.length > 1
            ? `you have ${cart.length} items in your cart ${
              auth.token ? "" : "Login to checkout"
            }`
            : "You have empty cart"}
            </div>
          <div className="flex flex-col text-center w-full mx-auto">
            <div className="w-2/3 bg-white m-2 rounded-2xl self-center max-tablet:w-full">
              <h1 className="text-2xl font-bold bg-primary rounded-t-2xl w-full p-2 max-tablet:text-xl">

              Products
              </h1>
              <div className="flex flex-col ">
                {cart.map((product) => {
                  return (
                    <>
                    <div className="flex flex-row p-4 mx-2 max-tablet:flex-col">

                      <div className='flex self-center w-1/4 max-h-[170px] bg-tertiary rounded-lg overflow-hidden max-tablet:rounded-lg max-tablet:min-w-[170px]'><img src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`} className="h-fit self-center overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center" alt="..." /></div>

                      <div className="w-3/4 text-xl text-left m-4 max-tablet:text-lg max-tablet:m-1">
                        <div  className="font-bold inline-block">Name:</div>{product.name}
                        <br />
                        <div  className="font-bold inline-block">Description:</div>{product.description}
                        <br />
                        <div  className="font-bold inline-block">Price:</div>{product.price}
                        <br />
                      </div>
                        <div
                          className="btn bg-red-500 self-center"
                          onClick={(e) => removeItem(product._id)}
                          >
                          Remove
                        </div>
                          </div>
                          <hr />
                    </>
                  );
                })}
              </div>
            </div>
            <div className=" text-center self-center bg-white w-2/3 rounded-2xl max-tablet:w-full">
              <h2 className="text-2xl font-bold">Cart Summary</h2>
              <p className="text-lg font-bold"> Total | Checkout | Payment</p>
              <hr />
              <div className="text-left w-full p-4 text-xl">

              <h2 className="font-bold ">Total : {totalBill()}</h2>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4 className="font-bold">Current Address:</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-primary"
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
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                    className="btn btn-primary"
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

              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                  ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button className="btn bg-green-500" onClick={handlePayment}>
                      {loading ? "Processing" : "Make Payment"}
                    </button>
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
