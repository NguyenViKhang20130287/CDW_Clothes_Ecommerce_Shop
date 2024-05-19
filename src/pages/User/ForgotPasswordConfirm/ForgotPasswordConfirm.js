import React, {useState} from "react";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
import {CiLock} from "react-icons/ci";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link} from "react-router-dom";
import './ForgotPasswordConfirm.css'

const ForgotPasswordConfirm = () =>{
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
    return(
        <div className={'forgotPasswordConfirmContainer'}>
            <HeaderComponent/>
            <div className={'forgotPasswordConfirmWrapper'}>
                <div className={'forgotPasswordConfirmBox'}>
                    <h3 className={'title'}>ĐẶT LẠI MẬT KHẨU</h3>
                    <form className={'formGroup'}>
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
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                            <button type={'button'} className={'eye'}
                                    onClick={event => handleShowHidePassword(event)}>
                                {password.length > 0 ? typePassword === 'password' ? <FaEye/> : <FaEyeSlash/> : ''}
                            </button>
                        </div>
                        <button type={'submit'} className={'forgotPasswordConfirmBtn'}>ĐẶT LẠI MẬT KHẨU</button>
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
export default ForgotPasswordConfirm