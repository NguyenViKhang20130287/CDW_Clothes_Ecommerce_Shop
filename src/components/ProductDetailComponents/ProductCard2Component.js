import React from "react";
import "../../assets/style/RecentItem.css";

const ProductCard2Component = ({product}) => {
    if (!product) {
        return <div>Loading...</div>; // or your custom spinner
    }
    let discountRate = null;
    let promotion = null; // Define promotion here
    const currentDate = new Date();
    if (product.productPromotions && product.productPromotions.length > 0) {
        promotion = product.productPromotions[0].promotion;
        const startDate = new Date(promotion.start_date);
        const endDate = new Date(promotion.end_date);

        if (promotion.status && currentDate >= startDate && currentDate <= endDate) {
            discountRate = `- ${promotion.discount_rate}%`;
        }
    }

    const secondImage = product.imageProducts && product.imageProducts.length > 0
        ? product.imageProducts[0].link
        : null;

    let priceWithDiscount;
    if (promotion) {
        const discount = typeof promotion.discount_rate === 'number'
            ? promotion.discount_rate / 100
            : parseFloat(promotion.discount_rate) / 100;
        priceWithDiscount = product.price - (product.price * discount);
    }

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    return (
        <div>
            <div className="item_product_main viewed"
                 data-url="/ao-thun-teelab-local-brand-unisex-baseball-jersey-shirt-ts228">
                <form action="/cart/add" method="post"
                      className="variants product-action wishItem MultiFile-intercepted"
                      data-cart-form=""
                      encType="multipart/form-data">
                    <div className={`product-thumbnail ${discountRate ? 'sale' : ''}`} data-sale={discountRate}>
                        <a className="image_thumb"
                           href="/public"
                           title={product.title}>
                            <div className="product-image">
                                <img className="lazy loaded"
                                     src={product.thumbnail}
                                     alt={product.title}
                                     data-was-processed="true"/>
                            </div>
                            <div className="product-image second-image">
                                <img className="lazy loaded"
                                     src= {secondImage}
                                     alt={product.title}
                                     data-was-processed="true"/>
                            </div>
                        </a>
                    </div>
                    <div className="product-info">
                        <h3 className="product-name"><a
                            href="/public"
                            title={product.name}>
                            {product.name}</a></h3>
                        <div className="bottom-action">
                            <div className="price-box">
                                <span className="price">{discountRate ? `${formatVND(priceWithDiscount)}` : `${formatVND(product.price)}`}</span>
                                {discountRate && <span className="compare-price">{formatVND(product.price)}</span>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductCard2Component;
