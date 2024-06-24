import React, {useEffect, useState} from "react";
import {TbCircleCheck, TbCircleXFilled} from "react-icons/tb";
import './paymentResult.css'
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../../store/actions/cartActions";
import {useLocation, useNavigate} from "react-router-dom";
import ApiService from "../../../services/APIService";
import {addLog} from "../../../services/LogService";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const PaymentResult = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const productByNow = localStorage.getItem('productByNow')
    const [message, setMessage] = useState('')
    const [icon, setIcon] = useState(null)

    const query = useQuery();
    const vnpTransactionStatus = query.get('vnp_TransactionStatus');
    const vnpAmount = query.get('vnp_Amount')
    const orderId = query.get('vnp_TxnRef')
    console.log('Transaction status: ', vnpTransactionStatus)
    console.log('Amount: ', vnpAmount)
    console.log('Order id: ', orderId)

    const handleOnClick = (e) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    const updateStatus = async (status) => {
        const data = {
            "orderId": orderId,
            'status': status
        }
        try {
            const res = await new ApiService().sendData("/order/update-status", data)
            console.log('Response updated status: ', res)
        } catch (e) {
            console.log(e)
        }
    }

    const finishOrder = async () => {
        if (vnpTransactionStatus === '00') {
            console.log('Success')
            setMessage(`Bạn đã thanh toán thánh công số tiền: ${(parseInt(vnpAmount) / 100).toLocaleString('vi-VN') + 'đ'}`)
            setIcon(<TbCircleCheck className={'icon'}/>)
            await updateStatus("Paid");
            await addLog(token, 'Đặt hàng thanh toán bằng phương thức VNPAY thành công')
            if (productByNow === null && cartItems.length > 0) dispatch(clearCart());
        } else {
            console.log('error')
            setMessage('Thanh toán thất bại!')
            setIcon(<TbCircleXFilled className={'icon'} style={{color:'red'}}/>)
            await updateStatus("Canceled")
            await addLog(token, 'Thanh toán thất bại')
        }
    }

    useEffect(() => {
        finishOrder()
    }, []);

    return (
        <div className={'paymentResult-container'}>
            <div className={'paymentResult-wrapper'}>
                <div className={'paymentResult-content'}>
                    {icon}
                    {message &&
                        <p>{message}</p>
                    }
                    <button onClick={e => handleOnClick(e)}>Về trang chủ</button>
                </div>
            </div>
        </div>
    )
}
export default PaymentResult