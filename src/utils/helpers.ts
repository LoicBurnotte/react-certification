import he from 'he';

export const shuffle = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const cleanText = (rawText: string) => he.decode(rawText);
