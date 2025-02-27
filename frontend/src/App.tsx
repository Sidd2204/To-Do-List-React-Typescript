import React, { useState } from "react";
import styles from "./static/app.module.css";
import Task from "./components/task";

export interface taskObj {
  id: number;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [currTitle, setCurrTitle] = useState<string>("");
  const [tasks, setTasks] = useState<taskObj[]>([
    {
      title: "Temp Task 1",
      isCompleted: false,
      id: new Date().getTime(),
    },
    {
      title: "Temp Task 2",
      isCompleted: true,
      id: new Date().getTime() + 1,
    },
  ]);

  function addTask() {
    let tempTitle = currTitle.trim();
    if (!tempTitle.length) return;

    let tempTask: taskObj = {
      isCompleted: false,
      title: tempTitle,
      id: new Date().getTime(),
    };
    setTasks([...tasks, tempTask]);
    setCurrTitle("");
  }

  function removeTask(id: number) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  }

  function changeStatus(id: number) {
    const tempTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      } else {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
    });
    setTasks(tempTasks);
  }

  function changeTaskTitle(
    e: React.ChangeEvent<HTMLInputElement>,
    task: taskObj
  ) {
    let temp = tasks.map((t) => {
      if (t.id !== task.id) {
        return t;
      } else {
        return { ...t, title: e.target.value };
      }
    });

    setTasks(temp);
  }

  return (
    <div className={styles.taskMainCon}>
      <div className={styles.inputWrapper}>
        <input
          value={currTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrTitle(e.target.value)
          }
          className={styles.taskNameInput}
        />

        <button onClick={addTask} className={styles.taskAddButton}>
          Add
        </button>
      </div>
      <div className={styles.tasksArea}>
        <div className={styles.inProgressTaskCon}>
          <h2>In Progress Tasks</h2>
          {tasks.map((task) => {
            // eslint-disable-next-line
            if (task.isCompleted) return;
            return (
              <Task
                task={task}
                removeTask={() => removeTask(task.id)}
                key={task.id}
                changeTaskTitle={changeTaskTitle}
                changeStatus={() => {
                  changeStatus(task.id);
                }}
                isCompleted={task.isCompleted}
              />
            );
          })}
        </div>

        <div className={styles.completedTaskCon}>
          <h2>Completed Tasks</h2>
          {tasks.map((task) => {
            // eslint-disable-next-line
            if (!task.isCompleted) return;
            return (
              <Task
                task={task}
                removeTask={() => removeTask(task.id)}
                key={task.id}
                changeTaskTitle={changeTaskTitle}
                changeStatus={() => {
                  changeStatus(task.id);
                }}
                isCompleted={task.isCompleted}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
