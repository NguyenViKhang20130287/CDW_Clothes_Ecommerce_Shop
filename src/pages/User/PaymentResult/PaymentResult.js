import React, {useEffect} from "react";
import {TbCircleCheck} from "react-icons/tb";
import './paymentResult.css'
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../../store/actions/cartActions";
import {useNavigate} from "react-router-dom";

const PaymentResult = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const paymentVNPay = localStorage.getItem("paymentVNPay")
    const handleOnClick = (e) => {
        e.preventDefault()
        if (cartItems.length > 0) dispatch(clearCart())
        localStorage.removeItem("paymentVNPay")
        navigate('/')
    }

    useEffect(() => {
        if (paymentVNPay === null){
            navigate('/')
        }
    }, [paymentVNPay]);

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