import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
//
import LOGO from '../../assets/img/logo.webp'
import AVATAR_DEFAULT from '../../assets/img/user.png'
// icons
import {IoCartOutline, IoSearchOutline, IoPersonOutline, IoCloseOutline} from "react-icons/io5";
import {HiBars3BottomLeft} from "react-icons/hi2";
// css
import './HeaderComponent.css'
// components
import ProductCardComponent from "../ProductCard/ProductCardComponent";
// services
import APIService from "../../services/APIService";

const HeaderComponent = () => {
    const [searchPopupShowStatus, setSearchPopupShowStatus] = useState(false)
    const [sidebarToggleStatus, setSidebarToggleStatus] = useState(false)
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [totalQuantity, setTotalQuantity] = useState(0);
    const cartItems = useSelector(state => state.root.cart);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [categories, setCategories] = useState(null)
    let isExpired = false;

    const handleShowHideSearch = (e) => {
        e.preventDefault()
        if (searchPopupShowStatus === false)
            setSearchPopupShowStatus(true)
        else setSearchPopupShowStatus(false)
    }

    const fetchAvatar = async () => {
        if (token) {
            try {
                const data =
                    await new APIService().fetchData("/user/user-details", null, {token: token});
                setAvatar(data.userInformation.avatar);
            } catch (error) {
                if (!isExpired){
                    localStorage.removeItem('token');
                    toast.error('Phiên đăng nhập đã hết hạn !');
                    isExpired = true
                    navigate('/');
                }
            }
        }
    }

    useEffect(() => {
        fetchAvatar();
    }, [token])

    const handleInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }
    const findProduct = async () => {
        if (searchKeyword.trim() === '') {
            setSearchResult([]);
        } else {
            try {
                const searchResult =
                    await new APIService().fetchData(`/product/search?name=${searchKeyword}`);
                setSearchResult(searchResult);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        }
    }
    useEffect(() => {
        findProduct();
    }, [searchKeyword])


    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);


    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate('/search', {state: {keyword: searchKeyword}});
            setSearchPopupShowStatus(false);
        }
    };
    const handleToggleSidebar = (e) => {
        e.preventDefault()
        if (sidebarToggleStatus === false)
            setSidebarToggleStatus(true)
        else setSidebarToggleStatus(false)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        toast.success('Tài khoản đã đăng xuất')
        navigate('/')
    }


// fetch data cate
    const fetchDataCategoryIsActive = async () => {
        try {
            const res = await new APIService().fetchData("/category/active")
            // console.log(res)
            setCategories(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataCategoryIsActive();

    }, []);

    useEffect(() => {
        // Kiểm tra nếu categories null thì fetch lại
        if (categories === null) {
            fetchDataCategoryIsActive();
        }
    }, [categories]);

//
    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(newTotalQuantity);

        //
    }, [cartItems]);

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
                            <input placeholder={'Tìm kiếm sản phẩm...'}
                                   value={searchKeyword}
                                   onChange={handleInputChange}
                                   onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                            <button className={'searchBtn'} type={'button'} onClick={handleSearch}>Tìm kiếm</button>
                        </div>
                        <div className={'searchResult'}>
                            <div className={'searchResultList'}>
                                {searchResult.slice(0, 7).map((product, index) => {
                                    let price = product.price;
                                    let originPrice = null;

                                    if (product.promotions && product.promotions.length > 0) {
                                        originPrice = product.price;
                                        price = product.price - product.price * product.promotions[0].discount_rate / 100;
                                    }
                                    return (
                                        <ProductCardComponent
                                            key={index}
                                            image={product.thumbnail}
                                            name={product.name}
                                            price={price}
                                            originPrice={originPrice}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/**/}
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
                {/**/}

                <div className={'headerWrapper'}>
                    <div className={'leftContentResponsive'}>
                        <button className={'sideBar'}
                                onClick={event => handleToggleSidebar(event)}>
                            <HiBars3BottomLeft className={'icon'}/>
                        </button>
                    </div>
                    <div className={'leftContent'}>
                        <Link to={'/'} className={'home'}>TRANG CHỦ</Link>
                        <span className={'warranty'}>
                            <Link to={'/exchange'}>ĐỔI TRẢ</Link>
                        </span>
                    </div>
                    <div className={'centerContent'}>
                        <div className={'imageLogoWrapper'}>
                            <Link to={'/'}>
                                <img src={LOGO} alt={'logo'}/>
                            </Link>
                        </div>
                    </div>
                    <div className={'rightContent'}>
                        <span className={'sizeTable'}>
                            <Link to={'/size-selector'}>BẢNG SIZE</Link>
                        </span>
                        <div className={'groupBtn'}>
                            <button className={'btnIcons'} id={'searchBtn'} type={"button"}
                                    onClick={e => handleShowHideSearch(e)}>
                                <IoSearchOutline className={'icons'}/>
                            </button>
                            <button className={'btnIcons'} type={"button"}>
                                <Link to={'/cart'}>
                                    <IoCartOutline className={'icons'}/>
                                    <span className={'cart-quantity'}>{totalQuantity}</span>
                                </Link>
                            </button>
                            {token ?
                                (avatar ?
                                        <div className={'avatarIcon'}>
                                            <div className={'avatarIconWrapper'}>
                                                <img src={avatar} alt={''}/>
                                            </div>
                                            <div className={'avatarOption'}>
                                                <Link to={'/account-detail'} className={'myAccountLink'}>
                                                    Tài khoản của tôi
                                                </Link>
                                                <button
                                                    className={'logoutBtn'}
                                                    onClick={e => handleLogout(e)}
                                                >Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div className={'avatarIcon'}>
                                            <div className={'avatarIconWrapper'}>
                                                <img src={AVATAR_DEFAULT} alt={''}/>
                                            </div>
                                            <div className={'avatarOption'}>
                                                <Link to={'/account-detail'} className={'myAccountLink'}>
                                                    Tài khoản của tôi
                                                </Link>
                                                <button
                                                    className={'logoutBtn'}
                                                    onClick={e => handleLogout(e)}
                                                >Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                )
                                :
                                <Link to={'/login'} className={'btnIcons'}>
                                    <IoPersonOutline className={'icons'}/>
                                </Link>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className={'categoriesContainer'}>
                <div className={'categoriesWrapper'}>
                    {categories && categories.slice(0, 7).map((c, index) => (
                        <div className={'categoryItem'} key={c.id}>
                            <Link to={`/category/${c.id}`}>{c.name}</Link>
                        </div>
                    ))}
                    {categories && categories.length > 7 &&
                        <div className={'categoryItem'}>
                            <Link to={'/category/all'}>Xem Thêm</Link>
                        </div>
                    }
                </div>
            </div>

        </div>

    )
}

export default HeaderComponent;
