import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Divider,
  List,
  ListItem,
  CircularProgress,
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

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box color="error.main" textAlign="center">
        {error}
      </Box>
    );

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        {meal && (
          <>
            <CardMedia
              component="img"
              height="300"
              image={meal.strMealThumb}
              alt={meal.strMeal}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {meal.strMeal}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Category: {meal.strCategory}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Area: {meal.strArea}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                <strong>Instructions:</strong> {meal.strInstructions}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Ingredients:</strong>
              </Typography>
              <List>
                {[...Array(20)].map((_, index) => {
                  const ingredient = meal[`strIngredient${index + 1}`];
                  const measure = meal[`strMeasure${index + 1}`];
                  return ingredient && measure ? (
                    <ListItem key={index}>
                      {ingredient} - {measure}
                    </ListItem>
                  ) : null;
                })}
              </List>
            </CardContent>
          </>
        )}
      </Card>
      <Button
        onClick={() => navigate(-1)}
        variant="outlined"
        color="primary"
        sx={{ marginBottom: 2, marginTop: 2, width: "100px" }}
      >
        Back
      </Button>
    </Box>
  );
};

export default MealDetail;
