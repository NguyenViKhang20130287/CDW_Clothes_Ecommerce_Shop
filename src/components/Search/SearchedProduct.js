import React from "react";
import './SearchedProduct.css'

const SearchedProduct = ({image, name}) => {
    return (
        <div className={'search-item'}>
            <div className={'search-img'}>
                <img src={image} alt={''}/>
            </div>
            <div className={'search-name'}>
                <span>{name}</span>
            </div>
        </div>
    )
}

export default SearchedProduct
