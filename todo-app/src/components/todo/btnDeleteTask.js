import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalConfirm from "./modalConfirm";
import { deleteTodoRequest } from "../../api/deleteTodoRequest";

const BtnDeleteTask = ({ taskId }) => {
  const [showModal, setIsModalShown] = useState(false);
  const dispatch = useDispatch();

  const removeTaskHandler = () => {
    dispatch(deleteTodoRequest(taskId));
  };
  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}
          text="This task will be deleted permanently."
          onConfirm={removeTaskHandler}
        />
      )}
      <button
        onClick={() => setIsModalShown(true)}
        title="delete task"
        className=" m-1 px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
      >
        Delete
      </button>
    </>
  );
};

export default BtnDeleteTask;
