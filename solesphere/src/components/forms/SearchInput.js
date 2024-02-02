import React from 'react'
import { useSearch } from '../../context/search'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const [value,setValue] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
e.preventDefault();
try {
    const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${value.keyword}`)
    setValue({...value,result:data.result})
    navigate('/search');
} catch (error) {
 console.log(error);   
}
    }
  return (
    <>
<form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeHolder="Search" aria-label="Search" value={value.keyword} onChange={(e)=>{ setValue({...value, keyword:e.target.value})}}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>  
    </>)
}

export default SearchInput