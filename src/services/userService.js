import {postRequest, getRequest, putRequest} from "./APIService";

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

export const editUser = async (userData) => {
    return putRequest(`/user/user-details/edit`, userData)
}
export const changePassword = async (userData) => {
    return postRequest("/user/user-details/change-password", userData)
}