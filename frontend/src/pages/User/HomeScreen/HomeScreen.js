import React, {useEffect, useState} from "react";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from "react-router-dom";
// com
import CategoryComponent from "../../../components/Category/CategoryComponent";

// images
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
    const [sliders, setSliders] = useState(null)
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

    const fetchSlider = async () => {
        try {
            const res = await new ApiService().fetchData("/slider")
            const activeSliders = res.content.filter(slider => slider.status === true);
            setSliders(activeSliders);
        } catch (error) {
            console.log('Err fetch slider: ', error)
        }
    }

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
        fetchSlider()
    }, []);

    return (
        <div className={'homeContainer'}>
            {/**/}
            <div className={'homeWrapper'}>
                <Slider {...settings} className={'sliderWrapper'}>
                    {sliders && sliders.map((slider, index) => (
                        <div className={'slider'} key={index}>
                            <img src={slider.link} alt={`Slider ${index}}`}/>
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
                    products={products}
                />

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
