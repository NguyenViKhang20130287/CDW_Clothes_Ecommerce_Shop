import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Box, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@mui/styles";
import {fetchData} from "../../services/addressApiService";
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
        handleSubmit
    } = props;
    const classes = useStyles();
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [street, setStreet] = useState('')
    const [isDefault, setIsDefault] = useState(false)

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')

    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')

    // console.log('Hidden status: ', isHiddenPopup)
    const handleChangeProvince = async (provinceId) => {
        // console.log(provinceId)
        const selectedProvince = provinces.find(province => province.ProvinceID === provinceId);
        setProvince(selectedProvince?.ProvinceName || '');
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
        const selectedDistrict = districts.find(district => district.DistrictID === districtId);
        setDistrict(selectedDistrict?.DistrictName || '');
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

    const handleChangeWard = (wardId) => {
        const selectedWard = wards.find(ward => ward.WardCode === wardId);
        setWard(selectedWard?.WardName || '');
    }

    const handleFormSubmit = () => {
        const formData = {
            fullName: fullName,
            phone: phone,
            province: province,
            district: district,
            ward: ward,
            street: street,
            isDefault: isDefault
        };
        handleSubmit(formData);
    };

    useImperativeHandle(ref, () => ({
        getData: () => ({
            fullName: fullName,
            phone: phone,
            province: province,
            district: district,
            ward: ward,
            street: street,
            default: isDefault
        })
    }));

    // console.log(addressData)
    const fetchId = (listName, listItem, keyword) => {
        if (listName === 'province') {
            const result = listItem.find(r => r.ProvinceName === keyword)
            return result ? result.ProvinceID : null
        }
        if (listName === 'district' && listItem.length > 0) {
            const result = listItem.find(r => r.DistrictName === keyword)
            return result ? result.DistrictID : null
        }
        if (listName === 'ward' && listItem.length > 0) {
            const result = listItem.find(r => r.WardName === keyword)
            return result ? result.WardCode : null
        }

    }

    const fetchDataAddress = () => {

        if (showNamePopup !== 'update' && !addressData) return

        if (provinces.length > 0) {
            let newProvinceId = fetchId('province', provinces, addressData.province)
            console.log('New Province id: ', newProvinceId)
            if (newProvinceId !== '') {
                setProvinceId(String(newProvinceId))
                console.log('Province id: ', provinceId)

                if (districts.length < 0){
                    handleChangeProvince(newProvinceId)
                    console.log('List district NOT NULL: ', districts)
                    let newDistrictId = fetchId('district', districts, addressData.district)
                    console.log('New district id: ', newDistrictId)
                    setDistrictId(String(newDistrictId))
                    console.log('District id: ', districtId)
                }

            }
        }
    }

    useEffect(() => {

        // console.log(addressData)
        if (user) {
            setFullName(user.userInformation.fullName);
            setPhone(user.userInformation.phone)
        }

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

        if (provinces.length === 0)
            fetchDataProvince()

        // fetchDataAddress()

    }, [user, showNamePopup, provinces, provinceId, districtId])


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
                                value={showNamePopup === 'update' ? addressData.fullName : fullName}
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
                                value={showNamePopup === 'update' ? addressData.phone : phone}
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
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            value={provinceId}
                            // value={addressData.province}
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
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            value={districtId}
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
                            variant={'outlined'}
                            fullWidth={true}
                            className={classes.root}
                            size={'small'}
                            value={wardId}
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
                                onClick={handleSubmit}
                        >Lưu
                        </button>
                    </div>
                </Box>
            </div>
        </div>
    )
})

export default PopupAddress