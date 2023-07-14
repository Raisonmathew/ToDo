import React from "react";
import TaskItem from "./taskItem";

const LayoutRoutes = ({ tasks }) => {

  return (
    <section>
      <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
        All Tasks
      </h1>
      <ul
        className={"tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-3"}>

        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
        
      </ul>
    </section>
  )
};

export default React.memo(LayoutRoutes);
