import { NavBar } from "./Components/NavBar/NavBar"
import { DashBoard } from "./Components/DashBoard/DashBoard"
import { Title } from "./Components/Title/Title"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Project_section } from "./Components/Project_section/Project_section";
import { Schedule } from "./Components/Schedule/Schedule";
import { WorkDone } from "./Components/WorkDone/WorkDone";
import { ToDoManual } from "./Components/WorkDone/TODO/ToDoManual";
import { ToDoAll } from "./Components/WorkDone/TODO/ToDoAll";
import { Syllabus } from "./Components/syllabus/Syllabus";
import Add_syllabus from "./Components/syllabus/Add_syllabus";

function App() {


  return (
    <>   
     <Router> 
       <Routes>
      <Route path="/" element={<DashBoard/>}/>
      <Route path="/Schedule" element={<Schedule/>}/>
      <Route path="/ToDoManual" element={<ToDoManual/>}/>
      <Route path="/ToDoAll" element={<ToDoAll/>}/>
      <Route path="/Syllabus" element={<Syllabus/>}/>
      <Route path="/Add_syllabus" element={<Add_syllabus/>}/>

      <Route path="/WorkDone" element={<WorkDone/>}/>
      <Route path="/Project" element={<Project_section/>}/>
     <Route path="/Title" element={<Title/>}/>
     <Route path="/NavBar" element={ <NavBar/> }/>   
      </Routes>
      </Router>
     </>
  )
}

export default App
