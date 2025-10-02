import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Subject.css";
import NavBar from "../NavBar/NavBar";
import Title from "../Title/Title";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';


 const Subject = () => {
  const { sub } = useParams();
  const [questions, setQuestions] = useState([]);
  const [Quest, setQuest] = useState("");
  const [openQuestion, setopenQuestion] = useState([]);
  const [TempAnswers, setTempAnswers] = useState([]);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/questions/${sub}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.questions)) {
          const newQuestions = data.questions.map((q) => ({
            ...q,
            selected: q.status || false, 
          }));
          setQuestions(newQuestions);
          setopenQuestion(new Array(newQuestions.length).fill(false));
          setTempAnswers(newQuestions.map((q) => q.ans || ""));
        } else {
          console.error("No questions found in response", data);
        }
      } else {
        console.error("Error fetching questions");
   
      }
    } catch (err) {
      console.error("Server error", err);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [sub]);

  const handleQuestion = async () => {
    const newQ = Quest.trim();
    const newQuestionObj = { id: Date.now(), text: newQ };
    setQuest("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/questions/add_question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sub, newQuestion: newQuestionObj }),
      });
      if (res.ok) {
        fetchQuestions();
        toast.success("question Added")
      } else {
        alert("Error adding skills");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handletoggle = (index) => {
    const openupdate = [...openQuestion];
    openupdate[index] = !openupdate[index];
    setopenQuestion(openupdate);
  };

  const handleSave = async (id, index) => {
    const updatedAns = TempAnswers[index] || "";
    const ansupdate = [...questions];
    ansupdate[index].ans = updatedAns;
    setQuestions(ansupdate);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/questions/save_answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id, // question id
          ans: updatedAns, // saved answer
        }),
      });
      if (res.ok) {
        toast.success("saved answer");
        fetchQuestions();
      }
    } catch (err) {
      console.error("Save error", err);
      alert("Server error while saving answer");
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/questions/delete_question/${sub}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        // refresh questions instead of manual state update
        fetchQuestions();
        toast.success("Question deleted successfully");
      } else {
        alert("Error deleting question");
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Server error while deleting");
    }
  };
const handleStatus = async (index) => {
  const updated = [...questions];
  updated[index].selected = !updated[index].selected; // toggle status
  setQuestions(updated);

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/questions/update_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sub: sub,                 // subject name
        id: updated[index].id,    // question id
        status: updated[index].selected, // new status
      }),
    });

    if (res.ok) {
      fetchQuestions();
       toast.success("update status");
    }
  } catch (err) {
    console.error("Status update error", err);
    alert("Server error while updating status");
  }
};


  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Title />
      <NavBar />
      <div className="subject-outer">
        <div className="subject-container">
          <h1>{sub}</h1>
          <div className="input-container">
            <label>Enter Your Question :</label>
            <input
              type="text"
              placeholder="Enter your question"
              className="sub-inputbox"
              value={Quest}
              onChange={(e) => setQuest(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  handleQuestion();
                  }
                }}
              i
            />
            <button onClick={handleQuestion}>Add Question</button>
          </div>
        </div>
        <div className="ques-list">
          <div className="quest-list-in">
            <h1>Question</h1>
            {questions.map(({ id, text }, index) => (
              <div key={id} className="outer-ans">
                <div className="ans-box">
                  <input
                    type="checkbox"
                    className={`sub-checkbox ${
                      questions[index].selected ? "selected" : ""
                    }`}
                    checked={questions[index].selected}
                    onChange={() => {handleStatus(index) }}
                  />
                  <button
                    className="quest-btn"
                    onClick={() => {
                      handletoggle(index);
                    }}
                  >
                    <div className="quest-item">
                      <p>{text}</p>
                    </div>
                  </button>
                </div>
                {openQuestion[index] && (
                  <div className="sub-description-box">
                    <div className="sub-ans-textbox">
                      <textarea
                        value={TempAnswers[index]}
                        onChange={(e) => {
                          const updated = [...TempAnswers];
                          updated[index] = e.target.value;
                          setTempAnswers(updated);
                        }}
                        placeholder="Write your answer here..."
                        className="sub-answer-input"
                      />
                      <div className="sub-ans-btn">
                        <button
                         className="sub-btn"
                          onClick={() => {
                            handleSave(id, index);
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Subject;
