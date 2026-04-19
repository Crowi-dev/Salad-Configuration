import React, { useState } from "react"; // useState mukaan
import { type Category, type Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

interface Props {
  categories: Category[];
  ingredients: Ingredient[];
}

const IngredientSection: React.FC<Props> = ({ categories, ingredients }) => {
  // aktiivinen kategoria, oletuksena 'all' eli näytetään kaikki
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  const visibleCategories = categories.filter((c) => c.id !== 6);

  // suodatetaan ainesosat kategorian mukaan, jos 'all' näytetään kaikki
  const visibleIngredients = ingredients
    .filter((i) => i.categoryId !== 6)
    .filter((i) => activeCategory === "all" || i.categoryId === activeCategory);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      
      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
        />
      </div>

      {/* Categories - lisätty kaikki-nappi ja onClick */}
      <div className="flex flex-wrap gap-3 mb-6">

        {/* kaikki-nappi nollaa filterin */}
        <button
          onClick={() => setActiveCategory("all")}
          className={`font-bold px-6 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
            activeCategory === "all" ? "bg-white text-black" : "bg-[#A2D135] text-black"
          }`}
        >
          Kaikki
        </button>

        {/* loopataan kategoriat ja vaihdetaan väriä jos aktiivinen */}
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`font-bold px-6 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
              activeCategory === category.id ? "bg-white text-black" : "bg-[#A2D135] text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Ingredient Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
          />
        ))}
      </div>

    </div>
  );
};

export default IngredientSection;