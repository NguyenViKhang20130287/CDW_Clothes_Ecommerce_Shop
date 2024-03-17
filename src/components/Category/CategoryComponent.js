import React from "react";
import ProductCardComponent from "../ProductCard/ProductCardComponent";
import './CategoryComponent.css'

const CategoryComponent = ({className, categoryName, image, name, price, originPrice}) =>{
    return(
        <div className={'categoryContainer'}>
            <h3 className={'title'}>{categoryName}</h3>
            <div className={className}>
                <ProductCardComponent
                image={image}
                name={name}
                price={price}
                originPrice={originPrice}/>
                <ProductCardComponent
                    image={image}
                    name={name}
                    price={price}
                    originPrice={originPrice}/>
                <ProductCardComponent
                    image={image}
                    name={name}
                    price={price}
                    originPrice={originPrice}/>
                <ProductCardComponent
                    image={image}
                    name={name}
                    price={price}
                    originPrice={originPrice}/>
                <ProductCardComponent
                    image={image}
                    name={name}
                    price={price}
                    originPrice={originPrice}/>
                <div className={'moreCard'}>
                    <span>Xem Thêm</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent