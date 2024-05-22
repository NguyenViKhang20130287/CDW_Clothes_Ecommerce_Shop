import React, {useState} from "react";
import {Link} from "react-router-dom";
// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
// icons
import {CiUser, CiLock} from "react-icons/ci";
import {FaEye, FaGoogle, FaFacebookF, FaEyeSlash} from "react-icons/fa";
// css
import './LoginScreen.css'

const LoginScreen = () => {
    const [typePassword, setTypePassword] = useState('password')
    const [password, setPassword] = useState('')

    const handleShowHidePassword = (e) => {
        e.preventDefault()
        if (typePassword === 'password') {
            setTypePassword('text')
        } else {
            setTypePassword('password')
        }
    }

    return (
        <div className={'loginContainer'}>
            <div className={'loginWrapper'}>
                <div className={'loginBox'}>
                    <h3 className={'title'}>ĐĂNG NHẬP</h3>
                    <form className={'formGroup'}>
                        <div className={'emailUsername'}>
                            <CiUser/>
                            <input placeholder={'Nhập email hoặc username'} type={'text'}/>
                        </div>
                        <div className={'password'}>
                            <CiLock/>
                            <input placeholder={'Nhập mật khẩu'} type={typePassword}
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                            <button type={'button'} className={'eye'}
                                    onClick={event => handleShowHidePassword(event)}>
                                {password.length > 0 ? typePassword === 'password' ? <FaEye/> : <FaEyeSlash/> : ''}
                            </button>
                        </div>
                        <button type={'submit'} className={'loginBtn'}>ĐĂNG NHẬP</button>
                    </form>
                    <div className={'otherOptions'}>
                        <div className={'register-forgot-wrapper'}>
                            <Link to={'/register'} className={'register'}>
                                Đăng kí
                            </Link>
                            <Link to={'/forgot-password'} className={'forgotPassword'}>
                                Quên mật khẩu
                            </Link>
                        </div>
                        <span className={'span'}>Hoặc</span>
                        <div className={'otherOptionLogins'}>
                            <button type={'button'} className={'optionWrapper facebook'}>
                                <FaFacebookF/>
                            </button>
                            <button type={'button'} className={'optionWrapper google'}>
                                <FaGoogle/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
