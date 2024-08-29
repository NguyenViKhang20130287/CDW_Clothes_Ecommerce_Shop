import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
// components
import FormEmailComponent from "../../../components/FormEmail/FormEmailComponent";
// services
import ApiService from "../../../services/APIService";

const ForgotPasswordScreen = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [errorColor, setErrorColor] = useState("#999999FF");
    const [isLoaded, setIsLoaded] = useState(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoaded(false)
        if (!emailRegex.test(email)) {
            setErrorColor("red");
            toast.error('Địa chỉ email không hợp lệ!')
            return;
        }
        try {
            console.log(email)
            const data =
                await new ApiService().sendData("/auth/forgot-password", null, {email: email})
            if (data.statusCodeValue === 200) {
                localStorage.setItem("emailForgot", email);
                setIsLoaded(true)
                toast.success("OTP xác nhận quên mật khẩu đã gửi về email của bạn");
                navigate("/forgot-password-confirm");
            } else {
                setIsLoaded(true)
                toast.error('Email không tồn tại!')
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setErrorColor("#999999FF");
    }, [email]);

    return (
        <div className={'forgotPasswordContainer'}>
            <FormEmailComponent
                title={'LẤY LẠI MẬT KHẨU'}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onClick={handleRegister}
                borderColor={errorColor}
                isLoaded={isLoaded}
            />
        </div>
    )
}
export default ForgotPasswordScreen
