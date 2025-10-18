import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  // ===== Register Handler =====
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND2}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("User registered successfully!");
        setUser({
          username: "",
          password: "",
          phone: "",
          linkedin: "",
          github: "",
        });
        setIsLoginActive(true);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  // ===== Login Handler =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful");
        navigate("/DashBoard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // ===== Password Validation =====
  const validatePassword = (password) => {
    const minLength = 8;
    const regexUpper = /[A-Z]/;
    const regexLower = /[a-z]/;
    const regexNumber = /[0-9]/;
    const regexSpecial = /[@$!%*?&]/;

    if (password.length < minLength)
      return setError("Password must be at least 8 characters long");
    if (!regexUpper.test(password))
      return setError("Password must include at least one uppercase letter");
    if (!regexLower.test(password))
      return setError("Password must include at least one lowercase letter");
    if (!regexNumber.test(password))
      return setError("Password must include at least one number");
    if (!regexSpecial.test(password))
      return setError(
        "Password must include at least one special character (@, $, !, %, *, ?, &)"
      );

    setError("");
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="Login-container">
        <div className="Wrapper">
          {/* ===== Logo Box (auto handled in CSS pseudo) ===== */}
          {isLoginActive ? (
            <form onSubmit={handleLogin}>
              <h2>
                <strong>Welcome Back</strong>
              </h2>
              <p>Enter your credentials to access your account</p>

              <div className="inputbox">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="user@gmail.com"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputbox">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <a href="#">Forgot password?</a>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p>
                Don’t have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginActive(false);
                  }}
                >
                  Sign up
                </a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegistration}>
              <h2>
                <strong>Create Account</strong>
              </h2>
              <p>Fill in the details to register</p>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="inputbox">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Unique UserId"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputbox">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) => {
                    handleChange(e);
                    validatePassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="inputbox">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputbox">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={user.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="inputbox">
                <label htmlFor="github">GitHub</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  placeholder="https://github.com/username"
                  value={user.github}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Registering..." : "Sign Up"}
              </button>

              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginActive(true);
                  }}
                >
                  Login
                </a>
              </p>
            </form>
          )}

          {loading && <div className="loader"></div>}
        </div>
      </div>
    </>
  );
};

export default Login;
