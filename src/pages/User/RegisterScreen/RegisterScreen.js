import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//
import FormEmailComponent from "../../../components/FormEmail/FormEmailComponent";
// services
import ApiService from "../../../services/APIService";

const RegisterScreen = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errorColor, setErrorColor] = useState("#999999FF");
    const [isLoaded, setIsLoaded] = useState(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoaded(false)
        if (!emailRegex.test(email)) {
            setErrorColor("red");
            toast.error("Địa chỉ email không hợp lệ!")
            return;
        }
        try {
            const data = await new ApiService().sendData("/auth/register", null, {email: email});
            if (data.statusCodeValue === 200) {
                localStorage.setItem("emailRegistered", email);
                toast.success("OTP đã gửi về email của bạn", {
                    onClose: () => navigate("/register-confirm")
                });
                setIsLoaded(true)
                navigate("/register-confirm");
            } else {
                toast.error(data.body)
                setIsLoaded(true)
            }
        } catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    useEffect(() => {
        setError(null);
        setErrorColor("#999999FF");
    }, [email]);

    return (
        <div className="registerContainer">
            <FormEmailComponent
                title="ĐĂNG KÍ"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onClick={handleRegister}
                error={error}
                borderColor={errorColor}
                isLoaded={isLoaded}
            />
        </div>
    );
};

export default RegisterScreen;
