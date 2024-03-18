import React, {useState} from "react";
// components
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
// css
import './RegisterConfirmScreen.css'
import {CiLock, CiUser} from "react-icons/ci";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link} from "react-router-dom";

const RegisterConfirmScreen = () => {
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
        <div className={'registerConfirmContainer'}>
            <HeaderComponent/>
            <div className={'registerConfirmWrapper'}>
                <div className={'registerConfirmBox'}>
                    <h3 className={'title'}>XÁC NHẬN ĐĂNG KÍ</h3>
                    <form className={'formGroup'}>
                        <div className={'username'}>
                            <CiUser/>
                            <input placeholder={'Nhập username'} type={'text'}/>
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
                        <div className={'password'}>
                            <CiLock/>
                            <input placeholder={'Nhập lại mật khẩu'} type={typePassword}
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                            <button type={'button'} className={'eye'}
                                    onClick={event => handleShowHidePassword(event)}>
                                {password.length > 0 ? typePassword === 'password' ? <FaEye/> : <FaEyeSlash/> : ''}
                            </button>
                        </div>
                        <button type={'submit'} className={'registerConfirmBtn'}>ĐĂNG KÍ</button>
                    </form>
                    <div className={'loginOptionWrapper'}>
                        <Link to={'/login'} className={'login'}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
export default RegisterConfirmScreen