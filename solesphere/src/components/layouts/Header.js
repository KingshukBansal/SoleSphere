import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../forms/SearchInput";
import useCategories from "../../hooks/useCategories";
import { Badge } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";

import { useCart } from "../../context/cart";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategories();
  const [cart, setCart] = useCart();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <>
      <nav className="bg-primary flex justify-between flex-start h-14 items-center text-white text-base ">
        <div className="flex flex-start justify-around   items-center ms-8 max-tablet:w-full">
          <MdShoppingBag size={"3rem"} />

          <Link
            className="text-2xl max-tablet:hidden max-tablet:justify-items-center mt-0"
            to="/"
            href="#"
          >
            
            SOLESPHERE
          </Link>
        </div>
        <div className="flex flex-row justify-around max-tablet:hidden">
          <div className="items-center flex flex-row m-1 max-desktop:hidden">
            <SearchInput />
          </div>
          <div className="">
            <ul className="flex flex-row justify-between w-5/5 p-3 m-1 ">
              <li className="headerList">
                <Link to="/" className="" aria-current="page">
                  Home
                </Link>
              </li>
              <li class="headerList">
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="">
                    Category
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                  >
                    
                      <Link to={"/categories" }><li className="hover:bg-slate-200 hover:rounded-lg p-1">All Categories                    </li>
</Link>

                    {categories.map((c) => {
                      return (
                        <l1 className="hover:bg-slate-200 hover:rounded-lg p-1">
                          <Link to={`/category/${c.slug}`} key={c._id} >
                            {c.name}
                          </Link>
                        </l1>
                      );
                    })}
                  </ul>
                </div>
              </li>
              {!auth.user ? (
                <>
                  <li className="headerList">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>

                  <li className="headerList">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="headerList">
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="hederList">
                    <Link onClick={handleLogout} to="/" className="nav-link">
                      Logout
                    </Link>
                  </li>
                </>
              )}
              <li className="headerList">
                <Badge count={cart?.length} colorText="#FFFFFF">
                  <Link to="/cart" className="text-white text-base">
                    Cart
                  </Link>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden max-tablet:block me-3">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="">
              <RxHamburgerMenu size={"2rem"} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li className="headerList">
                <Link to="/" className="" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="headerList">
                <Link to="/categories" className="" aria-current="page">
                  Categories
                </Link>
              </li>
              {!auth.user ? (
                <>
                  <li className="headerList">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>

                  <li className="headerList">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="headerList">
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="hederList">
                    <Link onClick={handleLogout} to="/" className="nav-link">
                      Logout
                    </Link>
                  </li>
                </>
              )}
              <li className="headerList">
                <Badge count={cart?.length} colorText="#FFFFFF">
                  <Link to="/cart" className="text-black ">
                    Cart
                  </Link>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
