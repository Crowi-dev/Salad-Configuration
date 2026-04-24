import { describe, it, expect } from "vitest";
import { calculateTotalWeight } from "./calculations";

describe("calculateTotalWeight", () => {
  it("returns the sum of weight_grams for all ingredients", () => {
    const mockIngredients = [
      { id: 1, name: "Spinach", categoryId: 1, diets: [], weight_grams: 50 },
      { id: 2, name: "Chicken", categoryId: 2, diets: [], weight_grams: 100 },
    ];

    const result = calculateTotalWeight(mockIngredients);
    expect(result).toBe(150);
  });

  it("returns 0 when ingredients have no weight_grams", () => {
    const mockIngredients = [
      { id: 1, name: "Spinach", categoryId: 1, diets: [] },
    ];

    const result = calculateTotalWeight(mockIngredients);
    expect(result).toBe(0);
  });
});