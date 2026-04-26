import React, { useState } from "react";
import { type Category, type Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

interface Props {
  categories: Category[];
  ingredients: Ingredient[];
}

const IngredientSection: React.FC<Props> = ({ categories, ingredients }) => {
  // aktiivinen kategoria, oletuksena kaikki
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  // hakusana state, oletuksena tyhjä
  const [searchQuery, setSearchQuery] = useState<string>("");

  const visibleCategories = categories.filter((c) => c.id !== 6);

  // suodatetaan kategorian JA hakusanan mukaan
  const visibleIngredients = ingredients
    .filter((i) => i.categoryId !== 6)
    .filter((i) => activeCategory === "all" || i.categoryId === activeCategory)
    .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      
      {/* Search Field - päivitetään searchQuery ku kirjotetaan */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
        />
      </div>

      {/* Categories - kaikki-nappi ja kategorianapit */}
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

      {/* Diet legend - selitys dieettimerkeille */}
      <div className="mt-6 flex gap-4 text-sm text-gray-300">
        <span><span className="font-bold text-white">G</span> = Gluteeniton</span>
        <span><span className="font-bold text-white">L</span> = Laktoositon</span>
        <span><span className="font-bold text-white">V</span> = Vegaani</span>
      </div>

    </div>
  );
};

export default IngredientSection;