import React, {useEffect, useState} from "react";
// import {Link} from 'react-router-dom'
import LOGO from '../../assets/img/logo.webp'
import AVATAR_DEFAULT from '../../assets/img/user.png'
// icons
import {IoCartOutline, IoSearchOutline, IoPersonOutline, IoCloseOutline} from "react-icons/io5";
import {HiBars3BottomLeft} from "react-icons/hi2";
import './HeaderComponent.css'
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import APIService from "../../services/APIService1";
import ProductCardComponent from "../ProductCard/ProductCardComponent";
import toast from "react-hot-toast";
import {loadDataUser} from "../../services/apiService";

const HeaderComponent = () => {
    const [searchPopupShowStatus, setSearchPopupShowStatus] = useState(false)
    const [sidebarToggleStatus, setSidebarToggleStatus] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0);
    const cartItems = useSelector(state => state.root.cart);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('')
    // const token = localStorage.getItem('token')
    const [token, setToken] = useState(localStorage.getItem('token'))
    let hasShownToast = false;

    // console.log('Token: ', token)
    // console.log('Avt: ', avatar)

    const handleShowHideSearch = (e) => {
        e.preventDefault()
        if (searchPopupShowStatus === false)
            setSearchPopupShowStatus(true)
        else setSearchPopupShowStatus(false)
    }

    useEffect(() => {
        // console.log('Token: ', token);

        const fetchAvatar = async () => {
            if (token) {
                try {
                    const data = await loadDataUser(token);
                    setAvatar(data.userInformation.avatar);
                } catch (error) {
                    localStorage.removeItem('token');
                    setToken(null);
                    if (!hasShownToast) {
                        toast.error('Phiên đăng nhập đã hết hạn !');
                        hasShownToast = true; // Đánh dấu rằng toast đã được hiển thị
                    }
                    navigate('/');
                }
            }
        };

        if (token) fetchAvatar();

        return () => {
            hasShownToast = false; // Reset biến cờ khi component unmount
        };
    }, [navigate, token, avatar])

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

    const handleInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate('/search', { state: { keyword: searchKeyword } });
            setSearchPopupShowStatus(false);
        }
    };

    const findProduct = async () => {
        if (searchKeyword.trim() === '') {
            setSearchResult([]);
        } else {
            try {
                const searchResult = await new APIService().fetchData(`http://localhost:8080/api/v1/product/search?name=${searchKeyword}`);
                setSearchResult(searchResult);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        }
    }

    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);

    useEffect(() => {
        findProduct();
    }, [searchKeyword])
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
                                {searchResult.slice(0, 7).map((product, index) => (
                                    <ProductCardComponent image={product.thumbnail}
                                                          name={product.name}
                                                          price={product.price}
                                                          originPrice={product.price}/>
                                ))}
                                {searchResult.length > 7 && (
                                    <div className={'productCardItem'}>
                                        <div className={'itemImage'}>
                                            <span>Xem thêm</span>
                                        </div>
                                    </div>
                                )}
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
                                <IoCartOutline className={'icons'}/>
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
                                                <img src={AVATAR} alt={''}/>
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

export default HeaderComponent;
