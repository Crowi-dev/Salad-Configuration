import React from "react";
import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";

const SummaryBar: React.FC = () => {
  const slots = useIngredientStore((state) => state.slots);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);

  // Convert slots → active ingredients
  const activeIngredients = Object.values(slots).filter(
    (i): i is NonNullable<typeof i> => i !== null
  );

  // Calculate total weight
  const totalWeight = activeIngredients.reduce(
    (sum, ingredient) => sum + (ingredient.weight_grams ?? 0),
    0
  );

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="mb-3 text-lg font-semibold">Selected Ingredients</h3>

        {activeIngredients.length === 0 ? (
          <p className="text-sm text-gray-300">No ingredients selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {activeIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="flex items-center gap-2 bg-zinc-700 px-3 py-1 rounded-full text-sm"
              >
                {ingredient.name}

                {/* ❌ Remove button */}
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="ml-1 text-red-400 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Totals */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {activeIngredients.length} items
        </div>

        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          0,00 €
        </div>

        {/* weight */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {totalWeight} g
        </div>

        <Link to="/print">
          <button className="bg-[#A2D135] text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition">
            Print
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryBar;