import type { Difficulty } from './difficulty.model';

export interface QuizDTO {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Quiz extends QuizDTO {
  answers: string[]
}

export interface QuizResponse { 
  response: string; 
  isCorrect: boolean; 
  correctAnswer: string 
}

export type UserResponses = Record<number, QuizResponse>