import { useNavigate } from "react-router";
import { cleanText } from "../utils/helpers";
import { Answers } from "../components/Answers";
import { Fragment, useMemo, useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useCategories } from "../hooks/useCategories";
import { queryClient } from "../utils/queryClientConfig";
import { RESULT_AMOUNT, useQuiz } from "../hooks/useQuiz";
import type { CategoryDTO } from "../models/category.model";
import { difficultyList } from "../models/difficulty.model";
import { Dropdown, type DropdownOption } from "../components/Dropdown";

export default function Home() {
  const navigate = useNavigate();
  const { responses, setResponse, resetResponses } = useResults();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const [category, setCategory] = useState<DropdownOption>();
  const [difficulty, setDifficulty] = useState<DropdownOption>();

  const {
    refetch,
    quiz,
    error,
    isLoading: isLoadingQuizz,
  } = useQuiz({
    category: category?.value,
    difficulty: difficulty?.value,
  });

  const categoryOptions = useMemo(
    () =>
      categories.map((category: CategoryDTO) => ({
        value: category.id.toString(),
        label: category.name,
      })),
    [categories]
  );
  const difficultyOptions = difficultyList.map((d) => ({
    value: d,
    label: d.charAt(0).toUpperCase() + d.slice(1),
  }));

  const handleCreate = () => {
    if (category && difficulty) {
      refetch(); // manually trigger the query
    }
  };

  const handleSelectResponse = (response: string, index: number) => {
    const correctAnswer = quiz[index].correct_answer;
    setResponse(index, response, correctAnswer); // From context
  };

  const handleReset = () => {
    const queryKey = ["quiz", category?.value ?? "", difficulty?.value ?? ""];
    queryClient.removeQueries({
      queryKey,
    });
    setCategory(undefined);
    setDifficulty(undefined);
    resetResponses();
  };

  if (isLoadingCategories)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          fontSize: 20,
          marginTop: "2rem",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Quiz maker</h1>
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
        <Dropdown
          id="categorySelect"
          options={categoryOptions}
          selected={category}
          onSelect={setCategory}
          placeholder="Select a category"
          className="dropdown-large"
        />
        <Dropdown
          id="difficultySelect"
          options={difficultyOptions}
          selected={difficulty}
          onSelect={setDifficulty}
          placeholder="Select difficulty"
        />
        <button
          id="createBtn"
          className="btn"
          disabled={
            !category || !difficulty || !!quiz?.length || isLoadingCategories
          }
          onClick={handleCreate}
        >
          Create
        </button>
        {(category || difficulty || !!quiz?.length) && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            title="Reset"
            onClick={handleReset}
          >
            ⭮
          </span>
        )}
      </div>
      {isLoadingQuizz && "Loading quizz..."}
      {!quiz?.length ? (
        <span>
          {error?.message
            ? `An error occured: ${error?.message}`
            : "The quiz is empty. Please try again later "}
        </span>
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
                <span>{cleanText(q.question)}</span>
                <Answers
                  answers={q.answers}
                  selected={responses[index]}
                  onSelect={(response) => handleSelectResponse(response, index)}
                />
              </Fragment>
            ))}
          </div>
          {Object.keys(responses).length === RESULT_AMOUNT && (
            <button
              className="btn-submit"
              style={{ marginTop: "1rem" }}
              onClick={() =>
                navigate("/results", {
                  state: {
                    category: category?.value,
                    difficulty: difficulty?.value,
                  },
                })
              }
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
