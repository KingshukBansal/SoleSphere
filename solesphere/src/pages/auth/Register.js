import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    answer: "",
    address: "",
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${config.REACT_APP_API}/auth/register`,
        formData
      );
      if (res.data.success) {
        toast.success("Register Success");
        history("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }

    // Send the form data to the server
  };

  return (
    <Layout title={"Register"} description={"Register to shopIT"}>
      <section className="h-[90vh] bg-secondary flex flex-row justify-center max-tablet:h-auto">
        <div className=" bg-white w-1/2 self-center rounded-[1.2rem] max-tablet:w-full max-tablet:m-4 max-tablet:h-auto">
          <div className="flex flex-col justify-center items-center h-{100px} max-tablet:mt-4">
                <p className="text-center text-4xl font-bold mb-4 mx-1 max-md:mx-4 mt-4 max-tablet:text-2xl">
                  Sign up
                </p>
            <div className="flex flex-row justify-center max-tablet:flex-col">
              <div className="m-4 order-2">

                <form className="mx-1 max-md:mx-4" onSubmit={handleSubmit}>
                    <div className="flex-col flex m-1 items-left ">
                      <label className="form-label text-lg me-2 m-1" htmlFor="form3Example1c">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2 m-1"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  <div className="flex-col flex m-1 items-left ">
                      <label className="form-label text-lg m-1" htmlFor="form3Example3c">
                        Email:
                      </label>
                    <div className="form-outline flex-fill m-1">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex-col flex m-1 items-left ">
                  <label className="form-label text-lg m-1" htmlFor="form3Example4c">
                        Password
                      </label>
                    <div className="form-outline flex-fill m-1">
                      <input
                        type="password"
                        id="form3Example4c"
                        placeholder="Your Password"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                    </div>
                  </div>
                  <div className="flex-col flex m-1 items-left">
                  <label className="form-label text-lg m-1" htmlFor="form3Example5c">
                        Phone Number
                      </label>                    <div className="form-outline flex-fill m-1">
                      <input
                        type="text"
                        id="form3Example5c"
                        placeholder="Your Phone Number"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>
                  </div>
                  <div className="flex-col flex m-1 items-left">
                  <label className="form-label text-lg m-1" htmlFor="form3Example6c">
                        Address
                      </label>                    <div className="form-outline flex-fill m-1">
                      <input
                        type="text"
                        id="form3Example6c"
                        placeholder="Your Address"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />

                    </div>
                  </div>
                  <div className="flex-col flex m-1 items-left">
                  <label className="form-label text-lg m-1" htmlFor="form3Example6c">
                        What's you favourite food
                      </label>                    <div className="form-outline flex-fill m-1">
                      <input
                        type="text"
                        id="form3Example7c"
                        placeholder="Favourite Food"
                        className="input input-bordered border-black-500 w-full max-w-xs rounded-lg h-8 p-2"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                      />

                    </div>
                  </div>
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3c"
                      required
                    />
                    <label className="form-check-label text-lg me-2" htmlFor="form2Example3">
                      I agree all statements in{" "}
                      <a href="#!" className="text-blue-500 hover:underline">Terms of service</a>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center order-1 w-2/3 min-w-24 overflow-hidden rounded-2xl mb-12 max-tablet:justify-items-center max-tablet:w-full max-tablet:mb-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="rounded-2xl"
                  alt="Sample_image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
