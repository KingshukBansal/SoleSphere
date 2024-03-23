import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const location = useLocation();
    const [auth,setAuth] = useAuth();
    const history=useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res= await axios.post("http://localhost:8080/api/v1/auth/login",formData);
            if(res.data.success){
                toast.success('Login Success');
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                history(location.state||'/');

            }else{
                toast.error(res.data.message);
            }

        }catch(e){
            console.log(e);
            toast.error(e.response.data.message);
               }


        // Send the form data to the server
      
    };

  return (
<Layout title={'Login'} description={'Login to shopIT'}>
      <section className="h-[90vh] bg-secondary flex flex-row justify-center">
        <div className=" bg-white w-1/2 self-center rounded-[1.2rem] max-tablet:w-full max-tablet:m-4">
          <div className="flex flex-col justify-center items-center h-{100px}">
                <p className="text-center text-4xl font-bold mb-4 mx-1 max-md:mx-4 mt-4 max-tablet:text-2xl">
                  Log in
                </p>
            <div className="flex flex-row justify-center max-tablet:flex-col">
              <div className="m-4 order-1 max-tablet:order-2">

                <form className="mx-1 max-md:mx-4" onSubmit={handleSubmit}>

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
                 

                  <div className="flex justify-left m-4 ">
                    <button type="submit" className="btn btn-primary btn-lg ">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center order-1 w-2/3 min-w-24 overflow-hidden rounded-2xl mb-12 max-tablet:justify-items-center max-tablet:w-full max-tablet:mb-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="rounded-2xl h-full w-full "
                  alt="Sample_image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Login