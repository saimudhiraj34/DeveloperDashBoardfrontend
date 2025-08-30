import React from "react";
import "./Project_section.css";
import { NavBar } from "../NavBar/NavBar";

export const Project_section = () => {
  const steps = [
    {
      label: "Planning",
      description: "Project requirements and planning phase",
      date: "Dec 1, 2024",
      status: "completed",
      icon: "✔",
    },
    {
      label: "Development",
      description: "Building the core features",
      date: "Dec 15, 2024",
      status: "completed",
      icon: "✔",
    },
    {
      label: "Testing",
      description: "Quality assurance and testing",
      date: "Expected: Dec 22, 2024",
      status: "in-progress",
      icon: "⏳",
    },
    {
      label: "Review",
      description: "Final review and approval",
      status: "pending",
      icon: "",
    },
    {
      label: "Deployment",
      description: "Deploy to production",
      status: "pending",
      icon: "",
    },
  ];

  const features = [
    "Visual progress tracking with animated transitions",
    "Multiple status types (completed, current, pending, warning)",
    "Responsive design that works on all devices",
    "Customizable steps and status messages",
  ];
  return (
    <>
    <NavBar/>
      <div className="container">
        <h1>Project Progress Tracker</h1>
        <p className="subtitle">
          Track your project status like Flipkart delivery tracking
        </p>
        <div className="progress-container-out">
          <div className="progress-container-inner">
            <div
              className="progress-container"
              style={{
                "--progress-width": `${
                  (steps.filter((s) => s.status === "completed").length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            >
              {steps.map((step, index) => (
                <div key={index} className={`step ${step.status}`}>
                  <div className="circle">{step.icon}</div>
                  <div className="label">{step.label}</div>
                  <p>{step.description}</p>
                  {step.date && <p>{step.date}</p>}
                  {step.status === "in-progress" && (
                    <span className="status">In Progress</span>
                  )}
                </div>
              ))}
            </div>

            <div className="features">
              <h2>Features</h2>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="go-to" id="go-to">Go To Page</button> 
          </div>
          <div className="progress-container-inner">
            <div
              className="progress-container"
              style={{
                "--progress-width": `${
                  (steps.filter((s) => s.status === "completed").length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            >
              {steps.map((step, index) => (
                <div key={index} className={`step ${step.status}`}>
                  <div className="circle">{step.icon}</div>
                  <div className="label">{step.label}</div>
                  <p>{step.description}</p>
                  {step.date && <p>{step.date}</p>}
                  {step.status === "in-progress" && (
                    <span className="status">In Progress</span>
                  )}
                </div>
              ))}
            </div>

            <div className="features">
              <h2>Features</h2>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="progress-container-inner">
            <div
              className="progress-container"
              style={{
                "--progress-width": `${
                  (steps.filter((s) => s.status === "completed").length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            >
              {steps.map((step, index) => (
                <div key={index} className={`step ${step.status}`}>
                  <div className="circle">{step.icon}</div>
                  <div className="label">{step.label}</div>
                  <p>{step.description}</p>
                  {step.date && <p>{step.date}</p>}
                  {step.status === "in-progress" && (
                    <span className="status">In Progress</span>
                  )}
                </div>
              ))}
            </div>

            <div className="features">
              <h2>Features</h2>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="progress-container-inner">
            <div
              className="progress-container"
              style={{
                "--progress-width": `${
                  (steps.filter((s) => s.status === "completed").length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            >
              {steps.map((step, index) => (
                <div key={index} className={`step ${step.status}`}>
                  <div className="circle">{step.icon}</div>
                  <div className="label">{step.label}</div>
                  <p>{step.description}</p>
                  {step.date && <p>{step.date}</p>}
                  {step.status === "in-progress" && (
                    <span className="status">In Progress</span>
                  )}
                </div>
              ))}
            </div>

            <div className="features">
              <h2>Features</h2>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="progress-container-inner">
            <div
              className="progress-container"
              style={{
                "--progress-width": `${
                  (steps.filter((s) => s.status === "completed").length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            >
              {steps.map((step, index) => (
                <div key={index} className={`step ${step.status}`}>
                  <div className="circle">{step.icon}</div>
                  <div className="label">{step.label}</div>
                  <p>{step.description}</p>
                  {step.date && <p>{step.date}</p>}
                  {step.status === "in-progress" && (
                    <span className="status">In Progress</span>
                  )}
                </div>
              ))}
            </div>

            <div className="features">
              <h2>Features</h2>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
