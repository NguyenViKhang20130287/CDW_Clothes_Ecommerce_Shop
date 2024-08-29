import React, { useEffect, useRef, useState } from "react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductImage = ({ product }) => {
    const bigSwiperRef = useRef(null);
    const miniSwiperRef = useRef(null);
    const [miniActiveIndex, setMiniActiveIndex] = useState(0);

    useEffect(() => {
        const bigSwiper = bigSwiperRef.current?.swiper;
        const miniSwiper = miniSwiperRef.current?.swiper;

        if (bigSwiper && miniSwiper) {
            const handleBigSlideChange = () => {
                const activeIndex = bigSwiper.realIndex;
                miniSwiper.slideTo(activeIndex);
                setMiniActiveIndex(activeIndex);
            };

            const handleMiniSlideChange = () => {
                const activeIndex = miniSwiper.realIndex;
                bigSwiper.slideTo(activeIndex);
                setMiniActiveIndex(activeIndex);
            };

            bigSwiper.on('slideChange', handleBigSlideChange);
            miniSwiper.on('slideChange', handleMiniSlideChange);

            return () => {
                bigSwiper.off('slideChange', handleBigSlideChange);
                miniSwiper.off('slideChange', handleMiniSlideChange);
            };
        }
    }, []);

    const handleMiniThumbClick = (index) => {
        bigSwiperRef.current.swiper.slideTo(index);
        setMiniActiveIndex(index);
    };

    if (!product || !product.thumbnail || !product.imageProducts) {
        return null;
    }

    const slides = [product.thumbnail, ...product.imageProducts.map(img => img.link)];

    return (
        <div className="product-detail-left product-images col-12 col-md-12 col-lg-8">
            <div className="product-image-detail relative">
                <div className="bigger-swiper swiper-container gallery-top margin-bottom-10 swiper-container-initialized swiper-container-horizontal" id="lightgallery">
                    <Swiper ref={bigSwiperRef} navigation={true} modules={[Navigation]} className="big-swiper">
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}><img src={slide} alt={`Slide ${index}`} /></SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="mini-swiper swiper-container gallery-thumbs swiper-container-initialized swiper-container-horizontal swiper-container-thumbs">
                    <Swiper
                        ref={miniSwiperRef}
                        slidesPerView={6}
                        spaceBetween={10}
                        watchSlidesProgress
                        className="small-swiper"
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                onClick={() => handleMiniThumbClick(index)}
                                className={miniActiveIndex === index ? 'swiper-slide-thumb-active' : ''}
                            >
                                <img src={slide} alt={`Thumbnail ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default ProductImage;
