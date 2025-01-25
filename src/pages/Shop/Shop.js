import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ShopHeading from "./ShopHeadings";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/orebiSlice";

const ProductCard = ({ img, productName, price, product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="product-card text-center flex flex-col items-center mb-4">
      <img
        src={img || "path_to_default_image.jpg"}
        alt={productName}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3 className="mt-2 text-lg text-[#317248] font-bold">{productName}</h3>
      <p className="text-[#317248]">Rs.{price}</p>
      <button
        onClick={() => handleAddToCart(product)} // Pass the product here
        className="mt-3 px-4 py-2 bg-[#317248] text-white rounded-md hover:bg-[#2c613b] transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    organizeProducts(allProducts);
  }, [allProducts, sortOption]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  const fetchProducts = async () => {
    try {
      const { data: products } = await axios.get(
        "http://localhost:5000/api/products"
      );
      setAllProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const organizeProducts = (products) => {
    let categoryMap = {};
    products.forEach((product) => {
      const key = product.category.toLowerCase();
      if (categoryMap[key]) {
        categoryMap[key].push(product);
      } else {
        categoryMap[key] = [product];
      }
    });

    if (sortOption) {
      for (let key in categoryMap) {
        categoryMap[key] = categoryMap[key].sort((a, b) => {
          switch (sortOption) {
            case "a-z":
              return a.name.localeCompare(b.name);
            case "z-a":
              return b.name.localeCompare(a.name);
            case "high-low":
              return b.price - a.price;
            case "low-high":
              return a.price - b.price;
            default:
              return 0;
          }
        });
      }
    }

    setCategories(
      Object.keys(categoryMap).map((key) => ({
        name: key,
        products: categoryMap[key],
      }))
    );
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Shop" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <select
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
      >
        <option value="">Sort by</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="high-low">Price High-Low</option>
        <option value="low-high">Price Low-High</option>
      </select>

      {searchQuery ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                img={product.imageUrl || "path_to_default_image.jpg"}
                productName={product.name}
                price={product.price}
                product={product} 
              />
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      ) : (
        categories.map((category, index) => (
          <div key={index} className="mb-10">
            <ShopHeading heading={category.name.toUpperCase()} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.products.map((product) => (
                <ProductCard
                  key={product._id}
                  img={product.imageUrl || "path_to_default_image.jpg"}
                  productName={product.name}
                  price={product.price}
                  product={product} 
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Shop;
