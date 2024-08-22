import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";

interface SelectedRecipesButtonProps {
  selectedMealsCount: number;
}

const SelectedRecipesButton: React.FC<SelectedRecipesButtonProps> = ({
  selectedMealsCount,
}) => {
  if (selectedMealsCount === 0) return null;

  return (
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
  );
};

export default SelectedRecipesButton;
