// CategoryCard.js
const CategoryCard = ({ img, categoryName, onClick,styles }) => {
    return (
        <div className="category-card text-center cursor-pointer" onClick={() => onClick(categoryName)}>
            <img
                src={img || 'default_category_image.jpg'}  
                alt={categoryName}
                style={styles}
                className="w-20 h-20 object-cover mx-auto rounded-full"
            />
            <h3 className="mt-5 text-sm font-semibold text-[#317248]">{categoryName}</h3>
        </div>
    );
};
export default CategoryCard;