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
import {fetchData} from "../../../services/AddressApiService";

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
    const [selectedMethod, setSelectedMethod] = useState('cod')
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


    // fetch data province
    const fetchDataProvince = async () => {
        try {
            const data = await fetchData('province')
            setProvinces(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChangeProvince = async (provinceId) => {
        console.log('Id selected: ', provinceId)
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
        console.log('id selected: ', wardCode)
        const selected = wards.find(ward => ward.WardCode === wardCode);
        setWard(selected)
    }

    const checkValueInput = () => {
        if (fullName !== '' && phone !== '' && street !== '' &&
            Object.keys(province).length > 0 && Object.keys(district).length > 0 &&
            Object.keys(ward).length > 0) {
            setLoading(false)
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

    useEffect(() => {
        fetchDataProvince()
    }, []);

    useEffect(() => {
        checkValueInput()
    }, [fullName, phone, street, province, district, ward]);

    // console.log('Province list: ', provinces)
    // console.log('Province: ', Object.keys(province).length === 0)
    // console.log('District list: ', districts)
    // console.log('District: ', district)
    // console.log('Ward list: ', wards)
    // console.log('Ward: ', ward)
    // console.log('Checked: ', inputIsValid)

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
                                    <p>20.000đ</p>

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
                                               value={'cod'}
                                               name={'payment'}
                                               checked={selectedMethod === 'cod'}
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
                                            value={'vnpay'}
                                            name={'payment'}
                                            checked={selectedMethod === 'vnpay'}
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
                            <p>Đơn hàng (10 sản phẩm)</p>
                        </div>

                        <div className={'orderProducts'}>
                            <div className={'orderProductsItem'}>
                                <div className={'orderProductsItemImgWrapper'}>
                                    <img src={P_IMG} alt={''}/>
                                </div>
                                <div className={'orderProductsItemDetail'}>
                                    <p>Áo Khoác Gió Teelab Local Brand Unisex Color Block Patchwork Logo Printed Jacket
                                        AK107</p>
                                    <span>x20, Đen/XL</span>
                                </div>
                                <div className={'orderProductsItemPrice'}>
                                    <p>500.000đ</p>
                                </div>
                            </div>
                        </div>

                        <div className={'discountCode'}>
                            <input type={"text"} placeholder={'Nhập mã giảm giá'}/>
                            <button className={'applyCodeBtn'}>Áp Mã</button>
                        </div>

                        <div className={'price'}>
                            <div className={'provisionalAmount item'}>
                                <p>Số tiền tạm tính</p>
                                <p>1.000.000đ</p>
                            </div>
                            <div className={'shippingCost item'}>
                                <p>Phí vận chuyển</p>
                                <p>20.000đ</p>
                            </div>
                            <div className={'discountPrice item'}>
                                <p>Mã khuyến mãi</p>
                                <p>-50.000đ</p>
                            </div>
                        </div>

                        <div className={'totalPrice'}>
                            <p>Tổng tiền</p>
                            <p>11.000.000đ</p>
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
