import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
const UpdateProductForm = ({
  handleUpdate,
  product,
  setProduct,
  handleDelete,
}) => {
  const [category, setCategory] = useState([]);
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/all-categories"
      );
      if (data.success) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Categories is not fetched");
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {product.photo ? (
        <div className="mb-3 w-full">
          <div className="text-center">
            <img
              src={URL.createObjectURL(product.photo)}
              alt="product_photo"
           
              className="h-fit overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center"
            />
          </div>
        </div>
      ) : (
        <div className="mb-3 w-full">
          <div className="text-center">
            <img
              src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`}
              alt="product_photo"
              className="h-fit overflow-hidden max-tablet:max-w-[170px] max-tablet:self-center"
              />
          </div>
        </div>
      )}

      <div className="mb-3 w-full">
        <label className="btn btn-outline-secondary bg-yellow-500">
          {product.photo ? product.photo.name : "upload Photo"}
          <input
            type="file"
            name="photo"
            accept="images/*"
            onChange={(e) => {
              setProduct({ ...product, photo: e.target.files[0] });
            }}
            hidden
          />
        </label>
      </div>
      <div className="mb-3 w-full">
        <input
          type="email"
          className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
          id="exampleFormControlInput1"
          placeHolder="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 w-full">
        <textarea
                    className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-fit p-2 m-1"

          id="exampleFormControlTextarea1"
          rows="3"
          placeHolder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3 w-full">
        <input
          type="number"
          className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
          id="exampleFormControl1"
          rows="3"
          placeHolder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        ></input>
      </div>
      <div className="mb-3 w-full">
        <input
          type="number"
          className="input input-bordered border-black-500 w-full max-w-xl text-center rounded-lg h-8 p-2 m-1"
          id="exampleFormControl1"
          rows="3"
          placeHolder="Quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        ></input>
      </div>
      <div className="mb-3 w-full">
        <Select
          showSearch
          className="input w-full max-w-xl text-center rounded-lg p-2"
          placeholder="Select a category"
          optionFilterProp="children"
          style={{ width: "100%" }}
          name="category"
          value={category.filter((c) => c._id === product.category)[0]?.name}
          onChange={(value) => {
            setProduct({ ...product, category: value });
          }}
          // onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "",
              label: "Select Category",
              disabled: true,
            },
            ...category.map((c) => ({
              value: c._id,
              label: c.name,
            })),
          ]}
        />
      </div>

      <div className="mb-3 w-full">
        <Select
          showSearch
          className="input w-full max-w-xl text-center rounded-lg p-2 m-1"
          placeholder="Shipping"
          optionFilterProp="children"
          name="shipping"
          value={product.shipping ? "Yes" : "No"}
          // onChange={onChange}
          // onSearch={onSearch}
          onChange={(value) => {
            setProduct({ ...product, shipping: value });
          }}
          filterOption={filterOption}
          style={{ width: "100%" }}
          options={[
            {
              value: "",
              label: "Select Shipping",
              disabled: true,
            },
            {
              value: true,
              label: "Yes",
            },
            {
              value: false,
              label: "No",
            },
          ]}
        />
      </div>

      <div className="mb-3 w-full">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          type="submit"
          className="btn bg-red-500 btn-lg ms-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default UpdateProductForm;
