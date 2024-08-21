// src/api/meals.ts
import axios from "axios";
import { MealsResponse, MealDetailsResponse } from "../types/api";

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
  const { data } = await axios.get<MealsResponse>(url);
  return data;
};
