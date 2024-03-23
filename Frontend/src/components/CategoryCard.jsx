import React from "react";
import '../style/CategoryCard.css';

const CategoryCard=({name,imgSrc})=>{
    return(
        <div className="category_card">
            <p className="heading"><strong>{name}</strong></p>
            <img src={imgSrc} alt="" />

        </div>
    )
}

export default CategoryCard;