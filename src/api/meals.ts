import axios from "axios";

import {
  MealsResponse,
  MealDetailsResponse,
  CategoriesResponse,
} from "../types/api";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMeals = async (): Promise<MealsResponse> => {
  const { data } = await axios.get<MealsResponse>(`${BASE_URL}/search.php?s=`);
  return data;
};

export const fetchMealById = async (
  id: string
): Promise<MealDetailsResponse> => {
  const { data } = await axios.get<MealDetailsResponse>(
    `${BASE_URL}/lookup.php?i=${id}`
  );
  return data;
};

export const fetchMealsByCategory = async (
  category: string,
  search: string = ""
): Promise<MealsResponse> => {
  const url = category
    ? `${BASE_URL}/filter.php?c=${category}&s=${search}`
    : `${BASE_URL}/search.php?s=${search}`;

  try {
    const { data } = await axios.get<MealsResponse>(url);

    if (category && data.meals) {
      const detailedMeals = await Promise.all(
        data.meals.map(async (meal) => {
          const { data: mealDetails } = await axios.get<MealDetailsResponse>(
            `${BASE_URL}/lookup.php?i=${meal.idMeal}`
          );
          return mealDetails.meals[0];
        })
      );

      return { meals: detailedMeals };
    }

    return data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await axios.get<CategoriesResponse>(
    `${BASE_URL}/list.php?c=list`
  );
  return data;
};
