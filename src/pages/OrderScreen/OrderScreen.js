import React from "react";
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
                        <article className={'animate-floating-labels row'}>
                            <div className="col col-two">
                                <section className="section">
                                    <div className="section__header">
                                        <div className="layout-flex">
                                            <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                                <i className="fa fa-id-card-o fa-lg section__title--icon hide-on-desktop"></i>
                                                Thông tin nhận hàng
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section__content">
                                        <div className="fieldset">
                                            <div className="field field--show-floating-label">
                                                <div className="field__input-wrapper">
                                                    <label htmlFor="customer-address" className="field__label">Sổ
                                                        địa chỉ</label>
                                                    <select size="1" className="field__input field__input--select"
                                                            id="customer-address" data-bind="customerAddress">
                                                        <option value="0">Địa chỉ khác...</option>
                                                        <option data-name="Nguyễn Huy Hiệp"
                                                                data-address="Ký túc xá khu B Đại học Quốc Gia Hồ Chí Minh"
                                                                data-phone="0869687410" data-province="2"
                                                                data-district="47" data-ward="9240">
                                                            Nguyễn Huy Hiệp, Ký túc xá khu B Đại học Quốc Gia Hồ Chí
                                                            Minh, Phường Linh Trung, Quận Thủ Đức, TP Hồ Chí Minh
                                                        </option>

                                                    </select>
                                                    <div className="field__caret">
                                                        <i className="fa fa-caret-down"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="field "
                                                 data-bind-class="{'field--show-floating-label': billing.name}">
                                                <div className="field__input-wrapper">
                                                    <label htmlFor="billingName" className="field__label">Họ và
                                                        tên</label>
                                                    <input name="billingName" id="billingName" type="text"
                                                           className="field__input" data-bind="billing.name"
                                                           value=""/>
                                                </div>

                                            </div>

                                            <div className="field">
                                                <div className="field__input-wrapper field__input-wrapper--connected">
                                                    <label htmlFor="billingPhone" className="field__label">
                                                        Số điện thoại
                                                    </label>
                                                    <input name="billingPhone" id="billingPhone" type="tel"
                                                           className="field__input" data-bind="billing.phone"
                                                           value=""/>
                                                </div>

                                            </div>
                                            <div className="field">
                                                <div className="field__input-wrapper">
                                                    <label htmlFor="billingAddress" className="field__label">
                                                        Địa chỉ
                                                    </label>
                                                    <input name="billingAddress" id="billingAddress" type="text"
                                                           className="field__input" data-bind="billing.address"
                                                           value=""/>
                                                </div>

                                            </div>
                                            <div className="field field--show-floating-label ">
                                                <div className="field__input-wrapper field__input-wrapper--select2">
                                                    <label htmlFor="billingProvince" className="field__label">Tỉnh
                                                        thành</label>
                                                    <select name="billingProvince" id="billingProvince" size="1"
                                                            className="field__input field__input--select select2-hidden-accessible"
                                                            tabIndex="-1" aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="1">Hà Nội</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="field field--show-floating-label ">
                                                <div className="field__input-wrapper field__input-wrapper--select2">
                                                    <label htmlFor="billingDistrict" className="field__label">
                                                        Quận huyện
                                                    </label>
                                                    <select name="billingDistrict" id="billingDistrict" size="1"
                                                            className="field__input field__input--select select2-hidden-accessible"
                                                            value="47" data-bind="billing.district"
                                                            data-address-type="district" data-address-zone="billing"
                                                            data-select2-id="select2-data-billingDistrict"
                                                            tabIndex="-1" aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="30">Quận 1</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="field field--show-floating-label ">
                                                <div className="field__input-wrapper field__input-wrapper--select2">
                                                    <label htmlFor="billingWard" className="field__label">
                                                        Phường xã
                                                    </label>
                                                    <select name="billingWard" id="billingWard" size="1"
                                                            className="field__input field__input--select select2-hidden-accessible"
                                                            value="9240" data-bind="billing.ward"
                                                            data-address-type="ward" data-address-zone="billing"
                                                            data-select2-id="select2-data-billingWard" tabIndex="-1"
                                                            aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="9238">Phường Linh Xuân</option>
                                                        <option value="9239">Phường Bình Chiểu</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="fieldset">
                                    <h3 className="visually-hidden">Ghi chú</h3>
                                    <div className="field">
                                        <div className="field__input-wrapper">
                                            <label htmlFor="note" className="field__label">
                                                Ghi chú (tùy chọn)
                                            </label>
                                            <textarea name="note" id="note" className="field__input"
                                                      data-bind="note"></textarea>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col col-two">
                                <section className="section" data-define="{shippingMethod: '643555_0,20.000 VND'}">
                                    <div className="section__header">
                                        <div className="layout-flex">
                                            <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                                <i className="fa fa-truck fa-lg section__title--icon hide-on-desktop"></i>
                                                Vận chuyển
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section__content" data-tg-refresh="refreshShipping"
                                         id="shippingMethodList">
                                        <div className="alert alert-retry alert--danger hide">
                                            <span data-bind="loadingShippingErrorMessage">Không thể load phí vận chuyển. Vui lòng thử lại</span>
                                            <i className="fa fa-refresh"></i>
                                        </div>


                                        <div className="content-box">
                                            <div className="content-box__row"
                                                 data-define-array="{shippingMethods: {name: '643555_0,20.000 VND', textPrice: '20.000đ', textDiscountPrice: '-', subtotalPriceWithShippingFee: '760.000đ'}}">
                                                <div className="radio-wrapper">
                                                    <div className="radio__input">
                                                        <input type="radio" className="input-radio"
                                                               name="shippingMethod" id="shippingMethod-643555_0"
                                                               value="643555_0,20.000 VND"
                                                               data-bind="shippingMethod"/>
                                                    </div>
                                                    <label htmlFor="shippingMethod-643555_0"
                                                           className="radio__label">
														<span className="radio__label__primary">
															<span>Giao hàng thông thường</span>
														</span>
                                                        <span className="radio__label__accessory">
															<span className="content-box__emphasis price">
																20.000đ
															</span>
														</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="alert alert--info hide">
                                            Vui lòng nhập thông tin giao hàng
                                        </div>
                                    </div>
                                </section>
                                <section className="section">
                                    <div className="section__header">
                                        <div className="layout-flex">
                                            <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                                <i className="fa fa-credit-card fa-lg section__title--icon hide-on-desktop"></i>
                                                Thanh toán
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section__content">
                                        <div className="content-box" data-define="{paymentMethod: undefined}">
                                            <div className="content-box__row">
                                                <div className="radio-wrapper">
                                                    <div className="radio__input">
                                                        <input name="paymentMethod" id="paymentMethod-491325"
                                                               type="radio" className="input-radio"
                                                               data-bind="paymentMethod" value="491325"
                                                               data-provider-id="4"/>
                                                    </div>
                                                    <label htmlFor="paymentMethod-491325" className="radio__label">
                                                        <span className="radio__label__primary">Thanh toán khi giao hàng (COD)</span>
                                                        <span className="radio__label__accessory">
															<span className="radio__label__icon">
																<i className="payment-icon payment-icon--4"></i>
															</span>
														</span>

                                                    </label>
                                                </div>

                                                <div className="content-box__row__desc hide"
                                                     data-bind-show="paymentMethod == 491325" data-provider-id="4">
                                                    <p>Bạn sẽ thanh toán khi nhận được hàng</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </article>
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
                                                        <label className="field-label">Nhập mã
                                                            giảm giá</label>
                                                        <input className={'field-input'} name="reductionCode"
                                                               id="reductionCode" type="text"/>
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
