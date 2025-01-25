// src/components/FilterDropdown.js
import React from 'react';

const FilterDropdown = ({ filter, setFilter, categories, subCategories }) => {
  return (
    <div className="flex space-x-2">
      <select
        name="category"
        value={filter.category}
        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        className="w-1/4 p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="subCategory"
        value={filter.subCategory}
        onChange={(e) => setFilter({ ...filter, subCategory: e.target.value })}
        className="w-1/4 p-2 border rounded"
      >
        <option value="">All Subcategories</option>
        {subCategories.map((subCategory, index) => (
          <option key={index} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
