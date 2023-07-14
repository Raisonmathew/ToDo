import { API_URL } from "./config"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const deleteTodoRequest = createAsyncThunk('tasks/deleteTodoRequest', async (id) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const response = await axios.delete(`${API_URL}/todos/${id}`, {
    headers: headers
  })
  return response.data
})