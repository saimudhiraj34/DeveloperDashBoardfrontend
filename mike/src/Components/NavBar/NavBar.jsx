  import React, { useState } from "react";
  import "./NavBar.css";
  import { Link } from "react-router-dom";
  import { useEffect } from "react";


const NavBar = () => {
    const [profile, setProfile] = useState();
 
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/user/get`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
    
        if (res.ok) {
          setProfile(result.user);
        } else {
          alert(result.message || "Failed to load profile");
      
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    useEffect(() => {
      fetchProfile();
    }, []);
    return (
      <>
        <div className="Navbarheader">

          <ul className="Navbarlist">
            <Link to="/DashBoard">
              <li>DashBoard</li>
            </Link>
            <Link to="/Syllabus">
              <li>Add_Syllabus</li>
            </Link>
            <Link to="/WorkDone">
              <li>WDT</li>
            </Link>
            <Link to="/Project">
              <li>Projects_Prog</li>
            </Link>
            <Link to="/Remainder">
              <li>Reminders</li>
            </Link>
            <Link to="/Notes">
              <li>Notes</li>
            </Link>
            <Link to="/Imp_Dates">
              <li>Imp_Dates</li>
            </Link>
            <Link to="/Schedule">
              <li>Schedule</li>
            </Link>
          <div className="ProfileOut">
            <Link to="/Profile">
              <div className="ProfileIn">
                {profile?.username
                  ? profile.username.charAt(0).toUpperCase()
                  : ""}
              </div>
            </Link>
          </div>
          </ul>
          
        </div>
      </>
    );
  };
  export default NavBar;
