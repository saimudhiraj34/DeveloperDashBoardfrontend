import React from "react";
import { useState } from "react";
import "./Project_detail.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegCalendarAlt, FaLaptopCode } from "react-icons/fa";
import { MdTitle, MdDescription } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Project_detail = () => {
  const {title}=useParams();
  const [project, setProject] = useState();
    
  const [progress, setProgress] = useState({
    Planning: { status: false, ans: "" },
    Development: { status: false, ans: "" },
    Testing: { status: false, ans: "" },
    Review: { status: false, ans: "" },
    Deployment: { status: false, ans: "" },
  });

  const [open, setopen] = useState();

  const phasesOrder = [
    "Planning",
    "Development",
    "Testing",
    "Review",
    "Deployment",
  ];
  const handleCheckbox = async (phase) => {
    const phaseIndex = phasesOrder.indexOf(phase);
   
    if (phaseIndex > 0) {
      const prevPhase = phasesOrder[phaseIndex - 1];
      if (!progress[prevPhase].status) {
        toast.error(`You must complete "${prevPhase}" first!`);
        return;
      }
    }
    const newStatus = !progress[phase].status;
    try {
      const res = await fetch(`http://localhost:3000/pro/check/${title}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phase, status: newStatus }),
      });

      const data = await res.json();
      if(!res.ok){
        toast.error(data.message);
      }
     toast.success("Updated")
      fetchProgress();      
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleChange = (phase, value) => {
    setProgress((prev) => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        ans: value,
      },
    }));
  };

  const handleSaveans = async (phase) => {
    try {
      const res = await fetch(`http://localhost:3000/pro/${title}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phase, ans: progress[phase]?.ans }), // only sending ans
      });

      const data = await res.json();
        if(!res.ok){
        toast.error(data.message);
      }
        fetchProgress();
      toast.success(`${phase} ans saved successfully!`);
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await fetch(`http://localhost:3000/pro/${title}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();    
      setProgress({
        Planning: data.Planning || { status: false, ans: "" },
        Development: data.Development || { status: false, ans: "" },
        Testing: data.Testing || { status: false, ans: "" },
        Review: data.Review || { status: false, ans: "" },
        Deployment: data.Deployment || { status: false, ans: "" },
      });
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProjectByTitle = async (title) => {
    try {
      const res = await fetch(`http://localhost:3000/project/get/${title}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
     
      setProject(data);
    } catch (err) {
      console.error("Error fetching project:", err);
    }
  };

  useEffect(() => {
    fetchProjectByTitle(title);
  }, []);

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />

      <div className="project-details-container">
        <div className="project-details-left">
          <div className="project-detail-box">
            <h2>📂 Project Details</h2>

            <div className="project-detail-item">
              <MdTitle className="detail-icon" />
              <span>
                <strong>Title:</strong> {project?.projectTitle || "N/A"}
              </span>
            </div>

            <div className="project-detail-item">
              <FaRegCalendarAlt className="detail-icon" />
              <span>
                <strong>Planning Date:</strong>{" "}
                {project?.planningDate
                  ? new Date(project.planningDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="project-detail-item">
              <RiCalendarEventFill className="detail-icon" />
              <span>
                <strong>Testing Date:</strong>{" "}
                {project?.testingDate
                  ? new Date(project.testingDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="project-detail-item">
              <RiCalendarEventFill className="detail-icon" />
              <span>
                <strong>Review Date:</strong>{" "}
                {project?.reviewDate
                  ? new Date(project.reviewDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="project-detail-item">
              <RiCalendarEventFill className="detail-icon" />
              <span>
                <strong>Deployment Date:</strong>{" "}
                {project?.deploymentDate
                  ? new Date(project.deploymentDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="project-detail-item">
              <MdDescription className="detail-icon" />
              <span>
                <strong>Description:</strong>{" "}
                {project?.description || "No description provided"}
              </span>
            </div>

            <div className="project-detail-item">
              <FaLaptopCode className="detail-icon" />
              <span>
                <strong>Technology Used:</strong>{" "}
                {project?.skills?.length > 0
                  ? project.skills.join(", ")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="project-detail-image">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            <div className="project-img">
            <img src="/src/assets/ex1.png" height="400px" width="600px"alt="No tasks available" />
            </div>
            <div className="project-img">
              <img src="/src/assets/ex2.png" height="400px" width="600px"alt="No tasks available" />
            </div>
            <div className="project-img">
               <img src="/src/assets/ex3.png" height="400px" width="600px"alt="No tasks available" />
            </div>
          </Slider>
        </div>
      </div>
      <div className="Mark_the_progress">
        <div>
          <h1>Mark The Process</h1>
        </div>
        <div className="Mark-checkbox-t">
          {Object.keys(progress).map((pro) => (
            <div key={pro}>
              <div className="Mark-button-container">
                <input
                  className="Mark-checkbox"
                  type="checkbox"
                  checked={progress[pro]?.status || false}
                  onChange={() => handleCheckbox(pro)}
                />
                <button
                  id="Mark-long-button"
                  onClick={() => setopen(open === pro ? null : pro)}
                >
                  {pro}
                </button>
              </div>

              {open === pro && (
                <div className="Mark-button-container-out">
                <div className="Mark-button-container text">
                  <textarea
                    className="Mark-checkbox-text"
                    placeholder={`Enter details for ${pro}`}
                    value={progress[pro]?.ans || ""}
                    onChange={(e) => handleChange(pro, e.target.value)}
                  ></textarea>
                 
                </div>
                <div className="savebtnout">
                   <button className="savebtn" onClick={() => handleSaveans(pro)}>Save</button>
                  </div>
             </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Project_detail;