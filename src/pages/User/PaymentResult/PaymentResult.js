import React, {useEffect, useState} from "react";
import {TbCircleCheck} from "react-icons/tb";
import './paymentResult.css'
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../../store/actions/cartActions";
import {useNavigate} from "react-router-dom";
import ApiService from "../../../services/APIService";
import {addLog} from "../../../services/LogService";

const PaymentResult = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const responsePayment = localStorage.getItem("responsePayment")
    const token = localStorage.getItem("token")
    const handleOnClick = (e) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    const updateStatus = async () => {
        const data = {
            "orderId": JSON.parse(responsePayment).orderId,
            'status': "Paid"
        }
        try {
            const res = await new ApiService().sendData("/order/update-status", data)
            console.log('Response: ', res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (responsePayment !== null && localStorage.getItem("responsePayment") !== null) {
            const parsedResponse = JSON.parse(responsePayment);
            if (parsedResponse.paymentStatus === 'Ok') {
                updateStatus();
                addLog(token, 'Đặt hàng thanh toán bằng phương thức VNPAY thành công')
                if (cartItems.length > 0) dispatch(clearCart());
                localStorage.removeItem("responsePayment");
            } else {
                navigate('/');
            }
            console.log('Check');
        }
    }, []);

    return (
        <div className={'paymentResult-container'}>
            <div className={'paymentResult-wrapper'}>
                <div className={'paymentResult-content'}>
                    <TbCircleCheck className={'icon'}/>
                    <p>Bạn đã thanh toán thánh công</p>
                    <button onClick={e => handleOnClick(e)}>Về trang chủ</button>
                </div>
            </div>
        </div>
    )
}
export default PaymentResult