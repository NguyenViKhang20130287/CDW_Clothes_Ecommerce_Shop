import React, {useEffect, useRef, useState} from "react";
import './AccountDetailContentComponent.css'
import AVATAR_DEFAULT from '../../assets/img/user.png'
import PRODUCT from '../../assets/img/shirt1.webp'
import {FaEye, FaEyeSlash, FaPlus} from "react-icons/fa";
import {IoSearchSharp} from "react-icons/io5";
import {LiaShippingFastSolid} from "react-icons/lia";
import {changePassword, editUser} from "../../services/userService";
import toast from "react-hot-toast";
import PopupAddress from "../PopupAddress/PopupAddress";
import {addNewAddress} from "../../services/addressApiService";

const AccountDetailContentComponent = ({
                                           nameShow,
                                           user,
                                           onClickUpdateAddress,
                                           updateUser,
                                           setAddress,
                                           setIsShowPopup
                                       }) => {
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarLink, setAvatarLink] = useState('');
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)

    const [showNewPassword, setShowNewPassword] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [isHiddenPopup, setIsHiddenPopup] = useState(true)
    const [showNamePopup, setShowNamePopup] = useState('')
    const [addressData, setAddressData] = useState(null)
    const childRef = useRef()

    const handleChangeAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await
                    fetch('https://api.imgbb.com/1/upload?key=8c2c7c5c94797f04504f969ec51749a4',
                        {
                            method: 'POST',
                            body: formData
                        });

                const result = await response.json();
                if (result.success) {
                    setAvatarLink(result.data.url);
                } else {
                    console.error("Error uploading image to ImgBB", result);
                }
            } catch (error) {
                console.error("Error uploading image to ImgBB", error);
            }
        }
        console.log('AvatarLink: ', avatarLink)
    }

    const handleEditDataUser = async (e) => {
        e.preventDefault()
        console.log('Clicked')
        const userData = {
            username: user.username,
            fullName: fullName,
            email: email,
            phone: phone,
            avatarLink: avatarLink
        }
        // console.log('User data: ', userData)
        try {
            const res = await editUser(userData);
            // console.log('Response edit user: ', res)
            if (res.statusCodeValue === 400) {
                toast.error('Lỗi thao tác')
                return
            }
            toast.success('Thay đổi thông tin thành công')

        } catch (error) {
            console.log(error)
        }
    }

    const handleAddNewAddress = async (e) => {
        e.preventDefault()
        const data = childRef.current.getData();
        // console.log('Data from child:', data);
        // console.log(user.username)
        try {
            const res = await addNewAddress(user.username, data)
            console.log('res: ', res)
            toast.success('Thêm địa chỉ thành công')
            setIsHiddenPopup(true)
            // setAddresses(prevAddresses => [...prevAddresses, res]);
            updateUser(prevUser => ({
                ...prevUser,
                addresses: [...prevUser.addresses, res]
            }));
        } catch (error) {
            console.log(error)
            toast.error('Lỗi thao tác !')
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        const userData = {
            username: username,
            password: oldPassword,
            newPassword: newPassword
        }

        console.log('data: ', userData)

        if (reNewPassword !== newPassword){
            toast.error('Mật khẩu nhập lại không chính xác !')
            return
        }
        try {
            const res = await changePassword(userData);
            console.log('res: ', res)
            toast.success(res)
            setOldPassword('')
            setNewPassword('')
            setReNewPassword('')
        }catch (error){
            toast.error(error.response.data)
            console.log(error)
        }
    }

    const handleShowPopup = (showNamePopup, address) => {
        setShowNamePopup(showNamePopup)
        setIsHiddenPopup(false)
        if (showNamePopup === 'update') {
            setAddressData(address)
        }
    }


    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setPassword(user.password);
            setFullName(user.userInformation.fullName);
            setEmail(user.userInformation.email);
            setPhone(user.userInformation.phone);
            setAvatarLink(user.userInformation.avatar);
            // setAddresses(user.addresses)
            setAddresses([...user.addresses].sort((a, b) => b.default - a.default))
        }

    }, [user, isHiddenPopup, addresses]);
    // console.log('Addresses: ', addresses)

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
                            </div>
                            <div className={'editControl fullName'}>
                                <label htmlFor={'fullName'}>Họ và tên</label>
                                <input
                                    value={fullName ? fullName : ''}
                                    type={"text"}
                                    id={'fullName'}
                                    onChange={event => setFullName(event.target.value)}
                                />
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'email'}>Email</label>
                                <input
                                    value={email ? email : ''}
                                    type={"email"}
                                    id={'email'}
                                    // disabled={true}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'phone'}>Số điện thoại</label>
                                <input
                                    value={phone ? phone : ''}
                                    type={"tel"}
                                    id={'phone'}
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </div>
                            <button className={'saveBtn'} type={"submit"}
                                    onClick={e => handleEditDataUser(e)}>
                                Lưu
                            </button>
                        </form>
                        <div className={'editAvatarWrapper'}>
                            <form className={'editAvatar'}>
                                <div className={'avatarWrapper'}>
                                    <img src={avatarLink ? avatarLink : AVATAR_DEFAULT} alt={''}/>
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
                        <button className={'addAddressBtn'}
                            // onClick={handleShowPopup}
                        >
                            <FaPlus/>
                            <span onClick={e => handleShowPopup('add')}>
                                    Thêm địa chỉ mới
                                </span>
                        </button>
                    </div>
                    <div className={'addressListWrapper'}>
                        <div className={'addressList'}
                             style={{
                                 overflowY: 'scroll',
                                 height: '400px'
                             }}
                        >
                            {addresses.length > 0 ?
                                addresses.map((address, index) => (
                                    <div className={'addressItem'} key={address.id}>
                                        <div className={'addressInfo'}>
                                            <div className={'fullNamePhone'}>
                                                <h3>{address.fullName ? address.fullName : ''}</h3>
                                                <h3>{address.phone ? address.phone : ''}</h3>
                                            </div>
                                            <div className={'address'}>
                                        <span className={'street'}>
                                            {address.street}
                                        </span>
                                                <span className={'detail'}>
                                            {
                                                address.ward + ', '
                                                + address.district + ', '
                                                + address.province
                                            }
                                        </span>
                                            </div>
                                        </div>
                                        <div className={'addressAction'}>
                                            <button
                                                className={'updateAddress'}
                                                type={'button'}
                                                onClick={e => handleShowPopup('update', address)}
                                            >Cập nhật
                                            </button>

                                            {address.default ?
                                                <button className={'setDefaultAddress defaulted'} disabled={true}
                                                >
                                                    Thiết lập mặc định
                                                </button>
                                                :
                                                <button className={'setDefaultAddress'}>Thiết lập mặc định</button>

                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }>
                                    <span>Chưa có địa chỉ nào...</span>
                                </div>
                            }
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

                            <button className={'changePassBtn'}
                                    onClick={e => handleChangePassword(e)}
                            >
                                Đổi Mật Khẩu
                            </button>

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
            <PopupAddress
                showNamePopup={showNamePopup}
                addressData={addressData}
                title={showNamePopup === 'add' ? 'Thêm địa chỉ mới' : 'Cập nhật địa chỉ'}
                isHiddenPopup={isHiddenPopup}
                onClickHiddenPopup={e => setIsHiddenPopup(true)}
                handleSubmit={e => handleAddNewAddress(e)}
                ref={childRef}
            />
        </div>
    )
}
export default AccountDetailContentComponent