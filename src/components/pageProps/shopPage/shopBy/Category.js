import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        console.log("API Data:", data); // Log raw data from the API
    
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        console.log("Unique Categories:", uniqueCategories); // Log the processed categories
    
        setCategories(uniqueCategories.map(category => ({ name: category })));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-primeColor hover:border-gray-400 duration-300"
              onClick={() => handleCategoryClick(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
