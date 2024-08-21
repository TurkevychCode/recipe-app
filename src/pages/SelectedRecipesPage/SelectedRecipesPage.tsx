import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

import { fetchMealById } from "../../api/meals";
import { IMeal } from "../../types/api";
import {
  useSelectedMeals,
  useUpdateSelectedMeals,
} from "../../hooks/useSelectedMeals";

const SelectedRecipesPage: FC = () => {
  const { selectedMeals } = useSelectedMeals();
  const navigate = useNavigate();
  const { mutate: updateSelectedMeals } = useUpdateSelectedMeals();

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["selectedMeals", selectedMeals.map((meal) => meal.idMeal)],
    queryFn: async () => {
      const fetchedMeals = await Promise.all(
        selectedMeals.map((meal) => fetchMealById(meal.idMeal))
      );
      return fetchedMeals.map((response) => response.meals[0]);
    },
    enabled: selectedMeals.length > 0,
  });

  const handleClear = () => {
    updateSelectedMeals([]);
    navigate(-1);
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error instanceof Error)
    return <Box>An error occurred: {error.message}</Box>;

  const allIngredients = meals?.flatMap((meal: IMeal) =>
    Object.entries(meal)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value)
  );

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, mr: 2 }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleClear}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>

      <Typography variant="h4" gutterBottom>
        Selected Recipes
      </Typography>

      <Grid container spacing={2}>
        {meals?.map((meal: IMeal) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={meal.idMeal}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {meal.strMeal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {meal.strInstructions.substring(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6">All Ingredients:</Typography>
        <ul>
          {allIngredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default SelectedRecipesPage;
