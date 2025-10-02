import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import "./Remainder.css";
import { ToastContainer, toast } from 'react-toastify';


 const Remainder = () => {
  const [remainderList, setRemainderList] = useState([]);
  const [active, setActive] = useState("Remainder");
  const [remainder, setRemainder] = useState({
    text: "",
    remainder: false,
    time: "",
  });
    const [inputDate, setInputDate] = useState({
    date: "",
    title: "",
  });

  // Handle input and checkbox changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setRemainder((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleDateChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const handleDateSave = async() => {
    
    
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/imp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({date:inputDate.date,message:inputDate.title}),
    });

    if (res.ok) {
      toast.success("update status");
    }
  } catch (err) {
    toast.error("Status update error", err);
    toast.error("Server error while updating status");
  }
};


  const handleToggle = async(index) => {
    const updatedList = [...remainderList];
    updatedList[index].remainder =!updatedList[index].remainder;
    setRemainderList(updatedList);
    try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/remainder/update_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: updatedList[index]._id,
       } // new status
      ),
    });

    if (res.ok) {
     fetchData();
      toast.success("update status");
    }
  } catch (err) {
    toast.error("Status update error", err);
    toast.error("Server error while updating status");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!remainder.text.trim() || !remainder.time) {
      toast.error("Please fill both text and time before setting a remainder!");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/remainder/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional
        },
        body: JSON.stringify({
          text: remainder.text,
          remainder: remainder.remainder,
          time: remainder.time,
        }),
      });

      const data = await res.json();

      if (res.ok) {
       toast.success("Updated Remainder")
       fetchData();
       setRemainder({ text: "",remainder: false,time: "",})
      } else {
        toast.error(data.message || "Failed to save remainder");
      }
    } catch (err) {
      toast.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/remainder/delete/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state with response from backend
        fetchData();
        toast.success("Deleted");
      } else {
        toast.error(data.message || "Failed to Delete remainder");
      }
    } catch (err) {
      toast.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };
  // Function to speak reminder
  const speakReminder = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const resReminders = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/remainder/get`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const remindersData = await resReminders.json();
    
      setRemainderList(remindersData);
    } catch (err) {
      toast.error(err);
    }
  };

 useEffect(() => {
  fetchData();
  const interval = setInterval(() => {
    const now = new Date();
    setRemainderList((prevList) =>
      prevList.map((item) => {
        if (
          item.remainder &&
          item.time &&
          !item.spoken
        ) {
          const [hours, minutes] = item.time.split(":");
          if (now.getHours() === parseInt(hours) &&
              now.getMinutes() === parseInt(minutes)) {
            speakReminder("Hey! You have to do " + item.text);
            return { ...item, spoken: true }; // mark as spoken
          }
        }
        return item;
      })
    );
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />
      <div className="remainder-container">
        <div className="remainder-input-container">
          <div className="remainder-tabs">
            <h2
              className={`remainder-input-remainder ${
                active === "Remainder" ? "activeRemainder" : ""
              }`}
              onClick={() => setActive("Remainder")}
            >
              <strong>Remainders</strong>
            </h2>
            <h2
              className={`remainder-input-remainder ${
                active === "Dates" ? "activeRemainder" : ""
              }`}
              onClick={() => setActive("Dates")}
            >
              <strong>Dates</strong>
            </h2>
          </div>

          {active === "Remainder" && (
            <form onSubmit={handleSubmit}>
              <h1>
                Set <strong>Remainder</strong>
              </h1>
              <div className="remainder-alarm">
                <label>
                  <b>What you want to remaind?</b>
                </label>
                <input
                  type="text"
                  placeholder="What do you want to be reminded about?"
                  name="text"
                  value={remainder.text}
                  onChange={handleChange}
                  className="remainder-input"
                />
                <label>
                  <b>At what Time You want?</b>
                </label>
                <input
                  type="time"
                  name="time"
                  value={remainder.time}
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const exist = remainderList.find(
                      (item) => item.time === selectedTime
                    );
                    if (exist) {
                      alert(
                        "Remainder already set for this time. Please choose a different time."
                      );
                      return;
                    }
                    handleChange(e);
                  }}
                  className="remainder-time"
                />
                <button type="submit">Set</button>
              </div>
            </form>
          )}

          {active === "Dates" && (
            <>
              <h2 className="dates-set">
                Set<strong>Date</strong>
              </h2>
              <div className="date-display">
                <label>What is Imp On That Day</label>
                <input
                  type="text"
                  name="title"
                  value={inputDate.title}
                  onChange={handleDateChange}
                  placeholder="Enter Title"
                />
                <label>Choose Date</label>
                <input
                  type="date"
                  name="date"
                  value={inputDate.date}
                  onChange={handleDateChange}
                />
                <button onClick={handleDateSave}>Save</button>
              </div>
            </>
          )}
        </div>
        <div className="remainder-display">
          {remainderList.length > 0 ? (
            <div className="remainder-list">
              {remainderList.map((remainder, index) => (
                <div key={index} className="remainder-item">
                  <h2>{remainder.text}</h2>
                  <p>At: {remainder.time}</p>
                  <div className="remainder-actions">
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="remainder"
                        checked={remainder.remainder}
                        onChange={() => {handleToggle(index)}}
                      />
                      <span className="slider round"></span>
                    </label>
                    <button
                      className="remainder-btn"
                      onClick={() => {
                        handleDelete(remainder._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <img src="src/assets/remainder.jpg" alt="No tasks available" />
          )}
        </div>
      </div>
    </>
  );
};
export default Remainder;