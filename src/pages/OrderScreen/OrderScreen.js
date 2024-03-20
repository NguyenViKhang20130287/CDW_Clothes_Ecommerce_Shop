import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import "./OrderScreen.css";
import img from "../../assets/img/ProductDetailSlider/BigSlider/BigSlider2.webp";
import {Link} from "react-router-dom";

const OrderScreen = () => {
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
            discount: 25,
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
            discount: 3,
            quantity: 4
        }
    ];
    return (

        <>
            <HeaderComponent/>
            <div className="container">
                <div className={'order-wrap'}>
                    <div className={'order-main'}>
                        hsss
                        sss
                    </div>
                    <div className={'order-aside'}>
                        <div className={'sidebar-header'}>
                            <h2 className="sidebar-title">
                                Đơn hàng (2 sản phẩm)
                            </h2>
                        </div>
                        <div className={'sidebar-content'}>
                            <div className={'order-summary-sections'}>
                                <div className={'order-summary-section'}>
                                    <table className={'product-table'}>
                                        <thead className={'table-header'}>
                                        <tr>
                                            <td className={'visually-hidden'}>Ảnh sản phẩm</td>
                                            <th className={'visually-hidden'}>Mô tả</th>
                                            <th className={'visually-hidden'}>Số lượng</th>
                                            <th className={'visually-hidden'}>Đơn giá</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            fakeProduct.map((product, index) => {
                                                const discountPrice = (product.price - (product.price * product.discount / 100));
                                                const formattedDiscountPrice = discountPrice.toLocaleString('vi-VN') + 'đ';
                                                return (
                                                    <tr key={index}>
                                                        <td className={'order-product-image'}>
                                                            <div className={'order-product-thumbnail'}>
                                                                <div className={'product-thumbnail-wrapper'}>
                                                                    <img src={product.image} alt
                                                                         className={'product-thumbnail-image'}/>
                                                                </div>
                                                                <span
                                                                    className={'product-thumbnail-quantity'}>{product.quantity}</span>
                                                            </div>
                                                        </td>
                                                        <th className={'order-product-description'}>
                                                                <span className={'product-description-name'}>
                                                                    {product.name}
                                                                </span>
                                                            <span className={'product-description-property'}>
                                                                    {product.color} / {product.size}
                                                                </span>
                                                        </th>
                                                        <th className={'visually-hidden'}>
                                                            <em>Số lượng: </em>
                                                            {product.quantity}
                                                        </th>
                                                        <td className={'product-price'}>
                                                            {formattedDiscountPrice}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>

                                    </table>
                                </div>
                                <div className={'order-summary-section'}>
                                    <div className={'edit-checkout'}>
                                        <div className="fieldset">
                                            <div className="field">
                                                <div className="field-input-btn-wrapper">
                                                    <div className="field-input-wrapper">
                                                        <label  className="field-label">Nhập mã
                                                            giảm giá</label>
                                                        <input className={'field-input'} name="reductionCode" id="reductionCode" type="text"/>
                                                    </div>
                                                    <button className="field-input-btn btn spinner btn-disabled"
                                                            type="button">
                                                        <span className="spinner-label">Áp dụng</span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className={'order-summary-section'}>
                                    <table className={'total-line-table'}>
                                        <thead>
                                        <tr>
                                            <td><span className={'visually-hidden'}>Mô tả</span></td>
                                            <td><span className={'visually-hidden'}>Giá tiền</span></td>
                                        </tr>
                                        </thead>
                                        <tbody className={'total-line-table-tbody'}>
                                        <tr className={'total-line total-line-subtotal'}>
                                            <th className='total-line-name'>
                                                Tạm tính
                                            </th>
                                            <td className={'total-line-price'}>370.000đ</td>
                                        </tr>
                                        <tr className={'total-line total-line-shipping-fee'}>
                                            <th className={'total-line-name'}>
                                                Phí vận chuyển
                                            </th>
                                            <td className={'total-line-price'}
                                                data-bind="getTextShippingPrice()">20.000đ
                                            </td>
                                        </tr>

                                        </tbody>
                                        <tfoot className={'total-line-table-footer'}>
                                        <tr className={'total-line payment-due'}>
                                            <th className={'total-line-name'}>
													<span className={'payment-due-label-total'}>
														Tổng cộng
													</span>
                                            </th>
                                            <td className={'total-line-price'}>
                                                <span className={'payment-due-price'}>390.000đ</span>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className={'order-summary-section'}>
                                    <div className={'order-summary-nav'}>
                                        <button type="submit" className="btn btn-checkout spinner">
                                            <span className="spinner-label">ĐẶT HÀNG</span>
                                        </button>
                                        <Link className="previous-link" to={'/cart'}>
                                            <i className="previous-link-arrow">❮</i>
                                            <span className="previous-link-content">Quay về giỏ hàng</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </>
    );
}

export default OrderScreen;
