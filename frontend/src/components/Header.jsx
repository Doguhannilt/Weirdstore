import { useGetTopProductsQuery } from "../redux/api/productApiSlice"



const Header = () => {

    const { data, isLoading, error } = useGetTopProductsQuery()
    
    console.log(data)

  return (
    <div></div>
  )
}

export default Header