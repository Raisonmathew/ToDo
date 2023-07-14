import { API_URL } from "./config"
import axios from 'axios';

export const getAllUsers = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await axios.get(`${API_URL}/getusers`, {
        headers: headers
    });
    return response.data
}
