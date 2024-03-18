import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCard2Component from "../ProductCard/ProductCard2Component";
import {Navigation} from "swiper/modules";
const RecentItem = () => {
    return (
        <div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 section-recent-view-product">
                <div className="section_prd_feature swiper_related recent-page-viewed">
                    <div className="block-title">
                        <h2>Sản phẩm đã xem</h2>
                    </div>
                    <div
                        className="products product_related recent-viewed swiper-container swiper-container-initialized swiper-container-horizontal">
                        <Swiper slidesPerView={4} spaceBetween={20} navigation={true} modules={[Navigation]} style={{"--swiper-navigation-size": "25px"}}>
                            <SwiperSlide>
                                <ProductCard2Component></ProductCard2Component>
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductCard2Component></ProductCard2Component>
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductCard2Component></ProductCard2Component>
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductCard2Component></ProductCard2Component>
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductCard2Component></ProductCard2Component>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentItem;
