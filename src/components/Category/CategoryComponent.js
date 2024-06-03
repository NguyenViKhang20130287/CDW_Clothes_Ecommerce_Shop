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
            console.log('Check date: ', expiredDateValid(promotion.startDate, promotion.endDate))
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
    console.log('Products parent: ', listProduct)
    if (listProduct && listProduct.length > 0)
        checkPromotions(listProduct[0].promotions)

    return (
        <div className={'categoryContainer'}>
            <h3 className={'title'}>{title}</h3>
            <div className={'categoriesWrapper'}>
                {listProduct &&
                    listProduct.map((p, index) => {
                            let price = null
                            let originPrice = p.price
                            price = checkPromotions(p.promotions, originPrice, price)
                            const pr = p.promotions && p.promotions.length > 0
                                && p.promotions.find(promotion => promotion.status === true);
                            return (
                                <ProductCardComponent
                                    key={p.id}
                                    image={p.thumbnail}
                                    name={p.name}
                                    price={price}
                                    originPrice={originPrice}
                                    discountRate={pr.discount_rate}
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
