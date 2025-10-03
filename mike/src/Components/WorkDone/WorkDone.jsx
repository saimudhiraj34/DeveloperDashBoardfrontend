import React from "react";
import "./WorkDone.css";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

 const WorkDone = () => {
  
  const [active, setActive] =   useState("Today");
  const [taskList, setTaskList] = useState([]);
  const [All_task,setAll_task]=useState([]);
  const [formData, setFormData] = useState({
    date: "",
    topic: "",
    startTime: "",
    endTime: "",
    notes: "",
    completed: false,
  });
    const uniqueDates = [...new Set(All_task.map((task) => task.date))];
  const handleCheckboxChange = async(id,index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
   try{
    const token=localStorage.getItem("token")
    const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/work/check`,{
      method:"POST",
      headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
      },
     body: JSON.stringify({id:id,
      completed:updatedTaskList[index].completed}),
    });
    if (res.ok) {
      toast.success("Updated Task");
    } else {
      toast.error("Error updating status");
    }
  } catch (err) {
    console.error("Server error", err);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const token=localStorage.getItem("token");
     const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/work/task`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
         Authorization:`Bearer ${token}`
        },

      body: JSON.stringify(formData),
    });
      const data = await res.json();
    if(res.ok){
      toast.success("Task_Added");
    setFormData({ date: "", topic: "", startTime: "", endTime: "", notes: "" });
     fetchTasks();
    }
    else{
      toast.error(data.message ||"Failed");
    }
  };
  const fetchTasks = async () => {
    const token=localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/work/getToday`,{
      method:"GET",
      headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    });
    const data = await response.json();
 
    setTaskList(data); 
  } catch (err) {
    toast.error(err);
  }
};
  const fetchAllTasks = async () => {
    const token=localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/work/get`,{
      method:"GET",
      headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    });
    const data = await response.json();
    setAll_task(data); 
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  if (active === "Today") {
    fetchTasks();
  }
  fetchAllTasks();
}, [active]);

const handleDelete = async(id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/work/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (res.ok) {
     toast.success("Deleted")
      setTaskList(taskList.filter((task) => task._id !== id));
      setAll_task(All_task.filter((task) => task._id !== id));
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete task");
    }
     } catch (err) {
    console.error(err);
    alert("Server error while deleting task");
  }
};


  return (
    <>
     <ToastContainer position="top-center" autoClose={4000} />
      <Title />
      <NavBar />
      <div className="WorkDone_Container">
        <div className="WorkDone_Heading">
          <h3
            className={`WorkDone_completed ${active==="Today"?"actived":""}`}
            onClick={() => {
              setActive("Today");
            }}
          >
            Today
          </h3>
          <h3
            className={`WorkDone_completed ${active==="WorkDone_completed"?"actived":""}`}
            onClick={() => {
              setActive("WorkDone_completed");
            }}
          >
            Completed_Today
          </h3>
          <h3
            className={`WorkDone_completed ${active==="All_completed"?"actived":""}`}
            onClick={() => {
              setActive("All_completed");
            }}
          >
            All_completed
          </h3>
        </div>
      </div>
      {active === "Today" && (
        
        <div className="WorkDone_Today">
          <div className="WorkDone_form">
            <form className="task-form" onSubmit={handleSubmit}>
              <h2>Add_Task</h2>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Topic:</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Enter Topic"
                />
              </div>

              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  placeholder="Write notes here"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit">Add Task</button>
            </form>
          </div>
 {taskList.length > 0 ? (
  <div className="work-table">
 <div className="WorkDone_table">
    <table border="1">
      <thead>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Topic</th>
          <th>Started</th>
          <th>Ended</th>
          <th>Notes</th>
          <th>Delete</th> 
        </tr>
      </thead>
      <tbody>
        {taskList.map((task, index) => (
          <tr key={index} className={task.completed ? "completed" : ""}>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task._id,index)}
              />
            </td>
            <td>{new Date(task.date).toLocaleDateString()}</td>

            <td>{task.topic}</td>
            <td>{task.startTime}</td>
            <td>{task.endTime}</td>
            <td>{task.notes}</td>
            <td>
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(task._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
) : (
  <div className="empty-state">
    <img src="src/assets/task.png" height="400" width="800"alt="No tasks available" />
    <p>No tasks added yet!</p>
  </div>
)}
        </div>
      )}
      {active === "WorkDone_completed" && (
        <div className="WorkDone_completed">
        {taskList.filter(task => task.completed).length > 0 ? (
         <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Topic</th>
              <th>Started</th>
              <th>Ended</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {taskList
              .filter((task) => task.completed)
              .map((task, index) => (
                <tr key={index}>
                 <td>{new Date(task.date).toLocaleDateString()}</td>
                  <td>{task.topic}</td>
                  <td>{task.startTime}</td>
                  <td>{task.endTime}</td>
                  <td>{task.notes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
        ) : (
           <div className="empty-state">
    <img src="src/assets/task.png" alt="No tasks available" />
    <p>No tasks added yet!</p>
  </div>
        ) 
            }
        </div>
      )}
      
{active === "All_completed" && (
  <div className="WorkDone_All_completed">
    <h1>All Completed Tasks</h1>
    {All_task.length > 0 ? (
      <>
        {uniqueDates.map((date) => (
          <div key={date} className="date-box">
            <h3 className="date-heading">{new Date(date).toLocaleDateString()}</h3>
            <div className="tasks-list">
              {All_task
                .filter((task) => task.date === date)
                .map((task) => (
                  <div
                    key={task._id}
                    className={`task-item ${
                      task.completed ? "done" : "pending"
                    }`}
                  >
                    <p><strong>{task.topic}</strong></p>
                    <p>
                      {task.startTime} - {task.endTime}
                    </p>
                    {task.notes && <p className="task-notes">{task.notes}</p>}
                    <p className={`status ${task.completed ? "done" : "pending"}`}>
                      {task.completed ? "✅ Completed" : "⏳ Pending"}
                    </p>
                    <button className="registerbtn"onClick={()=>handleDelete(task._id)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </>
    ) : (
      <div className="empty-state">
        <img src="src/assets/task.png" alt="No tasks available" />
        <p>No tasks added yet!</p>
      </div>
    )}
  </div>
)}

      
    </>
  );
};

export default WorkDone;
