import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getRequest = async (endpoint, params = {}) => {
        try {
            const res = await apiService.get(endpoint, {params})
            return res.data;
        } catch (error) {
            throw error;
        }
    }
;

export const postRequest = async (endpoint, data = null, params = {}) => {
    try {
        const res = await apiService.post(endpoint, data, {params});
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const putRequest = async (endpoint, data = {}) => {
    try {
        const res = await apiService.put(endpoint, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const loadAllCategoryIsActive = async () =>{
    return getRequest("/category/active")
}

