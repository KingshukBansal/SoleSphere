import React from 'react'
import useCategories from '../hooks/useCategories'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const Category = () => {
    const categories = useCategories();
  return (<>
  <div className="container column">

    <div> All Categories</div>
    <div className="row">
        {
            categories.map((c)=>{
                return(

                    <Button style={{width:"20vw", margin:"0.25vw", backgroundColor:"black", color:"white", textDecoration:"none"}}><Link to={`/category/${c.slug}`}>{c.name}</Link></Button>
                    )
            })
        }
    </div>
  </div>

  </>
  )
}

export default Category