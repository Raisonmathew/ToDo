import { API_URL } from "./config"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const toggleCompletedRequest = createAsyncThunk('tasks/toggleCompletedRequest', async ({id, completed, taskUser}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const content = user.isAdmin ? {completed, user: 1} : {completed, user: taskUser};

    const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
    
    const response = await axios.put(`${API_URL}/todos/${id}`, content, {
        headers: headers
    })
    return response.data;
})