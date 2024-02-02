import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import Helment from 'react-helmet'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
<>
<Helment>
<title>{title}</title>  
<meta name="description" content={description}/>
<meta name="keywords" content={keywords}/>
<meta name="author" content={author}/>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


</Helment>
<Header/>
<ToastContainer/>
<main style={{backgroundColor:"#DAFFFB"}} >
{children}
</main>

<Footer/>
</>
    )
}

Layout.defaultProps = {
    title:"ShopIT",
    description:"We sell the best products for cheap",
    keywords:"electronics,buy electronics,cheap electronics",
    author:"Kingshuk Bansal"

}

export default Layout