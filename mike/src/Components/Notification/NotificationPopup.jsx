import React, { useState } from "react";
import "./NotificationPopup.css";

const NotificationPopup = ({ notifications, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!notifications || notifications.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notifications.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? notifications.length - 1 : prev - 1
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h3>🔔 Notification {currentIndex + 1}/{notifications.length}</h3>
        <p><strong>{notifications[currentIndex].title}</strong></p>
        <p>{notifications[currentIndex].message}</p>

        <div className="popup-controls">
          {notifications.length > 1 && (
            <>
              <button onClick={handlePrev}>⬅ Prev</button>
              <button onClick={handleNext}>Next ➡</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
