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

      <div className="w-full flex flex-col gap-4">
        {bowls.map((bowl) => {
          const isSelected = selectedBowl?.id === bowl.id;

          return (
            <button
              key={bowl.id}
              onClick={() => setBowl(bowl)}
              className={`h-12 border-2 transition-colors rounded-xl flex items-center px-4 w-full text-left ${
                isSelected
                  ? "border-green-500 bg-green-500/20"
                  : "border-gray-600 hover:border-gray-400"
              }`}
            >
              {bowl.name}
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