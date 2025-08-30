import React from 'react'
import './Syllabus.css'
import { Link } from 'react-router-dom'
export const Syllabus = () => {
    const skills = ['Java', 'Python','python', 'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js'];
    
  return (
    <>
    <div className='syllabus-container'>
        <h1 >Syllabus</h1>
    </div>
    <div className='subjects-container'>
        <div className='Skills'>
            <div className='skills-heading'>
            <h2>Skills</h2>
            </div>
        
            <div className='buttons'>
            {skills.map((skill, index) => (
                <button key={index} className='button'>{skill}</button>
            ))}
            </div>

        </div>
    </div>
   
<div className="Add_syllabus">
  <Link to="/Add_syllabus">
    <button className="button">Add Syllabus</button>
  </Link>
</div>
    </>
  )
}
