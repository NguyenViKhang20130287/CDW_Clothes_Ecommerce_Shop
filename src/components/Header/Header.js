import React, {useState} from "react";
// import {Link} from 'react-router-dom'
import LOGO from '../../assets/img/logo.webp'
import SHIRT_IMG from '../../assets/img/shirt1.webp'
// icons
import {IoCartOutline, IoSearchOutline, IoPersonOutline, IoCloseOutline} from "react-icons/io5";
import {HiBars3BottomLeft} from "react-icons/hi2";
// css
import './Header.css'
// components
import ProductCard from "../ProductCard/ProductCard";
import {Link} from "react-router-dom";

const Header = () => {
    const [searchPopupShowStatus, setSearchPopupShowStatus] = useState(false)
    const [sidebarToggleStatus, setSidebarToggleStatus] = useState(false)

    const handleShowHideSearch = (e) => {
        e.preventDefault()
        if (searchPopupShowStatus === false)
            setSearchPopupShowStatus(true)
        else setSearchPopupShowStatus(false)
    }

    const handleToggleSidebar = (e) => {
        e.preventDefault()
        if (sidebarToggleStatus === false)
            setSidebarToggleStatus(true)
        else setSidebarToggleStatus(false)
    }

    return (
        <div className={'main'}>
            <div className={'headerContainer'}>
                <div className={`searchPopup ${searchPopupShowStatus ? 'searchPopupShow' : ''}`}>
                    <div className={'searchWrapper'}>
                        <button className={'closeBtn'}
                                onClick={event => handleShowHideSearch(event)}>
                            <IoCloseOutline/>
                        </button>
                        <h3 className={'searchTitle'}>TÌM KIẾM</h3>
                        <div className={'searchInput'}>
                            <input placeholder={'Tìm kiếm sản phẩm...'}/>
                            <button className={'searchBtn'} type={'button'}>Tìm kiếm</button>
                        </div>
                        <div className={'searchResult'}>
                            <div className={'searchResultList'}>
                                {/*<ProductCard image={SHIRT_IMG}*/}
                                {/*             name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}*/}
                                {/*             price={'150.000'}*/}
                                {/*             originPrice={'350.000'}/>*/}
                                {/*<ProductCard image={SHIRT_IMG}*/}
                                {/*             name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}*/}
                                {/*             price={'150.000'}*/}
                                {/*             originPrice={'350.000'}/>*/}
                                {/*<ProductCard image={SHIRT_IMG}*/}
                                {/*             name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}*/}
                                {/*             price={'150.000'}*/}
                                {/*             originPrice={'350.000'}/>*/}
                                {/*<ProductCard image={SHIRT_IMG}*/}
                                {/*             name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}*/}
                                {/*             price={'150.000'}*/}
                                {/*             originPrice={'350.000'}/>*/}
                                {/*<ProductCard image={SHIRT_IMG}*/}
                                {/*             name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}*/}
                                {/*             price={'150.000'}*/}
                                {/*             originPrice={'350.000'}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`sidebarPopupResponsive ${sidebarToggleStatus ? 'sidebarResponsiveToggle' : ''}`}>
                    <button className={'closeBtn'}
                            onClick={event => handleToggleSidebar(event)}
                    >
                        <IoCloseOutline/>
                    </button>
                    <h3 className={'title'}>Danh mục</h3>
                    <div className={'sidebarWrapper'}>
                        <div className={'categoriesWrapper'}>
                            <div className={'categoryItem'}>
                                <span>Tất cả sản phẩm</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo thun</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Baby Tee</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo polo</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo sơ mi</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo khoác</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Hoodie</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Quần</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Quần nữ</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Phụ kiện</span>
                            </div>
                        </div>
                        <div className={'sideBarItem'}>
                            <span>Đổi trả</span>
                        </div>
                        <div className={'sideBarItem'}>
                            <span>Bảng size</span>
                        </div>
                    </div>
                </div>
                <div className={'headerWrapper'}>
                    <div className={'leftContentResponsive'}>
                        <button className={'sideBar'}
                                onClick={event => handleToggleSidebar(event)}>
                            <HiBars3BottomLeft className={'icon'}/>
                        </button>
                    </div>
                    <div className={'leftContent'}>
                        <Link to={'/'} className={'home'}>TRANG CHỦ</Link>
                        <span className={'warranty'}>ĐỔI TRẢ</span>
                    </div>
                    <div className={'centerContent'}>
                        <div className={'imageLogoWrapper'}>
                            <img src={LOGO} alt={''}/>
                        </div>
                    </div>
                    <div className={'rightContent'}>
                        <span className={'sizeTable'}>BẢNG SIZE</span>
                        <div className={'groupBtn'}>
                            <button className={'btnIcons'} id={'searchBtn'} type={"button"}
                                    onClick={e => handleShowHideSearch(e)}>
                                <IoSearchOutline className={'icons'}/>
                            </button>
                            <button className={'btnIcons'} type={"button"}>
                                <IoCartOutline className={'icons'}/>
                            </button>
                            <Link to={'/login'} className={'btnIcons'}>
                                <IoPersonOutline className={'icons'}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'categoriesContainer'}>
                <div className={'categoriesWrapper'}>
                    <div className={'categoryItem'}>
                        <span>Tất cả sản phẩm</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo thun</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Baby Tee</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo polo</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo sơ mi</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo khoác</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Hoodie</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Quần</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Quần nữ</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Phụ kiện</span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Header;