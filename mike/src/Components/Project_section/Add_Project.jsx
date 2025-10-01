
import { useState } from "react";
import { Plus, X } from "lucide-react";
import "./Add_Project.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Add_Project = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [planningDate, setPlanningDate] = useState("");
  const [testingDate, setTestingDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [deploymentDate, setDeploymentDate] = useState("");
  const [skillsInput, setskillsInput] = useState("");
  const [skills, setskills] = useState([]);
  const [description, setDescription] = useState("");
    const navigate=useNavigate()

  function addFeature() {
    const trimmed = skillsInput.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) {
      setskills((s) => [...s, trimmed]);
    }
    setskillsInput("");
  }

  function removeFeature(idx) {
    setskills((s) => s.filter((_, i) => i !== idx));
  }

  const handleSubmit =async(e)=>{ 
    e.preventDefault();
    const payload = {
      projectTitle,
      planningDate,
      testingDate,
      reviewDate,
      deploymentDate,
      skills,
      description,
    };
 try {
    const res = await fetch("http://localhost:3000/project/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
      
    if (!res.ok) {
    
      throw new Error(data.message || "Failed to save project");
     
    }

    toast.success("Project saved successfully!");
    setTimeout(()=>(navigate("/Project")),[1000])

    setProjectTitle("");
    setPlanningDate("");
    setTestingDate("");
    setReviewDate("");
    setDeploymentDate("");
    setskills([]);
    setDescription("");
    setskillsInput("");

  } catch (error) {
    console.error("Error saving project:", error);
    toast.error("❌ Failed to save project");
  }

  }

 


  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
    <Title />
    <NavBar/>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <header className="form-header">
          <div>
            <h1 className="form-title">Project Info</h1>
            <p className="form-subtitle">Add or update project milestones & features</p>
          </div>
        </header>

        <div className="form-grid">
          <div className="form-group full-width">
            <label className="form-label">Project Title</label>
            <input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter project title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Planning Phase Date</label>
            <input
              type="date"
              value={planningDate}
              onChange={(e) => setPlanningDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Testing Date</label>
            <input
              type="date"
              value={testingDate}
              onChange={(e) => setTestingDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Review Date</label>
            <input
              type="date"
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deployment Date</label>
            <input
              type="date"
              value={deploymentDate}
              onChange={(e) => setDeploymentDate(e.target.value)}
              className="form-input"
            />
          </div>

          {/* <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="form-option">
                  {s}
                </option>
              ))}
            </select>
          </div> */}

          <div className="form-group full-width">
            <label className="form-label">Technologies</label>
            <div className="feature-input-row">
              <input
                value={skillsInput}
                onChange={(e) => setskillsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Type a feature and press Enter or click +"
                className="form-input flex-1"
              />
              <button type="button" onClick={addFeature} className="btn-add">
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="features-list">
              {skills.length === 0 && <span className="no-features">No features added yet.</span>}
              {skills.map((f, i) => (
                <span key={f} className="feature-chip">
                  <span className="feature-text">{f}</span>
                  <button type="button" onClick={() => removeFeature(i)} className="btn-remove">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description or notes about the project"
                rows={4}
                className="form-textarea"
              />
            </div>
        </div>

        <footer className="form-footer">
          {/* <div className="form-status">
            Status: <span className="status-value">{status}</span>
          </div> */}
          <div className="form-buttons">
            <button
              type="reset"
              onClick={() => {
                setProjectTitle("");
                setPlanningDate("");
                setTestingDate("");
                setReviewDate("");
                setDeploymentDate("");    
                setDescription("");
             
              }}
              className="btn-reset"
            >
              Reset
            </button>

            <button type="submit" className="btn-save">
              Save Project
            </button>
          </div>
        </footer>
      </form>
    </div>
    </>
  );
}
export  default Add_Project;