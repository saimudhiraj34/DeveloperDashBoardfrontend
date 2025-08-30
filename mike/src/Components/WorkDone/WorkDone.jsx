import React from 'react';
import './WorkDone.css';
import { Link } from 'react-router-dom';

export const WorkDone = () => {
  return (
    <div className="WorkDone_Container">
      <Link to="/ToDoManual"><button className="WorkBtn">Add_Manually</button></Link>
      <h1 className="WorkBtnh1">Or</h1>
      <Link to="/ToDoAll"><button className="WorkBtn">Add_All_Works</button></Link>
    </div>
  );
};
