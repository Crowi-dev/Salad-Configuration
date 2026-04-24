import { type Ingredient } from "../types";
 
export const calculateTotalWeight = (ingredients: Ingredient[]): number => {
  return ingredients.reduce(
    (sum, ingredient) => sum + (ingredient.weight_grams ?? 0),
    0
  );
};
 