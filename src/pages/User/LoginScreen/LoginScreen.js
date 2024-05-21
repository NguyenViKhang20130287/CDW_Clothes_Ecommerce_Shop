import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from '../../../services/apiService'
// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
// icons
import {CiUser, CiLock} from "react-icons/ci";
import {FaEye, FaGoogle, FaFacebookF, FaEyeSlash} from "react-icons/fa";
// css
import './LoginScreen.css'
import toast from "react-hot-toast";

const LoginScreen = () => {
    const [typePassword, setTypePassword] = useState('password')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleShowHidePassword = (e) => {
        e.preventDefault()
        if (typePassword === 'password') {
            setTypePassword('text')
        } else {
            setTypePassword('password')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userData = {
                username: username,
                password: password
            }
            console.log('User data: ', userData)
            const res = await login(userData)
            console.log('Login Data: ', res)
            if (res.statusCodeValue === 200) {
                localStorage.setItem("token", res.body.token)
                toast.success('Đăng nhập thành công', {
                    onClose: () => {
                        setTimeout(() => {
                            navigate('/');
                        }, 10000);
                    }
                });
                navigate('/');
            } else {
                toast.error(res.body)
            }
        } catch (error) {
            console.log(error)
        }
        console.log('clicked')
    }

    return (
        <div className={'loginContainer'}>
            <HeaderComponent/>
            <div className={'loginWrapper'}>
                <div className={'loginBox'}>
                    <h3 className={'title'}>ĐĂNG NHẬP</h3>
                    <form className={'formGroup'}>
                        <div className={'emailUsername'}>
                            <CiUser/>
                            <input
                                placeholder={'Nhập email hoặc username'}
                                type={'text'}
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
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
                        <button type={'submit'}
                                className={'loginBtn'}
                                onClick={e => handleLogin(e)}
                        >ĐĂNG NHẬP
                        </button>
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
            <FooterComponent/>
        </div>
    )
}

export default LoginScreen