import React, { useState } from "react";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    const newTask = {
      text: inputValue,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleTaskComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleTaskDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleFilterButtonClick = (filterStatus) => {
    setFilterStatus(filterStatus);
  };

  let filteredTasks = tasks;

  if (filterStatus === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filterStatus === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add a task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">
          <FaPlus />
        </button>
      </form>
      <div className="filter-buttons">
        <button
          className={filterStatus === "all" ? "active" : ""}
          onClick={() => handleFilterButtonClick("all")}
        >
          All Tasks
        </button>
        <button
          className={filterStatus === "active" ? "active" : ""}
          onClick={() => handleFilterButtonClick("active")}
        >
          Active Tasks
        </button>
        <button
          className={filterStatus === "completed" ? "active" : ""}
          onClick={() => handleFilterButtonClick("completed")}
        >
          Completed Tasks
        </button>
      </div>
      <div className="tasks">
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            handleTaskComplete={handleTaskComplete}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
      </div>
    </div>
  );
}

function Task({ task, index, handleTaskComplete, handleTaskDelete }) {
  const { text, completed } = task;
  const taskClassName = completed ? "task completed" : "task";

  return (
    <div className={taskClassName}>
      <div className="task-text" onClick={() => handleTaskComplete(index)}>
        {text}
      </div>
      <div className="task-actions">
        <FaTrash onClick={() => handleTaskDelete(index)} />
      </div>
    </div>
  );
}

export default App;
