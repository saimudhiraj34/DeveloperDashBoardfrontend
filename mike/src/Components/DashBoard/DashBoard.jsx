import React from "react";
import "./DashBoard.css";
import { Title } from "../Title/Title";
import { NavBar } from "../NavBar/NavBar";

export const DashBoard = () => {

  const progressSections = [
    {
      heading: "Skills",
      items: ["Java", "Python", "JavaScript", "WebDevelopment", "WebDevelopment"],
    },
    {
      heading: "Core",
      items: ["ComputerSystems", "Operating System", "DBMS", "Machine Learning", "GitHub", "Power BI"],
    },
    {
      heading: "Plaforms",
      items: ["Leetcode", "GeeksForGeeks", "CodeChef", "Vscode [Manual]"],
    },
  ];

  const preparationItems = [
    "Java Preparation",
    "Python Preparation",
    "JavaScript Preparation",
    "Operating_Systems Preparation",
    "Computer_Systems Preparation",
    "Java Preparation",
    "Java Preparation",
    "Java Preparation",
  ];

  // Projects data
  const projects = [
    {
      title: "Grocery_Store",
      diagramLink: "#",
      status: "COMPLETED",
      startEnd: "20-8-2025 END:-25-8-2025",
      goal:
        "finding the solution for storing the goods efficent,tracking credituser,out_0f_stock,highSelling",
    },
    {
      title: "Grocery_Store",
      diagramLink: "#",
      status: "COMPLETED",
      startEnd: "20-8-2025 END:-25-8-2025",
      goal:
        "finding the solution for storing the goods efficent,tracking credituser,out_0f_stock,highSelling",
    },
    {
      title: "Grocery_Store",
      diagramLink: "#",
      status: "COMPLETED",
      startEnd: "20-8-2025 END:-25-8-2025",
      goal:
        "finding the solution for storing the goods efficent,tracking credituser,out_0f_stock,highSelling",
    },
  ];

  return (
    <>
    <div className="body">
      <Title />
      <NavBar />

      <div className="ProgressOut">
        {progressSections.map((section, idx) => (
          <div key={idx} className="ProgressIn">
            <div className="Progress">
              <div className="ProgressHead">
                <div>{section.heading}</div>
              </div>
              <div className="ProgressBox">
                <div className="ProgressBoxCircle"></div>
                <div className="ProgressBoxText">
                  {section.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="ProgressPer">
                        <div className="JavaProgess">{item}</div>
                        <div className="ProgressScore">28/100</div>
                      </div>
                      <div className="percentage">
                        <div className="inpercentage"></div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="PreparationHead">
        <h1 className="PreparationTitle">Preparation</h1>
      </div>
      <div className="DashBoardout">
        <div className="DashBoardIn">
          {preparationItems.map((prep, idx) => (
            <button className="DashBoard-progress"key={idx}>
              <div className="circle-progress">
                <div className="circle-inner">{prep}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="ProjectHead">
        <h1 className="ProjectTitle">Projects</h1>
      </div>
      <div className="ProjectBoxOut">
        {projects.map((project, idx) => (
          <div key={idx} className="ProjectBoxIn">
            <div className="ProjectText">
              <div className="ProjectBoxNav">
                Details
                <button className="ProjectButton">
                  <div className="ProjectComplete">InProgress</div>
                </button>
                <button className="ProjectButton">
                  <div className="ProjectComplete">Status:✅</div>
                </button>
              </div>
              <div>
                <strong>Title:-</strong>
                {project.title}
              </div>
              <div>
                <strong>Raw_Diagram/Structure </strong>
                <a href={project.diagramLink}>Link</a>
              </div>
              <div>
                <strong>STATUS:-</strong>
                {project.status}
              </div>
              <div>
                <strong>START:-</strong> {project.startEnd}
              </div>
              <div>
                <strong>project_goal</strong>:-{project.goal}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};
