import { useMemo } from "react";
import { shuffle } from "../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import type { Quiz, QuizDTO } from "../models/quiz.model";

export const RESULT_AMOUNT = 5;
export const RESULT_TYPE = "multiple";

const getQuiz = (
  category?: string,
  difficulty?: string
):
  | Promise<{
      response_code: number;
      results: QuizDTO[];
    }>
  | undefined => {
  if (!category || !difficulty) return;

  const baseUrl = import.meta.env.VITE_RESULTS!;
  const params = new URLSearchParams({
    amount: RESULT_AMOUNT.toString(),
    category,
    difficulty,
    type: RESULT_TYPE,
  });
  return fetch(`${baseUrl}?${params.toString()}`).then((res) => res.json());
};

interface IProps {
  category?: string;
  difficulty?: string;
}

interface UseCategoriesReturnProps {
  quiz: Quiz[];
  isLoading: boolean;
  refetch: () => void;
}

export function useQuiz({
  category,
  difficulty,
}: IProps): UseCategoriesReturnProps {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["quiz", category, difficulty],
    queryFn: () => getQuiz(category, difficulty),
    enabled: false,
  });

  const quiz: Quiz[] = useMemo(
    () =>
      data?.results?.map((q) => ({
        ...q,
        answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
      })) || [],
    [data]
  );

  return {
    quiz,
    isLoading: isLoading || isFetching,
    refetch,
  };
}
