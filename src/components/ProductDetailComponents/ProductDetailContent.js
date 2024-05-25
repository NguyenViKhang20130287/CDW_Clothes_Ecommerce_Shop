import React from "react";

const ProductDetailContent = ({product}) => {
    return (
        <div className="col-12 col-lg-8">
            <div className="product-tab e-tabs not-dqtab">
                <ul className="tabs tabs-title clearfix">
                    <li className="tab-link current" data-tab="tab-1"> MÔ TẢ SẢN PHẨM</li>
                    <li className="tab-link" data-tab="tab-3"> ĐÁNH GIÁ SẢN PHẨM</li>
                </ul>
                <div className="tab-1 tab-content content_extab current">
                    <div className="rte product_getcontent">
                        <div className="ba-text-fpt">
                            <p>
                                <style>
                                    {`
                                    td {
                                        border: 1px solid #cccccc;
                                    }
                                    br {
                                        mso-data-placement: same-cell;
                                    }
                                `}
                                </style>
                                Thông tin sản phẩm:<br/>
                                - Chất liệu:&nbsp;Birdseye<br/>
                                - Form: Oversize<br/>
                                - Màu sắc:&nbsp;Trắng/Đen<br/>
                                - Thiết kế: Thêu và in<br/>
                                <br/>
                                {product.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailContent;
