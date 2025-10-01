// ContributionHeatmap.js
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { useNavigate } from "react-router-dom";
import "react-calendar-heatmap/dist/styles.css";
import "./Profile.css"
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from "../../config";


 
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState([]);
  const navigate=useNavigate();
   

  const handleLogout=async()=>{
     try{
      const token=localStorage.getItem("token");
      const response=await fetch(`${API_BASE_URL}/user/logout`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`,
        }
      });
       if (!response.ok) {
        navigate("/")
        throw new Error("Logout failed");        
      }
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      window.location.href = "/";
     }
     catch (error) {
      toast.error("Logout error:", error);
    }
  }
 const fetchAllTasks = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/work/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const tasks = await response.json();

    // group by date, count only completed tasks
    const taskMap = {};
    tasks.forEach((task) => {
      const dateStr = new Date(task.date).toISOString().split("T")[0]; // YYYY-MM-DD
      if (!taskMap[dateStr]) {
        taskMap[dateStr] = { date: dateStr, count: 0 };
      }
      if (task.completed) {
        taskMap[dateStr].count += 1;
      }
    });

    setData(Object.values(taskMap));
  } catch (err) {
    console.log(err);
  }
};

 const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_BASE_URL}/user/get`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
           if (result.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

        if (res.ok) {
          setProfile(result.user);
        } else {
          toast.error(result.message || "Failed to load profile");
         
        }
      } catch (err) {
        toast.error("Profile fetch error:", err);
        navigate("/");
      }
    };

useEffect(() => {
  fetchProfile();
  fetchAllTasks();
}, [navigate]);


  return (
    <>
    <Title/>
    <NavBar/>
    <div>
   
    <div className="profile-card">
         <h1>Personal Details</h1>
      {profile ? (
            <>
              <h2 className="profile-name">{profile.username}</h2>
              <p className="profile-branch">Phone: {profile.phone}</p>
              <div className="profile-links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        <button onClick={handleLogout}className="button">Logout</button>
    </div>
      
    </div>

    <div className="calendar">
      <CalendarHeatmap
        startDate={new Date(new Date().getFullYear(), 0, 1)}
        endDate={new Date(new Date().getFullYear(), 11, 31)}
        values={data}
     classForValue={(value) => {
  if (!value || value.count === 0) return "color-empty"; // no completed task
  if (value.count >= 5) return "color-scale-4"; // darkest green
  if (value.count >= 3) return "color-scale-3";
  if (value.count >= 2) return "color-scale-2";
  return "color-scale-1"; // light green
}}

        tooltipDataAttrs={(value) =>
          value.date
            ? { "data-tip": `${value.date}: ${value.count} problems solved` }
            : null
        }
      />
    </div>
    </>
  );
};

export default Profile;
