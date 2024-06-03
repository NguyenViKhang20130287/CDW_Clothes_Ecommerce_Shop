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
// css
import './AccountDetail.css'

const AccountDetail = () => {
    const [user, setUser] = useState(null)
    const [isShow, setIsShow] = useState('profile')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    let hasShownToast = false;


    const handleSelectShow = (isShow) => {
        setIsShow(isShow)
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const data =
                    await new ApiService().fetchData("/user/user-details", null, {token: token});
                setUser(data)
            } catch (error) {
                localStorage.removeItem('token');
                if (!hasShownToast) {
                    toast.error('Phiên đăng nhập đã hết hạn !');
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    hasShownToast = true; // Đánh dấu rằng toast đã được hiển thị
                }
                navigate('/');
            }
        }

        loadData()

    }, [token, isShow])

    return (
        <div className={'AccountDetailContainer'}>
            <div className={'AccountDetailWrapper'}>
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
                            {isShow === 'profile' ?
                                <button
                                    className={'profile'}
                                    style={{color: 'red'}}
                                    onClick={event => handleSelectShow('profile')}
                                >Hồ sơ</button>
                                : <button className={'profile'}
                                          onClick={event => handleSelectShow('profile')}
                                >Hồ sơ</button>
                            }
                            {/**/}
                            {isShow === 'address' ?
                                <button
                                    className={'address'}
                                    style={{color: 'red'}}
                                    onClick={event => handleSelectShow('address')}
                                >Địa chỉ</button>
                                :
                                <button
                                    className={'address'}
                                    onClick={event => handleSelectShow('address')}
                                >Địa chỉ</button>
                            }
                            {/**/}
                            {isShow === 'changePassword' ?
                                <button
                                    className={'changePass'}
                                    style={{color: 'red'}}
                                    onClick={event => handleSelectShow('changePassword')}
                                >Đổi mật khẩu</button>
                                :
                                <button
                                    className={'changePass'}
                                    onClick={event => handleSelectShow('changePassword')}
                                >Đổi mật khẩu</button>
                            }
                        </div>
                    </div>

                    {isShow === 'purchaseOrder' ?
                        <div
                            className={'accountDetailItem purchaseOrder'}
                            style={{color: 'red'}}
                            onClick={e => handleSelectShow('purchaseOrder')}>
                            <BiPurchaseTag className={'icons'}/>
                            <span>Đơn mua</span>
                        </div>
                        :
                        <div
                            className={'accountDetailItem purchaseOrder'}
                            onClick={e => handleSelectShow('purchaseOrder')}>
                            <BiPurchaseTag className={'icons'}/>
                            <span>Đơn mua</span>
                        </div>
                    }

                    {/*  Content  */}
                </div>
                {user ?
                    (<div className={'AccountDetailContent'}>
                        <AccountDetailContentComponent
                            nameShow={isShow}
                            user={user}
                            updateUser={setUser}
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
            {/* popup edit address*/}
            {/*<PopupAddress*/}
            {/*    title={'Cập nhật địa chỉ'}*/}
            {/*    isHiddenPopup={isHiddenPopup}*/}
            {/*    user={user}*/}
            {/*    onClickHiddenPopup={e=>setIsHiddenPopup(true)}*/}
            {/*    handleSubmit={handleUpdateAddress}*/}
            {/*    ref={childRef}*/}
            {/*/>*/}
        </div>
    )
}

export default AccountDetail