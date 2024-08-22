import React, { useEffect, useState } from "react";

import { Select, MenuItem, CircularProgress, Box } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { fetchCategories } from "../../api/meals";
import { Category } from "../../types/api";

const CategorySelect: React.FC<{
  category: string;
  onCategoryChange: (event: SelectChangeEvent<string>) => void;
}> = ({ category, onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.meals);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Box color="error.main">{error}</Box>;

  return (
    <Select
      value={category || ""}
      onChange={onCategoryChange}
      sx={{
        width: "200px",
      }}
      displayEmpty
    >
      <MenuItem value="">All Categories</MenuItem>
      {categories.map((cat, index) => (
        <MenuItem key={index} value={cat.strCategory}>
          {cat.strCategory}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CategorySelect;
