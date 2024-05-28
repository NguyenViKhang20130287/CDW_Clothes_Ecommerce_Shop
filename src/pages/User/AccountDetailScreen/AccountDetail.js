import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {makeStyles} from '@mui/styles';

// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
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

    const handleHideShowPopup = (e) => {
        if (isHiddenPopup === false)
            setIsHiddenPopup(true)
        else setIsHiddenPopup(false)
    }

    const classes = useStyles();

    useEffect(() => {

    }, [isShow])
    return (
        <div className={'AccountDetailContainer'}>
            <HeaderComponent/>
            <div className={'AccountDetailWrapper'}>
                <div className={'AccountDetailSideBar'}>
                    <div className={'accountDetailImg'}>
                        <div className={'imgWrapper'}>
                            <img src={IMG} alt={''}/>
                        </div>
                        <div className={'info'}>
                            <span className={'username'}>vikang</span>
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
                            style={{color:'red'}}
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

                {/*    */}
                </div>
                <div className={'AccountDetailContent'}>
                    <AccountDetailContentComponent
                        nameShow={isShow}
                        user={user}
                        onClickUpdateAddress={e => setIsHiddenPopup(false)}
                    />
                </div>
            </div>
            {/* popup edit address*/}
            <div className={'editAddressPopup'} hidden={isHiddenPopup}>
                <div className={'editAddressPopupWrapper'}>
                    <div className={'title'}>
                        <span>Cập nhật địa chỉ</span>
                    </div>
                    <form action="">
                        <div className={'editFullNamePhone'}>
                            <div className={'editFullName'}>
                                <TextField
                                    id={'editFullName'}
                                    label={'Họ và tên'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    className={classes.root + ' editFullNameInput'}
                                    size={'small'}
                                />
                            </div>
                            <div className={'editPhone'}>
                                <TextField
                                    id={'editPhone'}
                                    label={'Số điện thoại'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    className={classes.root}
                                    size={'small'}

                                />
                            </div>
                        </div>
                        <div className={'editAddress'}>
                            <TextField
                                id={'editAddress'}
                                label={'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                                variant={'outlined'}
                                fullWidth={true}
                                className={classes.root}
                                size={'small'}
                            />
                        </div>
                        <div className={'editAddressDetail'}>
                            <TextField
                                id={'editAddressDetail'}
                                label={'Địa chỉ cụ thể'}
                                variant={'outlined'}
                                fullWidth={true}
                                className={classes.root}
                                size={'small'}
                            />
                        </div>
                        <div className={'addressDefault'}>
                            <input type="checkbox" id={'addressDefault'}/>
                            <label htmlFor={'addressDefault'}>Đặt làm địa chỉ mặc định</label>
                        </div>
                        <div className={'action'}>
                            <button
                                className={'backBtn'}
                                type={'button'}
                                onClick={(e) => setIsHiddenPopup(true)}
                            >Trở về
                            </button>
                            <button className={'saveBtn'} type={'button'}>Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
            {/*<PopupAddress*/}
            {/*    title={'Cập nhật địa chỉ'}*/}
            {/*    isHiddenPopup={isHiddenPopup}*/}
            {/*    user={user}*/}
            {/*    onClickHiddenPopup={e=>setIsHiddenPopup(true)}*/}
            {/*    handleSubmit={handleUpdateAddress}*/}
            {/*    ref={childRef}*/}
            {/*/>*/}
            <FooterComponent/>
        </div>
    )
}

export default AccountDetail