import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Box, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@mui/styles";
import {fetchData} from "../../services/AddressApiService";
import './PopupAddress.css'


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

const PopupAddress = forwardRef((props, ref) => {
    const {
        showNamePopup,
        addressData,
        title,
        isHiddenPopup,
        user,
        onClickHiddenPopup,
        handleSubmit,
        handleEditAddress
    } = props;
    const classes = useStyles();
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [selectedProvince, setSelectedProvince] = useState({})
    const [selectedDistrict, setSelectedDistrict] = useState({})
    const [selectedWard, setSelectedWard] = useState({})

    const [street, setStreet] = useState('')
    const [isDefault, setIsDefault] = useState(false)

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')

    const handleChangeProvince = async (provinceId) => {
        // console.log(provinceId)
        const selected = provinces.find(province => province.ProvinceID === provinceId);
        setSelectedProvince(selected ? selected : null)
        setProvinceId(String(provinceId))
        try {
            const data = await fetchData('district', {
                province_id: provinceId
            })
            // console.log('Data district: ', data)
            setDistricts(data)
            setWards([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeDistrict = async (districtId) => {
        // console.log('District id: ', districtId)
        const selected = districts.find(district => district.DistrictID === districtId);
        setSelectedDistrict(selected ? selected : null)
        setDistrictId(districtId)
        try {
            const data = await fetchData('ward', {
                district_id: districtId
            })
            // console.log('Data ward: ', data)
            setWards(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeWard = async (wardId) => {
        const selected = await wards.find(ward => ward.WardCode === wardId);
        setSelectedWard(selected ? selected : null)
        setWardId(wardId)
    }

    const handleFormSubmit = () => {
        const formData = {
            fullName: fullName,
            phone: phone,
            street: street,
            isDefault: isDefault
        };

        showNamePopup === 'add' ? handleSubmit(formData) : handleEditAddress(formData);
    };

    useImperativeHandle(ref, () => ({
        getData: () => ({
            id: showNamePopup === 'update' ? addressData.id : '',
            fullName: showNamePopup === 'update' ? addressData.fullName : fullName,
            phone: showNamePopup === 'update' ? addressData.phone : phone,
            provinceId: selectedProvince.ProvinceID,
            province: selectedProvince.ProvinceName,
            districtId: selectedDistrict.DistrictID,
            district: selectedDistrict.DistrictName,
            wardId: selectedWard.WardCode,
            ward: selectedWard.WardName,
            street: street,
            default: isDefault
        })
    }));

    const fetchDataProvince = async () => {

        try {
            // console.log('Loading...')
            const data = await fetchData('province')
            // console.log('Data province: ', data)
            setProvinces(data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        if (user) {
            setFullName(user.userInformation.fullName);
            setPhone(user.userInformation.phone)
        }

        fetchDataProvince()


    }, [user, isHiddenPopup])


    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if (showNamePopup === 'add') {
            fetchDataProvince()
            // setDistricts(null)
            // setWards(null)
            setFullName('')
            setPhone('')
            setProvinceId('')
            setDistrictId('')
            setWardId('')
        }
    }, [showNamePopup]);

    const fetchDataAddressDetail = async () => {
        if (showNamePopup === 'update' && addressData) {
            // console.log('Data: ', addressData)
            // setProvinceId(String(addressData.provinceId))
            setFullName(addressData.fullName)
            setPhone(addressData.phone)

            await handleChangeProvince(addressData.provinceId)
            // setDistrictId(String(addressData.districtId))

            await handleChangeDistrict(addressData.districtId)
            // setWardId(String(addressData.wardId))

            await handleChangeWard(addressData.wardId)

            setStreet(addressData.street)
            setIsDefault(addressData.isDefault)
        }
    }

    useEffect(() => {
        fetchDataAddressDetail()

    }, [showNamePopup, addressData]);


    useEffect(() => {
        if (selectedProvince === null || selectedDistrict === null || selectedWard === null){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }, [selectedDistrict, selectedProvince, selectedWard]);

    return (

        <div className={'editAddressPopup'} hidden={isHiddenPopup}>
            <div className={'editAddressPopupWrapper'}>
                <div className={'titleAddress'}>
                    <span>{title}</span>
                </div>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleFormSubmit}
                >
                    <div className={'editFullNamePhone'}>
                        <div className={'editFullName'}>
                            <TextField
                                required
                                id={'editFullName'}
                                label={'Họ và tên'}
                                name={'fullName'}
                                variant={'outlined'}
                                fullWidth={true}
                                className={classes.root + ' editFullNameInput'}
                                size={'small'}
                                // defaultValue={''}
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                        <div className={'editPhone'}>
                            <TextField
                                required
                                id={'editPhone'}
                                label={'Số điện thoại'}
                                name={'phone'}
                                variant={'outlined'}
                                fullWidth={true}
                                className={classes.root}
                                size={'small'}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={'editAddress'}>
                        <TextField
                            id={'editAddress'}
                            label={'Tỉnh/Thành phố'}
                            name={'province'}
                            select
                            defaultValue={''}
                            value={provinceId}
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            onChange={e => handleChangeProvince(e.target.value)}
                        >
                            {provinces.map((province) => (
                                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                    {province.ProvinceName}
                                </MenuItem>
                            ))}

                        </TextField>
                    </div>

                    <div className={'editAddress'}>
                        <TextField
                            id={'editAddress'}
                            label={'Quận/Huyện'}
                            name={'district'}
                            select
                            defaultValue={''}
                            value={districtId}
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            onChange={e => handleChangeDistrict(e.target.value)}
                        >
                            {districts.map((dis) => (
                                <MenuItem key={dis.DistrictID} value={dis.DistrictID}>
                                    {dis.DistrictName}
                                </MenuItem>
                            ))}

                        </TextField>
                    </div>

                    <div className={'editAddress'}>
                        <TextField
                            id={'editAddress'}
                            label={'Phường/Xã'}
                            name={'ward'}
                            select
                            defaultValue={''}
                            value={wardId}
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            onChange={e => handleChangeWard(e.target.value)}
                        >
                            {wards.map((ward) => (
                                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                    {ward.WardName}
                                </MenuItem>
                            ))}

                        </TextField>
                    </div>

                    <div className={'editAddressDetail'}>
                        <TextField
                            id={'editAddressDetail'}
                            label={'Địa chỉ cụ thể'}
                            name={'sweet'}
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                        />
                    </div>
                    <div className={'addressDefault'}>
                        <input type="checkbox" id={'addressDefault'} name={'isDefault'}
                               checked={isDefault}
                               onChange={e => setIsDefault(e.target.checked)}
                        />
                        <label htmlFor={'addressDefault'}>Đặt làm địa chỉ mặc định</label>
                    </div>
                    <div className={'action'}>
                        <button
                            className={'backBtn'}
                            type={'button'}
                            onClick={onClickHiddenPopup}
                        >Trở về
                        </button>
                        <button className={'saveBtn'} type={'submit'}
                                onClick={showNamePopup === 'add' ? handleSubmit : handleEditAddress}
                                disabled={disable}
                        >Lưu
                        </button>
                    </div>
                </Box>
            </div>
        </div>
    )
})

export default PopupAddress