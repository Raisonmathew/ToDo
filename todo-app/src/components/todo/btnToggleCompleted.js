import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompletedRequest } from '../../api/toggleCompletedRequest';

const BtnToggleCompleted = ({ taskCompleted, taskId, taskUser }) => {
  const dispatch = useDispatch();

  const toggleTaskCompleted = (id) => {
    const completed = !taskCompleted;
    dispatch(toggleCompletedRequest({ id, completed, taskUser }));
  };

  return (
    <button
      title={taskCompleted ? "mark as uncompleted" : "mark as completed"}
      className={`${
        taskCompleted
          ? "bg-green-500 hover:bg-green-700"
          : "bg-gray-600 hover:bg-gray-400 "
      } text-white font-bold rounded-full`}
      onClick={() => toggleTaskCompleted(taskId)}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {taskCompleted ? "completed" : "uncompleted"}
      </span>
    </button>
  );
};

export default BtnToggleCompleted;