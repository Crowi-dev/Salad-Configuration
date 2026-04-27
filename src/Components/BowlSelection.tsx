import React from "react";
import { type Bowl } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface BowlSelectionProps {
  bowls: Bowl[];
}

const BowlSelection: React.FC<BowlSelectionProps> = ({ bowls }) => {
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const setBowl = useIngredientStore((state) => state.setBowl);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      <div className="flex flex-col items-center mb-6">
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">
          1
        </div>
        <h2 className="text-xl font-bold">Valitse rasia</h2>
      </div>

      <div className="w-full flex flex-col gap-3">
        {bowls.map((bowl) => {
          const isSelected = selectedBowl?.id === bowl.id;

          return (
            <button
              key={bowl.id}
              onClick={() => setBowl(bowl)}
              className={`border-b pb-2 flex items-center gap-3 w-full text-left transition-colors ${
                isSelected
                  ? "border-[#A2D135] text-[#A2D135]"
                  : "border-gray-600 text-white hover:border-gray-400"
              }`}
            >
              {/* bowl kuva vasemmalla */}
              {bowl.image_url ? (
                <img
                  src={bowl.image_url}
                  alt={bowl.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-600 shrink-0" />
              )}

              {/* nimi ja tilavuus */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{bowl.name}</span>
                <span className="text-xs text-gray-400">{bowl.volume} ml</span>
              </div>

              {/* aktiivinen indikaattori */}
              <div className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center shrink-0 ${
                isSelected ? "border-[#A2D135]" : "border-gray-400"
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#A2D135]" />}
              </div>
            </button>
          );
        })}

        {bowls.length === 0 && (
          <p className="text-gray-400 text-center text-sm">
            Ladataan rasioita...
          </p>
        )}
      </div>
    </div>
  );
};

export default BowlSelection;