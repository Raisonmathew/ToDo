import React from "react";
import useDate from "../hooks/useDate";

const InfosTask = ({ task }) => {
  const dateFormated = useDate(task.date);

  return (
    <div className={"flex flex-col flex-1 mr-6"}>
      <div
        className={"flex items-center justify-between mb-1"}
      >
        <span className="block font-medium dark:text-slate-200">
          {task.title}
        </span>
      </div>
      <p
        title={task.description}
        className={"description mb-2 text-slate-500 dark:text-slate-500 line-clamp-2 sm:line-clamp-1"}
      >
        {task.description}
      </p>
      <time className="mt-auto flex w-full"> {dateFormated}
      </time>
    </div>
  );
};

export default InfosTask;