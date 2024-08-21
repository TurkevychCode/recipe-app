export interface IMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

export interface MealsResponse {
  meals: IMeal[];
}

export interface MealDetailsResponse {
  meals: IMeal[];
}
