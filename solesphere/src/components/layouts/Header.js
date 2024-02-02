import React from 'react'
import {Link } from 'react-router-dom'
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../forms/SearchInput';
import useCategories from '../../hooks/useCategories';
import { Badge } from 'antd';
import { useCart } from '../../context/cart';
const Header = () => {
    const [auth,setAuth] = useAuth();
    const categories = useCategories();
    const [cart,setCart] = useCart();
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
            <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#176B87"}}>
                <div className="container-fluid">
                <MdShoppingBag />

                    <Link to="/"className="navbar-brand" href="#">SOLESPHERE</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput/>
                            <li className="nav-item">
                                <Link to="/"className="nav-link active" aria-current="page" >Home</Link >
                            </li>
                            <li class="nav-item dropdown">
          <Link to={'/categories'} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul class="dropdown-menu">
            <li><Link to={'/categories'} className='dropdown-item'>All Categories</Link></li>
            
                {
                    categories.map((c)=>{
                        return (
                            <l1>
                                <Link to={`/category/${c.slug}`} className='dropdown-item' key={c._id}>{c.name}</Link>
                                </l1>
                            )
                    })
                }
          </ul>
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
                                <Badge count={cart?.length}>

                                <Link to="/cart"className="nav-link">Cart</Link >
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header