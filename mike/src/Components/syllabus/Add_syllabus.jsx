import React, { useState } from "react";
import "./Add_syllabus.css";

const Add_syllabus= () => {
  const [skill, setSkill] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Skill:", skill);
    console.log("Subject:", subject);
    if (file) console.log("Uploaded File:", file.name);
  };

  return (
    <div className="syllabus-box">
      <h2>Add Syllabus</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <div className="options">
          <button type="button" className="manual-btn">
            Add Manually
          </button>

          <label className="file-btn">
            Add Through File
            <input
              type="file"
              accept=".pdf,.xlsx,.csv"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add_syllabus;
