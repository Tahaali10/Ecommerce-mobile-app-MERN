// src/components/AdminPanel.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../redux/dashboardSlice';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import FilterDropdown from './FilterDropdown';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.dashboard);
  const [editProduct, setEditProduct] = useState(null); // Keep track of the product to edit
  const [filter, setFilter] = useState({ category: '', subCategory: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Extract unique categories and subcategories from products
  const categories = [...new Set(products.map((product) => product.category))];
  const subCategories = [...new Set(products.map((product) => product.subcategory))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddOrUpdateProduct = (product) => {
    const action = editProduct ? updateProduct({ id: editProduct._id, updatedData: product }) : addProduct(product);
    dispatch(action)
      .unwrap()
      .then(response => {
        console.log(`${editProduct ? 'Update' : 'Add'} successful:`, response);
        if (!editProduct) {
          dispatch(fetchProducts()); // Re-fetch products to ensure immediate update
        }
        setEditProduct(null); // Reset editProduct after adding/updating
      })
      .catch(error => console.error(`Failed to ${editProduct ? 'update' : 'add'} product:`, error));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(response => console.log('Delete successful:', response))
      .catch(error => console.error('Failed to delete product:', error));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product); // Set the product to edit
  };

  const filteredProducts = products.filter((product) =>
    (filter.category ? product.category === filter.category : true) &&
    (filter.subCategory ? product.subcategory === filter.subCategory : true) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <FilterDropdown 
        filter={filter} 
        setFilter={setFilter} 
        categories={categories}  // Pass categories to the dropdown
        subCategories={subCategories}  // Pass subcategories to the dropdown
      />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mt-2 border rounded"
      />
      <ProductForm onSubmit={handleAddOrUpdateProduct} editProduct={editProduct} />
      <ProductList
        products={filteredProducts}
        onEdit={handleEditProduct} // Pass the edit handler
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default AdminPanel;
