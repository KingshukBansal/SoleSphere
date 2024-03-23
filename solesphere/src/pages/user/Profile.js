import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setFormData({
      name: name,
      email: email,
      password: "",
      phone: phone,
      address: address,
    });
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${config.REACT_APP_API}/auth/profile`,
        formData
      );
      console.log(res);
      if (res.data.success) {
        setAuth({ ...auth, user: res?.data.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Your Profile get Updated successfully");
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
    <Layout title="Profile-Dashboard">
      <div >
      <div className='flex flex-row max-tablet:flex-col'>
      <div className='w-1/4 text-center p-0 max-tablet:w-full'>
            <UserMenu />
          </div>

         
          <div className='w-3/4 m-4 flex bg-tertiary rounded-2xl justify-center  max-tablet:w-auto'>
            <div className='p-2 w-2/3 flex flex-col items-center max-tablet:w-auto'><p className="text-center text-4xl font-bold mb-4 mx-1 max-md:mx-4 mt-4 max-tablet:text-2xl">
                Sign up
              </p>
              <form className="mx-1 w-full self-center" onSubmit={handleSubmit}>
                <div className="flex-col flex m-1 items-left ">
                  <label
                    className="form-label text-lg me-2 m-1 font-bold"
                    htmlFor="form3Example1c"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="form3Example1c"
                    className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-col flex m-1 items-left ">

                    <label
                      className="form-label text-lg me-2 m-1 font-bold"
                      htmlFor="form3Example3c"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="form3Example3c"
                      className="input bg-white input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                </div>
                <div className="flex-col flex m-1 items-left ">

                    <label
                      className="form-label text-lg me-2 m-1 font-bold"
                      htmlFor="form3Example4c"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4c"
                      className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                </div>
                <div className="flex-col flex m-1 items-left ">

                    <label
                      className="form-label text-lg me-2 m-1 font-bold"
                      htmlFor="form3Example5c"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="form3Example5c"
                      className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-col flex m-1 items-left ">

                    <label
                      className="form-label text-lg me-2 m-1 font-bold"
                      htmlFor="form3Example6c"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="form3Example6c"
                      className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-col flex my-4 mx-2 items-left ">
                  <button type="submit" className="btn btn-primary btn-md max-w-xl w-full">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
