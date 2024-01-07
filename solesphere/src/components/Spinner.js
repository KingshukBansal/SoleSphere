import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
const Spinner = ({path='login'}) => {
    const [count,setCount] = useState(5);
    const history = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=>--currentCount);
        },1000);
        count===0 && history(`${path}`,{state:location.pathname});
        return ()=>clearInterval(interval);
    },[count,history,location]);
  return (
<div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <h1 className="text-center">Redirecting you in {count} seconds</h1>
</div>
  )
}

export default Spinner