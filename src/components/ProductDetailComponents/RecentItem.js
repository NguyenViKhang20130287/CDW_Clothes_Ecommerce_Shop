import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import ProductCard2Component from "./ProductCard2Component";
import {useSelector} from "react-redux";
const RecentItem = () => {
    const viewedProducts = useSelector(state => state.root.viewed);
    // console.log(viewedProducts);
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
                            {viewedProducts && viewedProducts.map((item) => ( // Map over the viewed array
                                <SwiperSlide key={item.id}>
                                    <ProductCard2Component product={item}></ProductCard2Component>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentItem;
