import React from "react";
import "./DashBoard.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";



const DashBoard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressSections, setProgressSections] = useState([]);


  // Projects data
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/project/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      navigate("/");
      console.error("Error fetching projects:", err);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchDashboard = async () => {
       setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/syllabus/all_skills`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
         credentials: "include"
      });

      const resData = await res.json();

      const syllabus = resData.data;

      if (syllabus?.categories) {
        const sections = await Promise.all(
          Object.entries(syllabus.categories).map(async ([heading, items]) => {
            const itemsWithCount = await Promise.all(
              items.map(async (item) => {
                const { completed, total } = await getItemCountForItem(item);
                return { name: item, completed, total };
              })
            );
            const sectionTotal = itemsWithCount.reduce(
              (sum, item) => sum + item.total,
              0
            );
            return { heading, items: itemsWithCount, sectionTotal };
          })
        );

        setProgressSections(sections);
      }
    } catch (err) {
      console.error();
    }
    finally {
      setLoading(false); // 🔹 stop loader
    }
  };

  const getItemCountForItem = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/questions/${item}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return { completed: 0, total: 0 };

      const data = await res.json();
      const questions = data.questions || [];
      const total = data.totalQuestions || questions.length;
      const completed = questions.filter((q) => q.status).length;

      return { completed, total };
    } catch (err) {
      console.error("Error fetching item count", err);
      return { completed: 0, total: 0 };
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="body">
        <Title />
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Hamburger button */}
  
        <div className="Progress-box-out">
          <div className="ProgressOut">
            {progressSections.length > 0 ? (
              progressSections.map((section, idx) => (
                
                <div key={idx} className="ProgressIn">
                  <div className="Progress">
                    <div className="ProgressHead">
                      <div>{section.heading}</div>
                    </div>
                    <div className="ProgressBox">
                      <div className="ProgressBoxCircle">
                        <svg className="progress-ring" width="120" height="125">
                          <circle
                            className="progress-ring__background"
                            stroke="#eee"
                            strokeWidth="6"
                            fill="transparent"
                            r="48"
                            cx="55"
                            cy="60"
                          />
                          <circle
                            className="progress-ring__circle"
                            stroke="#00c6ff"
                            strokeWidth="6"
                            fill="transparent"
                            r="48"
                            cx="55"
                            cy="60"
                            strokeDasharray={2 * Math.PI *48}
                            strokeDashoffset={
                              2 *
                              Math.PI *
                              48 *
                              (1 -
                                section.items.reduce(
                                  (a, i) => a + i.completed,
                                  0
                                ) /
                                  section.sectionTotal)
                            }
                          />
                        </svg>
                        <div className="progress-ring__text">
                          {section.items.reduce((a, i) => a + i.completed, 0)}/
                          {section.sectionTotal}
                        </div>
                      </div>

                      <div className="ProgressBoxText">
                        {section.items.map((itemObj, index) => (
                          <React.Fragment key={index}>
                            <div className="ProgressPer">
                              <div className="JavaProgess">{itemObj.name}</div>
                              <div className="ProgressScore">
                                {itemObj.completed}/{itemObj.total}
                              </div>
                            </div>
                            <div className="percentage">
                              <div
                                className="inpercentage"
                                style={{
                                  width:
                                    itemObj.total > 0
                                      ? `${
                                          (itemObj.completed / itemObj.total) *
                                          100
                                        }%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                     {loading && <div className="loader"></div>}
                  </div>
                </div>
              ))
            ) : (
              <div className="pro-empty-state">
                <h2>No preparation data available | Add Categories To See </h2>
              </div>
            )}
          </div>
        </div>

        <div className="PreparationHead">
          <h2 className="PreparationTitle">Preparation</h2>
        </div>
        <div className="DashBoardout-box">
          <div className="DashBoardout">
            <div className="DashBoardIn">
              {progressSections.some((section) =>
                section.items.some((item) => item.completed)
              ) ? (
                progressSections.map((section, sIdx) =>
                  section.items
                    .filter((item) => item.completed > 0)
                    .map((item, iIdx) => {
                      const svgSize =130; // outer SVG width/height
                      const strokeWidth = 24;
                      const radius = (svgSize - strokeWidth) / 2;
                      const circumference = 2 * Math.PI * radius;
                      const progressFraction =
                        Number(item.completed) / Number(item.total);
                      const strokeDashoffset =
                        circumference * (1 - progressFraction);

                      return (
                        <div
                          className="DashBoard-progress"
                          key={`${sIdx}-${iIdx}`}
                        >
                          <div
                            className="circle-progress"
                            style={{ width: svgSize, height: svgSize }}
                          >
                            <svg width={svgSize} height={svgSize}>
                              {/* Background circle */}
                              <circle
                                stroke="white"
                                strokeWidth={6}
                                fill="transparent"
                                r={radius}
                                cx={svgSize / 2}
                                cy={svgSize / 2}
                              />
                              {/* Progress circle */}
                              <circle
                                stroke="#00c6ff"
                                strokeWidth={6}
                                background="transparent"
                                fill="transparent"
                                r={radius}
                                cx={svgSize / 2}
                                cy={svgSize / 2}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                style={{
                                  transition: "stroke-dashoffset 1s ease",
                                }}
                              />
                            </svg>

                            <div className="circle-inner">
                              {item.name}
                              <div className="circle-progress-text">
                                {item.total > 0
                                  ? `${Math.round(
                                      (item.completed / item.total) * 100
                                    )}%`
                                  : "0%"}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                )
              ) : (
                <div className="pro-empty-state">
                  <h2>
                    No preparation data available || complete the questions in
                    each Subject
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ProjectHead">
          <h2 className="ProjectTitle">Projects</h2>
        </div>
        <div className="ProjectBoxOut">
          {projects.length > 0 ? (
            projects.map((project, idx) => (
              <div key={idx} className="ProjectBoxIn">
                <div className="ProjectText">
                  <div className="ProjectBoxNav">
                    <div className="project-title">
                      <b>{project.projectTitle}</b>
                    </div>
                    <button className="ProjectButton">
                      <div className="ProjectComplete">Status:✅</div>
                    </button>
                  </div>
                  <div>{project.description}</div>
                  <div className="project-progress-btn">
                    <Link to={`/Project_detail/${project.projectTitle}`}>
                      <button>Get_Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="pro-empty-state">
              <h2>No projects available || Add Projects To See</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DashBoard;