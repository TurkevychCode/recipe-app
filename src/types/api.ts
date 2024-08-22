export interface IMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Category {
  strCategory: string;
}

export interface CategoriesResponse {
  meals: Category[];
}

export interface MealsResponse {
  meals: IMeal[];
}

export interface MealDetailsResponse {
  meals: IMeal[];
}
