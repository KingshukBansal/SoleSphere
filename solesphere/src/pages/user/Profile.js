import React,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import config from '../../config/config';
import { toast } from 'react-toastify';
const Profile = () => {
    const [auth,setAuth] = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });


    useEffect(()=>{
       const {email,name,phone,address}=auth.user;
       setFormData({
        name:name,
        email:email,
        password:"",
        phone:phone,
        address:address
       })
    },[])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res= await axios.put(`${config.REACT_APP_API}/auth/profile`,formData);
            console.log(res);
            if(res.data.success){
                setAuth({...auth,user:res?.data.user})
                let ls = localStorage.getItem("auth");
                ls= JSON.parse(ls);
                ls.user=res.data.user;
                localStorage.setItem("auth",JSON.stringify(ls));
                toast.success('Your Profile get Updated successfully');

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
<Layout title='Profile-Dashboard'>
    <div className='container-fluid' style={{minHeight:'100vh' }} >

   
       <div className='row'>
           <div className='col-md-3 text-center p-0'>
       
       <UserMenu/>
       </div>

       <div className='col-md-9'>
           <div className='card w-75 p-3'>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                                <div className="card-body p-md-5 ">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Profile</p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" name="email" value={formData.email} onChange={handleChange} disabled/>
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
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example5c" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example5c">Phone Number</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example6c" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example6c">Address</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Update Profile</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
           
       </div>
   </div>
   </div>
   </Layout>  )
}

export default Profile