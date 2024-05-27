import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const getRequest = async (endpoint, params = {}) => {
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

const putRequest = async (endpoint, data = {}) => {
    try {
        const res = await apiService.put(endpoint, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userEmail) => {
    return postRequest(`/auth/register`, null, {email: userEmail})
}

export const forgotPassword = async (userEmail) => {
    return postRequest(`/auth/forgot-password`, null, {email: userEmail})
}

export const registerConfirm = async (userData) => {
    return postRequest(`/auth/register/confirm`, userData)
}

export const resetPassword = async (data) => {
    return postRequest(`/auth/forgot-password/reset`, data)
}

export const login = async (userData) => {
    return postRequest(`/auth/login`, userData)
}

export const loadDataUser = async (token) => {
    return getRequest(`/user/user-details`, {token: token})
}

export const editUser = async (userData)=>{
    return putRequest(`/user/user-details/edit`, userData)
}
