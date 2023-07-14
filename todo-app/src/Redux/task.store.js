import { createSlice } from "@reduxjs/toolkit";
import { createTodoRequest } from '../api/createTodoRequest';
import { getTodoRequest } from '../api/getTodoRequest';
import { deleteTodoRequest } from '../api/deleteTodoRequest';  
import { toggleCompletedRequest } from '../api/toggleCompletedRequest';
import { updateTodoRequest } from '../api/updateTodoRequest';

  const initialState = {
    tasks: [],
    loading: 'idle',
    error: ''
  };
  
  const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
      reset: () => initialState
    },
    extraReducers(builder) {
      builder
      .addCase(getTodoRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(getTodoRequest.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.tasks = action.payload
      })
      .addCase(getTodoRequest.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message
      })
      .addCase(createTodoRequest.fulfilled, (state, action) => {
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(deleteTodoRequest.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(toggleCompletedRequest.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTodoRequest.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
    }
  });
  
  export const tasksActions = tasksSlice.actions;
  export default tasksSlice.reducer;
  