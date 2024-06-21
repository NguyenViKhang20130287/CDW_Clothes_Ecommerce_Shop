import React, { useState } from "react";

const ProductDetailContent = ({product}) => {
    const [selectedTab, setSelectedTab] = useState('MÔ TẢ SẢN PHẨM');
    const hasHTMLTags = /<[^>]*>/.test(product.content);

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <div className="col-12 col-lg-8">
            <div className="product-tab e-tabs not-dqtab">
                <ul className="tabs tabs-title clearfix">
                    <li className={`tab-link ${selectedTab === 'MÔ TẢ SẢN PHẨM' ? 'current' : ''}`}
                        onClick={() => handleTabClick('MÔ TẢ SẢN PHẨM')}> MÔ TẢ SẢN PHẨM</li>
                    <li className={`tab-link ${selectedTab === 'ĐÁNH GIÁ SẢN PHẨM' ? 'current' : ''}`}
                        onClick={() => handleTabClick('ĐÁNH GIÁ SẢN PHẨM')}> ĐÁNH GIÁ SẢN PHẨM</li>
                </ul>
                {selectedTab === 'MÔ TẢ SẢN PHẨM' && (
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
                                </p>
                                {hasHTMLTags ?
                                    <div dangerouslySetInnerHTML={{__html: product.content}} /> :
                                    <p>{product.content}</p>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailContent;
