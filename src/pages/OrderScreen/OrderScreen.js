import React, {useState} from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import "./OrderScreen.css";
import img from "../../assets/img/ProductDetailSlider/BigSlider/BigSlider2.webp";
import {Link} from "react-router-dom";
import {MdOutlinePayment} from "react-icons/md";

const OrderScreen = () => {
    const [focusedField, setFocusedField] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);

    const handlePaymentMethodClick = () => {
        setIsPaymentMethodSelected(!isPaymentMethodSelected);
    };

    const handleFocus = (event) => {
        setFocusedField(event.target.name);
    };

    const handleBlur = (event) => {
        if (event.target.value === '') {
            setFocusedField('');
        }
    };

    const handleChange = (event) => {
        if (event.target.name === 'billingName') {
            setName(event.target.value);
        }
        if (event.target.name === 'billingPhone') {
            setPhone(event.target.value);
        }
        if (event.target.name === 'billingAddress') {
            setAddress(event.target.value);
        }
        if (event.target.name === 'note') {
            setNote(event.target.value);
        }
        if (event.target.name === 'billingProvince') {
            setProvince(event.target.value);
        }
        if (event.target.name === 'billingDistrict') {
            setDistrict(event.target.value);
        }
        if (event.target.name === 'billingWard') {
            setWard(event.target.value);
        }
    };
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
                                    <div className="section-header">
                                        <div className="layout-flex">
                                            <h2 className="section-title">
                                                Thông tin nhận hàng
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section-content">
                                        <div className="fieldset">
                                            <div className="field field--show-floating-label">
                                                <div className="field-input-wrapper">
                                                    <label htmlFor="customer-address" className="field-label">Sổ
                                                        địa chỉ</label>
                                                    <select size="1" className="field-input field-input-select"
                                                            id="customer-address">
                                                        <option value="0">Địa chỉ khác...</option>
                                                        <option data-name="Nguyễn Huy Hiệp"
                                                                data-address="Ký túc xá khu B Đại học Quốc Gia Hồ Chí Minh"
                                                                data-phone="0869687410" data-province="2"
                                                                data-district="47" data-ward="9240">
                                                            Nguyễn Huy Hiệp, Ký túc xá khu B Đại học Quốc Gia Hồ Chí
                                                            Minh, Phường Linh Trung, Quận Thủ Đức, TP Hồ Chí Minh
                                                        </option>

                                                    </select>
                                                </div>
                                            </div>

                                            <div
                                                className={`field ${name ? 'field--show-floating-label' : ''}`}
                                                onFocus={handleFocus} onBlur={handleBlur}>
                                                <div className="field-input-wrapper">
                                                    <label htmlFor="billingName" className="field-label">Họ và
                                                        tên</label>
                                                    <input onChange={handleChange} value={name} name="billingName"
                                                           id="billingName" type="text"
                                                           className="field-input"/>
                                                </div>
                                            </div>

                                            <div
                                                className={`field ${phone ? 'field--show-floating-label' : ''}`}
                                                onFocus={handleFocus} onBlur={handleBlur}>
                                                <div className="field-input-wrapper field-input-wrapper-connected">
                                                    <label htmlFor="billingPhone" className="field-label">
                                                        Số điện thoại
                                                    </label>
                                                    <input onChange={handleChange} name="billingPhone" id="billingPhone"
                                                           type="tel"
                                                           className="field-input"
                                                           value={phone}/>
                                                </div>

                                            </div>
                                            <div
                                                className={`field ${address ? 'field--show-floating-label' : ''}`}
                                                onFocus={handleFocus} onBlur={handleBlur}>
                                                <div className="field-input-wrapper">
                                                    <label htmlFor="billingAddress" className="field-label">
                                                        Địa chỉ
                                                    </label>
                                                    <input onChange={handleChange} name="billingAddress" id="billingAddress" type="text"
                                                           className="field-input"
                                                           value={address}/>
                                                </div>

                                            </div>
                                            <div className="field field--show-floating-label ">
                                                <div className="field-input-wrapper field-input-wrapper--select2">
                                                    <label htmlFor="billingProvince" className="field-label">Tỉnh
                                                        thành</label>
                                                    <select onChange={handleChange} name="billingProvince" id="billingProvince" size="1"
                                                            className="field-input field-input-select select2-hidden-accessible"
                                                            tabIndex="-1" aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="1">Hà Nội</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="field field--show-floating-label ">
                                                <div className="field-input-wrapper field-input-wrapper-select2">
                                                    <label htmlFor="billingDistrict" className="field-label">
                                                        Quận huyện
                                                    </label>
                                                    <select onChange={handleChange} name="billingDistrict" id="billingDistrict" size="1"
                                                            className="field-input field-input-select select2-hidden-accessible"
                                                            tabIndex="-1" aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="30">Quận 1</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="field field--show-floating-label ">
                                                <div className="field-input-wrapper field-input-wrapper-select2">
                                                    <label htmlFor="billingWard" className="field-label">
                                                        Phường xã
                                                    </label>
                                                    <select onChange={handleChange} name="billingWard" id="billingWard" size="1"
                                                            className="field-input field-input-select select2-hidden-accessible"
                                                            tabIndex="-1" aria-hidden="true">
                                                        <option value="" hidden="">---</option>
                                                        <option value="9238">Phường Linh Xuân</option>
                                                        <option value="9239">Phường Bình Chiểu</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="order-note">
                                    <h3 className="visually-hidden">Ghi chú</h3>
                                    <div
                                        className={`field ${note ? 'field--show-floating-label' : ''}`}
                                        onFocus={handleFocus} onBlur={handleBlur}>
                                        <div className="field-input-wrapper">
                                            <label htmlFor="note" className="field-label">
                                                Ghi chú (tùy chọn)
                                            </label>
                                            <textarea onChange={handleChange} name="note" id="note" className="field-input"
                                                      value={note}></textarea>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col col-two two">
                                <section className="section" data-define="{shippingMethod: '643555_0,20.000 VND'}">
                                    <div className="section-header">
                                        <div className="layout-flex">
                                            <h2 className="section-title layout-flex-item layout-flex-item-stretch">
                                                <i className="fa fa-truck fa-lg section-title-icon hide-on-desktop"></i>
                                                Vận chuyển
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section-content" data-tg-refresh="refreshShipping"
                                         id="shippingMethodList">
                                        <div className="alert alert-retry alert-danger hide">
                                            <span data-bind="loadingShippingErrorMessage">Không thể load phí vận chuyển. Vui lòng thử lại</span>
                                            <i className="fa fa-refresh"></i>
                                        </div>
                                        <div className="content-box">
                                            <div
                                                className={`content-box-row ${province && district && ward ? '' : 'hide'}`}>
                                                <div className="radio-wrapper">
                                                    <div className="radio-input">
                                                        <input type="radio" className="input-radio"/>
                                                    </div>
                                                    <label className="radio-label">
														<span className="radio-label-primary">
															<span>Giao hàng thông thường</span>
														</span>
                                                        <span className="radio-label-accessory">
															<span className="content-box-emphasis price">
																20.000đ
															</span>
														</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`alert alert-info ${province && district && ward ? 'hide' : ''}`}>
                                            Vui lòng nhập thông tin giao hàng
                                        </div>
                                    </div>
                                </section>
                                <section className="section">
                                    <div className="section-header">
                                        <div className="layout-flex">
                                            <h2 className="section-title layout-flex-item layout-flex-item-stretch">
                                                <i className="fa fa-credit-card fa-lg section-title-icon hide-on-desktop"></i>
                                                Thanh toán
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="section-content">
                                        <div className="content-box" data-define="{paymentMethod: undefined}">
                                            <div className="content-box-row">
                                                <div className="radio-wrapper">
                                                    <div className="radio-input">
                                                        <input onClick={handlePaymentMethodClick} name="paymentMethod" id="paymentMethod-491325"
                                                               type="radio" className="input-radio"
                                                               data-bind="paymentMethod" value="491325"
                                                               data-provider-id="4"/>
                                                    </div>
                                                    <label htmlFor="paymentMethod-491325" className="radio-label">
                                                        <span className="radio-label-primary">Thanh toán khi giao hàng (COD)</span>
                                                        <span className="radio-label-accessory">
															<span className="radio-label-icon">
                                                                <MdOutlinePayment
                                                                    className={'payment-icon payment-icon--4'}></MdOutlinePayment>
															</span>
														</span>

                                                    </label>
                                                </div>

                                                <div className={`content-box-row-desc ${isPaymentMethodSelected ? '' : 'hide'}`}
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
                                                                    <img src={product.image} alt=""
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
