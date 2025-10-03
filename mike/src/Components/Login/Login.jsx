import React from "react";
import "./Login.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Title from "../Title/Title";

const Login = () => {
   const navigate=useNavigate()
    const [isLoginActive, setIsLoginActive] = useState(false);
    const [error, setError] = useState("");
    const [user,setuser]=useState({
      username:"",
      password:"",
      phone:"",
      linkedin:"",
      github:""
})
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        toast.success("User registered successfully!");
        setuser({
          username: "",
          password: "",
          phone: "",
          linkedin: "",
          github: ""
        });
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.success("Server error, try again later");
    }
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/user/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username:user.username,
          password:user.password
        }),
           credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setuser({
          username:"",
          password:""
        })
        toast.success("Login successfully");
        navigate("/DashBoard");
      } else {
          setuser({
          username:"",
          password:""
        })
       toast.error("Invalid credentials");
        navigate("/");
      }
    } catch (error) {  
      console.error("Login error:",error.message);
    }
  };

const handleChangeregister=(e)=>{
    const{name,value}=e.target;
     if (name === "password") {
      validatePassword(value);
    }
    setuser({...user,[name]:value});
};
const handleChange=(e)=>{
    const{name,value}=e.target;
    setuser({...user,[name]:value});
};
  const validatePassword = (password) => {
    const minLength = 8;
    const regexUpper = /[A-Z]/; // At least one uppercase
    const regexLower = /[a-z]/; // At least one lowercase
    const regexNumber = /[0-9]/; // At least one digit
    const regexSpecial = /[@$!%*?&]/; // At least one special char

    if (password.length < minLength) {
      setError("Password must be at least 8 characters long");
    } else if (!regexUpper.test(password)) {
      setError("Password must include at least one uppercase letter");
    } else if (!regexLower.test(password)) {
      setError("Password must include at least one lowercase letter");
    } else if (!regexNumber.test(password)) {
      setError("Password must include at least one number");
    } else if (!regexSpecial.test(password)) {
      setError("Password must include at least one special character (@, $, !, %, *, ?, &)");
    } else {
      setError(""); // ✅ All checks passed
    }
  };
  return (
    <>
    <ToastContainer position="top-center" autoClose={1000} />
    <div className="Login-container">
  
      <div className={`Wrapper animation ${isLoginActive ? "active" : ""}`}>
     
        <span className="bg_animate"></span>
       
        <span className="bg_animate2"></span>
     
        <div className="form-box login">
       <h2 className="animation" style={{ "--i": 0 }}><strong className="stronglogin">Login</strong>page</h2>
          <form onSubmit={handlelogin}>
            {/* Name */}
            <div  className="inputbox animation"style={{ "--i": 1 }}>              
              <input             
                type="text"
                id="username"
                name="username" 
                placeholder="Unique UserId" 
                value={user.username} 
                onChange={handleChange}   
                required
              />
              <label   htmlFor="name">Name:</label>
            </div>
                 <div className="inputbox  animation"style={{ "--i":2 }}>             
              <input             
                type="password"
                id="password"
                name="password"
                onChange={handleChange}   
                value={user.password}                
                required
              />
               <label   htmlFor="password">Password:</label>
            </div>         

            {/* Submit */}
            <div  className="animation" style={{ "--i": 2 }}>
              <button className="btn"type="submit">Login</button>
              <p>
              <a href="#" className="register-btn"onClick={(e) => { 
                e.preventDefault();    
                setIsLoginActive(true); 
              }}>Register</a>
              </p>
            </div>
          </form>
        </div>
        <div className={`info-text login animation ${isLoginActive?"active":""}`}>
        <h1>Welcome To </h1>
        <h1>Developer DashBoard </h1>      
  
        </div>
        <div className="form-box register">
          <h2 className="animation"style={{ "--i":4 }}><strong className="stronglogin">Sign Up</strong></h2>
          <form onSubmit={handleRegistration}>
             {error && <p style={{ color: "red", size:"20px" }}>{error}</p>}
            {/* Name */}
            <div  className="inputbox animation"style={{ "--i":3 }}>   
                            
              <input             
                type="text"
                id="username"
                name="username"
                 placeholder="Unique UserId" 
                onChange={handleChangeregister}   
                value={user.username}   
                required
              />
              <label   htmlFor="name">Name:</label>
            </div>
            <div className="inputbox  animation"style={{ "--i":3}}>             
              <input             
                type="password"
                id="password"
                name="password"
                onChange={handleChangeregister}   
                value={user.password} 
                            
                required
              />
             
               <label   htmlFor="password">Password:</label>
            </div>
            <div className="inputbox  animation"style={{ "--i": 4 }}>             
              <input             
                type="tel"
                id="phone"
                name="phone"
                onChange={handleChangeregister}   
                value={user.phone}                
                required
              />
               <label   htmlFor="phone">Phone:</label>
            </div>

            {/* LinkedIn */}
            <div  className="inputbox  animation"style={{ "--i":4}}>
            
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                onChange={handleChangeregister}   
                value={user.linkedin} 
            ></input>
              <label  htmlFor="linkedin">LinkedIn:</label>
            </div>

            {/* GitHub */}
            <div  className="inputbox  animation"style={{ "--i":3 }}>             
              <input                
                id="github"
                name="github"
                 onChange={handleChangeregister}   
                value={user.github}                 
              />
               <label htmlFor="github">GitHub:</label>
            </div>

            {/* Submit */}
            <div  className="animation" style={{ "--i":4 }}>
              <button className="btn"type="submit">Register</button>
              <p>!Account ?
              <a href="#" className="register-btn"onClick={(e) => { 
                e.preventDefault();
                setIsLoginActive(false); 
              }}>Login</a>
              </p>
            </div>
          </form>
        </div>
          <div className="info-text register animation" >
          <h1>Register Your Details</h1>
        </div>
           
      </div>
    </div>
    </>
  );
};
export default Login;