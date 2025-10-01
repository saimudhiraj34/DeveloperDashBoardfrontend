import React, { useState } from "react";
import NotificationPopup from "./NotificationPopup";

const Myapp = () => {
  const [showPopup, setShowPopup] = useState(true);

  const notifications = [
    { title: "New Message", message: "You have received a new message!" },
    { title: "System Update", message: "Your app was updated successfully." },
    { title: "Reminder", message: "Don't forget your meeting at 5PM." },
  ];

  return (
    <div>
      <h1>My App</h1>
      {showPopup && (
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Myapp;
