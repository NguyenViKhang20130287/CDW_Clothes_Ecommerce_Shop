import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartScreen.css';
import {useDispatch} from 'react-redux';
import {MdDeleteOutline} from "react-icons/md";
import {useSelector} from "react-redux";
import {clearCart, decreaseQuantity, deleteItem, increaseQuantity} from "../../../store/actions/cartActions";
import {Link, useNavigate} from "react-router-dom";

const CartScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.root.cart);
    const [canCheckout, setCanCheckout] = useState(true);

    const totalPrice = cartItems.reduce((total, item) => {
        let discountRate = 0;
        const currentDate = new Date().toISOString().split('T')[0];
        if (item.product.promotions && item.product.promotions.length > 0) {
            const promotionActive = item.product.promotions.filter(pro => pro.status && !pro.deleted)
            let length = promotionActive.length
            const promotionNewest = promotionActive[length - 1]
            if (promotionActive.length > 0) {
                if (promotionNewest.endDate > currentDate && promotionNewest.startDate < currentDate) {
                    discountRate = promotionNewest.discount_rate
                }
            } else discountRate = 0

        } else discountRate = 0
        const discountPrice = (item.product.price - (item.product.price * discountRate / 100));
        return total + (discountPrice * item.quantity);
    }, 0);
    const formattedTotalPrice = totalPrice.toLocaleString('vi-VN') + 'đ';

    useEffect(() => {
        const canCheckout = cartItems.every(item => {
            const selectedColorSize = item.product.colorSizes.find(colorSize =>
                colorSize.color.name === item.selectedColor && colorSize.size.name === item.selectedSize
            );

            return selectedColorSize && selectedColorSize.quantity >= item.quantity;
        });
        setCanCheckout(canCheckout);

        console.log('Cart item: ', cartItems)

    }, [cartItems]);

    const navigate = useNavigate()
    const handlePayment = (e) =>{
        localStorage.removeItem('productByNow')
        navigate('/order')
    }

    return (
        <div className={'cart-big-container'}>
            <div className={'container'}>
                <div className={'header-cart'}>
                    <h1>Giỏ hàng của bạn</h1>
                </div>
                <div>
                    {cartItems.length > 0 ?
                        <div>
                            <div className={'cart-container'}>
                                <div className="row column-title">
                                    <div className="col-5 col-sm-6 col-md-6 col-xl-6 product-title">
                                        <h3>Thông tin sản phẩm</h3>
                                    </div>
                                    <div className="col-3 col-sm-2 col-md-2 col-xl-2 price-title">
                                        <h3>Giá</h3>
                                    </div>
                                    <div className="col-3 col-sm-3 col-md-2 col-xl-2 quantity-title">
                                        <h3>Số lượng</h3>
                                    </div>
                                    <div className="col-1 col-sm-1 col-md-2 col-xl-2 cart-item delete-btn delete-all">
                                        <button onClick={() => dispatch(clearCart())}>
                                            <MdDeleteOutline/>
                                        </button>
                                    </div>
                                </div>
                                <div className="row product-value">
                                    <div className={'value-container'}>
                                        {cartItems.map((item, index) => {
                                            const selectedColorSize = item.product.colorSizes.find(colorSize =>
                                                colorSize.color.name === item.selectedColor && colorSize.size.name === item.selectedSize
                                            );

                                            let discountRate = 0;
                                            // if (item.product.productPromotions && item.product.productPromotions.length > 0) {
                                            //     discountRate = item.product.productPromotions[0].promotion.discount_rate;
                                            // }
                                            let price = item.product.price;
                                            let originPrice = 0;
                                            const currentDate = new Date().toISOString().split('T')[0];
                                            if (item.product.promotions && item.product.promotions.length > 0) {
                                                const promotionActive = item.product.promotions.filter(pro => pro.status && !pro.deleted)
                                                let length = promotionActive.length
                                                const promotionNewest = promotionActive[length - 1]
                                                if (promotionActive.length > 0) {
                                                    if (promotionNewest.endDate > currentDate && promotionNewest.startDate < currentDate) {
                                                        originPrice = item.product.price;
                                                        price = item.product.price - item.product.price * promotionNewest.discount_rate / 100;
                                                        discountRate = promotionNewest.discount_rate || ''
                                                    }
                                                } else discountRate = null

                                            } else discountRate = null
                                            const discountPrice = price
                                                // (item.product.price - (item.product.price * discountRate / 100));
                                            const formattedPrice = originPrice.toLocaleString('vi-VN') + 'đ'
                                                // item.product.price.toLocaleString('vi-VN') + 'đ';
                                            const formattedDiscountPrice = discountPrice.toLocaleString('vi-VN') + 'đ';
                                            return (
                                                <div className="col-12 col-sm-12 col-md-12 col-xl-12" key={index}>
                                                    <div className="row">
                                                        <div className="col-5 col-sm-6 col-md-6 col-xl-6 cart-item">
                                                            <div className="row">
                                                                <div
                                                                    className="col-4 col-sm-4 col-md-4 col-xl-3 main-image">
                                                                    <img src={item.product.thumbnail} alt="product"/>
                                                                </div>
                                                                <div
                                                                    className="col-8 col-sm-8 col-md-8 col-xl-9 color-size">
                                                                    <h4>{item.product.name}</h4>
                                                                    <p>Màu: {item.selectedColor}</p>
                                                                    <p>Size: {item.selectedSize}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-3 col-sm-2 col-md-2 col-xl-2 cart-item price">
                                                            <div className="price-container">
                                                                <h4>{item.product.productPromotions > 0 ? formattedPrice : formattedDiscountPrice}</h4>
                                                                {item.product.productPromotions && item.product.productPromotions.length > 0 ?
                                                                    <p>{formattedPrice}</p> : null}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-3 col-sm-3 col-md-2 col-xl-2 cart-item quantity">
                                                            <div
                                                                className="d-flex justify-content-between align-items-center">
                                                                <div className="decrease-btn">
                                                                    <button
                                                                        onClick={() => dispatch(decreaseQuantity(item.product, item.quantity, item.selectedColor, item.selectedSize, item.selectedColorSize))}>-
                                                                    </button>
                                                                </div>
                                                                <div className="quantity-index">
                                                                    <p>{item.quantity}</p>
                                                                </div>
                                                                <div className="increase-btn">
                                                                    <button
                                                                        onClick={() => dispatch(increaseQuantity(item.product, item.quantity, item.selectedColor, item.selectedSize, item.selectedColorSize))}>+
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className={'stock'}>Tồn
                                                                kho: {selectedColorSize.quantity}</p>
                                                        </div>
                                                        <div
                                                            className="col-1 col-sm-1 col-md-2 col-xl-2 cart-item delete-btn">
                                                            <button
                                                                onClick={() => dispatch(deleteItem(item.product, item.selectedColor, item.selectedSize))}>
                                                                <MdDeleteOutline/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            </div>
                            <div className={'row price-cart'}>
                                <div
                                    className="col-4 col-lg-4 col-12 col-md-8 offset-4 offset-md-4 offset-lg-8 offset-xl-8 total-container">
                                    <div className="cart__subtotal">
                                        <div className="total-title">Tổng tiền:</div>
                                        <div className="text-right cart__total total-price">
                                            <span className="total-span">{formattedTotalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="checkout">
                                        <button type="button" className="btn-checkout"
                                                id="btn-proceed-checkout" title="Thanh toán"
                                                disabled={!canCheckout}
                                                onClick={e=>handlePayment(e)}
                                        >
                                            {/*<Link to={'/order'}>*/}
                                                Thanh toán
                                            {/*</Link>*/}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className={'cart-empty'}>Hiện chưa có sản phẩm nào trong giỏ hàng</div>}
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
