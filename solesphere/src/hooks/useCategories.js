import axios from 'axios'
import { useState,useEffect } from 'react';
import config from '../config/config';
const useCategories = () => {
    const [categories,setCategories]= useState([]);
    
    const getAllCategories = async(req,res)=>{
        try {
          const { data } = await axios.get(`${config.REACT_APP_API}/category/all-categories`);
          if (data.success) {
            setCategories(data.categories);
    
          }
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        getAllCategories();
      },[])
  return categories;
}

export default useCategories