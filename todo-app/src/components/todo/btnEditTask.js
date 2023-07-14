import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalCreateTask from "../modal/modalTask";
import { updateTodoRequest } from '../../api/updateTodoRequest';

const BtnEditTask = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const dispatch = useDispatch();

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = (task) => {
    dispatch(updateTodoRequest(task));
  };

  return (
    <>
      <button
        title="edit task"
        className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
        onClick={openModalEditTask}
      >
        Edit
      </button>
      {modalEditTaskOpen && (
        <ModalCreateTask
          onClose={closeModalEditTask}
          task={task}
          nameForm="Edit task"
          onConfirm={editTaskHandler}
        />
      )}
    </>
  );
};

export default BtnEditTask;
