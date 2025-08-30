import React, { useState } from "react";
import "./ToDoAll.css";
import { NavBar } from "../../NavBar/NavBar";

export const ToDoAll = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    status: "",
  });

  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (formData.description.trim() === "") return;
    setTasks([...tasks, { ...formData, done: false }]);
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      status: "",
    });
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <>
    <NavBar/>
    <div className="todo-container">
      {/* Left Input Box */}
      <div className="input-box">
        <h2>Add Task</h2>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          placeholder="Start Time"
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          placeholder="End Time"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Right Task Table */}
      <div className="task-table">
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Done</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={task.done ? "done" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(index)}
                  />
                </td>
                <td>{task.date}</td>
                <td>{task.startTime}</td>
                <td>{task.endTime}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
