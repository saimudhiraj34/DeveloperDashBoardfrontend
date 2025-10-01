import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy loaded components
const DashBoard = lazy(() => import("./Components/DashBoard/DashBoard"));
const Schedule = lazy(() => import("./Components/Schedule/Schedule"));
const Syllabus = lazy(() => import("./Components/syllabus/Syllabus"));
const Subject = lazy(() => import("./Components/syllabus/Subject"));
const WorkDone = lazy(() => import("./Components/WorkDone/WorkDone"));
const Project_section = lazy(() => import("./Components/Project_section/Project_section"));
const Add_Project = lazy(() => import("./Components/Project_section/Add_Project"));
const Title = lazy(() => import("./Components/Title/Title"));
const NavBar = lazy(() => import("./Components/NavBar/NavBar"));
const Remainder = lazy(() => import("./Components/Remainder/Remainder"));
const Imp_dates = lazy(() => import("./Components/Imp_dates/Imp_dates"));
const Notes = lazy(() => import("./Components/Notes/Notes"));
const Project_detail = lazy(() => import("./Components/Project_section/Project_detail"));
const Myapp = lazy(() => import("./Components/Notification/Myapp"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const Login = lazy(() => import("./Components/Login/Login"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div className="loader">Loading...</div>}>
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
        </Suspense>
      </Router>
    </>
  );
}

export default App;
