import React from "react";
// components
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import FormEmailComponent from "../../components/FormEmail/FormEmailComponent";
// CSS

const ForgotPasswordScreen =() =>{
    return(
        <div className={'forgotPasswordContainer'}>
            <HeaderComponent/>
            <FormEmailComponent title={'LẤY LẠI MẬT KHẨU'}/>
            <FooterComponent/>
        </div>
    )
}
export default ForgotPasswordScreen