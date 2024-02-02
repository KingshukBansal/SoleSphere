import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import AdminPrivate from './components/Routes/AdminPrivate';
import AdminDashboard from './pages/admin/Dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import CreateCategory from './pages/admin/CreateCategory';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Users from './pages/admin/Users';
import Product from './pages/admin/Product';
import CreateProduct from './pages/admin/CreateProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import BuyProduct from './pages/user/BuyProduct';
import CreateBrand from './pages/admin/CreateBrand'
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
function App() {
  return (
    <>

<Routes>
  {/* General Routes */}
<Route path="/" element={<Home/>}/>
<Route path="/search" element={<Search/>}/>
<Route path="/categories" element={<Category/>}/>
<Route path="/category/:slug" element={<CategoryProduct/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/policy" element={<Policy/>}/>
<Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/cart" element={<CartPage/>}/>
{/* ////////////////////////////////////////////////// /////////////*/}


{/* For User Dashboard  */}
<Route path="/dashboard" element={<Private/>}>
<Route path="user" element={<Dashboard/>}/>
<Route path="user/profile" element={<Profile/>}/>
<Route path="user/orders" element={<Orders/>}/>
<Route path="user/product/:id" element={<BuyProduct/>}/>
  </Route>
{/* /////////////////////////////////////////////////////////////// */}

{/* For Admin Dashboard  */}
<Route path="/dashboard" element={<AdminPrivate/>}>
<Route path="admin" element={<AdminDashboard/>}/>
<Route path="admin/createproduct" element={<CreateProduct/>}/>
<Route path="admin/createcategory" element={<CreateCategory/>}/>
<Route path="admin/createbrand" element={<CreateBrand/>}/>
<Route path="admin/products" element={<Product/>}/>
<Route path='admin/product/:id' element={<UpdateProduct/>}/>
<Route path="admin/users" element={<Users/>}/>
  </Route>
{/* ////////////////////////////////////////////////// /////////////*/}


{/* For Authentication  */}
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/forgotpassword" element={<ForgotPassword/>}/>
{/* ////////////////////////////////////////////////// /////////////*/}



{/* <Route path="/cart" element={<Cart/>}/>
<Route path="/category" element={<Category/>}/> */}
<Route path="/*" element={<PageNotFound/>}/>
</Routes>
     
    </>
  );
}

export default App;
