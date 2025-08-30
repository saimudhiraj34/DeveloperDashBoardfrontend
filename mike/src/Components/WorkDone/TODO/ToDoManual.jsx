import React, { useState } from "react";
import './ToDoManual.css';
import { NavBar } from "../../NavBar/NavBar";

export const ToDoManual = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    skill: "",
    description: "",
    date: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({ title: "", type: "", skill: "", description: "", date: "" });
  };

  return (
    <>
    <NavBar/>
    <div className="form-container">
      <h2>Add Work</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Skills">Skills</option>
            <option value="Core">Core</option>
            <option value="Platform">Platform</option>
          </select>
        </div>

        {/* Skills dropdown only if type is Skills */}
        {formData.type === "Skills" && (
          <div className="form-group">
            <label>Skill</label>
            <select
              name="skill"
              value={formData.skill}
              onChange={handleChange}
            >
              <option value="">-- Select Skill --</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>
        )}

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add</button>
      </form>

      {/* Table */}
      <h3>Work List</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Skill</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.type}</td>
              <td>{row.type === "Skills" ? row.skill : "-"}</td>
              <td>{row.description}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Get_ALL_Works</button>
    </div>
    </>
  );
};
