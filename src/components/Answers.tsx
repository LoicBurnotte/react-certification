import { cleanText } from "../utils/helpers";
import type { QuizResponse } from "../models/quiz.model";

interface IProps {
  answers: string[];
  isRevealed?: boolean;
  selected?: QuizResponse;
  readonly?: boolean;
  onSelect?: (response: string) => void;
}

export function Answers({
  answers,
  isRevealed,
  selected,
  readonly,
  onSelect,
}: IProps) {
  const getButtonClassName = (currentBtn: string): string => {
    const userSelected = selected?.response === currentBtn;
    if (isRevealed) {
      const isCorrectAnswer = currentBtn === selected?.correctAnswer;
      // If this button is NOT the user's selection
      if (!userSelected) {
        return isCorrectAnswer
          ? "btn btn-selected-good-answer readonly"
          : "btn readonly";
      }

      // If it IS the user's selection
      return selected?.isCorrect
        ? "btn btn-selected-success readonly"
        : "btn btn-selected-error readonly";
    }

    // Question not revealed yet, highlight only current selection
    return userSelected ? "btn btn-selected" : "btn";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "1rem",
        minWidth: "300px",
        flexWrap: "wrap",
      }}
    >
      {answers.map((res) => (
        <button
          key={res}
          className={getButtonClassName(res)}
          onClick={() => !readonly && onSelect?.(res)}
        >
          {cleanText(res)}
        </button>
      ))}
    </div>
  );
}
