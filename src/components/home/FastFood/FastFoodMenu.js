import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Heading from "../Products/Heading";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";  

const ProductCard = ({ img, productName, price, product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); 
  };

  return (
    <div className="product-card text-center flex flex-col items-center">
      <img 
        src={img || 'path_to_default_image.jpg'} 
        alt={productName}
        className="w-40 h-40 object-cover"
        style={{ width: '160px', height: '200px', objectFit: 'cover' }} 
      />
      <h3 className="mt-2 text-lg text-[#317248] font-bold">{productName}</h3>
      <p className="text-[#317248]">Rs.{price}</p>
      <button
        onClick={handleAddToCart} // Trigger Add to Cart when clicked
        className="mt-3 px-4 py-2 bg-[#317248] text-white rounded-md hover:bg-[#2c613b] transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

const FastFoodMenu = () => {
  const [fastFoods, setFastFoods] = useState([]);

  useEffect(() => {
    const fetchFastFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?category=fastfood');
        setFastFoods(response.data);
      } catch (error) {
        console.error('Failed to fetch fast food products:', error);
      }
    };

    fetchFastFoods();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16 mt-16">
      <Heading heading="Our Fast Food Menu" />
      <Slider {...settings}>
        {fastFoods.map(item => (
          <div className="px-2" key={item._id}>
            <ProductCard
              img={item.imageUrl || 'path_to_default_image.jpg'}
              productName={item.name}
              price={item.price}
              product={item} // Pass the product to ProductCard
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FastFoodMenu;
