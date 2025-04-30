import { Fragment, useMemo } from "react";
import { Answers } from "../components/Answers";
import { useResults } from "../context/ResultsContext";
import { Link, useLocation, useNavigate } from "react-router";
import { queryClient } from "../utils/queryClientConfig";
import { RESULT_AMOUNT, useQuiz } from "../hooks/useQuiz";

export default function Results() {
  const navigate = useNavigate();

  const { responses, resetResponses } = useResults();
  const { state } = useLocation();
  const { category, difficulty } = state || {};
  const { quiz } = useQuiz({
    category,
    difficulty,
  });

  const score = useMemo(
    () => Object.values(responses).filter((s) => s.isCorrect).length,
    [responses]
  );

  const getResultColor = () => {
    if (score <= 1) return "red";
    if (score <= 3) return "yellow";
    return "lightgreen";
  };

  const handleClick = () => {
    resetResponses();
    queryClient.removeQueries({
      queryKey: ["quiz", category, difficulty],
    });
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Results</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginBottom: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {!quiz?.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4>No result to display!</h4>
            <Link to="/">Go back to the Quiz maker</Link>
          </div>
        ) : (
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "1rem",
              }}
            >
              {quiz.map((q, index) => (
                <Fragment key={q.question}>
                  <div
                    dangerouslySetInnerHTML={{ __html: q.question }}
                    key={q.question}
                  />
                  <Answers
                    readonly
                    answers={q.answers}
                    isRevealed
                    selected={responses[index]}
                  />
                </Fragment>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="resultBlock"
                style={{
                  color: "black",
                  backgroundColor: getResultColor(),
                }}
              >
                Your score is {score} out of {RESULT_AMOUNT}
              </div>
              <button className="btn-submit" onClick={handleClick}>
                Create a new quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
