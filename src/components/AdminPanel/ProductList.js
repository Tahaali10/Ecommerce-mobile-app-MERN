const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      {products.map((product) => (
        <div key={product._id} className="flex items-center justify-between p-2 border-b">
          {product.imageUrl && (
            <img
            src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1 ml-4">
            <h2 className="font-semibold">{product.name}</h2>
            <p>Price: <span style={{ fontWeight: "500", marginLeft: "5px" }}>Rs. {product.price}</span></p>
            <p>Category: <span style={{ fontWeight: "500", marginLeft: "5px" }}>{product.category}</span></p>
            <p>Subcategory: <span style={{ fontWeight: "500", marginLeft: "5px" }}>{product.subcategory}</span></p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(product)} 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );  
};

export default ProductList;
