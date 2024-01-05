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
<section className="h-auto" style={{ backgroundColor: '#eee',minHeight:'100vh' }}>
                <div className="container h-100 " >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black " style={{ borderRadius: '25px' , marginTop:'2rem',marginBottom:'2rem' }}>
                                <div className="card-body p-md-5 ">
                                    <div className="row justify-content-center">
                                         <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                                            <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=826&t=st=1704136017~exp=1704136617~hmac=39e750b98f9ed81f8b8b5a57c8f0b7a323ecf4495be10a122b6f4a629ea808aa" className="img-fluid" alt="Sample_image" />
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2 my-auto">
                                            <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Login</p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required/>
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    
                                                    <button type="button" className="btn" onClick={() => { history('/forgotpassword') }} style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }}>
                                                        Forgot Password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section></Layout>
  )
}

export default Login