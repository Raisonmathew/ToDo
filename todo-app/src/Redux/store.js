import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal.store";
import tasksReducer from "./task.store";

const store = configureStore({
  reducer: { tasks: tasksReducer, modal: modalReducer },
});

export default store;