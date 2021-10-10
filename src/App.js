import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useHttp } from "./components/custom/useHttp";

function App() {
  const { isLoading, error, makeRequest } = useHttp();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (taskText) => {
    const configuration = {
      url: "https://task-ba3c8-default-rtdb.firebaseio.com/tasks.json",
    };

    const afterFunction = (response) => {
      const data = response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    makeRequest(configuration, afterFunction);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
