import { FC, useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import { Box, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import {
  useSelectedMeals,
  useUpdateSelectedMeals,
} from "../../hooks/useSelectedMeals";

import { fetchMealsByCategory } from "../../api/meals";
import { IMeal } from "../../types/api";
import CategorySelect from "../../components/CategorySelect";
import SearchBox from "../../components/SearchBox";
import MealCard from "../../components/MealCard";
import PaginationComponent from "../../components/PaginationComponent";
import SelectedRecipesButton from "../../components/SelectedRecipesButton";
import useDebounce from "../../hooks/useDebounce";
import MealCardList from "../../components/MealCardList";

const AllMeals: FC = () => {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { selectedMeals } = useSelectedMeals();
  const { mutate: updateSelectedMeals } = useUpdateSelectedMeals();

  const debouncedSearch = useDebounce(search, 300);
  const limit = 8;

  const {
    data: mealsData,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["meals", category, debouncedSearch],
    queryFn: () => fetchMealsByCategory(category, debouncedSearch),
    enabled: true,
  });

  const meals = mealsData?.meals || [];

  useEffect(() => {
    setPage(1);
  }, [category, debouncedSearch]);

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
    setSearch(event.target.value);
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
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px 0 100px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              marginRight: "16px",
              color: "#333",
            }}
          >
            Sort by:
          </Typography>
          <CategorySelect
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </Box>
        <SearchBox search={search} onSearchChange={handleSearchChange} />
      </Box>

      <MealCardList
        meals={currentMeals}
        selectedMeals={selectedMeals}
        onSelectMeal={handleSelectMeal}
      />
      <Box marginTop={2} display="flex" justifyContent="center">
        <PaginationComponent
          count={totalPages}
          page={page}
          onPageChange={handlePageChange}
        />
      </Box>
      <SelectedRecipesButton selectedMealsCount={selectedMeals.length} />
    </Box>
  );
};

export default AllMeals;
