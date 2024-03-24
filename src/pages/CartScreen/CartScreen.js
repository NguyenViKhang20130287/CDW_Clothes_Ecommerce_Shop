import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartScreen.css';
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import img from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider2.webp';
import {MdDeleteOutline} from "react-icons/md";

const CartScreen = () => {

    const [cartItems, setCartItems] = useState([]);
    const fakeProduct = [
        {
            id: 1,
            name: 'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228',
            image: img,
            color: 'Đen',
            size: 'M',
            price: 123000,
            discount: 47,
            quantity: 1
        },
        {
            id: 2,
            name: 'Áo Thun Teelab Local Brand Unisex JR Baseball Tshirt TS227',
            image: img,
            color: 'Trắng',
            size: 'L',
            price: 200000,
            discount: 20,
            quantity: 2
        },
        {
            id: 3,
            name: 'Áo Thun Teelab Local Brand Unisex Cat on Animal Planet Tshirt TS230',
            image: img,
            color: 'Xanh lá',
            size: 'S',
            price: 300000,
            discount: 20,
            quantity: 10
        },
        {
            id: 4,
            name: 'Áo Thun Teelab Local Brand Unisex Las Vegas Tshirt TS226',
            image: img,
            color: 'Xanh dương',
            size: 'XL',
            price: 400000,
            discount: 0,
            quantity: 4
        }
    ];

    useEffect(() => {
        setCartItems(fakeProduct);
    }, []);
    const handleIncreaseQuantity = (item) => {
        // handle increase quantity
    };

    const handleDecreaseQuantity = (item) => {
        // handle decrease quantity
    };

    const handleDeleteItem = (item) => {
        // handle delete item
    };

    return (
        <div className={'big-container'}>
            <HeaderComponent/>
            <div className={'container'}>
                <div className={'header-cart'}>
                    <h1>Giỏ hàng của bạn</h1>
                </div>
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
                        <div className="col-1 col-sm-1 col-md-2 col-xl-2">
                        </div>
                    </div>
                    <div className="row product-value">
                        <div className={'value-container'}>
                            {cartItems.map((item, index) => {
                                const discountPrice = (item.price - (item.price * item.discount / 100));
                                const formattedPrice = item.price.toLocaleString('vi-VN') + 'đ';
                                const formattedDiscountPrice = discountPrice.toLocaleString('vi-VN') + 'đ';
                                return (
                                    <div className="col-12 col-sm-12 col-md-12 col-xl-12" key={index}>
                                        <div className="row">
                                            <div className="col-5 col-sm-6 col-md-6 col-xl-6 cart-item">
                                                <div className="row">
                                                    <div className="col-4 col-sm-4 col-md-4 col-xl-3 main-image">
                                                        <img src={item.image} alt="product"/>
                                                    </div>
                                                    <div className="col-8 col-sm-8 col-md-8 col-xl-9 color-size">
                                                        <h4>{item.name}</h4>
                                                        <p>Màu: {item.color}</p>
                                                        <p>Size: {item.size}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 col-sm-2 col-md-2 col-xl-2 cart-item price">
                                                <div className="price-container">
                                                    <h4>{item.discount > 0 ? formattedDiscountPrice : formattedPrice}</h4>
                                                    {item.discount > 0 && <p>{formattedPrice}</p>}
                                                </div>
                                            </div>
                                            <div className="col-3 col-sm-3 col-md-2 col-xl-2 cart-item quantity">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="decrease-btn">
                                                        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                                    </div>
                                                    <div className="quantity-index">
                                                        <p>{item.quantity}</p>
                                                    </div>
                                                    <div className="increase-btn">
                                                        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-1 col-sm-1 col-md-2 col-xl-2 cart-item delete-btn">
                                                <button onClick={() => handleDeleteItem(item)}><MdDeleteOutline/>
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
                    <div className="col-4 col-lg-4 col-12 col-md-8 offset-4 offset-md-4 offset-lg-8 offset-xl-8 total-container">
                        <div className="cart__subtotal">
                            <div className="total-title">Tổng tiền:</div>
                            <div className="text-right cart__total total-price">
                                <span className="total-span">750.000đ</span>
                            </div>
                        </div>
                        <div className="checkout">
                            <button type="button" className="btn-checkout"
                                    id="btn-proceed-checkout" title="Thanh toán">Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default CartScreen;
