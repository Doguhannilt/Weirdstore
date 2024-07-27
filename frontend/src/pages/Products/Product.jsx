import { Link } from "react-router-dom"




const Product = ({product}) => {
  return (
  
    <div className="w-[30rem]  p-3 relative">
          <div className="relative">
              <img
                  src={product.image}
                  alt={product.name}
                  className="w-[36rem] h-[30rem] rounded"
              />

          </div>      
    </div>
      
      
      
  )
}

export default Product