import React from 'react'
import { useSearch } from '../../context/search'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
const SearchInput = () => {
    const [value,setValue] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
e.preventDefault();
try {
    const {data} = await axios.get(`${config.REACT_APP_API}/product/search/${value.keyword}`)
    setValue({...value,result:data.result})
    navigate('/search');
} catch (error) {
 console.log(error);   
}
    }
  return (
    <>
<form className="flex" role="search" onSubmit={handleSubmit}>
        <input className="me-2 rounded-lg p-2 text-black" type="search" placeHolder="Search" value={value.keyword} onChange={(e)=>{ setValue({...value, keyword:e.target.value})}}/>
        <div className="items-center flex flex-row m-1">
          <button className="bg-green-500 rounded-lg px-2 py-1 transition ease-in-out delay-100 hover:scale-110 duration-300" type='submit'>
           Search
          </button>
            </div>      
            </form>  
    </>)
}

export default SearchInput