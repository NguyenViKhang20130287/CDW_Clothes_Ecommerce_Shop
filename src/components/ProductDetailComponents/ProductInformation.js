import React from "react";
import policy1 from "../../assets/img/ProductDetailSlider/Policy/product_poli_1.webp";
import policy2 from "../../assets/img/ProductDetailSlider/Policy/product_poli_3.webp";
import color1 from "../../assets/img/ProductDetailSlider/BigSlider/BigSlider2.webp";
import color2 from "../../assets/img/ProductDetailSlider/BigSlider/BigSlider4.webp";
import cup from "../../assets/img/ProductDetailSlider/Policy/cup.webp";

const ProductInformation = () => {
    return (
        <div className="col-12 col-md-12 col-lg-4 details-pro">
            <div className="wrapright-content">
                <h1 className="title-head">Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228</h1>
            </div>
            <div className="group-power">
                <div className="inventory_quantity d-none">
                    <span className="a-stock a1">
                        <span className="a-stock">Còn hàng</span>
                    </span>
                </div>
                <div className="price-box clearfix">
                    <span className="special-price">
                        <span className="price product-price">185.000đ</span>
                    </span>
                    <span className="old-price">
                        <del className="price product-price-old">350.000đ</del>
                    </span>
                    <span className="save-price">-
                        <span className="price product-price-save">47%</span>
                    </span>
                </div>
            </div>
            <div className="product-policy">
                <div className="item">
                    <img src={policy1} alt=""></img>Đổi trả dễ dàng
                </div>
                <div className="item">
                    <img src={policy1} alt=""></img>Chính hãng 100%
                </div>
                <div className="item">
                    <img src={policy2} alt=""></img>Giao toàn quốc
                </div>
            </div>
            <a href="" className="product-banchay">
                <b><img src={cup}
                        alt="Top bán chạy"/>Top bán chạy</b>
                <span>Sản phẩm bán chạy nhất</span>
            </a>
            <div className="product-summary rte">
                <p>Thông tin sản phẩm:<br/>
                    - Chất liệu:&nbsp;Birdseye<br/>
                    - Form: Oversize<br/>
                    - Màu sắc:&nbsp;Trắng/Đen<br/>
                    - Thiết kế: Thêu và in</p>
            </div>
            <form encType="multipart/form-data" id="add-to-cart-form" action=""
                  className="wishItem MultiFile-intercepted" method="post">
                <div className="form-product">
                    <div className="select-swatch">
                        <div className="swatch-color swatch clearfix" data-option-index="0">
                            <div className="options-title">Màu sắc: <span className="var">Trắng</span></div>
                            <div data-value="Trắng" className="swatch-element color trang available">
                                <input id="swatch-0-trang" type="radio" name="option-0" value="Trắng" checked=""/>
                                <label htmlFor="swatch-0-trang" title="Trắng"
                                       style={{
                                           backgroundImage: `url(${color1})`,
                                           backgroundSize: '32px',
                                           backgroundRepeat: 'no-repeat',
                                           backgroundPosition: 'center'
                                       }}>
                                </label>

                            </div>
                            <div data-value="Đen" className="swatch-element color trang available">
                                <input id="swatch-0-trang" type="radio" name="option-1" value="Đen" checked=""/>
                                <label htmlFor="swatch-0-trang" title="Đen"
                                       style={{
                                           backgroundImage: `url(${color2})`,
                                           backgroundSize: '32px',
                                           backgroundRepeat: 'no-repeat',
                                           backgroundPosition: 'center'
                                       }}>
                                </label>

                            </div>
                        </div>
                        <div className=" swatch clearfix" data-option-index="1">
                            <div className="options-title">Kích thước:
                                <span className="var"> M</span></div>
                            <div data-value="M" className="swatch-element m available">
                                <input id="swatch-1-m" type="radio" name="option-1" value="M" checked=""/>
                                <label title="M" htmlFor="swatch-1-m">
                                    <span>M</span>
                                </label>
                            </div>
                            <div data-value="L" className="swatch-element l available">
                                <input id="swatch-1-l" type="radio" name="option-1" value="L"/>

                                <label title="L" htmlFor="swatch-1-l">
                                    <span>L</span>
                                </label>
                            </div>
                            <div data-value="XL" className="swatch-element xl available">
                                <input id="swatch-1-xl" type="radio" name="option-1" value="XL"/>
                                <label title="XL" htmlFor="swatch-1-xl">
                                    <span>XL</span>
                                </label>
                            </div>
                            <div className="size-guide-box size-popup ">
                                + Hướng dẫn chọn size
                            </div>
                        </div>
                    </div>
                    <div className="clearfix from-action-addcart">
                        <div className="qty-ant clearfix custom-btn-number">
                            <label>Số lượng</label>
                            <div className="custom custom-btn-numbers clearfix input_number_product">
                                <button
                                    // var result = document.getElementById('qty'); var qty = result.value; if( !isNaN(qty) &amp; qty > 1 ) result.value--;return false;
                                    onClick=""
                                    className="btn-minus btn-cts" type="button">–
                                </button>
                                <input aria-label="Số lượng" type="text" className="qty input-text" id="qty"
                                       name="quantity" size="4" value="1" maxLength="3"
                                    // if ( isNaN(this.value + String.fromCharCode(event.keyCode) )) return false;
                                       onKeyPress=""
                                       onChange="if(this.value == 0)this.value=1;"/>
                                <button
                                    // var result = document.getElementById('qty'); var qty = result.value; if( !isNaN(qty)) result.value++;return false;
                                    onClick=""
                                    className="btn-plus btn-cts" type="button">+
                                </button>
                            </div>
                            <div className="inventory_quantity">
                                <span className="a-stock"><span className="a-stock">Còn hàng</span></span>
                            </div>
                        </div>
                        <div className="btn-mua">
                            <button type="submit" data-role="addtocart"
                                    className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart">Thêm vào giỏ
                            </button>
                            <button type="button" className="btn btn-lg btn-gray btn_buy btn-buy-now">Mua ngay</button>

                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}
export default ProductInformation;
