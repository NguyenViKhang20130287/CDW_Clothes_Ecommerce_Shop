import React from "react";
import './ProductCardComponent.css'
import './Responsive.css'
import {Link, useNavigate} from "react-router-dom";

const ProductCardComponent = ({id, image, name, price, originPrice, discountRate}) => {
    let formattedPrice = price ? price.toLocaleString('vi-VN') : 'N/A';
    let formattedOriginPrice = originPrice ? originPrice.toLocaleString('vi-VN') : 'N/A';
    // console.log('DiscountRate: ', discountRate)
    return (

        <div className={'productCardItem'}>
            <Link to={`/product-detail/${id}`}>
                <div className={'itemImage'}>
                    <img src={image} alt={''}/>
                </div>
                {discountRate
                    &&
                    <div className={'discount-rate'}>
                        <span>-{discountRate}%</span>
                    </div>
                }

                <div className={'itemName'}>
                    <span title={name}>{name}</span>
                </div>
                <div className={'itemPrice'}>
                    <span className={'price'}>{formattedPrice + 'đ'}</span>
                    {originPrice && originPrice !== price ? <span className={'originPrice'}>{formattedOriginPrice + 'đ'}</span> : null}
                </div>
            </Link>
        </div>

    )
}

export default ProductCardComponent
