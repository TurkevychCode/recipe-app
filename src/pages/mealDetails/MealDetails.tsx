import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

import { fetchMealById } from "../../api/meals";

const MealDetail: FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const data = await fetchMealById(id!);
        setMeal(data.meals[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meal details.");
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box>
      <Button
        onClick={() => navigate(-1)}
        variant="outlined"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>
      <Card>
        {meal && (
          <>
            <CardMedia
              component="img"
              height="300"
              image={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <CardContent>
              <Typography variant="h4">{meal.strMeal}</Typography>
              <Typography variant="h6">Category: {meal.strCategory}</Typography>
              <Typography variant="h6">Area: {meal.strArea}</Typography>
              <Typography variant="body1">
                Instructions: {meal.strInstructions}
              </Typography>
              <Typography variant="body2">Ingredients:</Typography>
              <ul>
                {[...Array(20)].map((_, index) => {
                  const ingredient = meal[`strIngredient${index + 1}`];
                  const measure = meal[`strMeasure${index + 1}`];
                  return ingredient && measure ? (
                    <li key={index}>
                      {ingredient} - {measure}
                    </li>
                  ) : null;
                })}
              </ul>
            </CardContent>
          </>
        )}
      </Card>
    </Box>
  );
};

export default MealDetail;
