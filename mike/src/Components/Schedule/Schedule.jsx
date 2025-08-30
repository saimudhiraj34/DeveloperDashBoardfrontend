import React from 'react';
import './Schedule.css';

import { NavBar } from '../Navbar/Navbar';      

export const Schedule = () => {
  // Example data for each day
  const scheduleData = [
    { topic: 'Java', mon: 'OOP', tue: 'Loops', wed: 'Arrays', thu: 'Functions', fri: 'Exceptions', sat: 'Revision', sun: 'Test' },
    { topic: 'Python', mon: 'Syntax', tue: 'Data Types', wed: 'Loops', thu: 'Functions', fri: 'Modules', sat: 'Projects', sun: 'Test' },
    { topic: 'JavaScript', mon: 'DOM', tue: 'Events', wed: 'ES6', thu: 'Async', fri: 'API', sat: 'Projects', sun: 'Test' },
  ];

  return (
    <>
    <NavBar/>
    <div className="schedule-container">
      <h2>Weekly Schedule</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((row, index) => (
            <tr key={index}>
              <td>{row.topic}</td>
              <td>{row.mon}</td>
              <td>{row.tue}</td>
              <td>{row.wed}</td>
              <td>{row.thu}</td>
              <td>{row.fri}</td>
              <td>{row.sat}</td>
              <td>{row.sun}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='buttons'>
      <button className="download-button">undo</button>
      <button className="download-button">Enable_Editing</button>    
      <button className="download-button">Clear_All</button>
      <button className="download-button">Add_To_Today</button>
      </div>
    </div>
    </>
  );
};
