import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {MdOutlineNotifications, MdMailOutline} from "react-icons/md";
//css
import './HeaderAdminComponent.css'
// images
import AVT from '../../assets/img/avt.jpg'

const HeaderAdminComponent = ({title}) => {
    return (
        <div className={'HeaderAdminContainer'}>
            <div className={'headerAdminWrapper'}>
                <div className={'leftContent'}>
                    <button className={'closeSidebarBtn'}>
                        <GiHamburgerMenu/>
                    </button>
                    <h3>{title}</h3>
                </div>
                <div className={'rightContent'}>
                    <button type="button" className={'notifyBtn'}>
                        <MdOutlineNotifications/>
                    </button>
                    <button type="button" className={'messageBtn'}>
                        <MdMailOutline/>
                    </button>
                    <button type="button" className={'userBtn'}>
                        <img src={AVT} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdminComponent