import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../../redux/api/productApiSlice'
import {
  setCategories,
  setProducts,
  setChecked
} from '../../redux/features/shop/shopSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import ProductCard from "../Products/ProductCard"

const Shop = () => {

  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop)
  const categoriesQuery = useFetchCategoriesQuery()
  const [priceFilter, setPriceFilter] = useState('')
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  })
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])


  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
          )
        })



        dispatch(setProducts(filteredProducts))
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
    dispatch(setProducts(productsByBrand))
  }

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked?.filter((c) => c !== id)
    dispatch(setChecked(updatedChecked))
  }

  const uniqueBrands = [
    ...Array.from(
      new Set(filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined))
    )
  ]

  const handlePriceChange = e => {
    setPriceFilter(e.target.value)
  }

  return (
    <>
      <div className="container mx-auto ml-40 text-black  ">
        <div className="flex md:flex-row">
          <div className="p-3 mt-2 mb-2">
            <h2 className="h4 text-center font-bold text-2xl py-2 rounded-full mb-2">
              Filter By Categories
            </h2>
            <div className="p-5 w-[15rem] ">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div
                    className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={e => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 border-blac border border-black rounded focus:ring-pink-500 dark:focus:ring-pink-600 "
                    />

                    <label
                      className="ml-2 text-sm font-medium text-black text-bold dark:text-gray-300"
                      htmlFor="pink-checkbox">
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h1 className="h4 text-center  text-black  font-bold py-2 rounded-full mb-2">
              Filter by Brands
            </h1>
            <div className="p-5">
              {uniqueBrands.length > 0 ? (
                uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mr-4 mb-5 ">
                    <input
                      onChange={() => handleBrandClick(brand)}
                      name='brand'
                      id={brand}
                      type="radio"
                      className="w-4 h-4 text-blue-600 border border-black b rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
                    />
                    <label
                      htmlFor={brand}
                      className="ml-2 text-sm font-medium text-black">
                      {brand}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-black">There are no brands available.</p>
              )}
            </div>
            <h2 className="h2 h4 text-center py-2 bg-blue-400 text-gray-300 hover:bg-blue-500 duration-300 cursor-pointer rounded-full mb-2">
              Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg"
                onChange={handleBrandClick}
                value={priceFilter}
                placeholder="Enter Price"
                type="text" />
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={() => window.location.reload()}
                className="w-full border my-4 text-pretty text-xl font-normal ">
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="text-3xl text-center font-mono font-bold mb-2">
              {products?.length} Products
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? 'No Products' : products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Shop