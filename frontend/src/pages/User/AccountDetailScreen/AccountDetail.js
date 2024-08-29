import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
//
import AVATAR_DEFAULT from '../../../assets/img/user.png'
// services
import ApiService from "../../../services/APIService";
// components
import AccountDetailContentComponent from "../../../components/AccountDetailContent/AccountDetailContentComponent";
// icons
import {FaPen, FaRegUser} from "react-icons/fa";
import {BiPurchaseTag} from "react-icons/bi";
import { BsLayoutTextSidebar } from "react-icons/bs";
// css
import './AccountDetail.css'
import './Responsive.css'
import {TbCircuitSwitchClosed} from "react-icons/tb";
import {IoClose} from "react-icons/io5";

const AccountDetail = () => {
    const [user, setUser] = useState(null)
    const [isShow, setIsShow] = useState('profile')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [avatarLink, setAvatarLink] = useState('')
    const [isHidden, setIsHidden] = useState(true)
    let hasShownToast = false;


    const handleSelectShow = (isShow) => {
        setIsShow(isShow)
    }

    const updateDataUser = (newUser) => {
        setUser(newUser)
    }

    const loadData = async () => {
        try {
            const data =
                await new ApiService().fetchData("/user/user-details", null, {token: token});
            setUser(data)
        } catch (error) {
            localStorage.removeItem('token');
            navigate('/');
        }
    }

    useEffect(() => {
        loadData()
    }, [token, isShow])

    useEffect(() => {
        console.log('New user', user)
    }, [user]);

    return (
        <div className={'AccountDetailContainer'}>
            <div className={'AccountDetailWrapper'}>
                {/* SHOW SIDEBAR BUTTON */}
                {/*<button className={'showSidebar'} onClick={e=>setIsHidden(false)}>*/}
                {/*    <BsLayoutTextSidebar/>*/}
                {/*</button>*/}
                {/* SIDEBAR RESPONSIVE */}
                <div className={'AccountDetailSideBar responsive'}
                    // style={isHidden ? {transform: 'translateX(-100%)'} : {transform: 'translateX(0)'}}
                >
                    {/*<button className={'hideSidebar'} onClick={e => setIsHidden(true)}>*/}
                    {/*    <IoClose/>*/}
                    {/*</button>*/}
                    <div className={'accountDetailImg'}>
                        <div className={'imgWrapper'}>
                            <img
                                src={user?.userInformation?.avatar || AVATAR_DEFAULT}
                                alt={'avatar'}
                            />
                        </div>
                        <div className={'info'}>
                            <span className={'username'}>{user?.username || null}</span>
                            <div className={'editProfile'}>
                                <FaPen style={{fontSize: '12px', marginRight: '5px'}}/>
                                <span>Sửa hồ sơ</span>
                            </div>
                        </div>
                    </div>
                    <div className={'accountDetailItem myAccount'}>
                        <span className={'title'}>
                            <FaRegUser className={'icons'}/>
                            <span>Tài khoản của tôi</span>
                        </span>
                        <div className={'options'}>
                            <button
                                className={'profile'}
                                style={isShow === 'profile' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('profile')}
                            >Hồ sơ
                            </button>
                            {/**/}
                            <button
                                className={'address'}
                                style={isShow === 'address' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('address')}
                            >Địa chỉ
                            </button>
                            {/**/}
                            <button
                                className={'changePass'}
                                style={isShow === 'changePassword' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('changePassword')}
                            >Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className={'AccountDetailSideBar'}>
                    <div className={'accountDetailImg'}>
                        <div className={'imgWrapper'}>
                            <img
                                src={user?.userInformation?.avatar || AVATAR_DEFAULT}
                                alt={'avatar'}
                            />
                        </div>
                        <div className={'info'}>
                            <span className={'username'}>{user?.username || null}</span>
                            <div className={'editProfile'}>
                                <FaPen style={{fontSize: '12px', marginRight: '5px'}}/>
                                <span>Sửa hồ sơ</span>
                            </div>
                        </div>
                    </div>
                    <div className={'accountDetailItem myAccount'}>
                        <span className={'title'}>
                            <FaRegUser className={'icons'}/>
                            <span>Tài khoản của tôi</span>
                        </span>
                        <div className={'options'}>
                            <button
                                className={'profile'}
                                style={isShow === 'profile' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('profile')}
                            >Hồ sơ
                            </button>
                            {/**/}
                            <button
                                className={'address'}
                                style={isShow === 'address' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('address')}
                            >Địa chỉ
                            </button>
                            {/**/}
                            <button
                                className={'changePass'}
                                style={isShow === 'changePassword' ? {color: 'red'} : {color: '#000'}}
                                onClick={event => handleSelectShow('changePassword')}
                            >Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                    {/**/}
                    <div
                        className={'accountDetailItem purchaseOrder'}
                        style={isShow === 'purchaseOrder' ? {color: 'red'} : {color: '#000'}}
                        onClick={e => handleSelectShow('purchaseOrder')}>
                        <BiPurchaseTag className={'icons'}/>
                        <span>Đơn mua</span>
                    </div>
                    {/*  Content  */}
                </div>
                {user ?
                    (<div className={'AccountDetailContent'}>
                        <AccountDetailContentComponent
                            nameShow={isShow}
                            user={user}
                            updateUser={updateDataUser}
                        />
                    </div>)
                    :
                    <div className={'AccountDetailContent'}
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         }}>
                        <span>Loading...</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default AccountDetail