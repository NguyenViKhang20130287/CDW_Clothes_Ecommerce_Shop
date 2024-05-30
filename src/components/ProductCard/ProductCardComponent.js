import React from "react";
import './ProductCardComponent.css'
import {Link, useNavigate} from "react-router-dom";

const ProductCardComponent = ({id, image, name, price, originPrice}) => {
    let formattedPrice = price ? price.toLocaleString('vi-VN') : 'N/A';
    let formattedOriginPrice = originPrice ? originPrice.toLocaleString('vi-VN') : 'N/A';
    return (

        <div className={'productCardItem'}>
            <Link to={`/product-detail/${id}`}>
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
            </Link>
        </div>

    )
}

export default ProductCardComponent
