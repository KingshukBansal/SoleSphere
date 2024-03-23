import React from 'react'
import useCategories from '../hooks/useCategories'
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/Layout'
const Category = () => {
    const categories = useCategories();
  return (<>
    <Layout title={"All Products - Best Offers"}>

  <div className="flex flex-col">

    <div className='font-bold text-center w-full text-4xl m-4'> All Categories</div>
    <div className="grid grid-cols-4 gap-2 m-4 ">
        {
            categories.map((c)=>{
                return(

                   <Link to={`/category/${c.slug}`} > <button className='btn bg-tertiary w-full'>{c.name}</button></Link>
                    )
            })
        }
    </div>
  </div>
</Layout>
  </>
  )
}

export default Category