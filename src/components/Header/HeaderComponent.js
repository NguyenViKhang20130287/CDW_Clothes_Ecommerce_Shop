import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
//
import LOGO from '../../assets/img/logo.webp'
import AVATAR_DEFAULT from '../../assets/img/user.png'
// icons
import {IoCartOutline, IoSearchOutline, IoPersonOutline, IoCloseOutline, IoNotificationsOutline, IoClose} from "react-icons/io5";
import {HiBars3BottomLeft} from "react-icons/hi2";
// css
import './HeaderComponent.css'
import './Responsive.css'
// components
import ProductCardComponent from "../ProductCard/ProductCardComponent";
// services
import APIService from "../../services/APIService";
import axios from "axios";
import {Sidebar} from "react-pro-sidebar";
import {AiOutlineUser} from "react-icons/ai";

const HeaderComponent = () => {
    const [searchPopupShowStatus, setSearchPopupShowStatus] = useState(false)
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [totalQuantity, setTotalQuantity] = useState(0);
    const cartItems = useSelector(state => state.root.cart);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [categories, setCategories] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [seen, setSeen] = useState(false)
    const [isShow, setIsShow] = useState(false)
    let isExpired = false;

    const handleShowHideSearch = (e) => {
        e.preventDefault()
        if (searchPopupShowStatus === false)
            setSearchPopupShowStatus(true)
        else setSearchPopupShowStatus(false)
    }

    const fetchDataUser = async () => {
        if (token) {
            try {
                const data =
                    await new APIService().fetchData("/user/user-details", null, {token: token});
                // console.log(data)
                setAvatar(data.userInformation.avatar);
                setNotifications(data.notifications)
            } catch (error) {
                if (!isExpired) {
                    localStorage.removeItem('token');
                    setNotifications(null)
                    toast.error('Phiên đăng nhập đã hết hạn !');
                    isExpired = true
                    navigate('/');
                }
            }
        }
    }

    useEffect(() => {
        fetchDataUser();
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

    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);

    const handleSeenNotification = async (id) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/notification/seen/${id}`)
            console.log('Res: ', res)
            setSeen(!seen)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchDataUser()
    }, [seen]);

    let sortedNotifications = []
    if (notifications && notifications.length > 0) {
        sortedNotifications = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return (
        <div className={'main'}>
            <div className={'headerContainer'}>

                {/* SEARCH */}
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

                <div className={'headerWrapper'}>
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
                            <button className={'btnIcons notify'}>
                                <IoNotificationsOutline className={'icons'}/>
                                {notifications && notifications.length > 0 &&
                                    <div className={'quantity'}>
                                        <span>{notifications.filter(no => no.seen === false).length}</span>
                                    </div>
                                }
                                <div className={'contentWrapper'}>
                                    <p className={'header'}>Thông báo</p>
                                    <div className={'content'}>
                                        {notifications && notifications.length > 0 ?
                                            sortedNotifications.map(item => {
                                                return (
                                                    <p
                                                        className={'item'}
                                                        key={item.id}
                                                        onClick={e => handleSeenNotification(item.id)}
                                                        style={!item.seen ? {
                                                            fontWeight: 500
                                                        } : {fontWeight: 'normal'}}
                                                    >
                                                        {item.content}</p>
                                                )
                                            })
                                            :
                                            <p className={'item'}>Không có thông báo nào</p>

                                        }
                                    </div>
                                </div>
                            </button>
                            <button className={'btnIcons cart'} type={"button"}>
                                <Link to={'/cart'}>
                                    <IoCartOutline className={'icons cartIcon'}/>
                                </Link>
                                <div className={'quantity'}><span>{totalQuantity}</span></div>
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

                {/* HEADER RESPONSIVE */}
                <div className={'headerResponsive'}>
                    <div className={'headerWrapper'}>
                        <button className={'sidebarBtn'}
                                type={"button"}
                                onClick={e => setIsShow(true)}
                        >
                            <HiBars3BottomLeft className={'icon'}/>
                        </button>
                        <Link to={'/'} className={'imageLogoWrapper'}>
                            <img src={LOGO} alt={''}/>
                        </Link>
                        <button className={'cartBtn'} type={"button"}>
                            <Link to={'/cart'}>
                                <IoCartOutline className={'icon'}/>
                            </Link>
                            <div className={'quantity'}><span>{totalQuantity}</span></div>
                        </button>
                    </div>

                    <div className={'sidebar'} style={isShow ? {transform: 'translateX(0)'} :  {transform: 'translateX(-100%)'}}>
                        <div className={'wrapper'}>
                            <div className={'title'}>
                                {token && avatar ?
                                    <div className={'myAccount'}>
                                        <div className={'avatarWrapper'}>
                                            <img src={avatar} alt={''}/>
                                        </div>
                                    </div>
                                :
                                    <Link to={'/login'} className={'btn loginBtn'}>
                                        Đăng nhập
                                    </Link>
                                }
                                <div className={'groupBtn'}>
                                    <button className={'btn'} id={'searchBtn'} type={"button"}
                                            onClick={e => handleShowHideSearch(e)}>
                                        <IoSearchOutline className={'icons'}/>
                                    </button>
                                    {/*<button className={'btn notify'}>*/}
                                    {/*    <IoNotificationsOutline className={'icons'}/>*/}
                                    {/*    {notifications && notifications.length > 0 &&*/}
                                    {/*        <div className={'quantity'}>*/}
                                    {/*            <span>{notifications.filter(no => no.seen === false).length}</span>*/}
                                    {/*        </div>*/}
                                    {/*    }*/}
                                    {/*    <div className={'contentWrapper'}>*/}
                                    {/*        <p className={'header'}>Thông báo</p>*/}
                                    {/*        <div className={'content'}>*/}
                                    {/*            {notifications && notifications.length > 0 ?*/}
                                    {/*                sortedNotifications.map(item => {*/}
                                    {/*                    return (*/}
                                    {/*                        <p*/}
                                    {/*                            className={'item'}*/}
                                    {/*                            key={item.id}*/}
                                    {/*                            onClick={e => handleSeenNotification(item.id)}*/}
                                    {/*                            style={!item.seen ? {*/}
                                    {/*                                fontWeight: 500*/}
                                    {/*                            } : {fontWeight: 'normal'}}*/}
                                    {/*                        >*/}
                                    {/*                            {item.content}</p>*/}
                                    {/*                    )*/}
                                    {/*                })*/}
                                    {/*                :*/}
                                    {/*                <p className={'item'}>Không có thông báo nào</p>*/}

                                    {/*            }*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</button>*/}
                                    <button className={'btn closeSidebarBtn'}
                                            type={"button"}
                                            onClick={e => setIsShow(false)}
                                    >
                                        <IoClose/>
                                    </button>
                                </div>
                            </div>

                            <div className={'categoriesWrapper'}>
                                <div className={'title'}>
                                    <h3>Danh Mục</h3>
                                </div>
                                <div className={'categories'}>
                                    {categories && categories.length > 0 &&
                                        categories.map(item => {
                                            return(
                                                <Link to={`/category/${item.id}`} key={item.id} className={'item'}>{item.name}</Link>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                            <div className={'guideWrapper'}>
                                <div className={'title'}><h3>Hướng dẫn</h3></div>
                                <div className={'guides'}>
                                    <Link to={'/exchange'} className={'item'}>Đổi trả</Link>
                                    <Link to={'/size-selector'} className={'item'}>Bảng size</Link>
                                </div>
                            </div>

                            {token &&
                                <div className={'accountWrapper'}>
                                    <div className={'title'}><h3>Tài khoản</h3></div>
                                    <div className={'accounts'}>
                                        <Link to={'/account-detail'} className={'item'}>Thông tin tài khoản</Link>
                                        <button className={'item'} onClick={event => handleLogout(event)}>Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </div>

            {/* HEADER CATEGORIES */}
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
