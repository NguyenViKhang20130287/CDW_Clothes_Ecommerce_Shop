import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const postRequest = async (endpoint, data = null, params = {}) => {
    try {
        const res = await apiService.post(endpoint, data, {params});
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;  // Optionally rethrow the error after logging it
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

export const resetPassword = async (data) =>{
    return postRequest(`/auth/forgot-password/reset`, data)
}

export const login = async (userData) => {
    return postRequest(`/auth/login`, userData)
}
