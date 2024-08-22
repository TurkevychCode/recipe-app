import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { IMeal } from "../../types/api";

interface MealCardProps {
  meal: IMeal;
  isSelected: boolean;
  onSelect: (meal: IMeal) => void;
}

const MealCard: React.FC<MealCardProps> = React.memo(
  ({ meal, isSelected, onSelect }) => (
    <Card
      sx={{
        border: isSelected ? "2px solid #1976d2" : "none",
        borderRadius: "8px",
        transition: "border 0.3s",
        cursor: "pointer",
        "&:hover": {
          border: isSelected ? "2px solid #1976d2" : "2px solid #bdbdbd",
        },
      }}
      onClick={() => onSelect(meal)}
    >
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
        <Button
          component={Link}
          to={`/meal/${meal.idMeal}`}
          variant="outlined"
          sx={{
            marginTop: "8px",
            padding: "6px 12px",
            fontSize: "0.875rem",
            borderColor: "#bdbdbd",
            color: "#333",
            borderRadius: "4px",
            textTransform: "none",
            "&:hover": {
              borderColor: "#333",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
);

export default MealCard;
