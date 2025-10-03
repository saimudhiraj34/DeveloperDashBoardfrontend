import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Direct imports
import DashBoard from "./Components/DashBoard/DashBoard";
import Schedule from "./Components/Schedule/Schedule";
import Syllabus from "./Components/syllabus/Syllabus";
import Subject from "./Components/syllabus/Subject";
import WorkDone from "./Components/WorkDone/WorkDone";
import Project_section from "./Components/Project_section/Project_section";
import Add_Project from "./Components/Project_section/Add_Project";
import Title from "./Components/Title/Title";
import NavBar from "./Components/NavBar/NavBar";
import Remainder from "./Components/Remainder/Remainder";
import Imp_dates from "./Components/Imp_dates/Imp_dates";
import Notes from "./Components/Notes/Notes";
import Project_detail from "./Components/Project_section/Project_detail";
import Myapp from "./Components/Notification/Myapp";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Syllabus" element={<Syllabus />} />
        <Route path="/:sub" element={<Subject />} />
        <Route path="/WorkDone" element={<WorkDone />} />
        <Route path="/Project" element={<Project_section />} />
        <Route path="/Add_Project" element={<Add_Project />} />
        <Route path="/Title" element={<Title />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Remainder" element={<Remainder />} />
        <Route path="/Imp_Dates" element={<Imp_dates />} />
        <Route path="/Notification" element={<Myapp />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Project_detail/:title" element={<Project_detail />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
