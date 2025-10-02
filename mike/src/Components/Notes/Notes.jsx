import React, { useState } from "react";
import "./Notes.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';

const Notes = () => {
  const [notes, setnotes] = useState([]);
  const [newnotes, setnewnotes] = useState({ title: "", description: "" });
  const [tempdes, settempdes] = useState("");
  const [opennotes, setopennotes] = useState(null);


  const handleSave = async() => {
    if (newnotes.title.trim() === "") {
      toast.error("Please enter note title");
      return;
    }
     const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/note/add_title`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional
        },
        body: JSON.stringify({
          title:newnotes.title,
        }),
      });

      const data = await res.json();

      if (res.ok) {
      toast.success("Title Added")
    fetchNotes();
    setnewnotes({"title":""})
      } else {
        toast.error(data.message || "Failed to save remainder");
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };
  const handleSavedes =async(idx,id) => {
  
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/note/add_ans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
         id:id,
         description:tempdes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchNotes();
        toast.success("Description saved!");
      } else {
        toast.success(data.message || "Failed to save remainder");
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/note/delete/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await res.json();

      if (res.ok) {
        fetchNotes();
        toast.success("Deleted");
      } else {
        toast.error(data.message || "Failed to Delete remainder");
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/note/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
    
      if (res.ok) {
        setnotes(data);
      } else {
        toast.error(data.message || "Failed to fetch notes");
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error("Server error while fetching notes");
    }
  };
 useEffect(() => {
    fetchNotes();
}, []);
  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />
      <div className="notes-container">
        <div className="notes-sidebar">
          <h3>Notes</h3>
          <div className="notes-input">
            <input
              className="notename"
              placeholder="Enter NoteName..."
              value={newnotes.title}
              onChange={(e) => {
                setnewnotes({ ...newnotes, title: e.target.value });
              }}
                 onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  handleSave();
                  }
                }}
            ></input>
            <button onClick={handleSave}>Add</button>
          </div>
          <div className="notes-list">
            {notes.map((note, idx) => (
              <div key={idx} className="note-item">
                <button
                  onClick={() => {
                    setopennotes(idx);
                     settempdes(notes[idx].description || "");
                  }}
                >
                  {note.title}
                </button>
                <FaTrash
                  className="note-delete"
                  size={40}
                  onClick={() => {handleDelete(note._id)}}
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "red",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="notes-area">
          <div className="notes-out">
            {opennotes !== null && (
              <>
                <h3>{notes[opennotes].title}</h3>
                <textarea
                  className="notes-description-box"
                  name="notes-area"
                  id=""
                  value={tempdes}
                  onChange={(e) => settempdes(e.target.value)}
                ></textarea>
                <button onClick={() => handleSavedes(opennotes,notes[opennotes]._id)}>Save</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export  default Notes;