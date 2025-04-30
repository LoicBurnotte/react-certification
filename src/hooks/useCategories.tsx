import { useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../models/category.model";

const getCategories = (): Promise<{
  trivia_categories: CategoryDTO[];
}> => fetch(import.meta.env.VITE_CATEGORIES!).then((res) => res.json());

interface UseCategoriesReturnProps {
  categories: CategoryDTO[];
  isLoading: boolean;
}

export function useCategories(): UseCategoriesReturnProps {
  const {
    data: categoryList,
    isLoading,
    isFetching,
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  return {
    categories: categoryList?.trivia_categories || [],
    isLoading: isLoading || isFetching,
  };
}
