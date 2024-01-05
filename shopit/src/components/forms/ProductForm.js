import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Select } from 'antd'
const ProductForm = ({ handleCreate, product, setProduct }) => {
    const [category, setCategory] = useState([])

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
    
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
   

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
      getAllCategories();
    

    }, [])
    

    return (
        <>
            <div className="mb-3">
                <input type="email" className="form-control" id="exampleFormControlInput1" placeHolder="Name" name='name' value={product.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeHolder='Description' name='description' value={product.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <input type='number' className="form-control" id="exampleFormControl1" rows="3" placeHolder='Price' name='price' value={product.price} onChange={handleChange}></input>
            </div>
            <div className="mb-3">
                <input type='number' className="form-control" id="exampleFormControl1" rows="3" placeHolder='Quantity' name='quantity' value={product.quantity} onChange={handleChange}></input>
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
                <label className='btn btn-outline-secondary col-md-12'>

                    {product.photo ? product.photo.name : 'upload Photo'}
                    <input type='file' name='photo' accept='images/*' onChange={(e) => { setProduct({ ...product, photo: e.target.files[0] }) }} hidden />
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
                <button type="submit" className="btn btn-primary btn-lg" onClick={handleCreate}>Submit</button>

            </div>




        </>
    )
}

export default ProductForm









