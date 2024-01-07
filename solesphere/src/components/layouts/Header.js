import React from 'react'
import {Link } from 'react-router-dom'
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
const Header = () => {
    const [auth,setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({...auth,
            user:null,
            token:"",
        });
        localStorage.removeItem('auth');
        toast.success('Logout successfully');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                <MdShoppingBag size={'25px'}/>

                    <Link to="/"className="navbar-brand" href="#">SoleSphere</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/"className="nav-link active" aria-current="page" >Home</Link >
                            </li>
                            <li className="nav-item">
                                <Link to="/category"className="nav-link active" aria-current="page" >Category</Link >
                            </li>
                           {!auth.user?(<>
                            <li className="nav-item">
                                <Link to="/register"className="nav-link">Register</Link >
                            </li>
                    
                            <li className="nav-item">
                                <Link to="/login"className="nav-link">Login</Link >
                            </li></>):(<>
                                <li className="nav-item">
                                <Link to={`/dashboard/${auth?.user?.role===1?'admin':'user'}`}className="nav-link">Dashboard</Link >
                            </li>
                                <li className="nav-item">
                                <Link onClick={handleLogout} to="/"className="nav-link">Logout</Link >
                            </li>
                            </>

                            )}
                            <li className="nav-item">
                                <Link to="/cart"className="nav-link">Cart:(0)</Link >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header