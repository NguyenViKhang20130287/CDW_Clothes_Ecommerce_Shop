import axios from "axios";

const BASE_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/'

const TOKEN = '0f165fd5-2259-11ef-93a6-cef7b4868155'
const SHOP_ID = 5109874

const addressApiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "token": TOKEN
    },
})

const shippingApiService = axios.create({
    baseURL:'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
    headers:{
        "Content-Type": "application/json",
        'token': TOKEN,
        'ShopId': SHOP_ID
    },
})

export const fetchData = async (endpoint, params = {}) => {
    try {
        const res = await addressApiService.get(endpoint, {params})
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchDataShipping = async (fromDistrictId, fromWardCode) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN,
            'ShopId': SHOP_ID
        },
        body: JSON.stringify({
            "from_district_id": fromDistrictId,
            "from_ward_code": fromWardCode,
            "service_id": 0,
            "service_type_id": 2,
            "to_district_id": 3695,
            "to_ward_code": '90775',
            "height": 50,
            "length": 20,
            "weight": 200,
            "width": 20,
            "insurance_value": 10000,
            "cod_failed_amount": 2000,
            "coupon": null
        })
    };

    try {
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', requestOptions);
        return response.json()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};