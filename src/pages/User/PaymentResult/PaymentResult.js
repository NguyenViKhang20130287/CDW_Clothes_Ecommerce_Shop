import React, {useEffect, useState} from "react";
import {TbCircleCheck} from "react-icons/tb";
import './paymentResult.css'
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../../store/actions/cartActions";
import {useNavigate} from "react-router-dom";
import ApiService from "../../../services/APIService";
import {addLog} from "../../../services/LogService";
import localStorage from "redux-persist/es/storage";

const PaymentResult = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const responsePayment = localStorage.getItem("responsePayment")
    const token = localStorage.getItem("token")
    console.log('Token: ', token)
    console.log('Response: ', responsePayment)
    const handleOnClick = (e) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    const updateStatus = async () => {
        const data = {
            "orderId": JSON.parse(await responsePayment).orderId,
            'status': "Paid"
        }
        try {
            const res = await new ApiService().sendData("/order/update-status", data)
            console.log('Response: ', res)
        } catch (e) {
            console.log(e)
        }
    }

    const finishOrder = async () => {
        if (responsePayment !== null) {
            console.log('Res: ', responsePayment)

            const parsedResponse = JSON.parse(await responsePayment);
            if (parsedResponse.paymentStatus === 'Ok') {
                await updateStatus();
                await addLog(JSON.parse(token), 'Đặt hàng thanh toán bằng phương thức VNPAY thành công')
                if (cartItems.length > 0 && localStorage.getItem('productByNow') === null) dispatch(clearCart());
                localStorage.removeItem("responsePayment");
            } else {
                navigate('/');
            }
            console.log('Check');
        }
    }

    useEffect(() => {
            finishOrder()
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