import React, { useState } from "react";
import styles from "../static/app.module.css";
import { taskObj } from "../App";

interface SingleTaskProps {
  task: taskObj;
  isCompleted: boolean;
  removeTask: () => void;
  changeStatus: () => void;
  changeTaskTitle: (
    e: React.ChangeEvent<HTMLInputElement>,
    task: taskObj
  ) => void;
}

export default function Task({
  task,
  removeTask,
  changeStatus,
  changeTaskTitle,
  isCompleted,
}: SingleTaskProps) {
  // const [title, setTitle] = useState<string>(titleParam);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  return (
    <div
      className={!isCompleted ? styles.taskConProgress : styles.taskConComplete}
    >
      <input
        value={task.title}
        onChange={(e) => changeTaskTitle(e, task)}
        className={isCompleted ? styles.taskTitle : styles.taskTitleIncomplete}
        disabled={isDisabled}
      />
      <div className={styles.taskButtonsCon}>
        <button onClick={(e) => setIsDisabled(!isDisabled)}>Edit</button>
        <button onClick={removeTask}>Delete</button>
        <button onClick={changeStatus}>
          {isCompleted ? "Incomplete" : "Done"}
        </button>
      </div>
    </div>
  );
}
