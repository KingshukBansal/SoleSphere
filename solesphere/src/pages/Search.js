import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/search'
import ShowCard from '../components/ShowCard'
const Search = () => {
    const [value] = useSearch();
    return (

        <Layout title={"search"} description={"Here you can search the products with keywords"}>
            <h6>
                <div className="d-flex flex-wrap mt-4">
                    {
                        value?.result.length < 1 ? "No product found" : `Found ${value?.result.length}`
                    }
                </div>
            </h6>
            <div className="d-flex flex-wrap">
                {value ?
                    <ShowCard products={value.result} admin={false} /> :
                    <div></div>
                }
            </div>
        </Layout>
    )
}

export default Search