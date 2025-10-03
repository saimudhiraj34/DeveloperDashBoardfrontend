import { useState } from "react";
import "./Schedule.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";




 const Schedule = () => {
  // Example data for each day
  const today = new Date();
  const [activeDate, setActiveDate] = useState("mon");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");

  const [schedule, setSchedule] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  // Find Monday of the current week
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  firstDayOfWeek.setDate(today.getDate() + diffToMonday);

  // Generate 7 days (Mon → Sun)
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    return {
      name: date.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue...
      number: date.getDate(), // date number
    };
  });
  const addSchedule = async () => {
    if (topic.trim === "" || details.trim() === "") {
      toast.error("Please enter both topic and details");
      return;
    }

    setSchedule((prev) => ({
      ...prev,
      [activeDate]: [...prev[activeDate], { topic, details }],
    }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/schedule/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day: activeDate,
          topic,
          details,
        }),
      });
     if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

        const result = await res.json();
        toast.success("Updated")
          if(!res.ok){
                toast.error(result.message);
              }
        getSchedule();
        setTopic("");
        setDetails("");

  } catch (err) {
    console.error("Error adding schedule:", err);
  }
};
 

  const getSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/get/${activeDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        
        const weeklySchedule = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
    data.forEach((item) => {
      weeklySchedule[item.day].push(item);
    });
    setSchedule(weeklySchedule);

      } else {
        toast.error("Failed to fetch schedule");
      }
    } catch (err) {
      toast.error("Server error while fetching schedule:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Schedule ID is missing");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/schedule/delete/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state with response from backend
        getSchedule();
        toast.success("Deleted");
      } else {
        toast.error(data.message || "Failed to Delete remainder");
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Failed to save remainder");
    }
  };
  // Fetch schedule when component mounts or activeDate changes
  useEffect(() => {
    getSchedule();
  }, [activeDate]);

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />
      <div className="calendar-nav">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveDate(day.name.toLowerCase());
            }}
            className={`calendar-day ${
              activeDate === day.name.toLowerCase() ? "activeDay" : ""
            }`}
          >
            <div className="day-name">{day.name}</div>
            <div className="day-number">{day.number}</div>
          </button>
        ))}
      </div>
      {activeDate === "mon" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong>{activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
              <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "tue" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
             <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "wed" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
               <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "thu" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
             <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "fri" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
              <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "sat" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
             <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
      {activeDate === "sun" && (
        <div className="schedule-details">
          <div className="schedule-title">
            <h2>
              Schedule for <strong> {activeDate.toUpperCase() + "DAY"}</strong>
            </h2>
          </div>
          <div className="schedule-inputs">
            <input
              placeholder="Topic (e.g., Java)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Details (e.g., OOPS)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={addSchedule}>Add</button>
          </div>
          <>
            {schedule[activeDate].length === 0 ? (
              <>
              <div className="notification-img">
              <img src="src/assets/schedule.png" height="400px"width="800px" alt="No tasks available" />
                <p>No Schedule</p>
              </div>
            
               </>
            ) : (
              <div className="schedule-item">
                {schedule[activeDate].map((item, idx) => (
                  <div key={idx} className="schedule-box">
                    <h3>{item.topic}</h3>
                    <p>{item.details}</p>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};
export default Schedule;
