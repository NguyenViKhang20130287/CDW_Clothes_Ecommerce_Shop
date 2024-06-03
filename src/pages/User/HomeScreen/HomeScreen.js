import React, {useEffect, useState} from "react";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from "react-router-dom";
// com
import CategoryComponent from "../../../components/Category/CategoryComponent";

// images
import SLIDER_1 from '../../../assets/slider/slider_1.webp'
import SLIDER_2 from '../../../assets/slider/slider_2.webp'
import SLIDER_3 from '../../../assets/slider/slider_3.webp'
import SLIDER_4 from '../../../assets/slider/slider_4.webp'
import SLIDER_5 from '../../../assets/slider/slider_5.webp'
import SHIRT_IMG from '../../../assets/img/shirt1.webp'
import FEEDBACK_1 from '../../../assets/findoutmore/feedback_1.webp'
import FEEDBACK_2 from '../../../assets/findoutmore/feedback_2.webp'
import FEEDBACK_3 from '../../../assets/findoutmore/feedback_3.webp'
import FEEDBACK_4 from '../../../assets/findoutmore/feedback_4.webp'
import FEEDBACK_5 from '../../../assets/findoutmore/feedback_5.webp'
import FEEDBACK_6 from '../../../assets/findoutmore/feedback_6.webp'
import FEEDBACK_7 from '../../../assets/findoutmore/feedback_7.webp'
import FEEDBACK_8 from '../../../assets/findoutmore/feedback_8.webp'
// css
import './HomeScreen.css'
import ApiService from "../../../services/APIService";

const HomeScreen = () => {
    const images = [SLIDER_1, SLIDER_2, SLIDER_3, SLIDER_4, SLIDER_5]
    const imagesFeedback = [FEEDBACK_1, FEEDBACK_2, FEEDBACK_3, FEEDBACK_4,
        FEEDBACK_5, FEEDBACK_6, FEEDBACK_7, FEEDBACK_8]
    const [products, setProducts] = useState(null)

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    const fetchDataTop5ProductNewest = async () => {
        try {
            const res = await new ApiService().fetchData("/product/top-7-newest")
            setProducts(res)
        } catch (error) {
            console.log('Err fetch top 5: ', error)
        }
    }

    useEffect(() => {
        fetchDataTop5ProductNewest()
    }, []);

    return (
        <div className={'homeContainer'}>
            {/**/}
            <div className={'homeWrapper'}>
                <Slider {...settings} className={'sliderWrapper'}>
                    {images.map((item, index) => (
                        <div className={'slider'} key={index}>
                            <img src={item} alt={`Slider ${index}}`}/>
                        </div>
                    ))}
                </Slider>
                {/**/}
                <div className={'descriptionWrapper'}>
                    <div className={'description'}>
                        <h3 className={'title'}>Enjoy Your Youth!</h3>
                        <p className={'content'}>
                            Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và
                            cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm
                            vui vẻ, năng động và trẻ trung.
                        </p>
                    </div>
                </div>
                {/**/}
                <CategoryComponent
                    className={'categoriesWrapper'}
                    isHome={true}
                    title={'Sản Phẩm Mới Nhất'}
                    image={SHIRT_IMG}
                    name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}
                    price={'185.000'}
                    originPrice={'350.000'}
                    products={products}
                />
                {/**/}
                <CategoryComponent
                    className={'categoriesWrapper'}
                    categoryName={'Sản Phẩm Bán Chạy'}
                    image={SHIRT_IMG}
                    name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}
                    price={'185.000'}
                    originPrice={'350.000'}/>

                {/**/}
                <div className={'findOutMoreWrapper'}>
                    <div className={'title'}>Find out TEELAB more</div>
                    <div className={'images'}>
                        {imagesFeedback.map((item, index) => (
                            <Link to={'#'} className={'imageWrapper'} key={index}>
                                <img src={item} alt={''}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
