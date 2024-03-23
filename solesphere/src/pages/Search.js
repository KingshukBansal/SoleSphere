import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/search'
import ShowCard from '../components/ShowCard'
const Search = () => {
    const [value] = useSearch();
    return (

        <Layout title={"search"} description={"Here you can search the products with keywords"}>
            <h6>
                <div className="flex flex-wrap font-bold text-lg ps-4 pt-4 ">
                    {
                        value?.result.length < 1 ? "No product found" : `Found ${value?.result.length}`
                    }
                </div>
            </h6>
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 max-md:grid-cols-1 max-laptop:grid-cols-2 max-desktop:grid-cols-3 m-4">
                {value ?
                    <ShowCard products={value.result} admin={false} /> :
                    <div></div>
                }
            </div>
        </Layout>
    )
}

export default Search