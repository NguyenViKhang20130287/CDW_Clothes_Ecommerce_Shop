import React, {useState} from "react";
import LOGO from '../../assets/logo.webp'
// icons
import {IoCartOutline, IoSearchOutline, IoPersonOutline} from "react-icons/io5";
// css
import './Header.css'

const Header = () => {
    const [showSearchInput, setShowSearchInput] = useState(0)

    const handleShowSearchInput = (e) => {
        e.preventDefault()
        if (showSearchInput === 0)
            setShowSearchInput(1)
        else
            setShowSearchInput(0)
    }

    return (
        <div className={'headerContainer'}>
            <div className={'headerWrapper'}>
                <div className={'leftContent'}>
                    <span className={'home'}>TRANG CHỦ</span>
                    <span className={'warranty'}>ĐỔI TRẢ</span>
                </div>
                <div className={'centerContent'}>
                    <div className={'imageLogoWrapper'}>
                        <img src={LOGO} alt={''}/>
                    </div>
                </div>
                <div className={'rightContent'}>
                    <span className={'sizeTable'}>BẢNG SIZE</span>
                    <input className={'searchInput'} placeholder={'Nhap ten san pham...'}
                           style={{opacity: showSearchInput}} hidden={true}/>
                    <div className={'groupBtn'}>
                        <button className={'btnIcons'} id={'searchBtn'} type={"button"}
                                onClick={e => handleShowSearchInput(e)}>
                            <IoSearchOutline className={'icons'}/>
                        </button>
                        <button className={'btnIcons'} type={"button"}>
                            <IoCartOutline className={'icons'}/>
                        </button>
                        <button className={'btnIcons'} type={"button"}>
                            <IoPersonOutline className={'icons'}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;