import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1'

class ApiService {
    constructor(accessToken = null) {
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (accessToken) {
            this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
    }

    async fetchData(endpoint, data, params) {
        try {
            const response = await this.api.get(BASE_URL + endpoint, {
                data: data,
                params: params
            });
            return response.data;
        } catch (error) {
            // console.error('Error fetching data:', error);
            throw error;
        }
    }

    async sendData(endpoint, data, params) {
        try {
            const response = await this.api.post(BASE_URL + endpoint, data, {params:params})
            return response.data;
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    }

    async updateData(endpoint, data) {
        try {
            const response = await this.api.put(BASE_URL + endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }

    async deleteData(endpoint) {
        try {
            const response = await this.api.delete(BASE_URL + endpoint);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
}

export default ApiService;
