import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import LayoutRoutes from "../todo/layoutRoutes";
import ModalCreateTask from "../modal/modalTask";
import { modalActions } from "../../Redux/modal.store";
import BtnAddTask from "../todo/btnAddTask";
import { createTodoRequest } from '../../api/createTodoRequest';
import { getTodoRequest } from "../../api/getTodoRequest";
import { tasksActions } from "../../Redux/task.store";

const Home = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.tasks);
  const loading = useSelector((store) => store.tasks.loading);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    if(loading === 'idle') {
      console.log(loading)
      dispatch(getTodoRequest());
    }
  }, [loading, dispatch]);

  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  const createNewTaskHandler = (task) => {
    dispatch(createTodoRequest(task));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(tasksActions.reset());
    navigate('/')
  };

  return (
    <header className="h-full flex flex-col">
        <section>
        <h2 className="block font-medium dark:text-slate-200">Logged In As : {user.username}
          <button 
          onClick={logOut}
          title="Logout"
          className=" m-1 px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full">Logout</button>
        </h2>
            {user && user.isAdmin ? <BtnAddTask className="py-2 my-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" /> : ''}
            <div className="bg-slate-200 p-2 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
                {modal.modalCreateTaskOpen && (
                <ModalCreateTask
                onClose={closeModalCreateTask}
                nameForm="Add a task"
                onConfirm={createNewTaskHandler}
                />
            )}
                <LayoutRoutes title="All tasks" tasks={tasks}></LayoutRoutes>
            </div>
        </section>
    </header>
  ) 
};

export default Home;