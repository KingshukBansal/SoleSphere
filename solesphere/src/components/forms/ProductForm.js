import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Select } from 'antd'
import { shoeSizes } from '../../data/data'
const ProductForm = ({ handleCreate, product, setProduct }) => {
    const [category, setCategory] = useState([])
    const [brand,setBrand]=useState([]);



    const getAllCategories = async (req, res) => {
        try {
          const { data } = await axios.get('http://localhost:8080/api/v1/category/all-categories');
          if (data.success) {
            setCategory(data.categories);
          }
        } catch (error) {
          console.log(error);
          toast.error("Categories is not fetched");
        }
      }
    const getAllBrands = async (req,res)=>{
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/brand/all-brands');
            console.log(data);
            if(data.success){
                setBrand(data.brands);

            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
   

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
      getAllCategories();
      getAllBrands();
    

    }, [])
    

    return (
        <>
            <div className="mb-3">
                <input type="email" className="rounded-xl p-2 outline-blue-700 outline-[1px] w-full" id="exampleFormControlInput1" placeHolder="Name" name='name' value={product.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <textarea className="rounded-xl p-2  outline-blue-700 outline-[1px] w-full " id="exampleFormControlTextarea1" rows="3" placeHolder='Description' name='description' value={product.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <input type='number' className="rounded-xl p-2  outline-blue-700 outline-[1px] w-full" id="exampleFormControl1" rows="3" placeHolder='Price' name='price' value={product.price} onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <input type='number' className="rounded-xl p-2  outline-blue-700 outline-[1px] w-full " id="exampleFormControl1" rows="3" placeHolder='Quantity' name='quantity' value={product.quantity} onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <input type='number' className="rounded-xl p-2  outline-blue-700 outline-[1px] w-full " id="exampleFormControl1" rows="3" placeHolder='Discount' name='discount' value={product.discount} onChange={handleChange}></input>
            </div>
            <div className="mb-3 ">
                <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select shoe sizes"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    name='sizes'
                    value={product.sizes}
                    onChange={(value)=>{setProduct({...product,sizes:value})}}
                    filterOption={filterOption}
                    options={[{value:'',
                    label:"Select Available Sizes",
                    disabled:true
    },...shoeSizes.map((size) => ({
                        value: size.value,
                        label: size.name
                    }))]}
                />
            </div>
            <div className="mb-3">
                <Select
                    showSearch
                    placeholder="Select a category"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    name='category' value={product.category}
                    onChange={(value) => { setProduct({ ...product, category: value }) }}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    options={[{
                        value: '',
                        label: "Select Category",
                        disabled: true
                    }, ...category.map((c) => ({
                        value: c._id,
                        label: c.name
                    }))]}
                />
            </div>
            <div className="mb-3">
                <Select
                    showSearch
                    placeholder="Select a brand"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    name='brand' value={product.brand}
                    onChange={(value) => { setProduct({ ...product, brand: value }) }}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    options={[{
                        value: '',
                        label: "Select Brand",
                        disabled: true
                    }, ...brand.map((c) => ({
                        value: c._id,
                        label: c.name
                    }))]}
                />
            </div>

            <div className="mb-3" >
                <Select
                    showSearch
                    placeholder="Shipping"
                    optionFilterProp="children"
                    name='shipping' value={product.shipping}
                    // onChange={onChange}
                    // onSearch={onSearch}
                    onChange={(value) => { setProduct({ ...product, shipping: value }) }}

                    filterOption={filterOption}
                    style={{ width: "100%" }}
                    options={

                        [{
                            value: '',
                            label: "Select Shipping",
                            disabled: true
                        }, {
                            value: '1',
                            label: 'Yes'
                        },
                        {
                            value: '0',
                            label: 'No'
                        }]}
                />
            </div>

            <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12 rounded-xl p-2  outline-blue-700 outline-[1px] w-full bg-white'>

                    {product.photo ? product.photo.name : 'upload Photo (size should be less than 1MB)'}
                    <input type='file' name='photo' size='2097152' accept='images/*' onChange={(e) => { setProduct({ ...product, photo: e.target.files[0] }) }} hidden />
                </label>
            </div>
            {product.photo ? <div className='mb-3'>
                <div className="text-center">
                    <img
                        src={URL.createObjectURL(product.photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                    />
                </div>
            </div> : ""}
            <div className="mb-3">
                <button type="submit" className="btn btn-primary rounded-xl w-full" onClick={handleCreate}>Submit</button>

            </div>




        </>
    )
}

export default ProductForm









