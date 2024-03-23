import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import ShowCard from "../components/ShowCard";
import { Checkbox, Radio } from "antd";
import { prices, validDiscount, shoeSizes } from "../data/data";
import config from "../config/config";
import Filters from "../components/Filters";
const apiUrl = process.env.REACT_APP_API;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterPage, setFilterPage] = useState(0);
  const [mobileFilter, showMobileFilter] = useState(false);
  const [showMore, setShowMore] = useState({
    category: false,
    sizes: false,
    discount: false,
    price: false,
    brand: false,
  });
  const [view, setView] = useState({
    category: false,
    sizes: false,
    discount: false,
    price: false,
    brand: false,
  });
  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/product/all-products`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/category/all-categories`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBrands = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/brand/all-brands"
      );
      if (data.success) {
        setBrands(data.brands);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filterProducts = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${config.REACT_APP_API}/product/products-filter/${filterPage}`,
        {
          categories: selectedCategories,
          price,
          brands: selectedBrands,
          discount: selectedDiscount,
          sizes,
        }
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryFilter = (value, id) => {
    let all = [...selectedCategories];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setSelectedCategories(all);
  };
  const handleBrandFilter = (value, id) => {
    let all = [...selectedBrands];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setSelectedBrands(all);
  };
  const handleDiscountFilter = (value, name) => {
    let all = [...discount];
    if (value) {
      all.push(name);
    } else {
      all = all.filter((c) => c !== name);
    }
    let min = all[0][0];
    let max = all[0][1];
    for (let i = 0; i < all.length; i++) {
      if (min > all[i][0]) {
        min = all[i][0];
      }
      if (max < all[i][1]) {
        max = all[i][1];
      }
    }
    setDiscount(all);
    setSelectedDiscount([min, max]);
  };
  const handleSizesFilter = (value, name) => {
    let all = [...sizes];
    if (value) {
      all.push(name);
    } else {
      all = all.filter((c) => c !== name);
    }
    setSizes(all);
  };
  const loadMore = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${config.REACT_APP_API}/product/get-product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };
  const getTotal = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${config.REACT_APP_API}/product/total-product-count`
      );
      if (data.success) setTotal(data.totalProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) {
      return;
    }

    loadMore();
  }, [page]);
  useEffect(() => {
    if (filterPage === 0) {
      return;
    }
    filterProducts();
  }, [filterPage]);
  useEffect(() => {
    getAllCategories();
    getAllBrands();
    getTotal();
  }, []);
  useEffect(() => {
    if (
      !selectedCategories.length &&
      !price.length &&
      !selectedBrands.length &&
      !discount.length &&
      !sizes.length
    ) {
      setProducts([]);
      // setFilterPage(0);
      setPage(1);
      loadMore();
    }
  }, [
    selectedCategories.length,
    price.length,
    selectedBrands.length,
    discount.length,
    sizes.length,
  ]);

  useEffect(() => {
    if (
      selectedCategories.length ||
      price.length ||
      selectedBrands.length ||
      discount.length ||
      sizes.length
    ) {
      setProducts([]);
      setFilterPage(1);
    }
  }, [
    selectedCategories.length,
    price,
    selectedBrands.length,
    discount.length,
    sizes.length,
  ]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="flex flex-row w-full max-tablet:flex-col">
        <button
          className=" max-tablet:block  hidden self-end m-3 font-bold text-red-500"
          onClick={() => {
            showMobileFilter(!mobileFilter);
          }}
        >
          Filters
        </button>
        <div
          className={`w-1/5 min-w-[224px] h-full max-tablet:w-full overflow-hidden max-tablet:dropdown_mobile_filter ${
            mobileFilter ? "open" : ""
          }`}
        >
          {categories && (
            <Filters
              category={categories}
              handleFilter={handleCategoryFilter}
              desc={"Filter By Category"}

          
            />
          )}
          {shoeSizes && (
            <Filters
              category={shoeSizes}
              handleFilter={handleSizesFilter}
              desc={"Filter By Sizes"}
            />
          )}
          {validDiscount && (
            <Filters
              category={validDiscount}
              handleFilter={handleDiscountFilter}
              desc={"Filter By Discount"}
            />
          )}
          {brands && (
            <Filters
              category={brands}
              handleFilter={handleBrandFilter}
              desc={"Filter By Brand"}
            />
          )}

          <h4 className="text-center mt-4">
            <button
              onClick={() => {
                setView({ price: !view.price });
              }}
            >
              Filter by Price
            </button>
          </h4>

          {
            <>
              <div
                className={`flex flex-col dropdown_mobile_filter ${
                  view.price ? "open" : ""
                }`}
              >
                <Radio.Group
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  className="flex flex-col ms-4"
                >
                  {prices.map(
                    (price, i) =>
                      // Check if index is less than 5 or showMore.price is true
                      (i < 5 || showMore.price) && (
                        <Radio key={price.id} value={price.array}>
                          {price.name}
                        </Radio>
                      )
                  )}
                </Radio.Group>

                {prices.length > 5 && !showMore.price && (
                  <button
                    className="text-red-500 self-end"
                    onClick={() => setShowMore({ price: true })}
                  >
                    {" "}
                    Show more
                  </button>
                )}
                {prices.length > 5 && showMore.price && (
                  <button
                    className="text-red-500 self-end"
                    onClick={() => setShowMore({ price: false })}
                  >
                    Show less
                  </button>
                )}
              </div>
            </>
          }

          <div className="flex flex-col mx-4 my-2">
            <button
              className=" bg-red-500 rounded-xl py-2 "
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full m-4 max-tablet:m-0 ">
          <h1 className="text-center my-4 font-bold">ALL PRODUCTS</h1>
          <div className="grid grid-cols-4 gap-y-2 gap-x-2 max-md:grid-cols-1 max-laptop:grid-cols-2 max-desktop:grid-cols-3">
            {products ? (
              <ShowCard products={products} admin={false} />
            ) : (
              <div></div>
            )}
          </div>
          {products && products.length < total && (
            <div className="ms-2 mt-3">
              <div
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  // setPage(page+1);
                  setFilterPage(filterPage + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
