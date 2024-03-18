import React, {useEffect, useRef, useState} from "react";
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import {Swiper, SwiperSlide} from 'swiper/react';
import bigslide1 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider1.webp';
import bigslide2 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider2.webp';
import bigslide3 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider3.webp';
import bigslide4 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider4.webp';
import bigslide5 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider5.webp';
import bigslide6 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider6.webp';
import bigslide7 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider7.webp';
import bigslide8 from '../../assets/img/ProductDetailSlider/BigSlider/BigSlider8.webp';


const ProductImage = () => {
    const bigSwiperRef = useRef(null);
    const miniSwiperRef = useRef(null);
    const [miniActiveIndex, setMiniActiveIndex] = useState(0);

    useEffect(() => {
        const bigSwiper = bigSwiperRef.current.swiper;
        const miniSwiper = miniSwiperRef.current.swiper;

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
    }, []);

    const handleMiniThumbClick = (index) => {
        bigSwiperRef.current.swiper.slideTo(index);
        setMiniActiveIndex(index);
    };

    return (
        <div className="product-detail-left product-images col-12 col-md-12 col-lg-8">
            <div className="product-image-detail relative">
                <div className="bigger-swiper swiper-container gallery-top margin-bottom-10 swiper-container-initialized swiper-container-horizontal" id="lightgallery">
                    <div className="swiper-container">
                        <Swiper ref={bigSwiperRef} navigation={true} modules={[Navigation]} className="big-swiper" >
                            <SwiperSlide><img src={bigslide1} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide2} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide3} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide4} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide5} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide6} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide7} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={bigslide8} alt=""/></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="mini-swiper swiper-container gallery-thumbs swiper-container-initialized swiper-container-horizontal swiper-container-thumbs">
                    <div className="swiper-wrapper">
                        <Swiper style={{"--swiper-navigation-size": "25px"}} ref={miniSwiperRef} breakpoints={{240: {slidesPerView: 4}, 575: {slidesPerView: 6}, 992:{slidesPerView: 7}}} navigation={true} modules={[Navigation]} className="small-swiper">
                            <SwiperSlide onClick={() => handleMiniThumbClick(0)} className={miniActiveIndex === 0 ? 'swiper-slide-active' : ''}><img src={bigslide1} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(1)} className={miniActiveIndex === 1 ? 'swiper-slide-active' : ''}><img src={bigslide2} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(2)} className={miniActiveIndex === 2 ? 'swiper-slide-active' : ''}><img src={bigslide3} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(3)} className={miniActiveIndex === 3 ? 'swiper-slide-active' : ''}><img src={bigslide4} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(4)} className={miniActiveIndex === 4 ? 'swiper-slide-active' : ''}><img src={bigslide5} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(5)} className={miniActiveIndex === 5 ? 'swiper-slide-active' : ''}><img src={bigslide6} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(6)} className={miniActiveIndex === 6 ? 'swiper-slide-active' : ''}><img src={bigslide7} alt=""/></SwiperSlide>
                            <SwiperSlide onClick={() => handleMiniThumbClick(7)} className={miniActiveIndex === 7 ? 'swiper-slide-active' : ''}><img src={bigslide8} alt=""/></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductImage;
