import React from "react";
import './ProductCardComponent.css'

const ProductCardComponent = ({image, name, price, originPrice}) => {
    let formattedPrice = price ? price.toLocaleString('vi-VN') : 'N/A';
    let formattedOriginPrice = originPrice ? originPrice.toLocaleString('vi-VN') : 'N/A';
    return (
        <div className={'productCardItem'}>
            <div className={'itemImage'}>
                <img src={image} alt={''}/>
            </div>
            <div className={'itemName'}>
                <span>{name}</span>
            </div>
            <div className={'itemPrice'}>
                <span className={'price'}>{formattedPrice + 'đ'}</span>
                {originPrice ? <span className={'originPrice'}>{formattedOriginPrice + 'đ'}</span> : null}
            </div>
        </div>
    )
}

export default ProductCardComponent
