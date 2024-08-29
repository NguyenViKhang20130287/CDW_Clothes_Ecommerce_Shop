import React, {useEffect, useState} from "react";
//  com
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
// css
import './OrderTrackingScreen.css'
// icon
import {IoIosArrowBack} from "react-icons/io";
import {CgNotes} from "react-icons/cg";
import {FaRegMoneyBillAlt} from "react-icons/fa";
import {CiDeliveryTruck} from "react-icons/ci";
import {RiUserReceived2Line} from "react-icons/ri";
//
import img1 from '../../../assets/img/ProductDetailSlider/BigSlider/BigSlider1.webp'
import img2 from '../../../assets/img/ProductDetailSlider/BigSlider/BigSlider3.webp'
import check from '../../../assets/img/Tracking/delivered_parcel_active_3x.png';
import transit from '../../../assets/img/Tracking/domestic_transit_3x.png';
import prepared from '../../../assets/img/Tracking/preparing_to_ship_3x.png';
import order_place from '../../../assets/img/Tracking/order_placed_3x.png';
import {useParams} from "react-router-dom";
import ApiService from "../../../services/APIService";
import {TbLoader3} from "react-icons/tb";

const OrderTrackingScreen = () => {

    const {id} = useParams();
    const [order, setOrder] = useState({})
    const [isLoaded, setIsLoaded] = useState(true);
    const [price, setPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)

    const formattedDate = (dateInput) =>{
        const date = new Date(dateInput);
        const formatted = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString()
            .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${date.getDate().toString()
            .padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        return formatted
    }

    const filterDeliveryStatus = (deliveryStatusId, deliveryStatusHistories) =>{
        return deliveryStatusHistories.find(history => history.deliveryStatus.id === deliveryStatusId)
    }


    const fetchDataOrder = async () => {
        try {
            const res = await new ApiService().fetchData(`/order/${id}`)
            // console.log('Res order by id: ', res)
            setOrder(res)
        } catch (e) {
            console.log('Err fetch data order: ', e)
        }
    }

    const calculatorDiscount = (order) => {
        if (order.discountCode) {
            if (order.discountCode.discountRate > 0) {
                const total = price * (order.discountCode.discountRate / 100)
                setDiscountPrice(total)
            } else {
                setDiscountPrice(order.discountCode.discountMoney)
            }
        } else setDiscountPrice(0)
    }

    const calculatorMoney = (order) => {
        let total = 0;
        order.orderDetails.map(item => (
            total += (item.price * item.quantity)
        ))
        console.log('Total: ', total)
        setPrice(total)
    }

    useEffect(() => {
        setIsLoaded(false)
        setTimeout(async () => {
            await fetchDataOrder()
            setIsLoaded(true)
        }, 1200)
    }, [id]);

    useEffect(() => {
        if (order && Object.keys(order).length > 0) {
            calculatorMoney(order)
            calculatorDiscount(order)
        }
    }, [order]);

    // console.log('Order data: ', order)
    // console.log('Discount: ', order.discountCode.discountRate)
    // console.log('Price: ', price)
    // console.log('Discount Price: ', discountPrice)
    console.log('History: ', order.deliveryStatusHistories)

    return (
        <div>
            <div className={'orderTrackingLoadingWrapper'} hidden={isLoaded}>
                <div className={'content'}>
                    <TbLoader3 className={'icon'}/>
                    <span>Loading...</span>
                </div>
            </div>
            <div className={'container'}>
                {order && Object.keys(order).length > 0 && (
                    // const total_price_no_shipping = (item.totalAmount - item.shippingCost).toLocaleString("vi-VN");
                    <div key={order.id} className={'tracking-container'}>
                        <div className={'tracking-info'}>
                            <button className={'back-order'}>
                                <IoIosArrowBack className={'arrow'}></IoIosArrowBack>
                                <span>TRỞ LẠI</span>
                            </button>
                            <div className={'order-info'}>
                                <span>MÃ ĐƠN HÀNG #{order.id}</span>
                                <span className={'divine'}>|</span>
                                <span className={'tracking-delivery-status'}>
                                        {order.deliveryStatus.id === 1 ? 'Chưa xác nhận' : order.deliveryStatus.id === 2 ? 'Đã xác nhận' :
                                            order.deliveryStatus.id === 3 ? 'Đang giao' : order.deliveryStatus.id === 4 ? 'Đã giao' : 'Đã hủy'}
                                    </span>
                            </div>
                        </div>

                        <div className={'stepper-container'}>
                            <div className={'stepper'}>
                                <div
                                    className={`stepper-step ${order.deliveryStatus.id >= 1 ? 'stepper-step--finish' : ''}`}>
                                    <div
                                        className={`stepper-step-icon ${order.deliveryStatus.id >= 1 ? 'stepper-step-icon--finish' : ''}`}>
                                        <CgNotes/>
                                    </div>
                                    <div className={'stepper-step-text'}>Đơn hàng đã đặt</div>
                                    <div className={'stepper-step-date'}>
                                        {formattedDate(filterDeliveryStatus(1, order.deliveryStatusHistories).createdAt)}
                                    </div>
                                </div>
                                <div
                                    className={`stepper-step ${order.deliveryStatus.id >= 2 ? 'stepper-step--finish' : ''}`}>
                                    <div
                                        className={`stepper-step-icon ${order.deliveryStatus.id >= 2 ? 'stepper-step-icon--finish' : ''}`}>
                                        <FaRegMoneyBillAlt/></div>
                                    <div className={'stepper-step-text'}>Đơn hàng đã được xác nhận</div>
                                    <div className={'stepper-step-date'}>
                                        {filterDeliveryStatus(2, order.deliveryStatusHistories) &&
                                            formattedDate(filterDeliveryStatus(2, order.deliveryStatusHistories).createdAt)}
                                    </div>
                                </div>
                                <div
                                    className={`stepper-step ${order.deliveryStatus.id >= 3 ? 'stepper-step--finish' : ''}`}>
                                    <div
                                        className={`stepper-step-icon ${order.deliveryStatus.id >= 3 ? 'stepper-step-icon--finish' : ''}`}>
                                        <CiDeliveryTruck/></div>
                                    <div className={'stepper-step-text'}>Đơn hàng đang được giao</div>
                                    <div className={'stepper-step-date'}>
                                        {filterDeliveryStatus(3, order.deliveryStatusHistories) &&
                                            formattedDate(filterDeliveryStatus(3, order.deliveryStatusHistories).createdAt)}
                                    </div>
                                </div>
                                <div
                                    className={`stepper-step ${order.deliveryStatus.id >= 4 ? 'stepper-step--finish' : ''}`}>
                                    <div
                                        className={`stepper-step-icon ${order.deliveryStatus.id >= 4 ? 'stepper-step-icon--finish' : ''}`}>
                                        <RiUserReceived2Line/></div>
                                    <div className={'stepper-step-text '}>Đã nhận được hàng</div>
                                    <div className={'stepper-step-date'}>
                                        {filterDeliveryStatus(4, order.deliveryStatusHistories) &&
                                            formattedDate(filterDeliveryStatus(4, order.deliveryStatusHistories).createdAt)}
                                    </div>
                                </div>
                                <div className={'stepper-line'}>
                                    <div className={'stepper-line-background'}></div>
                                    <div className={'stepper-line-foreground'} style={{
                                        width: order.deliveryStatus.id === 1 ? 'calc(0)' :
                                            order.deliveryStatus.id === 2 ? 'calc(100% - 850px)' :
                                                order.deliveryStatus.id === 3 ? 'calc(100% - 500px)' :
                                                    order.deliveryStatus.id === 4 ? 'calc(100% - 140px)' : ''
                                    }}></div>
                                </div>
                            </div>
                        </div>

                        <div className={'buy-again-container'}>
                            <div className={'empty'}></div>
                            {/*<div className={'buy-again'}>*/}
                            {/*    <button className={'buy-again-btn'}>Mua Lại</button>*/}
                            {/*</div>*/}
                        </div>

                        <div className={'address-delivery-big-container'}>
                            <div className={'tracking-line'}>
                                <div className={'line'}></div>
                            </div>
                            <div className={'address-delivery-container'}>
                                <div className={'address-title-thing'}>
                                    <div className={'address-title'}>Địa chỉ giao hàng</div>
                                </div>
                                <div className={'address-delivery'}>
                                    <div className={'address-mini-container'}>
                                        <div className={'receiver'}> {order.fullName} </div>
                                        <div className={'phone-address'}>
                                            <span>{order.phone}</span>
                                            <br/>
                                            <span>{order.address}</span>
                                        </div>
                                    </div>
                                    <div className={'delivery-mini-container'}>
                                        {order.deliveryStatusHistories &&
                                            order.deliveryStatusHistories.map(item => {
                                                return (
                                                    <div className={'delivery-item'} key={item.id}>
                                                        <div className={'delivery-content'}>
                                                            <div className={'delivery-image'}>
                                                                <img src={check} alt="Đã giao"/>
                                                            </div>
                                                            <div className={'delivery-time'}>{formattedDate(item.createdAt)}</div>
                                                            <div className={'delivery-status-content'}>
                                                                <p className={'delivery-status-title'}>{item.deliveryStatus.description}</p>
                                                                <p>Đơn hàng {item.deliveryStatus.description}
                                                                    {item.deliveryStatus.name === 'Delivered' &&
                                                                        <div>
                                                                            <span>Người nhận hàng: {order.fullName} </span>
                                                                        </div>
                                                                    }
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'tracking-product-container'}>
                            {order.orderDetails.map(detail => {
                                return (
                                    <div className={'tracking-mini-container'} key={detail.id}>
                                        <div className={'tracking-product'}>
                                            <img className={'tracking-product-image'} src={detail.product.thumbnail}
                                                 alt={detail.product.name}/>
                                            <div className={'tracking-product-info'}>
                                                <div>
                                                    <span
                                                        className={'tracking-product-name'}>{detail.product.name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className={'tracking-product-size-color'}>
                                                        {detail.color.name} / {detail.size.name}
                                                    </div>
                                                    <div
                                                        className={'tracking-product-quantity'}>x{detail.quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'tracking-price-big-container'}>
                                            <div className={'tracking-price-container'}>
                                                <span className={'tracking-original-price'}>
                                                    {(detail.quantity * detail.product.price).toLocaleString("vi-VN")}
                                                </span>
                                                <span
                                                    className={'tracking-current-price'}>{(detail.price * detail.quantity).toLocaleString("vi-VN")}</span>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        <div className={'all-cost-container'}>
                            <div className={'cost'}>
                                <div className={'cost-title'}>
                                    <span>Tổng tiền hàng</span>
                                </div>
                                <div className={'cost-price'}>
                                    {price && price > 0 &&
                                        <span>{price.toLocaleString('vi-Vn')}</span>
                                    }
                                </div>
                            </div>
                            <div className={'cost'}>
                                <div className={'cost-title'}>
                                    <span>Phí vận chuyển</span>
                                </div>
                                <div className={'cost-price'}>
                                    <div>{order.shippingCost.toLocaleString('vi-Vn')}</div>
                                </div>
                            </div>
                            <div className={'cost'}>
                                <div className={'cost-title'}>
                                    <span>Mã giảm giá</span>
                                </div>
                                <div className={'cost-price'}>
                                    {discountPrice.toLocaleString('vi-Vn')}
                                </div>
                            </div>
                            <div className={'cost'}>
                                <div className={'cost-title'}>
                                    <span>Tổng tiền hàng</span>
                                </div>
                                <div className={'cost-price'}>
                                    <div>{order.totalAmount.toLocaleString('vi-VN')}</div>
                                </div>
                            </div>
                        </div>
                        <div className={'payment-method'}>
                            <div className={'payment-method-container'}>
                                <div className={'payment-method-title'}>
                                       <span>
                                           <span className={'title'}> Phương thức thanh toán</span>
                                       </span>
                                </div>
                                <div className={'payment-method-content'}>
                                    {order.paymentMethod === 'COD' ?
                                        <div> Thanh toán khi nhận hàng</div>
                                        :
                                        <div> Đã được thanh toán VNPAY</div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}
export default OrderTrackingScreen
