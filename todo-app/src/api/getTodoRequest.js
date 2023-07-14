import { API_URL } from "./config"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getTodoRequest = createAsyncThunk('tasks/getTodoRequest', async () => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const url = user.isAdmin ? `${API_URL}/todos/1` : `${API_URL}/todos/${user.userId}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const response = await axios.get(url, {
    headers: headers
  });
  return response.data
})