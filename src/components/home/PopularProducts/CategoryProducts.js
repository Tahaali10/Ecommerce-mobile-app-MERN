import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";  // Import useDispatch
import { addToCart } from "../../../redux/orebiSlice"; // Import the action

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Dispatch the product to the cart
    };

    return (
        <div key={product._id} className="border rounded-md overflow-hidden shadow-sm bg-white">
            {product.imageUrl && (
                <img
                    src={product.imageUrl || 'default_product_image.jpg'} // Use default image if no image exists
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-md"
                />
            )}
            <div className="p-3 flex flex-col items-start">
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-3">Price: Rs. {product.price}</p>
                <button
                    onClick={handleAddToCart} // Trigger Add to Cart when clicked
                    className="mt-auto bg-[#317248] hover:bg-[#2c613b] text-white font-medium py-2 px-4 rounded-md w-full text-sm"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from the backend based on category
                const response = await axios.get(`http://localhost:5000/api/products?category=${categoryName}`);
                setProducts(response.data);
            } catch (error) {
                console.error(`Failed to fetch products for category ${categoryName}:`, error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-xl font-bold mb-4 text-center" style={{ textTransform: 'uppercase' }}>{categoryName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product} // Pass the entire product object
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
