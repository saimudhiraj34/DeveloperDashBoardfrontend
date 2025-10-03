import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import "./Imp_dates.css"; // Default styles
import NotificationPopup from "../Notification/NotificationPopup";
import { BringToFront } from "lucide-react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const Imp_dates = () => {

  const [date, setDate] = useState(new Date());
  const [actionBtn, setactionBtn] = useState("Today_Notifications");
  const [showPopup, setShowPopup] = useState(true);
  const [notifications, setnotifications] = useState([]);

  const fetchDates = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/imp/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
     
    setnotifications(data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/imp/delete/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state with response from backend
        fetchDates();
       toast.success("Deleted successfully!");
      } else {
        toast.error(data.message || "Failed to Delete remainder");
       
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };

    useEffect(() => {
   fetchDates();
  }, []);
  return (
    <>
 
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />


      <Title />
      <NavBar />
      {showPopup && (
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="imp-dates-container">
        <div className="calendar-container">
          <h2>
            📅 <strong>Notification </strong>Calendar
          </h2>
          <div className="mini-calendar">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
        <div className="notifications-container">
          <div className="notifications-action-btn">
            <h2
              onClick={() => {
                setactionBtn("All_Notifications");
              }}
            >
              Notifications
            </h2>
          </div>
          {actionBtn === "Today_Notifications" &&
  (notifications.filter(
    (notification) =>
      new Date(notification.Date).toDateString() === date.toDateString()
  ).length === 0 ? (
    <div className="notification-img">
    <img src="src/assets/notification.jpg" height="300px" alt="No tasks available" />
    </div>
  ) : (
    <div className="notifications-list">
      {notifications
        .filter(
          (notification) =>
            new Date(notification.Date).toDateString() === date.toDateString()
        )
        .map((notification, index) => (
          <div key={index} className="notification-box">
            <h4>{new Date(notification.Date).toLocaleDateString()}</h4>
            <p>{notification.message}</p>
            <button onClick={()=>{handleDelete(notification._id)}} className="notification-btn" >Delete</button>
          </div>
        ))}
    </div>
  ))}

          
        </div>
      </div>
    </>
  );
};

export default Imp_dates;