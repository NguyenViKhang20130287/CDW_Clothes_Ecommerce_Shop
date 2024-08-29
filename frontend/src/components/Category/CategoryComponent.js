import React, {useEffect, useState} from "react";
import moment from 'moment'
import ProductCardComponent from "../ProductCard/ProductCardComponent";
import './CategoryComponent.css'
import {Link} from "react-router-dom";

const CategoryComponent = ({products, title, isHome}) => {

    const [listProduct, setListProduct] = useState(null)

    const expiredDateValid = (startDate, endDate) => {
        const currentDate = moment();
        const start = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
        const end = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
        return currentDate.isBetween(start, end, 'minutes', '[]');
    }
    const checkPromotions = (promotions, originPrice, price) => {
        if (promotions && promotions.length > 0) {
            const promotion = promotions.find(promotion => promotion.status === true);
            if (expiredDateValid(promotion.startDate, promotion.endDate)) {
                price = originPrice * ((100 - promotion.discount_rate) / 100)
            } else {
                price = originPrice
            }
        } else price = originPrice
        return price
    }


    useEffect(() => {
        setListProduct(products)
    }, [products]);

    return (
        <div className={'categoryContainer'}>
            <h3 className={'title'}>{title}</h3>
            <div className={'categoriesWrapper'}>
                {listProduct &&
                    listProduct.map((product, index) => {

                            let price = product.price;
                            let originPrice = null;
                            const currentDate = new Date().toISOString().split('T')[0];
                            let discountRate
                            if (product.promotions && product.promotions.length > 0) {
                                const promotionActive = product.promotions.filter(pro => pro.status && !pro.deleted)
                                // console.log('Promotions: ', promotionActive)
                                let length = promotionActive.length
                                // console.log('Length: ', length)
                                // console.log('Promotion newest: ', promotionActive[length - 1])
                                const promotionNewest = promotionActive[length - 1]
                                if (promotionActive.length > 0) {
                                    if (promotionNewest.endDate > currentDate && promotionNewest.startDate < currentDate) {
                                        originPrice = product.price;
                                        price = product.price - product.price * promotionNewest.discount_rate / 100;
                                        discountRate = promotionNewest.discount_rate || ''
                                    }
                                } else discountRate = null

                            } else discountRate = null
                            return (
                                <ProductCardComponent
                                    key={product.id}
                                    id={product.id}
                                    image={product.thumbnail}
                                    name={product.name}
                                    price={price}
                                    originPrice={originPrice}
                                    discountRate={discountRate}
                                />
                            )
                        }
                    )
                }

                {isHome &&
                    <Link to={'/category/all'} className={'moreCard'}>
                        <span>Xem Thêm</span>
                    </Link>
                }
            </div>
        </div>
    )
}

export default CategoryComponent
