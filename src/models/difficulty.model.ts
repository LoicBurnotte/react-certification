export const difficultyList = ['easy', 'medium', 'hard'] as const;
export type Difficulty = (typeof difficultyList)[number];
