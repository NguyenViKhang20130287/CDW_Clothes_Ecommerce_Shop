import React, {useEffect, useState} from "react";
// icon
import {MdOutlinePayment} from "react-icons/md";
import {TbLoader3} from "react-icons/tb";
// css
import "./OrderScreen.css";
import {Box, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@mui/styles";
import VNPAY_IMG from '../../../assets/img/vnpay-seeklogo.svg'
import P_IMG from '../../../assets/img/shirt1.webp'
import {fetchData, fetchDataShipping} from "../../../services/AddressApiService";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import ApiService from "../../../services/APIService";

const useStyles = makeStyles({
    root: {
        '& .MuiInputLabel-root': {
            fontSize: '14px'
        },
        '& .MuiInputBase-input': {
            fontSize: '14px',
        },
    }
});

const OrderScreen = () => {
    const classes = useStyles();
    const [selectedMethod, setSelectedMethod] = useState('COD')
    const [selectedShippingCost, setSelectedShippingCost] = useState('1')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [provinces, setProvinces] = useState([])
    const [province, setProvince] = useState({})
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState({})
    const [wards, setWards] = useState([])
    const [ward, setWard] = useState({})
    const [userLogged, setUserLogged] = useState(null)
    const token = localStorage.getItem('token')
    const [inputIsValid, setInputIsValid] = useState(false)
    const [loading, setLoading] = useState(true)
    const [shippingCost, setShippingCost] = useState(0)
    const cartItems = useSelector(state => state.root.cart);
    const [discountCode, setDiscountCode] = useState('')
    const [discountPrice, setDiscountPrice] = useState(0)
    const [provisionalAmount, setProvisionalAmount] = useState(0)
    const [totalMoney, setTotalMoney] = useState(0)
    const navigate = useNavigate()
    let hasNotify = false

    const fetchDataProvince = async () => {
        try {
            const data = await fetchData('province')
            setProvinces(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChangeProvince = async (provinceId) => {
        // console.log('Id selected: ', provinceId)
        setDistricts([])
        setWard([])
        setShippingCost(0)
        const selected = provinces.find(province => province.ProvinceID === provinceId);
        setProvince(selected)
        try {
            const res = await fetchData('district', {
                province_id: provinceId
            })
            // console.log('Districts: ', res)
            setDistricts(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChangeDistrict = async (districtId) => {
        // console.log('id selected: ', districtId)
        const selected = districts.find(dis => dis.DistrictID === districtId);
        setDistrict(selected)
        try {
            const data = await fetchData('ward', {
                district_id: districtId
            })
            // console.log('Wards: ', data)
            setWards(data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleOnChangeWard = async (wardCode) => {
        // console.log('id selected: ', wardCode)
        const selected = wards.find(ward => ward.WardCode === wardCode);
        setWard(selected)
    }

    const checkValueInput = async () => {
        if (fullName !== '' && phone !== '' && street !== '' &&
            Object.keys(province).length > 0 && Object.keys(district).length > 0 &&
            Object.keys(ward).length > 0) {
            setLoading(false)
            await fetchShippingCost(district.DistrictID, ward.WardCode)
            setInputIsValid(true);
            setTimeout(() => {
                setLoading(true)
            }, 1000)
        } else {
            setLoading(false)
            setTimeout(() => {
                setLoading(true)
                setInputIsValid(false);
            }, 1000)
        }
    }

    const fetchShippingCost = async (fromDistrictId, fromWardId) => {
        try {
            const res = await fetchDataShipping(fromDistrictId, fromWardId)
            // console.log('Res: ', res.data)
            setShippingCost(res.data.total)
        } catch (e) {
            console.log(e)
        }
    }

    const expiredDateValid = (startDate, endDate) => {
        const currentDate = moment();
        const start = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
        const end = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
        return currentDate.isBetween(start, end, 'minutes', '[]');
    }

    const checkPromotions = (promotions, originPrice, price) => {
        if (promotions && promotions.length > 0) {
            const promotion = promotions.find(promotion => promotion.status === true);
            if (expiredDateValid(promotion.startDate, promotion.endDate)) {
                price = originPrice * ((100 - promotion.discount_rate) / 100)
            } else {
                price = originPrice
            }
        } else price = originPrice
        return price
    }

    const formattedPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    const handleCheckDiscountCode = async () => {
        try {
            const res = await new ApiService().fetchData('/discount-code/check',
                null, {code: discountCode})
            // console.log('res: ', Object.keys(res).length)
            if (Object.keys(res).length === 0) {
                toast.error('Mã giảm giá không hợp lệ !')
                return
            }
            console.log('Res: ', res)

            if (res.discountRate === 0) {
                setDiscountPrice(res.discountMoney)
            } else {
                setDiscountPrice(res.discountRate * provisionalAmount)
            }
            toast.success('Áp dụng mã giảm giá thành công')
        } catch (e) {
            console.log(e)
        }
    }

    const handleOnClickCheckCode = async(e) =>{
        e.preventDefault()
        await handleCheckDiscountCode()
    }

    useEffect(() => {
        fetchDataProvince()
    }, []);

    useEffect(() => {
        checkValueInput()
    }, [fullName, phone, street, province, district, ward]);

    useEffect(() => {
        let totalAmount = 0
        cartItems.forEach((item, index) => {
            console.log('Item: ', item)
            const promotions = item.product.promotions
            let price = null
            let originPrice = item.product.price
            price = checkPromotions(promotions, originPrice, price)
            totalAmount += price * item.quantity
        })
        setProvisionalAmount(totalAmount)
    }, [cartItems]);

    useEffect(() => {
        setTotalMoney(provisionalAmount + shippingCost - discountPrice)
    }, [discountPrice, provisionalAmount, shippingCost]);

    useEffect(() => {
        // console.log(hasNotify)
        if (!hasNotify) {
            if (cartItems.length === 0) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                hasNotify = true
                setTimeout(() => {
                    toast.error('Chưa có sản phẩm nào trong giỏ hàng !')
                    navigate('/cart');
                }, 500)
            }
        }
    }, [cartItems]);

    // console.log('Province list: ', provinces)
    // console.log('Province: ', Object.keys(province).length === 0)
    // console.log('District list: ', districts)
    // console.log('District: ', district)
    // console.log('Ward list: ', wards)
    // console.log('Ward: ', ward)
    // console.log('Checked: ', inputIsValid)
    console.log('ship cost: ', shippingCost)
    // console.log('cart: ', cartItems)
    // console.log('discount money: ', discountPrice)
    // console.log('ProvisionalAmount: ', provisionalAmount)
    // console.log('Total: ', totalMoney)

    return (
        <>
            <div className={'orderContainer'}>
                <div className={'orderWrapper'}>
                    <div className={'orderInfoUserAddress'}>

                        <div className={'title'}>
                            <p>Thông tin nhận hàng</p>
                        </div>

                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className={'boxWrapper'}
                        >

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'addressBook'}
                                    label={'Sổ địa chỉ'}
                                    name={'addressBook'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    select
                                >
                                    <MenuItem>
                                        Default
                                    </MenuItem>
                                </TextField>
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'fullName'}
                                    label={'Họ và Tên'}
                                    name={'fullName'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                />
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'phone'}
                                    label={'Số Điện Thoại'}
                                    name={'phone'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'street'}
                                    label={'Địa chỉ cụ thể'}
                                    name={'street'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    value={street}
                                    onChange={e => setStreet(e.target.value)}
                                />
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    select
                                    id={'addressProvince'}
                                    label={'Tỉnh/TP'}
                                    name={'province'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    defaultValue={''}
                                    onChange={e => handleOnChangeProvince(e.target.value)}
                                >
                                    {(provinces && provinces.length > 0) ?
                                        provinces.map((province) => {
                                            return (
                                                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                        <MenuItem>DEFULT</MenuItem>
                                    }

                                </TextField>
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'addressDistrict'}
                                    label={'Quận/Huyện'}
                                    name={'district'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    select
                                    defaultValue={''}
                                    onChange={e => handleOnChangeDistrict(e.target.value)}
                                >
                                    {(districts && districts.length > 0 && districts.length < 719) ?
                                        districts.map((dis) => {
                                            return (
                                                <MenuItem key={dis.DistrictID} value={dis.DistrictID}>
                                                    {dis.DistrictName}
                                                </MenuItem>
                                            )
                                        }) : <MenuItem>DEFAULT</MenuItem>
                                    }
                                </TextField>
                            </div>

                            <div className={'formControl'}>
                                <TextField
                                    required
                                    id={'addressWard'}
                                    label={'Phường/Xã'}
                                    name={'ward'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    size={'small'}
                                    className={classes.root}
                                    select
                                    defaultValue={''}
                                    onChange={e => handleOnChangeWard(e.target.value)}
                                >
                                    {(wards && wards.length > 0) ?
                                        wards.map((ward) => {
                                            return (
                                                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                                    {ward.WardName}
                                                </MenuItem>
                                            )
                                        }) : <MenuItem>DEFAULT</MenuItem>
                                    }
                                </TextField>
                            </div>

                        </Box>

                    </div>
                    <div className={'orderPaymentMethod'}>

                        <div className={'orderShipping'}>
                            <div className={'title'}>
                                <p>Vận chuyển</p>
                            </div>

                            <div className={'messageCheckInput'}>
                                <div className={'messageWarning'} hidden={inputIsValid}>
                                    <p>Vui lòng nhập đầy đủ thông tin nhận hàng !</p>
                                </div>

                                <div className={'messageSuccess'} hidden={!inputIsValid}>
                                    <div>
                                        <input type={"radio"} id={'shippingChecked'}
                                               value={'1'}
                                               checked={selectedShippingCost === '1'}
                                               onChange={e => setSelectedShippingCost(e.target.value)}
                                        />
                                        <label htmlFor={'shippingChecked'}>Giao hàng thông thường</label>
                                    </div>
                                    {
                                        (shippingCost && shippingCost > 0) ?
                                            <p>{shippingCost}đ</p>
                                            : <p>0đ</p>
                                    }

                                    <div className={'messageSuccessLoading'} hidden={loading}>
                                        <TbLoader3 className={'loader'}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={'payment'}>
                            <div className={'title'}>
                                <p>Phương thức thanh toán</p>
                            </div>

                            <form className={'paymentSelector'}>
                                <div className={'paymentWrapper'}>
                                    <div className={'radioWrapper'}>
                                        <input type={"radio"}
                                               id={'cod'}
                                               value={'COD'}
                                               name={'payment'}
                                               checked={selectedMethod === 'COD'}
                                               onChange={e => setSelectedMethod(e.target.value)}
                                        />
                                        <label htmlFor={'cod'}>Thanh toán khi nhận hàng (COD)</label>
                                    </div>
                                    <MdOutlinePayment/>
                                </div>
                                <div className={'paymentWrapper'}>
                                    <div className={'radioWrapper'}>
                                        <input
                                            type={"radio"}
                                            id={'VNPay'}
                                            value={'VNPAY'}
                                            name={'payment'}
                                            checked={selectedMethod === 'VNPAY'}
                                            onChange={e => setSelectedMethod(e.target.value)}
                                        />
                                        <label htmlFor={'VNPay'}>Thanh toán với VNPAY</label>
                                    </div>
                                    <div className={'VNPayImgWrapper'}>
                                        <img src={VNPAY_IMG} alt={''}/>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className={'orderDetails'}>

                        <div className={'title'}>
                            <p>Đơn hàng ({cartItems.length} sản phẩm)</p>
                        </div>

                        <div className={'orderProducts'}>
                            {cartItems && cartItems.length > 0 &&
                                cartItems.map((item) => {
                                    const promotions = item.product.promotions
                                    let price = null
                                    let originPrice = item.product.price
                                    price = checkPromotions(promotions, originPrice, price)
                                    return (
                                        <div className={'orderProductsItem'} key={item.product.id}>
                                            <div className={'orderProductsItemImgWrapper'}>
                                                <img src={item.product.thumbnail} alt={''}/>
                                            </div>
                                            <div className={'orderProductsItemDetail'}>
                                                <p>{item.product.name}</p>
                                                <span>x{item.quantity}, {item.selectedColor} / {item.selectedSize}</span>
                                            </div>
                                            <div className={'orderProductsItemPrice'}>
                                                <p>{formattedPrice(Math.round(price * item.quantity))}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className={'discountCode'}>
                            <input
                                type={"text"}
                                placeholder={'Nhập mã giảm giá'}
                                value={discountCode}
                                onChange={e => setDiscountCode(e.target.value)}
                            />
                            <button
                                className={'applyCodeBtn'}
                                onClick={e => handleOnClickCheckCode(e)}
                            >Áp Mã
                            </button>
                        </div>

                        <div className={'price'}>
                            <div className={'provisionalAmount item'}>
                                <p>Số tiền tạm tính</p>
                                <p>{formattedPrice(provisionalAmount)}</p>
                            </div>
                            <div className={'shippingCost item'}>
                                <p>Phí vận chuyển</p>
                                <p>{formattedPrice(shippingCost)}</p>
                            </div>
                            <div className={'discountPrice item'}>
                                <p>Mã khuyến mãi</p>
                                <p>-{formattedPrice(discountPrice)}</p>
                            </div>
                        </div>

                        <div className={'totalPrice'}>
                            <p>Tổng tiền</p>
                            <p>{formattedPrice(totalMoney)}</p>
                        </div>

                        <div className={'orderSubmitBtn'}>
                            <button>Đặt hàng</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderScreen;
