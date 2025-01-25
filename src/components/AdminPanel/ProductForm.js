import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ onSubmit, editProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        const uniqueCategories = new Set();
        const uniqueSubcategories = new Set();

        data.forEach(product => {
          uniqueCategories.add(product.category);
          uniqueSubcategories.add(product.subcategory);
        });

        setCategories([...uniqueCategories]);
        setSubcategories([...uniqueSubcategories]);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch product details for category and subcategory fields');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (editProduct) {
      setIsEditing(true);
      setName(editProduct.name || '');
      setPrice(editProduct.price || '');
      setCategory(editProduct.category || '');
      setSubcategory(editProduct.subcategory || '');
      setImage(null);
    } else {
      resetForm();
    }
  }, [editProduct]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    if (image) formData.append('image', image);

    onSubmit({
      ...editProduct,
      name, 
      price, 
      category, 
      subcategory, 
      image 
    });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setSubcategory('');
    setImage(null);
    setError('');
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Price input */}
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Category input with datalist */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
            list="category-list"
          />
          <datalist id="category-list">
            {categories.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
        </div>
        {/* Subcategory input with datalist */}
        <div className="mb-4">
          <label className="block text-gray-700">Subcategory</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
            list="subcategory-list"
          />
          <datalist id="subcategory-list">
            {subcategories.map((sub, index) => (
              <option key={index} value={sub} />
            ))}
          </datalist>
        </div>
        {/* Image input */}
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
