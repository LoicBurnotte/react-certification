import { createContext, useContext } from "react";
import type { UserResponses } from "../models/quiz.model";

type ResultsContextType = {
  responses: UserResponses;
  setResponse: (index: number, response: string, correctAnswer: string) => void;
  resetResponses: () => void;
};

export const ResultsContext = createContext<ResultsContextType | undefined>(
  undefined
);

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
};
