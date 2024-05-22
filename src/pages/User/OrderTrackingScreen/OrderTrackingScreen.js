import React from "react";
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

const OrderTrackingScreen = () => {
    const order = [
        {
            id: 555555,
            userId: 1,
            fullName: 'Nguyễn Huy Hiệp',
            address: 'Ktx khu B ĐHQG TP.HCM, Phường Linh Trung, Thành phố Thủ Đức, TP.Hồ Chí Minh',
            phone: '0869687410',
            email: 'hieppro221992@gmail.com',
            payment_method: 1,
            payment_status: 1,
            total_price: 700000,
            total_amount: 2,
            discount_code_id: 1,
            delivery_status_id: 4,
            shipping_cost: 20000,
            created_at: '2021-01-01 00:00:00',
        },
    ]
    const orderDetails = [
        {
            id: 1,
            orderId: 555555,
            productId: 1,
            size: 'M',
            color: 'Đỏ',
            quantity: 1,
            price: 2050000,
            discount: 0,
            created_at: '2021-01-01 00:00:00',
            product: {
                id: 1,
                category_id: 1,
                name: 'Áo Thun Teelab Local Brand Holiday special " Câu like " Tshirt TS2391',
                thumbnail: img1,
                price: 350000.00,
                quantity: 100,
                sold: 0,
                status: 1,
                created_at: '2024-01-01 00:00:00',
                created_by: 1,
                updated_at: '2024-01-01 00:00:00',
                updated_by: 1,
            }
        }, {
            id: 2,
            orderId: 555555,
            productId: 1,
            size: 'M',
            color: 'Xanh',
            quantity: 1,
            price: 10000,
            discount: 0,
            created_at: '2021-01-01 00:00:00',
            product: {
                id: 1,
                category_id: 1,
                name: 'Áo Thun Teelab Local Brand Holiday special " Câu like " Tshirt TS2391',
                thumbnail: img2,
                price: 350000.00,
                quantity: 100,
                sold: 0,
                status: 1,
                created_at: '2024-01-01 00:00:00',
                created_by: 1,
                updated_at: '2024-01-01 00:00:00',
                updated_by: 1,
            }
        }
    ]
    return (
        <div>
            <div className={'container'}>
                {order.map((item, index) => {
                    const total_price_no_shipping = (item.total_price - item.shipping_cost).toLocaleString("vi-VN");
                    return (
                        <div key={index} className={'tracking-container'}>
                            <div className={'tracking-info'}>
                                <button className={'back-order'}>
                                    <IoIosArrowBack className={'arrow'}></IoIosArrowBack>
                                    <span>TRỞ LẠI</span>
                                </button>
                                <div className={'order-info'}>
                                    <span>MÃ ĐƠN HÀNG #{item.id}</span>
                                    <span className={'divine'}>|</span>
                                    <span className={'tracking-delivery-status'}>
                                        {item.delivery_status_id === 1 ? 'Chưa xác nhận' : item.delivery_status_id === 2 ? 'Đã xác nhận' :
                                            item.delivery_status_id === 3 ? 'Đang giao' : item.delivery_status_id === 4 ? 'Đã giao' : 'Đã hủy'}
                                    </span>
                                </div>
                            </div>

                            <div className={'stepper-container'}>
                                <div className={'stepper'}>
                                    <div className={`stepper-step ${item.delivery_status_id >= 1 ? 'stepper-step--finish' : ''}`}>
                                        <div className={`stepper-step-icon ${item.delivery_status_id >= 1 ? 'stepper-step-icon--finish' : ''}`}>
                                            <CgNotes/>
                                        </div>
                                        <div className={'stepper-step-text'}>Đơn hàng đã đặt</div>
                                        <div className={'stepper-step-date'}>13:19 02-03-2024</div>
                                    </div>
                                    <div className={`stepper-step ${item.delivery_status_id >= 2 ? 'stepper-step--finish' : ''}`}>
                                        <div
                                            className={`stepper-step-icon ${item.delivery_status_id >= 2 ? 'stepper-step-icon--finish' : ''}`}>
                                            <FaRegMoneyBillAlt/></div>
                                        <div className={'stepper-step-text'}>Đơn hàng đã được xác nhận</div>
                                        <div className={'stepper-step-date'}>13:19 02-03-2024</div>
                                    </div>
                                    <div className={`stepper-step ${item.delivery_status_id >= 3 ? 'stepper-step--finish' : ''}`}>
                                        <div
                                            className={`stepper-step-icon ${item.delivery_status_id >= 3 ? 'stepper-step-icon--finish' : ''}`}>
                                            <CiDeliveryTruck/></div>
                                        <div className={'stepper-step-text'}>Đơn hàng đang được giao</div>
                                        <div className={'stepper-step-date'}>11:13 03-03-2024</div>
                                    </div>
                                    <div className={`stepper-step ${item.delivery_status_id >= 4 ? 'stepper-step--finish' : ''}`}>
                                        <div
                                            className={`stepper-step-icon ${item.delivery_status_id >= 4 ? 'stepper-step-icon--finish' : ''}`}>
                                            <RiUserReceived2Line/></div>
                                        <div className={'stepper-step-text '}>Đã nhận được hàng</div>
                                        <div className={'stepper-step-date'}>09:38 08-03-2024</div>
                                    </div>
                                    <div className={'stepper-line'}>
                                        <div className={'stepper-line-background'}></div>
                                        <div className={'stepper-line-foreground'} style={{
                                            width: item.delivery_status_id === 1 ? 'calc(0)' :
                                                item.delivery_status_id === 2 ? 'calc(100% - 850px)' :
                                                    item.delivery_status_id === 3 ? 'calc(100% - 500px)' :
                                                        item.delivery_status_id === 4 ? 'calc(100% - 140px)' : ''
                                        }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={'buy-again-container'}>
                                <div className={'empty'}></div>
                                <div className={'buy-again'}>
                                <button className={'buy-again-btn'}>Mua Lại</button>
                                </div>
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
                                            <div className={'receiver'}> {item.fullName} </div>
                                            <div className={'phone-address'}>
                                                <span>{item.phone}</span>
                                                <br/>
                                                <span>{item.address}</span>
                                            </div>
                                        </div>
                                        <div className={'delivery-mini-container'}>
                                            <div className={'delivery-item'}>
                                                <div className={'delivery-content'}>
                                                    <div className={'delivery-image'}>
                                                        <img src={check} alt="Đã giao"/>
                                                    </div>
                                                    <div className={'delivery-time'}>13:19 02-03-2024</div>
                                                    <div className={'delivery-status-content'}>
                                                        <p className={'delivery-status-title'}>Đã giao</p>
                                                        <p>Đơn hàng đã được giao thành công
                                                            <div>
                                                                <span>Người nhận hàng: Nguyễn Huy Hiệp. </span>
                                                            </div>
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'delivery-item'}>
                                                <div className={'delivery-line'}></div>
                                                <div className={'delivery-content'}>
                                                    <div className={'delivery-image'}>
                                                        <img src={transit} alt="Đang vận chuyển"/>
                                                    </div>
                                                    <div className={'delivery-time'}>13:19 02-03-2024</div>
                                                    <div className={'delivery-status-content'}>
                                                        <p className={'delivery-status-title'}>Đang vận chuyển</p>
                                                        <p>Đơn hàng đã được giao thành công</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'delivery-item'}>
                                                <div className={'delivery-line'}></div>
                                                <div className={'delivery-content'}>
                                                    <div className={'delivery-image'}>
                                                        <img src={prepared} alt="Đang được chuẩn bị"/>
                                                    </div>
                                                    <div className={'delivery-time'}>13:19 02-03-2024</div>
                                                    <div className={'delivery-status-content'}>
                                                        <p className={'delivery-status-title'}>Đang được chuẩn bị</p>
                                                        <p>Đơn hàng đã được giao thành công</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'delivery-item'}>
                                                <div className={'delivery-line'}></div>
                                                <div className={'delivery-content'}>
                                                    <div className={'delivery-image'}>
                                                        <img src={order_place} alt="Đặt thành công"/>
                                                    </div>
                                                    <div className={'delivery-time'}>13:19 02-03-2024</div>
                                                    <div className={'delivery-status-content'}>
                                                        <p className={'delivery-status-title'}>Đặt thành công</p>
                                                        <p>Đơn hàng đã được giao thành công</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'tracking-product-container'}>
                                {orderDetails.filter(detail => detail.orderId === item.id).map((detail, detailIndex) => {
                                    const sale_price = (detail.product.price - (detail.product.price * detail.discount / 100)).toLocaleString('vi-VN');
                                    return (
                                        <a className={'tracking-mini-container'} key={detailIndex} href="">
                                            <div className={'tracking-product'}>
                                                <img className={'tracking-product-image'} src={detail.product.thumbnail}
                                                     alt={detail.product.name}/>
                                                <div className={'tracking-product-info'}>
                                                    <div>
                                                        <span
                                                            className={'tracking-product-name'}>{detail.product.name}</span>
                                                    </div>
                                                    <div>
                                                        <div className={'tracking-product-size-color'}>
                                                            {detail.color} / {detail.size}
                                                        </div>
                                                        <div
                                                            className={'tracking-product-quantity'}>x{detail.quantity}</div>
                                                        <span className={'tracking-product-return'}>Trả hàng miễn phí 15 ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'tracking-price-big-container'}>
                                                <div className={'tracking-price-container'}>
                                                    <span className={'tracking-original-price'}>{sale_price}</span>
                                                    <span
                                                        className={'tracking-current-price'}>{detail.price.toLocaleString("vi-VN")}</span>
                                                </div>

                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                            <div className={'all-cost-container'}>
                                <div className={'cost'}>
                                    <div className={'cost-title'}>
                                        <span>Tổng tiền hàng</span>
                                    </div>
                                    <div className={'cost-price'}>
                                        <div>{total_price_no_shipping}</div>
                                    </div>
                                </div>
                                <div className={'cost'}>
                                    <div className={'cost-title'}>
                                        <span>Phí vận chuyển</span>
                                    </div>
                                    <div className={'cost-price'}>
                                        <div>{item.shipping_cost.toLocaleString('vi-Vn')}</div>
                                    </div>
                                </div>
                                <div className={'cost'}>
                                    <div className={'cost-title'}>
                                        <span>Giảm giá vận chuyển</span>
                                    </div>
                                    <div className={'cost-price'}>
                                        <div>15.000</div>
                                    </div>
                                </div>
                                <div className={'cost'}>
                                    <div className={'cost-title'}>
                                        <span>Tổng tiền hàng</span>
                                    </div>
                                    <div className={'cost-price'}>
                                        <div>{item.total_price.toLocaleString('vi-VN')}</div>
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
                                        <div> Thanh toán khi nhận hàng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default OrderTrackingScreen
