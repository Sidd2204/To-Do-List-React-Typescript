import React, { useEffect, useRef, useState } from "react";
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

const Task: React.FC<SingleTaskProps> = (props) => {
  const { task, removeTask, changeStatus, changeTaskTitle, isCompleted } =
    props;

  // const [title, setTitle] = useState<string>(titleParam);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const taskTitleRef = useRef<HTMLInputElement | null>(null);

  function toggleTitle() {
    setIsDisabled(!isDisabled);
  }

  useEffect(() => {
    if (taskTitleRef.current && !isDisabled) taskTitleRef.current.focus();
  }, [isDisabled]);

  return (
    <div
      className={!isCompleted ? styles.taskConProgress : styles.taskConComplete}
    >
      <input
        value={task.title}
        onChange={(e) => changeTaskTitle(e, task)}
        className={isCompleted ? styles.taskTitle : styles.taskTitleIncomplete}
        disabled={isDisabled}
        ref={taskTitleRef}
      />
      <div className={styles.taskButtonsCon}>
        <button onClick={toggleTitle}>Edit</button>
        <button onClick={removeTask}>Delete</button>
        <button onClick={changeStatus}>
          {isCompleted ? "Incomplete" : "Done"}
        </button>
      </div>
    </div>
  );
};

export default Task;
