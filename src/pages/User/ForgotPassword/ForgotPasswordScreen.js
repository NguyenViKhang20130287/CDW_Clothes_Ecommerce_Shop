import React from "react";
import {useState, useEffect} from "react";
// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
import FormEmailComponent from "../../../components/FormEmail/FormEmailComponent";
import {useNavigate} from "react-router-dom";
import {forgotPassword} from "../../../services/apiService";
import toast from "react-hot-toast";
// CSS

const ForgotPasswordScreen =() =>{

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [errorColor, setErrorColor] = useState("#999999FF");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            setErrorColor("red");
            toast.error('Địa chỉ email không hợp lệ!')
            return;
        }
        try {
            const data = await forgotPassword(email);
            if (data.statusCodeValue === 200) {
                localStorage.setItem("emailForgot", email);
                toast.success("OTP xác nhận quên mật khẩu đã gửi về email của bạn", {
                    onClose: () => navigate("/forgot-password-confirm")
                });
                navigate("/forgot-password-confirm");
            } else {
                toast.error('Email không tồn tại!')
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setErrorColor("#999999FF");
    }, [email]);

    return(
        <div className={'forgotPasswordContainer'}>
            <FormEmailComponent
                title={'LẤY LẠI MẬT KHẨU'}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onClick={handleRegister}
                borderColor={errorColor}
            />
        </div>
    )
}
export default ForgotPasswordScreen
