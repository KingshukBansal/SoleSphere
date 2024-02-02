import React, { useState,useEffect } from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios';
import ShowCard from '../components/ShowCard';
import {Checkbox,Radio} from 'antd';
import {prices,validDiscount,shoeSizes} from '../data/data';
import config from '../config/config';
const apiUrl = process.env.REACT_APP_API;

const Home = () => {
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [brands,setBrands]=useState([]);
  const [selectedBrands,setSelectedBrands]=useState([]);
  const [price,setPrice]=useState([]);
  const [selectedCategories,setSelectedCategories]=useState([]);
  const [discount,setDiscount]=useState([]);
  const [selectedDiscount,setSelectedDiscount]=useState([]);
  const [sizes,setSizes]=useState([]);
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [total,setTotal] = useState(0);
  const [filterPage,setFilterPage]=useState(0);
  const getAllProducts = async (req,res) => {
    try {
      const {data} = await axios.get(`${config.REACT_APP_API}/product/all-products`);
      if(data.success){
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  const getAllBrands = async(req,res)=>{
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/brand/all-brands');
      if (data.success) {
        setBrands(data.brands);

      }
    } catch (error) {
      console.log(error);
    }
  }
  const filterProducts = async(req,res)=>{
    try {
      setLoading(true);
      const {data} = await axios.post(`${config.REACT_APP_API}/product/products-filter/${filterPage}`,{categories:selectedCategories,price,brands:selectedBrands,discount:selectedDiscount,sizes})
      setLoading(false);
      setProducts([...products,...data?.products]);

    } catch (error) {
      console.log(error);
    }
  }
  const handleCategoryFilter=(value,id)=>{
    let all = [...selectedCategories];
    if(value){
      all.push(id);
    }
    else{
     all= all.filter((c)=>c!==id);
    }
    setSelectedCategories(all);
  }
  const handleBrandFilter=(value,id)=>{
    let all = [...selectedBrands];
    if(value){
      all.push(id);
    }
    else{
      all=all.filter((c)=>c!==id);
    }
    setSelectedBrands(all);
  }
  const handleDiscountFilter=(value,name)=>{
    let all = [...discount];
    if(value){
      all.push(name);
    }
    else{
      all=all.filter((c)=>c!==name);
    }
    let min=all[0][0];
    let max=all[0][1];
    for(let i=0;i<all.length;i++){

if(min>all[i][0]){
  min=all[i][0];
}
if(max<all[i][1]){
  max=all[i][1];
}
    }
    setDiscount(all);
    setSelectedDiscount([min,max]);
  }
  const handleSizesFilter=(value,name)=>{
    let all = [...sizes];
    if(value){
      all.push(name);
    }
    else{
      all=all.filter((c)=>c!==name);
    }
    setSizes(all);
  }
  const loadMore=async(req,res)=>{
    try {
      setLoading(true);
      const {data}= await axios.get(`${config.REACT_APP_API}/product/get-product-list/${page}`)
      setLoading(false);
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error);
    }
  }
  const getTotal=async(req,res)=>{
    try {
      const {data} = await axios.get(`${config.REACT_APP_API}/product/total-product-count`);
      if(data.success) setTotal(data.totalProduct);


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(page===1){
      return;
     } 

     loadMore();
    
  },[page])
  useEffect(()=>{
 if(filterPage===0){
  return ;
 }
 filterProducts();
  },[filterPage])
  useEffect(()=>{
    getAllCategories();
    getAllBrands();
    getTotal();
  } ,[]
  );
 useEffect(()=>{
  if(!selectedCategories.length&&!price.length&&!selectedBrands.length&&!discount.length&&!sizes.length){
    setProducts([]);
    // setFilterPage(0);
    setPage(1)
    loadMore();
  }
 },[selectedCategories.length,price.length,selectedBrands.length,discount.length,sizes.length])

  useEffect(()=>{
   if(selectedCategories.length||price.length||selectedBrands.length||discount.length||sizes.length) {
   setProducts([]);
   setFilterPage(1);
   }

  },[selectedCategories.length,price.length,selectedBrands.length,discount.length,sizes.length]);


  return (
    <Layout title={'All Products - Best Offers'}>
      <div className="row pt-4 me-0">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column ms-4">

          {categories.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>{handleCategoryFilter(e.target.checked,c._id)}}>{c.name}</Checkbox>
            
            ))}

            </div>
            <h4 className="text-center">Filter by Sizes</h4>
          <div className="d-flex flex-column ms-4">

          {shoeSizes.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>{handleSizesFilter(e.target.checked,c.value)}}>{c.name}</Checkbox>
            
            ))}

            </div>
            <h4 className="text-center">Filter by Discount</h4>
          <div className="d-flex flex-column ms-4">

          {validDiscount.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>{handleDiscountFilter(e.target.checked,c.array)}}>{c.name}</Checkbox>
            
            ))}

            </div>
            <h4 className="text-center">Filter by Brand</h4>
          <div className="d-flex flex-column ms-4">

          {brands.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>{handleBrandFilter(e.target.checked,c._id)}}>{c.name}</Checkbox>
            
            ))}

            </div>

            <h4 className="text-center">Filter by Price</h4>

          <Radio.Group onChange={(e)=>{setPrice(e.target.value)}} value={price}>
        <div className="d-flex flex-column ms-4">
          {prices.map((price)=>(
    <Radio key={price.id} value={price.array}>{price.name}</Radio>

    ))}
        </div>
    </Radio.Group>     
    <div className="d-flex flex-column ms-4">
    <div className='btn btn-danger' onClick={()=>window.location.reload()}>Reset</div>
      </div>     
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>ALL PRODUCTS</h1>
          <div className="d-flex flex-wrap">
            {products? 
            <ShowCard products={products} admin = {false} />:
            <div></div>
            }
          </div>
          {products&&products.length<total&&<div className="ms-2 mt-3">


          <div className="btn btn-warning" onClick={(e)=>{
            e.preventDefault();
            // setPage(page+1);
            setFilterPage(filterPage+1);
          }}>
            {loading?'Loading...':'Load More'}
          </div>
          </div>
          
}
        </div>
      </div>
      
    </Layout>
  )
}

export default Home