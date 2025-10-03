import React from 'react'
import { useEffect } from 'react';
import './Syllabus.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { ToastContainer, toast } from 'react-toastify';

const Syllabus = () => {
  const Navigate=useNavigate();
  const [categories, setCategories] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");
  const [deleteSkill, setDeleteSkill] = useState("");
    const handleClick = (skill) => {
        Navigate(`/${skill.toLowerCase()}`);
      }

    const fetchCategories = async () => {
      const token=localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/syllabus/all_skills`, {
            method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCategories(data.data.categories);
        } 
         
      } catch (err) {
        console.error(err);
        alert("Server error while fetching categories");
      }
    };
     useEffect(() => {
    fetchCategories();
  }, []);



    const handleAdd = async() => {
    if (!newCategory || !newSkills)
      { 
        toast.error("Enter The Inputs")
        return;
        }
    const categoryKey = newCategory.trim().toLowerCase();
    const skillsArray = newSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
      const token=localStorage.getItem("token")
       try {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/syllabus/add_skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify({category:categoryKey,skills:skillsArray})
         
      });
      const data = await res.json();
       if (res.ok) {    
      fetchCategories();
      toast.success("Skill Added");
      setNewCategory("");
    } 
      
    else {
      alert(data.msg || "Error adding skills");
    }
       }
       catch (err) {
    console.error(err);
    alert("Server error");
  }  
  setNewCategory("");
  setNewSkills("");
};
const handleDelete = async() => {
  const categoryKey = deleteCategory.trim().toLowerCase();
  const skillToDelete = deleteSkill.trim();
  if(!categoryKey || !skillToDelete){
    toast.error("Enter Inputs");
  }
  const token=localStorage.getItem("token");  
  try{
    const res=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/syllabus/delete_skill`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
     body: JSON.stringify({category:categoryKey,skill:skillToDelete})
    });
    const data=await res.json();
    if(res.ok){
      fetchCategories();
    toast.success(`Deleted ${skillToDelete}`);
    }
    else {
      toast.error(data.msg || "Error adding skills");
    }
  }
  catch (err) {
    console.error(err);
    alert("Server error");
  }
  setDeleteCategory("");
  setDeleteSkill("");
};

return (
  <>
   <ToastContainer position="top-center" autoClose={4000} />
      <Title/> 
    <NavBar/>
   
    <div className='syllabus-container'>
        <h2 >Syllabus</h2>
    </div>
    <div className='syllabus-input'>
    <input
          className="syllabus-input-name"
          placeholder="Enter Category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          />
        <input
              className="syllabus-input-name"
              placeholder="Enter Skills (comma separated)..."
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  handleAdd();
                  }
                }}
              
              />
        <button className="syllabus-button-btn" onClick={handleAdd}>
          Add
        </button>

    </div> 
    <div className="subjects-container">
        {Object.entries(categories).map(([category, skills]) => (
          <div className="Skills" key={category}>
            <div className="skills-heading">
              <h3>{category.toUpperCase()}</h3>
            </div>
            <div className="buttons">
              {skills.map((skill, index) => (
                <button
                key={index}
                className="button"
                onClick={() => handleClick(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='syllabus-delete-btn'>
        <div className='syllabus-h2'><h2>ENTER WHAT YOU WANT TO DELETE</h2></div>
      <div className='syllabus-delete-input'>
           <input
            className='delete-input'
            placeholder='CategoryName...'
            value={deleteCategory}
            onChange={(e) => setDeleteCategory(e.target.value)}
            />
       <input
            className='delete-input'
            placeholder='Skill Name... (leave empty to delete category)'
            value={deleteSkill}
            onChange={(e) => setDeleteSkill(e.target.value)}
             onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                   handleDelete();
                  }
                }}
            />
        <button className='delete-btn' onClick={handleDelete}>Delete</button>
      </div>
      </div>
   
    </>
  )
}
// setCategories((prev) => {
//   const existingSkills = prev[categoryKey] || []; 
//   const updatedSkills = [...existingSkills];
//   for (let skill of skillsArray) {
//     if (existingSkills.includes(skill)) {
//       alert(`Skill "${skill}" already exists in ${categoryKey}`);
//     } else {
//       updatedSkills.push(skill);
//     }
//   }
//   return {
//     ...prev,
//     [categoryKey]: updatedSkills,
//   };
// });

export default Syllabus;