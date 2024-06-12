import axios from "axios";

const API_URL = "http://localhost:8080/api/v1"
export const addLog = async (token, action) => {
    try {
        const res = await axios.post(API_URL + "/log/", null,
            {
                params: {
                    token: token,
                    action: action
                }
            })
        console.log('Response log: ', res)
    } catch (e) {
        console.log('Err add log: ', e)
    }
}
