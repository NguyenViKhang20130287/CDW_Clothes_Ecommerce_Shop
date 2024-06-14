import React from "react";
import {CiMail} from "react-icons/ci";
import {Link} from "react-router-dom";
import './FornEmailComponent.css'
import './Responsive.css'

const FormEmailComponent = ({title, onChange, value, onClick, error, borderColor}) => {
    return (
        <div className={'formEmailContainer'}>
            <div className={'forgotPasswordWrapper'}>
                <div className={'forgotPasswordBox'}>
                    <h3 className={'title'}>{title}</h3>
                    <form className={'formGroup'}>
                        {error &&
                            <span style={{
                                textAlign: 'left',
                                fontSize: '14px',
                                marginBottom: '5px',
                                color: 'red'
                            }}>{error}</span>
                        }
                        <div className={'email'} style={{borderColor:borderColor}}>
                            <CiMail/>
                            <input placeholder={'Nhập email'}
                                   type={'text'}
                                   onChange={onChange}
                                   value={value}/>
                        </div>

                        <button type={'submit'}
                                className={'forgotPasswordBtn'}
                                onClick={onClick}
                        >NHẬN MÃ OTP
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
export default FormEmailComponent