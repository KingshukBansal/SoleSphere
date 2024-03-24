import {useState,useEffect} from 'react';
import {useAuth} from '../../context/auth';
import {Outlet} from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import config from '../../config/config';
export default function AdminPrivate() {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
     useEffect(()=>{
        const autoCheck = async()=>{
            const res= await axios.get(`${config.REACT_APP_API}/auth/adminauth`);
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        };
        if(auth?.token){
            autoCheck();
        }
    },[auth?.token]);

    return ok?<Outlet/>:<Spinner path='/'/> ;
}

