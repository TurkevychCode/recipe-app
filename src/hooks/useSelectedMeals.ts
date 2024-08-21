import { useQueryClient, useMutation } from "@tanstack/react-query";

import { IMeal } from "../types/api";

export const useSelectedMeals = () => {
  const queryClient = useQueryClient();

  const localStorageMeals = localStorage.getItem("selectedMeals");
  const initialSelectedMeals = localStorageMeals
    ? (JSON.parse(localStorageMeals) as IMeal[])
    : [];

  queryClient.setQueryData<IMeal[]>(["selectedMeals"], initialSelectedMeals);

  const selectedMeals =
    queryClient.getQueryData<IMeal[]>(["selectedMeals"]) || [];

  return {
    selectedMeals,
    isLoading: false,
    error: null,
  };
};

export const useUpdateSelectedMeals = () => {
  const queryClient = useQueryClient();

  return useMutation<IMeal[], Error, IMeal[]>({
    mutationFn: async (updatedMeals: IMeal[]) => {
      queryClient.setQueryData<IMeal[]>(["selectedMeals"], updatedMeals);

      localStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));

      return updatedMeals;
    },
  });
};
