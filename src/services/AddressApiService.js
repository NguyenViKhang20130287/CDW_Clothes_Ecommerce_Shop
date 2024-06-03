import axios from "axios";

const BASE_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/'

const TOKEN = 'aa1ac72e-1a8e-11ef-a9c4-9e9a72686e07'

const addressApiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "token": TOKEN
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

export const fetchDataDistrict = async (provinceId) => {
    try {
        const res = await addressApiService.post('district',
            {
                province_id: provinceId
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}