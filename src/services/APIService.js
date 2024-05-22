import axios from "axios";
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

    async fetchData(endpoint) {
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async sendData(endpoint, data = {}) {
        try {
            const response = await this.api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    }

    async updateData(endpoint, data) {
        try {
            const response = await this.api.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }
    async deleteData(endpoint) {
        try {
            const response = await this.api.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
}

export default ApiService;
