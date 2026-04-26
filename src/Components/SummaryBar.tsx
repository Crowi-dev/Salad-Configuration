import React from "react";
import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { useAuthStore } from "../store/useAuthStore";
import { calculateTotalWeight } from "../utils/calculations";
import { type Ingredient } from "../types";

const SummaryBar: React.FC = () => {
  const slots = useIngredientStore((state) => state.slots);
  const clearSlot = useIngredientStore((state) => state.clearSlot);
  const prices = usePriceStore((state) => state.prices);
  const token = useAuthStore((state) => state.token);

  // filtteröidään nullit pois ja tyypitetään oikein
  const activeSlots = Object.entries(slots).filter(
    (entry): entry is [string, Ingredient] => entry[1] !== null
  );

  const activeIngredients = activeSlots.map(([, i]) => i);

  const totalWeight = calculateTotalWeight(activeIngredients);

  const totalPrice = activeIngredients.reduce((sum, ingredient) => {
    const priceItem = prices.find((p) => p.item_id === ingredient.id);
    return sum + (priceItem?.price ?? 0);
  }, 0);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="mb-3 text-lg font-semibold">Selected Ingredients</h3>

        {activeSlots.length === 0 ? (
          <p className="text-sm text-gray-300">No ingredients selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {activeSlots.map(([slotKey, ingredient]) => (
              <span
                key={slotKey}
                className="flex items-center gap-2 bg-zinc-700 px-3 py-1 rounded-full text-sm"
              >
                {ingredient.name}
                {/* X kutsuu clearSlot joka synkkaa bowlin kanssa */}
                <button
                  onClick={() => clearSlot(slotKey)}
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
          {activeSlots.length} items
        </div>

        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {token ? `${totalPrice.toFixed(2)} €` : "0,00 €"}
        </div>

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