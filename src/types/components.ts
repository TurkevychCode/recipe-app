import { IMeal } from "./api";

export interface MealCardProps {
  meal: IMeal;
  onSelect: (meal: IMeal) => void;
  isSelected: boolean;
}
