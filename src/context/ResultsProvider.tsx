import React, { useState } from "react";
import { ResultsContext } from "./ResultsContext";
import type { UserResponses } from "../models/quiz.model";

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [responses, setResponses] = useState<UserResponses>({});

  const setResponse = (
    index: number,
    response: string,
    correctAnswer: string
  ) => {
    setResponses((prev) => ({
      ...prev,
      [index]: {
        response,
        isCorrect: response === correctAnswer,
        correctAnswer,
      },
    }));
  };

  const resetResponses = () => setResponses({});

  return (
    <ResultsContext.Provider value={{ responses, setResponse, resetResponses }}>
      {children}
    </ResultsContext.Provider>
  );
};
