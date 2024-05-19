import React, {useState} from "react";
import {Link} from "react-router-dom";
// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
// css
import FormEmailComponent from "../../../components/FormEmail/FormEmailComponent";
const RegisterScreen = () =>{
    return (
        <div className={'registerContainer'}>
            <HeaderComponent/>
            <FormEmailComponent title={'ĐĂNG KÍ'}/>
            <FooterComponent/>
        </div>
    )
}

export default RegisterScreen