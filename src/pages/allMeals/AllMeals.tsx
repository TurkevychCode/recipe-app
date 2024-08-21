import { FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Pagination,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

import { fetchMealsByCategory, fetchMealById } from "../../api/meals";
import { IMeal } from "../../types/api";
import {
  useSelectedMeals,
  useUpdateSelectedMeals,
} from "../../hooks/useSelectedMeals";

const AllMeals: FC = () => {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 300),
    []
  );

  const { selectedMeals } = useSelectedMeals();
  const { mutate: updateSelectedMeals } = useUpdateSelectedMeals();

  const {
    data: mealIdsData,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["meals", category, search, page],
    queryFn: () => fetchMealsByCategory(category, search),
    enabled: !!category || category === "",
  });

  const mealIds = mealIdsData?.meals.map((meal) => meal.idMeal) || [];

  const mealQueries = useQueries({
    queries: mealIds.map((id) => ({
      queryKey: ["meal", id],
      queryFn: () => fetchMealById(id),
      enabled: !!id,
    })),
  });

  const meals = mealQueries
    .map((query) => query.data?.meals[0])
    .filter((meal): meal is IMeal => meal !== undefined);

  useEffect(() => {
    setPage(1);
  }, [category, search]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      debouncedSearch(value);
    }
  };

  const handleSelectMeal = (meal: IMeal) => {
    const updatedSelectedMeals = selectedMeals.some(
      (m) => m.idMeal === meal.idMeal
    )
      ? selectedMeals.filter((m) => m.idMeal !== meal.idMeal)
      : [...selectedMeals, meal];

    updateSelectedMeals(updatedSelectedMeals);
  };

  if (isLoading || isFetching) return <Box>Loading...</Box>;
  if (error) return <Box>An error occurred: {error.message}</Box>;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const sortedMeals = meals
    .filter((meal) => {
      const lowerCaseSearch = search.toLowerCase();
      return (
        meal.strMeal.toLowerCase().startsWith(lowerCaseSearch) ||
        meal.strMeal.toLowerCase().includes(lowerCaseSearch)
      );
    })
    .sort((a, b) => {
      const aStartsWith = a.strMeal.toLowerCase().indexOf(search.toLowerCase());
      const bStartsWith = b.strMeal.toLowerCase().indexOf(search.toLowerCase());
      return aStartsWith - bStartsWith;
    });

  const currentMeals = sortedMeals.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedMeals.length / limit);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Meals
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Seafood">Seafood</MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        inputProps={{ maxLength: 100 }}
      />
      <Grid container spacing={2} marginTop={2}>
        {currentMeals.map((meal) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={meal.idMeal}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <CardContent>
                <Typography component="div">{meal.strMeal}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {meal.strCategory || "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: {meal.strArea || "Unknown"}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMeals.some(
                        (m) => m.idMeal === meal.idMeal
                      )}
                      onChange={() => handleSelectMeal(meal)}
                    />
                  }
                  label="Select"
                />
                <Button
                  component={Link}
                  to={`/meal/${meal.idMeal}`}
                  variant="outlined"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box marginTop={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {selectedMeals.length > 0 && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          padding={2}
          bgcolor="background.paper"
          display="flex"
          justifyContent="center"
        >
          <Button
            component={Link}
            to="/selected-recipes"
            variant="contained"
            color="primary"
          >
            View Selected Recipes
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AllMeals;
