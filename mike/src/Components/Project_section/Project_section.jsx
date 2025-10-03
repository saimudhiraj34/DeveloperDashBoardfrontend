import React, { useState, useEffect } from "react";
import "./Project_section.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


 const Project_section = () => {
  const [projects, setProjects] = useState([]); // store all projects
  const [progressData, setProgressData] = useState({}); // store progress of each project

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/project/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Fetch progress for a specific project
  const fetchProgress = async (title) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/pro/${title}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
     

      // Store progress mapped by project title
      setProgressData((prev) => ({
        ...prev,
        [title]: {
          Planning: data.Planning || { status: "pending", ans: "" },
          Development: data.Development || { status: "pending", ans: "" },
          Testing: data.Testing || { status: "pending", ans: "" },
          Review: data.Review || { status: "pending", ans: "" },
          Deployment: data.Deployment || { status: "pending", ans: "" },
        },
      }));
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  const handleDelete=async(id)=>{
        try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/project/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data=await res.json();
      if(res.ok){
        toast.success("Deleted");
        fetchProjects();
      }
      else{
        toast.error(data.message); 
      }
      
  }
  catch(err){
        console.error(err);
      }
    }

  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    projects.forEach((proj) => {
      fetchProgress(proj.projectTitle);
    });
  }, [projects]);
  const phases = ["Planning", "Development", "Testing", "Review", "Deployment"];
 

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />

      <div className="container">
        <h2>Project Progress Tracker</h2>

        <div className="progress-container-out">
          {projects.length>0?(
          projects.map((project, index) => {
            // Calculate last completed phase index for this specific project
            const lastCompletedIndex = phases.reduce((acc, phase, i) => {
              if (progressData[project.projectTitle]?.[phase]?.status) {
                return i;
              }
              return acc;
            }, -1);

            console.log(
              project.projectTitle,
              lastCompletedIndex,
              progressData[project.projectTitle]
            );

            return (
              <div key={index} className="progress-container-inner">
                <h3>{project.projectTitle}</h3>

                <div className="phase-tracker">
                  {/* Base gray line */}
                  <div className="progress-line"></div>

                  {/* Green progress line */}
                  <div
                    className="progress-line-fill"
                    style={{
                      width: `${
                        lastCompletedIndex >= 0
                          ? ((lastCompletedIndex + 1) / phases.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                  {phases.map((phase, i) => {
                    const statusObj =
                      progressData[project.projectTitle]?.[phase];
                    const isCompleted = statusObj?.status === true; // completed if true
                    return (
                      <div
                        key={i}
                        className={`phase ${
                          isCompleted ? "completed" : "in-progress"
                        }`}
                      >
                        <div className="circle">{isCompleted ? "✔" : "⏳"}</div>
                        <p>{phase}</p>
                      </div>
                    );
                  })}
                </div>

                <Link to={`/Project_detail/${project.projectTitle}`}>
                  <button className="go-to">
                    Go To Page
                  </button>
                </Link>
                  <button className="projectdeletebtn"onClick={()=>{handleDelete(project._id)}}>Delete</button>
              </div>
            );
          })):(<div className="addprojectimg">
             <img src="src/assets/project.jpg" alt="No tasks available" /><p>No Project Yet</p></div>)}
        </div>

        <div className="project_add_btn">
          <button className="go-to">
            <Link to="/Add_Project">Add Project</Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default Project_section;