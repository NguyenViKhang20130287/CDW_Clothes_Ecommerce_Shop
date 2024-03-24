import React, {useState} from "react";
import './AccountDetailContentComponent.css'
import IMG from '../../assets/img/avt.jpg'
import PRODUCT from '../../assets/img/shirt1.webp'
import {FaEye, FaEyeSlash, FaPlus, FaShippingFast} from "react-icons/fa";
import {IoSearchSharp} from "react-icons/io5";
import {LiaShippingFastSolid} from "react-icons/lia";

const AccountDetailContentComponent = ({nameShow, user, onClickUpdateAddress}) => {
    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [avatarLink, setAvatarLink] = useState(user.avatar)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)


    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgUrl = reader.result;
                setAvatarLink(imgUrl)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={'accountDetailContentWrapper'}>
            {nameShow === 'profile' &&
                <div className={'profileContainer'}>
                    <div className={'title'}>
                        <h3>Hồ sơ của tôi</h3>
                        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                    </div>
                    <div className={'profileWrapper'}>
                        <form className={'editForm'}>
                            <div className={'editControl username'}>
                                <label htmlFor={'username'}>Tên đăng nhập</label>
                                <input value={user.username}
                                       type={"text"}
                                       id={'username'}
                                       disabled={true}
                                />
                                <button className={'editBtn'}></button>
                            </div>
                            <div className={'editControl fullName'}>
                                <label htmlFor={'fullName'}>Họ và tên</label>
                                <input
                                    value={fullName}
                                    type={"text"}
                                    id={'fullName'}
                                    // style={{border: borderStyle}}
                                    onChange={event => setFullName(event.target.value)}
                                />
                                <button className={'editBtn'}></button>
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'email'}>Email</label>
                                <input
                                    value={email}
                                    type={"email"}
                                    id={'email'}
                                    disabled={true}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                <button className={'editBtn'}
                                        type={'button'}
                                >Thay đổi
                                </button>
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'phone'}>Số điện thoại</label>
                                <input
                                    value={phone}
                                    type={"tel"}
                                    id={'phone'}
                                    disabled={true}
                                    onChange={event => setPhone(event.target.value)}
                                />
                                <button className={'editBtn'}>Thay đổi</button>
                            </div>
                            <button className={'saveBtn'} type={"submit"}>
                                Lưu
                            </button>
                        </form>
                        <div className={'editAvatarWrapper'}>
                            <form className={'editAvatar'}>
                                <div className={'avatarWrapper'}>
                                    <img src={avatarLink} alt={''}/>
                                </div>
                                <input
                                    className={'uploadImage'}
                                    type={"file"}
                                    id={'uploadImage'}
                                    accept={'image/*'}
                                    onChange={e => handleChangeAvatar(e)}
                                />
                                <label htmlFor={'uploadImage'}>Chọn ảnh</label>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {nameShow === 'address' &&
                <div className={'addressContainer'}>
                    <div className={'title headerAddress'}>
                        <h3>Địa chỉ của tôi</h3>
                        <button className={'addAddressBtn'}>
                            <FaPlus/>
                            <span>Thêm địa chỉ mới</span>
                        </button>
                    </div>
                    <div className={'addressListWrapper'}>
                        <div className={'addressList'}>
                            <div className={'addressItem'}>
                                <div className={'addressInfo'}>
                                    <div className={'fullNamePhone'}>
                                        <h3>{user.fullName}</h3>
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className={'address'}>
                                        <span className={'street'}>2/7c, Đường Số 106</span>
                                        <span className={'detail'}>Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, TP. Hồ Chí Minh</span>
                                    </div>
                                </div>
                                <div className={'addressAction'}>
                                    <button
                                        className={'updateAddress'}
                                        type={'button'}
                                        onClick={onClickUpdateAddress}
                                    >Cập nhật
                                    </button>
                                    <button className={'setDefaultAddress'}>Thiết lập mặc định</button>
                                </div>
                            </div>
                            <div className={'addressItem'}>
                                <div className={'addressInfo'}>
                                    <div className={'fullNamePhone'}>
                                        <h3>{user.fullName}</h3>
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className={'address'}>
                                        <span className={'street'}>2/7c, Đường Số 106</span>
                                        <span className={'detail'}>Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, TP. Hồ Chí Minh</span>
                                    </div>
                                </div>
                                <div className={'addressAction'}>
                                    <button className={'updateAddress'}>Cập nhật</button>
                                    <button className={'setDefaultAddress'}>Thiết lập mặc định</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {nameShow === 'changePassword' &&
                <div className={'changePasswordContainer'}>
                    <div className={'title headerAddress'}>
                        <h3>Đổi mật khẩu</h3>
                        <span>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
                    </div>
                    <div className={'changePasswordWrapper'}>
                        <form action="">
                            <div className={'passwordControl'}>
                                <label htmlFor={'oldPassword'}>Mật khẩu cũ</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showOldPassword ? 'text' : 'password'}
                                        id={'oldPassword'}
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value.trim())}/>
                                    {oldPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowOldPassword(!showOldPassword)}>
                                            {!showOldPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={'passwordControl'}>
                                <label htmlFor={'newPassword'}>Mật khẩu mới</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id={'newPassword'}
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value.trim())}/>
                                    {newPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {!showNewPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={'passwordControl'}>
                                <label htmlFor={'newPassword'}>Nhập lại mật khẩu mới</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id={'reNewPassword'}
                                        value={reNewPassword}
                                        onChange={e => setReNewPassword(e.target.value.trim())}/>
                                    {reNewPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {!showNewPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            }
            {nameShow === 'purchaseOrder' &&
                <div className={'purchaseOrderContainer'}>
                    <div className={'listStatusWrapper'}>
                        <button className={'statusBtn active'}>Tất cả</button>
                        <button className={'statusBtn'}>Chờ thanh toán</button>
                        <button className={'statusBtn'}>Vận chuyển</button>
                        <button className={'statusBtn'}>Chờ giao hàng</button>
                        <button className={'statusBtn'}>Hoàn thành</button>
                        <button className={'statusBtn'}>Đã hủy</button>
                        <button className={'statusBtn'}>Trả hàng/Hoàn tiền</button>
                    </div>
                    <div className={'searchOrderContainer'}>
                        <div className={'searchOrderWrapper'}>
                            <IoSearchSharp size={'20'} color={'#999999'}/>
                            <input
                                type="text"
                                placeholder={'Bạn có thể tìm kiếm theo ID hoặc Tên Sản Phẩm'}
                            />
                        </div>
                    </div>

                    <div className={'orderContainer'}>

                        <div className={'orderWrapper'}>
                            <div className={'orderHeader'}>
                                <span className={'orderId'}>Ma don hang</span>
                                <div className={'orderStatus'}>
                                    <span className={'detail'}>
                                         <LiaShippingFastSolid size={18} style={{
                                             marginRight: '5px'
                                         }}/>
                                    <span>Đang vận chuyển</span>
                                    </span>
                                   <span className={'status'}>hoàn thành</span>
                                </div>
                            </div>
                            <div className={'orderProducts'}>
                                <div className={'orderProduct'}>
                                    <div className={'imgWrapper'}>
                                        <img src={PRODUCT} alt={""}/>
                                    </div>
                                    <div className={'contentWrapper'}>
                                        <span className={'nameProduct'}>
                                            Áo Polo Teelab Local Brand Unisex Power Team Worldwide AP050
                                        </span>
                                        <span className={'colorSize'}>Trắng, XXL, x2</span>
                                        <div className={'price'}>
                                            <span className={'oldPrice'}>350.000đ</span>
                                            <span className={'newPrice'}>195.000đ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={'orderProduct'}>
                                    <div className={'imgWrapper'}>
                                        <img src={PRODUCT} alt={""}/>
                                    </div>
                                    <div className={'contentWrapper'}>
                                        <span className={'nameProduct'}>
                                            Áo Polo Teelab Local Brand Unisex Power Team Worldwide AP050
                                        </span>
                                        <span className={'colorSize'}>Trắng, XXL, x2</span>
                                        <div className={'price'}>
                                            <span className={'oldPrice'}>350.000đ</span>
                                            <span className={'newPrice'}>195.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'action'}>
                                <button className={'cancelOrder'} type="button">Hủy đơn hàng</button>
                            </div>
                        </div>

                        <div className={'orderWrapper'}>
                            <div className={'orderHeader'}>
                                <span className={'orderId'}>Ma don hang</span>
                                <div className={'orderStatus'}>
                                    <LiaShippingFastSolid size={18} style={{
                                        marginRight: '5px'
                                    }}/>
                                    <span>Đang vận chuyển</span>
                                </div>
                            </div>
                            <div className={'orderProducts'}>
                                <div className={'orderProduct'}>
                                    <div className={'imgWrapper'}>
                                        <img src={PRODUCT} alt={""}/>
                                    </div>
                                    <div className={'contentWrapper'}>
                                        <span className={'nameProduct'}>
                                            Áo Polo Teelab Local Brand Unisex Power Team Worldwide AP050
                                        </span>
                                        <span className={'colorSize'}>Trắng, XXL, x2</span>
                                        <div className={'price'}>
                                            <span className={'oldPrice'}>350.000đ</span>
                                            <span className={'newPrice'}>195.000đ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={'orderProduct'}>
                                    <div className={'imgWrapper'}>
                                        <img src={PRODUCT} alt={""}/>
                                    </div>
                                    <div className={'contentWrapper'}>
                                        <span className={'nameProduct'}>
                                            Áo Polo Teelab Local Brand Unisex Power Team Worldwide AP050
                                        </span>
                                        <span className={'colorSize'}>Trắng, XXL, x2</span>
                                        <div className={'price'}>
                                            <span className={'oldPrice'}>350.000đ</span>
                                            <span className={'newPrice'}>195.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'action'}>
                                <button className={'cancelOrder'} type="button">Hủy đơn hàng</button>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}
export default AccountDetailContentComponent