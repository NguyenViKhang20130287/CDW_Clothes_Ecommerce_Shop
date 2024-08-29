import React, {useState} from "react";
import {CiLock, CiMail} from "react-icons/ci";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
//
import './ForgotPasswordConfirm.css'
import './Responsive.css'
// services
import APIService from "../../../services/APIService";
import {TbLoader3} from "react-icons/tb";

const ForgotPasswordConfirm = () => {
    const [typePassword, setTypePassword] = useState('password')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoaded, setIsLoaded] = useState(true)
    const navigate = useNavigate()

    const handleShowHidePassword = (e) => {
        e.preventDefault()
        if (typePassword === 'password') {
            setTypePassword('text')
        } else {
            setTypePassword('password')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoaded(false)
        if (rePassword !== password) {
            setIsLoaded(true)
            toast.error('Mật khẩu nhập lại không trùng khớp!')
            return
        }
        if (password.length < 6) {
            setIsLoaded(true)
            toast.error('Mật khẩu phải dài hơn 6 kí tự !')
            return
        }
        const data = {
            email: localStorage.getItem('emailForgot'),
            otp: otp,
            newPassword: password
        }
        // console.log('Data: ', data)
        try {
            const res = await new APIService().sendData("/auth/forgot-password/reset", data)
            // console.log('Response reset password: ', res)
            if (res.statusCodeValue === 200) {
                toast.success('Thay đổi mật khẩu thành công')
                localStorage.removeItem('emailForgot')
                setIsLoaded(true)
                navigate('/login')
            } else {
                setIsLoaded(true)
                toast.error(res.body)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'forgotPasswordConfirmContainer'}>
            <div className={'forgotPasswordConfirmWrapper'}>
                <div className={'forgotPasswordConfirmBox'}>
                    <h3 className={'title'}>ĐẶT LẠI MẬT KHẨU</h3>
                    <form className={'formGroup'}>
                        <div className={'otp'}>
                            <CiMail/>
                            <input placeholder={'Nhập OTP'}
                                   type={"text"}
                                   onChange={e => setOtp(e.target.value)}
                                   value={otp}
                            />
                        </div>
                        <div className={'password'}>
                            <CiLock/>
                            <input placeholder={'Nhập mật khẩu mới'} type={typePassword}
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                            <button type={'button'} className={'eye'}
                                    onClick={event => handleShowHidePassword(event)}>
                                {password.length > 0 ? typePassword === 'password' ? <FaEye/> : <FaEyeSlash/> : ''}
                            </button>
                        </div>
                        <div className={'password'}>
                            <CiLock/>
                            <input placeholder={'Nhập lại mật khẩu mới'} type={typePassword}
                                   value={rePassword}
                                   onChange={event => setRePassword(event.target.value)}/>
                            <button type={'button'} className={'eye'}
                                    onClick={event => handleShowHidePassword(event)}>
                                {password.length > 0 ? typePassword === 'password' ? <FaEye/> : <FaEyeSlash/> : ''}
                            </button>
                        </div>
                        <button type={'submit'}
                                className={'forgotPasswordConfirmBtn'}
                                onClick={e => handleSubmit(e)}
                        >
                            <span hidden={!isLoaded}>ĐẶT LẠI MẬT KHẨU</span>
                            <div className={'loginLoader'} hidden={isLoaded}>
                                <TbLoader3 className={'icon'}/>
                            </div>
                        </button>
                    </form>
                    <div className={'loginOptionWrapper'}>
                        <Link to={'/login'} className={'login'}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPasswordConfirm
