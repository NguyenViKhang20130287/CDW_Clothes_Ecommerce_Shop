import React from "react";
import {CiMail} from "react-icons/ci";
import {Link} from "react-router-dom";
import './FornEmailComponent.css'

const FormEmailComponent =({title}) =>{
    return(
        <div className={'formEmailContainer'}>
            <div className={'forgotPasswordWrapper'}>
                <div className={'forgotPasswordBox'}>
                    <h3 className={'title'}>{title}</h3>
                    <form className={'formGroup'}>
                        <div className={'email'}>
                            <CiMail/>
                            <input placeholder={'Nhập email'} type={'text'}/>
                        </div>
                        <button type={'submit'} className={'forgotPasswordBtn'}>NHẬN MÃ OTP</button>
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