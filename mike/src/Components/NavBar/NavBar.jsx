import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
   <>
   <div className='Navbarheader'>
    <ul className='Navbarlist'>
        <Link to="/"><li>DashBoard</li></Link>
        <Link to="/Syllabus"><li>Add_Syllabus</li></Link>
        <Link to="/WorkDone"><li>WDT</li></Link>
        <Link to="/Project" ><li>Projects_Prog</li></Link>
        <li>Reminders</li>
        <li>Applications_Prog</li>
        <li>Imp_Dates</li>
        <Link to="/Schedule"><li>Schedule</li></Link>
    </ul>
    <div className='ProfileOut'>
        <div className='ProfileIn'>A</div>

    </div>
   </div>
   </>
  )
}
