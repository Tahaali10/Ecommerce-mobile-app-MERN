import React from "react";
import CategoryCard from "./CategoryCard";
import Heading from "../Products/Heading";
import { useNavigate } from "react-router-dom";
import icon1 from "../../../assets/images/icon/grocery.png";
import icon2 from "../../../assets/images/icon/beverages.png";
import icon3 from "../../../assets/images/icon/meat.png";
import icon4 from "../../../assets/images/icon/tuckshop.png";
import icon5 from "../../../assets/images/icon/fruitAndVeg.png";
import icon6 from "../../../assets/images/icon/fastfood.png";
import icon7 from "../../../assets/images/icon/stationary.png";
import icon8 from "../../../assets/images/icon/beauty.png";

const categories = [
    { name: "grocery", img: icon1 },
    { name: "beverages", img: icon2 },
    { name: "frozen", img: icon3 },
    { name: "Tuck shop", img: icon4 },
    { name: "fruit", img: icon5 },
    { name: "fastfood", img: icon6 },
    { name: "stationary", img: icon7 },
    { name: "Beauty", img: icon8 }
];

const PopularProducts = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`);  
    };

    const imageStyles = {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '50%'
    };

    return (
        <div className="w-full pb-20">
            <Heading heading="Popular Categories" />
            <div className="grid grid-cols-3 gap-5">
                {categories.map(category => (
                    <CategoryCard
                        key={category.name}
                        img={category.img}
                        categoryName={category.name}
                        onClick={handleCategoryClick}
                        styles={imageStyles}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
