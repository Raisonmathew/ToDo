import { API_URL } from "./config"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createTodoRequest = createAsyncThunk('tasks/createTodoRequest', async (todo) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const response = await axios.post(`${API_URL}/todos`, todo, {
    headers: headers
  })
  return response.data
})