import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const register = async (userEmail) => {
    try {
        const res = await apiService.post(`/auth/register?email=${userEmail}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const registerConfirm = async (userData)=>{
    try {
        const res = await apiService.post(`/auth/register/confirm`, userData)
        return res.data
    }catch (error){
        console.log(error)
    }
}