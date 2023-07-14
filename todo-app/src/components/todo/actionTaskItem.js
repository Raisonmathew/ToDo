import React from "react";
import BtnEditTask from "./btnEditTask";
import BtnDeleteTask from "./btnDeleteTask";
import BtnToggleCompleted from "./btnToggleCompleted";

const ActionsTaskItem = ({ task }) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <>
      <div
        className={"flex flex-col border-dashed border-slate-200 dark:border-slate-700/[.3] items-center" }
      >
        <BtnToggleCompleted
          taskCompleted={task.completed}
          taskId={task._id}
          taskUser={task.user}
        />
        {user && user.isAdmin ? <BtnDeleteTask taskId={task._id} />: ''}
        {user && user.isAdmin ? <BtnEditTask task={task} /> : ''}
      </div>
    </>
  );
};

export default ActionsTaskItem;