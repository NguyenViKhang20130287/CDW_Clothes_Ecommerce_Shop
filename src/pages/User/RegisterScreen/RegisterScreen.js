import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// components
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
// css
import FormEmailComponent from "../../../components/FormEmail/FormEmailComponent";
//
import {register} from '../../../services/apiService'

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("Clicked")
        try {
            const data = await register(email);
            if (data.statusCodeValue === 200) {
                console.log('Data register: ', data)
                navigate('/register-confirm')
            } else
                setError(data.body)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setError(null)
    }, [email])

    return (
        <div className={'registerContainer'}>
            <HeaderComponent/>
            <FormEmailComponent title={'ĐĂNG KÍ'}
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                onClick={e => handleRegister(e)}
                                error={error}
            />
            <FooterComponent/>
        </div>
    )
}

export default RegisterScreen