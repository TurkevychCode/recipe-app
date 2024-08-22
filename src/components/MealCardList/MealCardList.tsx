import React, { FC } from "react";
import { Grid } from "@mui/material";

import MealCard from "../../components/MealCard";
import { IMeal } from "../../types/api";

interface MealCardListProps {
  meals: IMeal[];
  selectedMeals: IMeal[];
  onSelectMeal: (meal: IMeal) => void;
}

const MealCardList: FC<MealCardListProps> = React.memo(
  ({ meals, selectedMeals, onSelectMeal }) => (
    <Grid container spacing={2} marginTop={2}>
      {meals.map((meal) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={meal.idMeal}>
          <MealCard
            meal={meal}
            isSelected={selectedMeals.some((m) => m.idMeal === meal.idMeal)}
            onSelect={onSelectMeal}
          />
        </Grid>
      ))}
    </Grid>
  )
);

export default MealCardList;
