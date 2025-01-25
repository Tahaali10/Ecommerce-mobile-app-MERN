import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLabelImportant } from "react-icons/md";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  // Handle navigation to product details page
  const handleProductDetails = () => {
    navigate(`/product/${product._id}`, {
      state: {
        item: product,
      },
    });
  };

  // Handle adding product to wishlist
  const handleWishList = () => {
    toast.success("Product added to wish list");
    setWishList([...wishList, product]);
    console.log(wishList);
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-hidden">
        <div onClick={handleProductDetails}>
          <img
            className="w-full h-full object-cover"
            src={product.imageUrl || 'path_to_default_image.jpg'} // Use product.imageUrl or a default placeholder
            alt={product.name}
          />
        </div>
        <div className="absolute top-6 left-8">
          {product.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              onClick={() => handleProductDetails()}
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              onClick={() => handleWishList()}
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {product.name}
          </h2>
          <p className="text-[#767676] text-[14px]">Rs. {product.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{product.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
