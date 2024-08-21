import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import AllMeals from "../../pages/allMeals";
import MealDetails from "../../pages/mealDetails";
import SelectedRecipesPage from "../../pages/SelectedRecipesPage";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AllMeals />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="/selected-recipes" element={<SelectedRecipesPage />} />
    </Routes>
  );
};

export default AppRoutes;
