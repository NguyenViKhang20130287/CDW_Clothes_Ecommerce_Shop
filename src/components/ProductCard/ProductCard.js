import React from "react";
import './ProductCard.css'

const ProductCard = ({image, name, price, originPrice}) => {
    return (
        <div className={'searchResultItem'}>
            <div className={'itemImage'}>
                <img src={image} alt={''}/>
            </div>
            <div className={'itemName'}>
                <span>{name}</span>
            </div>
            <div className={'itemPrice'}>
                <span className={'price'}>{price}đ</span>
                <span className={'originPrice'}>{originPrice}đ</span>
            </div>
        </div>
    )
}

export default ProductCard